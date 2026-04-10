import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/shared/lib/supabase/server'
import { productsService } from '@repo/api-client'
import { ProductGrid } from '@/features/products/components/ProductGrid'
import { ArrowRight, Box, ShieldCheck, Truck } from 'lucide-react'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const products = await productsService.getAll()
  const featured = products.slice(0, 4)

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-5rem)] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.png"
          alt="Minimalist Fashion Hero"
          fill
          className="object-cover brightness-[0.5]"
          priority
        />
        {/* Dark Overlay for Legibility */}
        <div className="absolute inset-0 bg-black/40 z-[5]" />
        
        <div className="relative z-10 text-center space-y-8 px-6 max-w-5xl">
          <div className="space-y-4">
            <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/90 drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Nueva Colección 2026
            </p>
            <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter text-white drop-shadow-2xl leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              ESENCIA <br /> <span className="italic font-light">MINIMALISTA</span>
            </h1>
          </div>
          <p className="text-sm md:text-base text-white/80 max-w-md mx-auto font-light leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            Descubrí piezas diseñadas para perdurar. Calidad impecable, estética atemporal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <Link
              href="/products"
              className="group text-[10px] tracking-[0.3em] uppercase bg-white text-black px-10 py-4 hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              Explorar Catálogo
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            {!user && (
              <Link
                href="/register"
                className="text-[10px] tracking-[0.3em] uppercase border border-white/30 text-white px-10 py-4 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Unirse ahora
              </Link>
            )}
          </div>
        </div>
        
        {/* Subtle Bottom Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-[6]" />
      </section>

      {/* Brand Values */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-border/40 pb-20">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-accent/30">
              <Truck size={20} strokeWidth={1.5} className="text-foreground" />
            </div>
            <h3 className="text-[10px] tracking-[0.2em] font-semibold uppercase">Envío Premium</h3>
            <p className="text-xs text-muted-foreground font-light px-4">Logística optimizada para entregas rápidas y seguras en todo el país.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-accent/30">
              <ShieldCheck size={20} strokeWidth={1.5} className="text-foreground" />
            </div>
            <h3 className="text-[10px] tracking-[0.2em] font-semibold uppercase">Calidad Garantizada</h3>
            <p className="text-xs text-muted-foreground font-light px-4">Cada pieza es inspeccionada manualmente para asegurar perfección.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-accent/30">
              <Box size={20} strokeWidth={1.5} className="text-foreground" />
            </div>
            <h3 className="text-[10px] tracking-[0.2em] font-semibold uppercase">Packaging Eco</h3>
            <p className="text-xs text-muted-foreground font-light px-4">Comprometidos con el minimalismo también en nuestro impacto ambiental.</p>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="space-y-2">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Colecciones</p>
          <h2 className="text-3xl font-extralight tracking-tight">Explorar por línea</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
          <Link href="/products?category=remeras" className="relative group overflow-hidden">
            <Image
              src="/cat_remeras.png"
              alt="Remeras Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-90"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-10 left-10 space-y-2">
              <h3 className="text-white text-2xl font-light tracking-wide">Essentials: Remeras</h3>
              <p className="text-white/70 text-[10px] tracking-[0.2em] uppercase">Materiales de primera calidad</p>
              <div className="pt-4 overflow-hidden">
                <span className="text-white text-[10px] tracking-[0.3em] uppercase border-b border-white/50 pb-1 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 inline-block">
                  Ver colección
                </span>
              </div>
            </div>
          </Link>

          <Link href="/products?category=calzado" className="relative group overflow-hidden">
            <Image
              src="/cat_calzado.png"
              alt="Calzado Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-90"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-10 left-10 space-y-2">
              <h3 className="text-white text-2xl font-light tracking-wide">Studio: Calzado</h3>
              <p className="text-white/70 text-[10px] tracking-[0.2em] uppercase">Estructura y confort</p>
              <div className="pt-4 overflow-hidden">
                <span className="text-white text-[10px] tracking-[0.3em] uppercase border-b border-white/50 pb-1 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 inline-block">
                  Ver colección
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-32 space-y-12">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Selección curada</p>
            <h2 className="text-3xl font-extralight tracking-tight">Piezas Destacadas</h2>
          </div>
          <Link
            href="/products"
            className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center gap-2 group"
          >
            Ver Todo 
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* Newsletter / CTA */}
      <section className="bg-accent/20 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-extralight tracking-tighter leading-tight italic">
            "El estilo es una forma de decir quién eres sin tener que hablar"
          </h2>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Suscribite a nuestra esencia</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="TU EMAIL" 
              className="flex-1 bg-transparent border-b border-border px-0 py-3 text-[10px] tracking-widest uppercase focus:outline-none focus:border-foreground transition-colors"
            />
            <button className="text-[10px] tracking-[0.3em] uppercase border border-foreground/10 px-8 py-3 hover:bg-foreground hover:text-background transition-colors">
              Enviar
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
