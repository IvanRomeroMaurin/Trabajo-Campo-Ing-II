export interface Review {
  id: number;
  product_id: number;
  user_id: string; // UUID
  rating: number;
  comment: string | null;
  created_at: Date | null;
  is_active: boolean;
}
