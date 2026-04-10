'use server'

import { createClient } from '@/shared/lib/supabase/server'
import type { RegisterCredentials } from '../types/auth.types'

export async function register(credentials: RegisterCredentials) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        name: credentials.name,
        phone: credentials.phone,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
