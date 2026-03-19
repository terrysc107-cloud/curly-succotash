'use server'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

type SubmitResult = 
  | { success: true; orderRef: string; error?: never }
  | { success: false; error: string; orderRef?: never }

export async function submitIntakeForm(formData: {
  firstName: string
  lastName: string
  email: string
  phone: string
  currentTitle: string
  yearsExp: string
  package: string
  targetTitle: string
  industry: string
  jobDescription: string
  workHistory: string
  certifications: string
  notes: string
  template: string
}): Promise<SubmitResult> {
  // Generate unique order ref with timestamp + random to prevent duplicates
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  const orderRef = `QRC-${timestamp}-${random}`

  const payload = {
    orderRef,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    currentTitle: formData.currentTitle,
    yearsExp: formData.yearsExp,
    package: formData.package,
    targetTitle: formData.targetTitle,
    industry: formData.industry,
    jobDescription: formData.jobDescription,
    workHistory: formData.workHistory,
    certifications: formData.certifications,
    notes: formData.notes,
    template: formData.template,
    submittedAt: new Date().toISOString()
  }

  // Check env vars
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: false, error: 'Missing SUPABASE_URL env var' }
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { success: false, error: 'Missing SUPABASE_SERVICE_ROLE_KEY env var' }
  }

  // Post to n8n webhook (don't fail if webhook fails)
  try {
    await fetch('https://aigenx.app.n8n.cloud/webhook/qualified-resume-intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  } catch (webhookErr) {
    // Continue even if webhook fails
  }

  // Write to Supabase
  try {
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { error } = await supabase
      .from('resume_orders')
      .upsert(
        {
          order_ref: orderRef,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          current_title: formData.currentTitle,
          years_exp: formData.yearsExp,
          package: formData.package,
          target_title: formData.targetTitle,
          industry: formData.industry,
          job_description: formData.jobDescription,
          work_history: formData.workHistory,
          certifications: formData.certifications,
          notes: formData.notes,
          template: formData.template
        },
        { onConflict: 'order_ref' }
      )

    if (error) {
      return { success: false, error: `Supabase: ${error.message}` }
    }

    return { success: true, orderRef }
  } catch (err) {
    return { success: false, error: `Server error: ${err instanceof Error ? err.message : String(err)}` }
  }
}
