import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Section 1: Hero Heritage */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/about/hero.png"
          alt="Brand Heritage"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="relative z-10 text-center space-y-8 px-6 max-w-5xl">
          <div className="space-y-4">
            <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/60 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Nuestra Herencia
            </p>
            <h1 className="text-5xl md:text-9xl font-extralight tracking-tighter text-white leading-none animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              EL ARTE DE LA <br /> <span className="italic font-light">PERMANENCIA</span>
            </h1>
          </div>
          <p className="text-sm md:text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            En un mundo de lo efímero, elegimos lo perdurable. MiTienda nació de la necesidad de volver a lo esencial: la calidad sin concesiones y la belleza en la simplicidad.
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
           <div className="w-[1px] h-16 bg-white" />
        </div>
      </section>

      {/* Section 2: Craftsmanship Detail */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative h-[600px] w-full overflow-hidden group">
            <Image
              src="/about/craft.png"
              alt="Craftsmanship"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </div>
          <div className="space-y-8">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">La Filosofía</p>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight leading-tight">
              Honramos cada detalle, por invisible que parezca.
            </h2>
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                Creemos que el lujo reside en la funcionalidad y la integridad de los materiales. Nuestra selección es el resultado de una búsqueda constante de la materia prima perfecta, tratada con el respeto que merece la artesanía pura.
              </p>
              <p>
                No seguimos tendencias. Creamos piezas que se sienten contemporáneas hoy y fundamentales dentro de una década. Cada costura, cada acabado es un compromiso con tu estilo y con el planeta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Vision/Philosophy Grid */}
      <section className="bg-accent/30 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h3 className="text-[10px] tracking-[0.3em] font-semibold uppercase">Calidad Radical</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Trabajamos exclusivamente con proveedores que comparten nuestra visión de excelencia ética y técnica.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[10px] tracking-[0.3em] font-semibold uppercase">Diseño Atemporal</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Nuestras líneas son limpias, nuestros colores sobrios. Un uniforme para la vida moderna.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[10px] tracking-[0.3em] font-semibold uppercase">Futuro Sostenible</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Menos cantidad, mayor longevidad. Ese es nuestro manifiesto contra la cultura del descarte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Studio Aesthetic */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/about/studio.png"
          alt="Showroom Aesthetic"
          fill
          className="object-cover brightness-[0.6]"
        />
        <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl">
           <h2 className="text-3xl md:text-5xl font-extralight tracking-tighter text-white italic leading-tight">
             "Buscamos la armonía entre el espacio, el objeto y quien lo habita."
           </h2>
           <div className="pt-8">
             <Link
               href="/products"
               className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-white border-b border-white/40 pb-2 hover:border-white transition-all group"
             >
               Explorar Colección
               <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </Link>
           </div>
        </div>
      </section>

      {/* Footer Space padding */}
      <div className="h-20" />
    </div>
  )
}
