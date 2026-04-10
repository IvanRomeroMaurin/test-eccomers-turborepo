import { productsService, categoriesService } from '@repo/api-client'
import { ProductGrid } from '@/features/products/components/ProductGrid'
import { CategoryFilter } from '@/features/products/components/CategoryFilter'

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams

  const [products, categories] = await Promise.all([
    productsService.getAll(category),
    categoriesService.getAll(),
  ])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">
          Colección
        </p>
        <h1 className="text-3xl font-light tracking-tight">
          {category
            ? categories.find(c => c.slug === category)?.name ?? 'Productos'
            : 'Todos los productos'
          }
        </h1>
        <p className="text-xs text-muted-foreground">
          {products.length} {products.length === 1 ? 'producto' : 'productos'}
        </p>
      </div>

      <CategoryFilter categories={categories} selected={category} />

      <ProductGrid products={products} />
    </div>
  )
}
