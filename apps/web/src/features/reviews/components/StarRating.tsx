export function StarRating({
  rating,
  size = 'md'
}: {
  rating: number
  size?: 'sm' | 'md'
}) {
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <div className={`flex gap-0.5 ${textSize}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'text-foreground' : 'text-muted-foreground'}
        >
          {star <= rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  )
}
