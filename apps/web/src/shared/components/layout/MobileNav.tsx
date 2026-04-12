'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, User } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/products', label: 'Colección' },
  { href: '/products?category=remeras', label: 'Novedades' },
  { href: '/about', label: 'Nosotros' },
]

interface MobileNavProps {
  user?: {
    email: string
    name: string | null
  }
}

export function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-2 -mr-2 text-foreground/70 hover:text-foreground transition-colors">
            <Menu size={24} strokeWidth={1.5} />
            <span className="sr-only">Menú</span>
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-border/40">
          <SheetHeader className="text-left pb-10">
            <SheetTitle className="text-[10px] tracking-[0.5em] uppercase font-light text-muted-foreground">
              Alexandria
            </SheetTitle>
          </SheetHeader>
          
          <nav className="flex flex-col gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg font-extralight tracking-[0.3em] uppercase hover:text-muted-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-10 left-6 right-6 space-y-8">
            <div className="h-[1px] bg-border/40 w-full" />
            
            <div className="flex flex-col gap-6">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                      <User size={16} className="text-muted-foreground" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">{user.name || 'Mi Perfil'}</span>
                      <span className="text-[10px] text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                  <Link 
                    href="/profile" 
                    onClick={() => setOpen(false)}
                    className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground"
                  >
                    Ver Perfil
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-[10px] tracking-[0.4em] uppercase text-center border border-border py-4 hover:bg-accent transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="text-[10px] tracking-[0.4em] uppercase text-center bg-foreground text-background py-4 font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
