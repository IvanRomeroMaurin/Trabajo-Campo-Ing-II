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
      <section className="relative h-[calc(100vh-5rem)] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/hero_gentleman.png"
          alt="Alexandria Gentleman Hero"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.6]"
          style={{ objectPosition: 'center 25%' }}
          priority
        />
        {/* Dark Overlay for Legibility */}
        <div className="absolute inset-0 bg-black/30 z-[5]" />
        
        <div className="relative z-10 text-center space-y-10 px-6 max-w-5xl">
          <div className="space-y-4">
            <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-white/90 drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Colección Sartorial 2026
            </p>
            <h1 className="text-5xl md:text-9xl font-extralight tracking-tighter text-white drop-shadow-2xl leading-[0.85] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 uppercase">
              LA ESTÉTICA <br /> <span className="italic font-light">DEL CABALLERO</span>
            </h1>
          </div>
          <p className="text-sm md:text-lg text-white/80 max-w-xl mx-auto font-light leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            Piezas de autor diseñadas para el hombre que valora la distinción, la sobriedad y la calidad impecable. Un legado de elegancia atemporal.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <Link
              href="/products"
              className="group text-[10px] tracking-[0.4em] uppercase bg-white text-black px-12 py-5 hover:bg-black hover:text-white transition-all duration-500 flex items-center gap-3"
            >
              Explorar Colección
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </div>
        </div>
        
        {/* Subtle Bottom Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-[6]" />
      </section>

      {/* Brand Values */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-border/40 pb-24">
          <div className="flex flex-col items-center text-center space-y-6">
            <h3 className="text-[10px] tracking-[0.4em] font-semibold uppercase text-foreground">Distinción Ética</h3>
            <p className="text-[11px] text-muted-foreground font-light px-8 leading-relaxed">
              Materiales nobles seleccionados bajo los más altos estándares de excelencia técnica y responsabilidad.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-6">
            <h3 className="text-[10px] tracking-[0.4em] font-semibold uppercase text-foreground">Artesanía de Autor</h3>
            <p className="text-[11px] text-muted-foreground font-light px-8 leading-relaxed">
              Cada pieza es un manifiesto de sobriedad, confeccionada con el rigor que exige el guardarropa masculino.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-6">
            <h3 className="text-[10px] tracking-[0.4em] font-semibold uppercase text-foreground">Legado Atemporal</h3>
            <p className="text-[11px] text-muted-foreground font-light px-8 leading-relaxed">
              No diseñamos para una temporada, sino para una vida. Elegancia que trasciende lo efímero.
            </p>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="space-y-3">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-light">Líneas Maestras</p>
          <h2 className="text-4xl font-extralight tracking-tight uppercase">Curaduría Selecta</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-[700px]">
          <Link href="/products?category=remeras" className="relative group overflow-hidden">
            <Image
              src="/cat_sartorial.png"
              alt="Sartorial Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110 brightness-75"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
            <div className="absolute bottom-12 left-12 space-y-3">
              <h3 className="text-white text-3xl font-light tracking-wide uppercase">SARTORIAL</h3>
              <p className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-light">Diseño de Autor & Estructura</p>
              <div className="pt-6 overflow-hidden">
                <span className="text-white text-[10px] tracking-[0.4em] uppercase border-b border-white/40 pb-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-700 inline-block">
                  Ver Colección
                </span>
              </div>
            </div>
          </Link>

          <Link href="/products?category=calzado" className="relative group overflow-hidden">
            <Image
              src="/cat_perfumery.png"
              alt="Perfumería Fina"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110 brightness-75"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
            <div className="absolute bottom-12 left-12 space-y-3">
              <h3 className="text-white text-3xl font-light tracking-wide uppercase">ESENCIA</h3>
              <p className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-light">Alta Perfumería Masculina</p>
              <div className="pt-6 overflow-hidden">
                <span className="text-white text-[10px] tracking-[0.4em] uppercase border-b border-white/40 pb-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-700 inline-block">
                  Descubrir Fragancias
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
