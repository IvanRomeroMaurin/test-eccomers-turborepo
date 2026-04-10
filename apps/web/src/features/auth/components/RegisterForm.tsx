'use client'

import { useState } from 'react'
import Link from 'next/link'
import { register } from '../actions/register'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string

    try {
      const res = await register({ email, password, name, phone })
      if (res?.error) {
        setError(res.error)
      } else if (res?.success) {
        setSuccess(true)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-2xl shadow-xl border border-gray-100 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-green-50 rounded-full">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Verifica tu correo</h2>
        <p className="text-gray-500 leading-relaxed">
          Hemos enviado un enlace de confirmación a tu correo electrónico para activar tu cuenta.
        </p>
        <div className="pt-4">
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold">
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-2xl shadow-xl border border-gray-100 text-gray-900">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Crear cuenta</h2>
        <p className="text-gray-500">Únete a nuestra comunidad hoy mismo</p>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 pb-1.5" htmlFor="name">
              Nombre completo
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Juan Pérez"
              className="bg-gray-50/50"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 pb-1.5" htmlFor="phone">
              Teléfono
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              placeholder="+54 9 11 1234 5678"
              className="bg-gray-50/50"
            />
          </div>
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
            <label className="block text-sm font-semibold text-gray-700 pb-1.5" htmlFor="password">
              Contraseña
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
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
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?{' '}
        <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
          Inicia sesión
        </Link>
      </p>
    </div>
  )
}
