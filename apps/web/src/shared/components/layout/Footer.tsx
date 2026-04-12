import Link from 'next/link'
import { Camera, Globe, Send, Mail, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/40 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Column 1: Brand */}
        <div className="space-y-6">
          <Link 
            href="/" 
            className="text-lg font-light tracking-[0.25em] uppercase text-foreground"
          >
            ALEXANDRIA
          </Link>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs tracking-wide">
            Diseño de autor y perfumería fina. Una curaduría de piezas atemporales para el individuo moderno.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors p-1">
              <Camera size={16} strokeWidth={1.5} />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors p-1">
              <Send size={16} strokeWidth={1.5} />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors p-1">
              <Globe size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Column 2: Shop */}
        <div className="space-y-6">
          <h4 className="text-[10px] tracking-[0.3em] font-semibold uppercase text-foreground">
            Colecciones
          </h4>
          <nav className="flex flex-col gap-4">
            <Link href="/products" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Ver Todo</Link>
            <Link href="/products?category=remeras" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Remeras</Link>
            <Link href="/products?category=pantalones" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Pantalones</Link>
            <Link href="/products?category=accesorios" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Accesorios</Link>
          </nav>
        </div>

        {/* Column 3: Support */}
        <div className="space-y-6">
          <h4 className="text-[10px] tracking-[0.3em] font-semibold uppercase text-foreground">
            Soporte
          </h4>
          <nav className="flex flex-col gap-4">
            <Link href="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contacto</Link>
            <Link href="/shipping" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Envíos</Link>
            <Link href="/returns" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Devoluciones</Link>
            <Link href="/faq" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Preguntas Frecuentes</Link>
          </nav>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-6">
          <h4 className="text-[10px] tracking-[0.3em] font-semibold uppercase text-foreground">
            Newsletter
          </h4>
          <p className="text-xs text-muted-foreground tracking-wide leading-relaxed">
            Suscribite para recibir novedades y ofertas exclusivas.
          </p>
          <form className="relative group">
            <Input 
              placeholder="Tu email" 
              className="rounded-none border-0 border-b border-border bg-transparent px-0 py-2 focus-visible:ring-0 focus-visible:border-foreground transition-all placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[9px] tracking-widest uppercase text-muted-foreground">
          © {new Date().getFullYear()} ALEXANDRIA. Todos los derechos reservados.
        </p>
        <div className="flex gap-8">
          <Link href="/privacy" className="text-[9px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">Privacidad</Link>
          <Link href="/terms" className="text-[9px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">Términos</Link>
          <Link href="/cookies" className="text-[9px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  )
}
