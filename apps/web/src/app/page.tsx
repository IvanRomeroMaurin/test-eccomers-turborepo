import Link from 'next/link'
import { createClient } from '@/shared/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <section className="max-w-6xl mx-auto px-4 py-24 flex flex-col items-center text-center gap-6">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
        Bienvenido a <span className="text-blue-600">MiTienda</span>
      </h1>
      <p className="text-xl text-gray-500 max-w-xl">
        Encontrá los mejores productos con la mejor calidad al mejor precio. 
        Una experiencia de compra simple y segura.
      </p>
      <div className="flex gap-4 mt-4">
        {user ? (
          <Link
            href="/products"
            className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-all font-medium"
          >
            Ver productos
          </Link>
        ) : (
          <>
            <Link
              href="/register"
              className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-all font-medium"
            >
              Empezar ahora
            </Link>
            <Link
              href="/login"
              className="border border-gray-200 bg-white text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-all font-medium"
            >
              Iniciar sesión
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
