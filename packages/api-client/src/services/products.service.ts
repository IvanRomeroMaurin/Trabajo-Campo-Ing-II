import { apiFetch } from '../client'
import type { components } from '../types/api'

type Product = components['schemas']['Product']

export const productsService = {
  getAll: () =>
    apiFetch<Product[]>('/api/products'),

  getById: (id: number) =>
    apiFetch<Product>(`/api/products/${id}`),
}
