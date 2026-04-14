export interface Address {
  id: number;
  user_id: string; // UUID
  address_line: string;
  city_id: number;
  postal_code_id: number;
  is_default: boolean | null;
  is_active: boolean;
}
