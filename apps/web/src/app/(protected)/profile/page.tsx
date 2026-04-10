import { createClient } from '@/shared/lib/supabase/server'
import { usersService } from '@repo/api-client'
import { ProfileForm } from '@/features/profile/components/ProfileForm'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) redirect('/login')

  const profile = await usersService.getMe(session.access_token)

  return (
    <main className="flex min-h-screen items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">Mi Perfil</h1>
        <ProfileForm initialData={profile} />
        
        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center">
            <a href="/dashboard" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Volver al Dashboard
            </a>
        </div>
      </div>
    </main>
  )
}
