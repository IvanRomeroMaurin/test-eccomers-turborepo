'use client'

import React, { useState, useTransition } from 'react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { updateProfileAction } from '../actions/updateProfile'
import type { UserProfile, UpdateProfileDto } from '../types/profile.types'

interface ProfileFormProps {
  initialData: UserProfile
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const [formData, setFormData] = useState<UpdateProfileDto>({
    name: initialData.name ?? '',
    phone: initialData.phone ?? '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    startTransition(async () => {
      const result = await updateProfileAction(formData)
      if (result.error) {
        setMessage({ type: 'error', text: result.error })
      } else {
        setMessage({ type: 'success', text: 'Perfil actualizado correctamente' })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Nombre completo
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name ?? ''}
          onChange={handleChange}
          placeholder="Tu nombre"
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <Input
          id="phone"
          name="phone"
          type="text"
          value={formData.phone ?? ''}
          onChange={handleChange}
          placeholder="Tu número de teléfono"
          disabled={isPending}
        />
      </div>

      {message && (
        <div className={`p-3 rounded-md text-sm ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Guardando...' : 'Guardar cambios'}
      </Button>
    </form>
  )
}
