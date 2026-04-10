'use server'

import { createClient } from '@/shared/lib/supabase/server'
import { reviewsService } from '@repo/api-client'
import { revalidatePath } from 'next/cache'

export async function deleteReviewAction(reviewId: number, productId: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return { error: 'Sesión expirada' }

  try {
    await reviewsService.remove(session.access_token, reviewId)
    revalidatePath(`/products/${productId}`)
    return { success: true }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Error al eliminar' }
  }
}
