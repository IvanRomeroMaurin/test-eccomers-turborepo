'use client'

import { useState } from 'react'
import Link from 'next/link'
import { login } from '../actions/login'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const res = await login({ email, password })
      if (res?.error) {
        setError(res.error)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-2xl shadow-xl border border-gray-100 text-gray-900">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Bienvenido</h2>
        <p className="text-gray-500">Ingresa tus credenciales para continuar</p>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 pb-1.5" htmlFor="email">
              Correo electrónico
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="nombre@ejemplo.com"
              className="bg-gray-50/50"
            />
          </div>
          <div>
            <div className="flex justify-between items-center pb-1.5">
              <label className="text-sm font-semibold text-gray-700" htmlFor="password">
                Contraseña
              </label>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="bg-gray-50/50"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-6 text-base font-semibold transition-all hover:scale-[1.01]"
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        ¿No tienes una cuenta?{' '}
        <Link href="/register" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
          Regístrate gratis
        </Link>
      </p>
    </div>
  )
}
