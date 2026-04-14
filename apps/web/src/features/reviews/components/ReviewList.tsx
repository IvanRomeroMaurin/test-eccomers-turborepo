import { StarRating } from './StarRating'
import { deleteReviewAction } from '../actions/deleteReview'
import type { Review } from '../types/review.types'

interface ReviewListProps {
  reviews: Review[]
  currentUserId: string | null
  productId: number
}

export function ReviewList({ reviews, currentUserId, productId }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="py-8">
        <p className="text-xs text-muted-foreground tracking-widest uppercase">
          Todavía no hay reseñas
        </p>
      </div>
    )
  }

  const average = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length

  return (
    <div className="space-y-6">
      {/* Promedio */}
      <div className="flex items-center gap-3">
        <StarRating rating={Math.round(average)} size="md" />
        <span className="text-sm text-muted-foreground">
          {average.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'})
        </span>
      </div>

      {/* Lista */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-t border-border pt-4 space-y-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-foreground">
                  {review.users?.name ?? 'Usuario'}
                </p>
                <StarRating rating={review.rating} size="sm" />
              </div>
              <div className="flex items-center gap-4">
                <p className="text-xs text-muted-foreground">
                  {review.created_at
                    ? new Date(review.created_at).toLocaleDateString('es-AR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })
                    : ''}
                </p>
                {currentUserId === review.user_id && (
                  <form action={deleteReviewAction.bind(null, review.id, productId) as any}>
                    <button
                      type="submit"
                      className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                    >
                      Eliminar
                    </button>
                  </form>
                )}
              </div>
            </div>
            {review.comment && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
