export interface Payment {
  id: number;
  order_id: bigint;
  method_id: number;
  status_id: number;
  external_id: string | null;
  amount: number; // Decimal mapped to number
  created_at: Date | null;
  is_active: boolean;
}
