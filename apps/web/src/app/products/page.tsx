import { productsService, categoriesService } from '@repo/api-client'
import { ProductGrid } from '@/features/products/components/ProductGrid'
import { CategoryFilter } from '@/features/products/components/CategoryFilter'
import { Breadcrumb } from 'lucide-react' // Temporary placeholder for icon if needed

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams

  const [products, categories] = await Promise.all([
    productsService.getAll(category),
    categoriesService.getAll(),
  ])

  const currentCategoryName = category 
    ? categories.find(c => c.slug === category)?.name 
    : 'Colección Completa'

  return (
    <div className="pb-20">
      {/* Catalog Header */}
      <header className="border-b border-border/40 bg-accent/5">
        <div className="max-w-7xl mx-auto px-6 py-20 translate-y-4 animate-in fade-in duration-700">
          <div className="space-y-4">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-light">
              Catálogo / {category ? 'Categoría' : 'Todos'}
            </p>
            <h1 className="text-4xl md:text-6xl font-extralight tracking-tighter text-foreground uppercase">
              {currentCategoryName}
            </h1>
            <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 transition-opacity">
              <span>{products.length} {products.length === 1 ? 'Pieza' : 'Piezas'} seleccionadas</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content: Sidebar + Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-16">
          
          {/* Sidebar Filters */}
          <aside className="w-full md:w-48 flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-1000">
            <div className="sticky top-32">
              <CategoryFilter categories={categories} selected={category} />
              
              {/* Optional: Add more filters here later (Price, Color, etc.) */}
              <div className="mt-12 pt-12 border-t border-border/40">
                <h3 className="text-[10px] tracking-[0.2em] font-semibold uppercase text-foreground mb-6">
                  Ordenar
                </h3>
                <div className="flex flex-col gap-4">
                   <button className="text-left text-xs text-muted-foreground hover:text-foreground tracking-wide transition-colors">Novedad</button>
                   <button className="text-left text-xs text-muted-foreground hover:text-foreground tracking-wide transition-colors">Precio: Bajo a Alto</button>
                   <button className="text-left text-xs text-muted-foreground hover:text-foreground tracking-wide transition-colors">Precio: Alto a Bajo</button>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Listing */}
          <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-sm font-light text-muted-foreground italic">No se encontraron piezas en esta selección.</p>
                <Link href="/products" className="text-[10px] tracking-[0.3em] uppercase border-b border-foreground pb-1">
                  Volver al catálogo completo
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

import Link from 'next/link'
