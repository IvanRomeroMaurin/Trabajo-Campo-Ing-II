export interface Order {
  id: bigint;
  user_id: string | null; // UUID
  total: number; // Decimal mapped to number
  created_at: Date | null;
  status_id: number;
  is_active: boolean;
}
