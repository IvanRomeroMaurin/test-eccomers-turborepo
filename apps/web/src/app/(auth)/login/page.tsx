import { LoginForm } from '@/features/auth/components/LoginForm'

export const metadata = {
  title: 'Sign In | Our App',
  description: 'Sign in to your account',
}

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  )
}
