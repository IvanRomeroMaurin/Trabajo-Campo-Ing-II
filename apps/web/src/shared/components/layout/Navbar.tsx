import Link from 'next/link'
import { createClient } from '@/shared/lib/supabase/server'
import { NavbarClient } from './NavbarClient'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium tracking-widest uppercase text-foreground">
          MiTienda
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
            Inicio
          </Link>
          <Link href="/products" className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
            Productos
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <NavbarClient
              user={{
                email: user.email ?? '',
                name: user.user_metadata?.name ?? null,
              }}
            />
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="text-xs tracking-widest uppercase bg-primary text-primary-foreground px-4 py-2 hover:opacity-90 transition-opacity"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
