'use server'

import { createClient } from '@/shared/lib/supabase/server'
import { reviewsService } from '@repo/api-client'
import { revalidatePath } from 'next/cache'

export async function createReviewAction(
  productId: number,
  rating: number,
  comment: string
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Debés iniciar sesión para dejar una reseña' }

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return { error: 'Sesión expirada' }

  try {
    await reviewsService.create(session.access_token, {
      product_id: productId,
      rating,
      comment: (comment || '') as any,
    })
    revalidatePath(`/products/${productId}`)
    return { success: true }
  } catch (error) {
    if (error instanceof Error && error.message.includes('Ya reseñaste')) {
      return { error: 'Ya dejaste una reseña para este producto' }
    }
    return { error: error instanceof Error ? error.message : 'Error al crear la reseña' }
  }
}
