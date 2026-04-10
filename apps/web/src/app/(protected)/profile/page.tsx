import { createClient } from '@/shared/lib/supabase/server'
import { usersService } from '@repo/api-client'
import { ProfileForm } from '@/features/profile/components/ProfileForm'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const supabase = await createClient()

  // Usar getUser() para validar y getSession() para el token
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/login')

  const profile = await usersService.getMe(session.access_token)

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>
        <ProfileForm initialData={profile} />
      </div>
    </main>
  )
}
