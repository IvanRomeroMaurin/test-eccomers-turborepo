import { productsService, reviewsService } from '@repo/api-client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { createClient } from '@/shared/lib/supabase/server'
import { ReviewList } from '@/features/reviews/components/ReviewList'
import { ReviewForm } from '@/features/reviews/components/ReviewForm'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Buscamos todo en paralelo
  const [productRes, userRes, reviewsRes] = await Promise.allSettled([
    productsService.getById(Number(id)),
    supabase.auth.getUser(),
    reviewsService.getByProduct(Number(id))
  ])

  if (productRes.status === 'rejected' || !productRes.value) {
    notFound()
  }

  const product = productRes.value
  const user = userRes.status === 'fulfilled' ? userRes.value.data.user : null
  const reviews = reviewsRes.status === 'fulfilled' ? reviewsRes.value : []

  const stockDisponible = product.product_stocks?.filter(s => s.quantity > 0) ?? []

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link
        href="/products"
        className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
      >
        ← Volver
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Imagen */}
        <div className="aspect-square bg-muted">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                Sin imagen
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-xs tracking-widest uppercase text-muted-foreground">
              {product.categories?.name}
            </p>
            <h1 className="text-3xl font-light tracking-tight">
              {product.name}
            </h1>
            <p className="text-2xl">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>

          {product.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          )}

          {stockDisponible.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">
                Talles disponibles
              </p>
              <div className="flex flex-wrap gap-2">
                {stockDisponible.map((stock) => (
                  <Badge
                    key={stock.id}
                    variant="outline"
                    className="text-xs tracking-widest rounded-none px-3 py-1"
                  >
                    {stock.size}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button
            className="w-full text-xs tracking-widest uppercase rounded-none mt-auto"
            disabled
          >
            Próximamente — Agregar al carrito
          </Button>
        </div>
      </div>

      {/* Sección de reseñas */}
      <div className="mt-16 max-w-2xl space-y-8">
        <div className="space-y-1">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">
            Opiniones
          </p>
          <h2 className="text-2xl font-light tracking-tight">
            Reseñas del producto
          </h2>
        </div>

        <ReviewList
          reviews={reviews}
          currentUserId={user?.id ?? null}
          productId={Number(id)}
        />

        <ReviewForm
          productId={Number(id)}
          userId={user?.id ?? null}
        />
      </div>
    </div>
  )
}
