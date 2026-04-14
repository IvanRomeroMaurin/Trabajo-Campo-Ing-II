export interface Category {
  id: number
  name: string
  slug: string
  description?: string | null
  created_at?: string | Date | null
  is_active: boolean
}
