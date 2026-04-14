export interface Product {
  id: number
  name: string
  price: number
  image?: string | null
  description?: string | null
  category_id: number
  created_at?: string | Date | null
  is_active: boolean
}
