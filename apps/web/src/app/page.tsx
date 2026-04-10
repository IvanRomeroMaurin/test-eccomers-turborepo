import Link from 'next/link'
import { createClient } from '@/shared/lib/supabase/server'
import { productsService } from '@repo/api-client'
import { ProductGrid } from '@/features/products/components/ProductGrid'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const products = await productsService.getAll()
  const featured = products.slice(0, 4)

  return (
    <div className="space-y-16 py-12">
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 gap-8 max-w-4xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">
          Nueva colección
        </p>
        <h1 className="text-6xl md:text-8xl font-light tracking-tight text-foreground leading-none">
          MiTienda
        </h1>
        <p className="text-base text-muted-foreground max-w-md font-light leading-relaxed">
          Diseño minimalista. Calidad superior. Encontrá lo que buscás.
        </p>
        <div className="flex gap-4 mt-4">
          {user ? (
            <Link
              href="/products"
              className="text-xs tracking-widest uppercase bg-primary text-primary-foreground px-8 py-3 hover:opacity-90 transition-opacity"
            >
              Ver colección
            </Link>
          ) : (
            <>
              <Link
                href="/register"
                className="text-xs tracking-widest uppercase bg-primary text-primary-foreground px-8 py-3 hover:opacity-90 transition-opacity"
              >
                Empezar ahora
              </Link>
              <Link
                href="/login"
                className="text-xs tracking-widest uppercase border border-border text-foreground px-8 py-3 hover:bg-accent transition-colors"
              >
                Iniciar sesión
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <p className="text-xs tracking-widest uppercase text-muted-foreground">
              Selección
            </p>
            <h2 className="text-2xl font-light tracking-tight">
              Destacados
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver todos →
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </div>
  )
}
