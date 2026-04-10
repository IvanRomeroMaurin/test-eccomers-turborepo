import { RegisterForm } from '@/features/auth/components/RegisterForm'

export const metadata = {
  title: 'Sign Up | Our App',
  description: 'Create a new account',
}

export default function RegisterPage() {
  return (
    <div className="flex flex-1 items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  )
}
