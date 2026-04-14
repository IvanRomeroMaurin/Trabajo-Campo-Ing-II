import { AttributeValue } from './attribute-value';

export interface ProductVariant {
  id: number;
  product_id: number;
  sku: string | null;
  price_modifier: number | null;
  stock: number;
  is_active: boolean | null;
  created_at?: Date | string | null;
  attributes?: AttributeValue[];
}

export interface VariantAttribute {
  variant_id: number;
  attribute_value_id: number;
}
