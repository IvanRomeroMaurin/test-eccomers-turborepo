'use server'

import { createClient } from '@/shared/lib/supabase/server'
import { usersService } from '@repo/api-client'
import { revalidatePath } from 'next/cache'
import type { UpdateProfileDto } from '../types/profile.types'

export async function updateProfileAction(data: UpdateProfileDto) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return { error: 'No autenticado' }
  }

  try {
    await usersService.updateMe(session.access_token, data)
    revalidatePath('/profile')
    return { success: true }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Error al actualizar' }
  }
}
