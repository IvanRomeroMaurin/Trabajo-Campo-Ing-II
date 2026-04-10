import Link from 'next/link'
import { Search, ShoppingBag } from 'lucide-react'
import { createClient } from '@/shared/lib/supabase/server'
import { NavbarClient } from './NavbarClient'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-lg font-light tracking-[0.25em] uppercase text-foreground hover:opacity-70 transition-opacity whitespace-nowrap"
        >
          MiTienda
        </Link>

        {/* Navigation - Centered */}
        <nav className="hidden md:flex items-center gap-12 flex-1 justify-center">
          <Link 
            href="/" 
            className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-all hover:scale-105"
          >
            Inicio
          </Link>
          <Link 
            href="/products" 
            className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-all hover:scale-105"
          >
            Colección
          </Link>
          <Link 
            href="/products?category=remeras" 
            className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-all hover:scale-105"
          >
            Novedades
          </Link>
          <Link 
            href="/about" 
            className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-all hover:scale-105"
          >
            Nosotros
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className="text-muted-foreground hover:text-foreground transition-colors p-2">
            <Search size={18} strokeWidth={1.5} />
          </button>
          
          <Link href="/cart" className="text-muted-foreground hover:text-foreground transition-colors p-2 relative group">
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              0
            </span>
          </Link>

          <div className="h-6 w-[1px] bg-border/60 mx-1" />

          {user ? (
            <NavbarClient
              user={{
                email: user.email ?? '',
                name: user.user_metadata?.name ?? null,
              }}
            />
          ) : (
            <div className="flex items-center gap-6">
              <Link
                href="/login"
                className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="hidden lg:block text-[10px] tracking-[0.2em] uppercase bg-foreground text-background px-6 py-2.5 hover:bg-foreground/90 transition-all font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
