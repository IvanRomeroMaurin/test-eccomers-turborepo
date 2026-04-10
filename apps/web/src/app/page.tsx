import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/shared/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-black">
      {/* Header/Nav */}
      <header className="flex h-16 w-full items-center justify-between border-b px-6">
        <div className="flex items-center gap-2">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={80}
            height={16}
            priority
          />
          <span className="font-bold text-lg tracking-tight uppercase">Store</span>
        </div>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600 hidden sm:inline">
                {user.email}
              </span>
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl space-y-6">
          <div className="flex justify-center mb-8">
             <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
                <Image
                  className="dark:invert opacity-20"
                  src="/next.svg"
                  alt="Next.js logo"
                  width={120}
                  height={24}
                  priority
                />
             </div>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tighter sm:text-7xl">
            {user ? `¡Bienvenido!` : "Tu Próxima Gran Tienda"}
          </h1>
          <p className="mx-auto max-w-[600px] text-lg text-gray-600 sm:text-xl">
            {user 
              ? `Has iniciado sesión correctamente como ${user.email}. Ya tienes acceso a todas las funcionalidades.`
              : "La mejor selección de productos con una experiencia de usuario premium. Regístrate ahora para empezar."}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            {!user ? (
              <>
                <Link
                  href="/register"
                  className="rounded-full bg-black px-8 py-3 text-lg font-bold text-white transition-transform hover:scale-105"
                >
                  Empezar ahora
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-gray-300 px-8 py-3 text-lg font-bold transition-transform hover:scale-105 hover:bg-gray-50"
                >
                  Iniciar Sesión
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="rounded-full bg-black px-8 py-3 text-lg font-bold text-white transition-transform hover:scale-105"
              >
                Ir a mi Dashboard
              </Link>
            )}
          </div>
        </div>
      </main>

      <footer className="flex h-16 w-full items-center justify-center border-t text-sm text-gray-500">
        © 2026 My Monorepo Store. Built with Feature-Sliced Design.
      </footer>
    </div>
  );
}
