import Link from 'next/link'
import { createClient } from '@/shared/lib/supabase/server'
import { NavbarClient } from './NavbarClient'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-semibold text-gray-900 text-lg">
          MiTienda
        </Link>

        {/* Links de navegación */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Inicio
          </Link>
          <Link href="/products" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Productos
          </Link>
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <NavbarClient
              user={{
                email: user.email ?? '',
                name: user.user_metadata?.name ?? null,
              }}
            />
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  )
}
