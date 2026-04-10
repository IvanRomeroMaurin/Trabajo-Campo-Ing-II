import Link from 'next/link'
import { createClient } from '@/shared/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-32 gap-8 max-w-4xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-muted-foreground">
        Nueva colección
      </p>
      <h1 className="text-6xl md:text-8xl font-light tracking-tight text-foreground leading-none">
        MiTienda
      </h1>
      <p className="text-base text-muted-foreground max-w-md font-light leading-relaxed">
        Diseño minimalista. Calidad superior. Encontrá lo que buscás.
      </p>
      <div className="flex gap-4 mt-4">
        {user ? (
          <Link
            href="/products"
            className="text-xs tracking-widest uppercase bg-primary text-primary-foreground px-8 py-3 hover:opacity-90 transition-opacity"
          >
            Ver colección
          </Link>
        ) : (
          <>
            <Link
              href="/register"
              className="text-xs tracking-widest uppercase bg-primary text-primary-foreground px-8 py-3 hover:opacity-90 transition-opacity"
            >
              Empezar ahora
            </Link>
            <Link
              href="/login"
              className="text-xs tracking-widest uppercase border border-border text-foreground px-8 py-3 hover:bg-accent transition-colors"
            >
              Iniciar sesión
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
