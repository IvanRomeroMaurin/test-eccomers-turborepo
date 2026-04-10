import { LoginForm } from '@/features/auth/components/LoginForm'

export const metadata = {
  title: 'Sign In | Our App',
  description: 'Sign in to your account',
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  )
}
