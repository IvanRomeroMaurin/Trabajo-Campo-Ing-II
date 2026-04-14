export interface AttributeType {
  id: number;
  name: string;
  slug: string;
  applies_to: string;
  created_at?: Date | string | null;
  is_active: boolean
}
