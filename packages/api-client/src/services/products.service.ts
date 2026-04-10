import { apiFetch } from '../client'
import type { components } from '../types/api'

type Product = components['schemas']['Product']

export const productsService = {
  getAll: (categorySlug?: string) =>
    apiFetch<Product[]>(
      categorySlug
        ? `/api/products?category=${categorySlug}`
        : '/api/products'
    ),

  getById: (id: number) =>
    apiFetch<Product>(`/api/products/${id}`),
}
