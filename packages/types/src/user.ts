export interface User {
  id: string;           // uuid, FK a auth.users
  email: string;
  name?: string | null;
  phone?: string | null;
  createdAt?: string | Date | null;
  is_active: boolean;
}
