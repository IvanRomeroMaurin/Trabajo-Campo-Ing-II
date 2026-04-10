'use client'

import { useRouter } from 'next/navigation'
import type { Category } from '../types/product.types'

interface CategoryFilterProps {
  categories: Category[]
  selected?: string
}

export function CategoryFilter({ categories, selected }: CategoryFilterProps) {
  const router = useRouter()

  const handleFilter = (slug?: string) => {
    if (slug) {
      router.push(`/products?category=${slug}`)
    } else {
      router.push('/products')
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-[10px] tracking-[0.2em] font-semibold uppercase text-foreground mb-6">
        Categorías
      </h3>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleFilter()}
          className={`text-left text-xs tracking-[0.1em] transition-all duration-300 flex items-center justify-between group ${
            !selected
              ? 'text-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <span className="relative">
            Todos
            <span className={`absolute -bottom-1 left-0 h-[1px] bg-foreground transition-all duration-300 ${!selected ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.slug)}
            className={`text-left text-xs tracking-[0.1em] transition-all duration-300 flex items-center justify-between group ${
              selected === cat.slug
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="relative">
              {cat.name}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-foreground transition-all duration-300 ${selected === cat.slug ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
