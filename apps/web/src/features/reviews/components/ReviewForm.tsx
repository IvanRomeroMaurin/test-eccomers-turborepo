'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createReviewAction } from '../actions/createReview'

interface ReviewFormProps {
  productId: number
  userId: string | null
}

export function ReviewForm({ productId, userId }: ReviewFormProps) {
  const [rating, setRating] = useState(5)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  if (!userId) {
    return (
      <div className="py-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          <Link href="/login" className="text-foreground hover:underline underline-offset-4">
            Iniciá sesión
          </Link>
          {' '}para dejar una reseña.
        </p>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    startTransition(async () => {
      const result = await createReviewAction(productId, rating, comment)
      if (result.error) {
        setMessage({ type: 'error', text: result.error })
      } else {
        setMessage({ type: 'success', text: 'Reseña publicada correctamente' })
        setComment('')
        setRating(5)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-border">
      <p className="text-xs tracking-widest uppercase text-muted-foreground">
        Dejá tu reseña
      </p>

      {/* Selector de estrellas */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="text-xl transition-colors"
          >
            <span className={(hovered || rating) >= star ? 'text-foreground' : 'text-muted-foreground'}>
              ★
            </span>
          </button>
        ))}
      </div>

      {/* Comentario */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Contá tu experiencia (opcional)"
        rows={3}
        className="w-full bg-transparent border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
        disabled={isPending}
      />

      {message && (
        <p className={`text-xs ${message.type === 'success' ? 'text-muted-foreground' : 'text-destructive'}`}>
          {message.text}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="text-xs tracking-widest uppercase rounded-none"
      >
        {isPending ? 'Publicando...' : 'Publicar reseña'}
      </Button>
    </form>
  )
}
