import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import type { Product } from '../types/product.types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group border-border hover:border-foreground transition-colors cursor-pointer rounded-none overflow-hidden">
        <div className="aspect-square bg-muted overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                Sin imagen
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-4 space-y-1">
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            {product.categories?.name ?? ''}
          </p>
          <h3 className="text-sm font-medium text-foreground leading-tight">
            {product.name}
          </h3>
          <p className="text-sm text-foreground">
            ${Number(product.price).toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
