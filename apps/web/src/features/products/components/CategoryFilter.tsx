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
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleFilter()}
        className={`text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${
          !selected
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleFilter(cat.slug)}
          className={`text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${
            selected === cat.slug
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
