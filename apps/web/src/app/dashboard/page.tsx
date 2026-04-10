import { createClient } from '@/shared/lib/supabase/server'
import { logout } from '@/features/auth/actions/logout'

export const metadata = {
  title: 'Dashboard | Our App',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome back!</h2>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Email:</span> {user?.email}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">User ID:</span> {user?.id}
            </p>
          </div>
        </div>

        <form action={logout}>
          <button 
            type="submit" 
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}
