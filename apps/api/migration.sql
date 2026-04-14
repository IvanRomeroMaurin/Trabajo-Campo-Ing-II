-- ================================================
-- PASO 1: Crear tablas nuevas
-- ================================================

-- Tipos de atributo (talle_ropa, numero_calzado, volumen, etc.)
CREATE TABLE IF NOT EXISTS public.attribute_types (
  id          integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  name        text NOT NULL UNIQUE,
  slug        text NOT NULL UNIQUE,
  applies_to  text NOT NULL DEFAULT 'all',
  -- 'all' | 'clothing' | 'footwear' | 'fragrance' | 'accessory'
  created_at  timestamp with time zone DEFAULT now(),
  CONSTRAINT attribute_types_pkey PRIMARY KEY (id)
);

-- Valores de atributo (S, M, L, XL, 38, 39, 30ml, etc.)
CREATE TABLE IF NOT EXISTS public.attribute_values (
  id                  integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  attribute_type_id   integer NOT NULL,
  value               text NOT NULL,
  display_order       integer DEFAULT 0,
  CONSTRAINT attribute_values_pkey PRIMARY KEY (id),
  CONSTRAINT attribute_values_type_fkey
    FOREIGN KEY (attribute_type_id)
    REFERENCES public.attribute_types(id)
    ON DELETE CASCADE,
  CONSTRAINT attribute_values_unique
    UNIQUE (attribute_type_id, value)
);

-- Variantes de producto (cada combinación única de atributos)
CREATE TABLE IF NOT EXISTS public.product_variants (
  id              integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  product_id      integer NOT NULL,
  sku             text UNIQUE,
  price_modifier  numeric DEFAULT 0,
  stock           integer NOT NULL DEFAULT 0,
  is_active       boolean DEFAULT true,
  created_at      timestamp with time zone DEFAULT now(),
  CONSTRAINT product_variants_pkey PRIMARY KEY (id),
  CONSTRAINT product_variants_product_fkey
    FOREIGN KEY (product_id)
    REFERENCES public.products(id)
    ON DELETE CASCADE
);

-- Atributos de cada variante
CREATE TABLE IF NOT EXISTS public.variant_attributes (
  variant_id          integer NOT NULL,
  attribute_value_id  integer NOT NULL,
  CONSTRAINT variant_attributes_pkey
    PRIMARY KEY (variant_id, attribute_value_id),
  CONSTRAINT variant_attributes_variant_fkey
    FOREIGN KEY (variant_id)
    REFERENCES public.product_variants(id)
    ON DELETE CASCADE,
  CONSTRAINT variant_attributes_value_fkey
    FOREIGN KEY (attribute_value_id)
    REFERENCES public.attribute_values(id)
    ON DELETE CASCADE
);

-- ================================================
-- PASO 2: Insertar datos base de attribute_types
-- ================================================

INSERT INTO public.attribute_types (name, slug, applies_to)
VALUES
  ('Talle Ropa',      'talle_ropa',      'clothing'),
  ('Número Calzado',  'numero_calzado',  'footwear'),
  ('Volumen',         'volumen',         'fragrance'),
  ('Concentración',   'concentracion',   'fragrance'),
  ('Talle Accesorio', 'talle_accesorio', 'accessory')
ON CONFLICT (slug) DO NOTHING;

-- ================================================
-- PASO 3: Insertar valores base por tipo
-- ================================================

-- Talles de ropa
INSERT INTO public.attribute_values (attribute_type_id, value, display_order)
SELECT id, v.value, v.ord FROM public.attribute_types,
(VALUES ('XS',1),('S',2),('M',3),('L',4),('XL',5),('XXL',6)) AS v(value, ord)
WHERE slug = 'talle_ropa'
ON CONFLICT (attribute_type_id, value) DO NOTHING;

-- Números de calzado
INSERT INTO public.attribute_values (attribute_type_id, value, display_order)
SELECT id, v.value, v.ord FROM public.attribute_types,
(VALUES ('35',1),('36',2),('37',3),('38',4),('39',5),
        ('40',6),('41',7),('42',8),('43',9),('44',10),('45',11)) AS v(value, ord)
WHERE slug = 'numero_calzado'
ON CONFLICT (attribute_type_id, value) DO NOTHING;

-- Volúmenes de perfume
INSERT INTO public.attribute_values (attribute_type_id, value, display_order)
SELECT id, v.value, v.ord FROM public.attribute_types,
(VALUES ('30ml',1),('50ml',2),('75ml',3),('100ml',4),('150ml',5)) AS v(value, ord)
WHERE slug = 'volumen'
ON CONFLICT (attribute_type_id, value) DO NOTHING;

-- Concentración de perfume
INSERT INTO public.attribute_values (attribute_type_id, value, display_order)
SELECT id, v.value, v.ord FROM public.attribute_types,
(VALUES ('EDT',1),('EDP',2),('Parfum',3),('Colonia',4)) AS v(value, ord)
WHERE slug = 'concentracion'
ON CONFLICT (attribute_type_id, value) DO NOTHING;

-- Talles de accesorios
INSERT INTO public.attribute_values (attribute_type_id, value, display_order)
SELECT id, v.value, v.ord FROM public.attribute_types,
(VALUES ('Único',1),('S',2),('M',3),('L',4)) AS v(value, ord)
WHERE slug = 'talle_accesorio'
ON CONFLICT (attribute_type_id, value) DO NOTHING;

-- ================================================
-- PASO 4: Migrar product_stocks a product_variants
-- ================================================

-- Insertar variantes desde product_stocks existentes
INSERT INTO public.product_variants (product_id, sku, stock)
SELECT
  product_id,
  'SKU-' || product_id || '-' || UPPER(size),
  quantity
FROM public.product_stocks
ON CONFLICT (sku) DO NOTHING;

-- Insertar variant_attributes para cada variante migrada
-- (vincula con talle_ropa por defecto para los existentes)
INSERT INTO public.variant_attributes (variant_id, attribute_value_id)
SELECT
  pv.id,
  av.id
FROM public.product_variants pv
JOIN public.product_stocks ps
  ON ps.product_id = pv.product_id
  AND pv.sku = 'SKU-' || ps.product_id || '-' || UPPER(ps.size)
JOIN public.attribute_values av
  ON av.value = ps.size
JOIN public.attribute_types at_type
  ON at_type.id = av.attribute_type_id
  AND at_type.slug = 'talle_ropa'
WHERE EXISTS (
  SELECT 1 FROM public.attribute_values av2
  JOIN public.attribute_types at2 ON at2.id = av2.attribute_type_id
  WHERE av2.value = ps.size AND at2.slug = 'talle_ropa'
)
ON CONFLICT DO NOTHING;

-- ================================================
-- PASO 5: Actualizar order_items
-- ================================================

-- Agregar columna product_variant_id
ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS product_variant_id integer,
  ADD CONSTRAINT order_items_variant_fkey
    FOREIGN KEY (product_variant_id)
    REFERENCES public.product_variants(id)
    ON DELETE SET NULL;

-- Migrar datos: vincular order_items existentes con variantes
UPDATE public.order_items oi
SET product_variant_id = pv.id
FROM public.product_variants pv
WHERE pv.product_id = oi.product_id
  AND pv.sku = 'SKU-' || oi.product_id || '-' || UPPER(COALESCE(oi.size, ''));

-- ================================================
-- PASO 6: Eliminar product_stocks
-- (Confirmado por el usuario)
-- ================================================

DROP TABLE IF EXISTS public.product_stocks CASCADE;

-- Eliminar columna size de order_items (reemplazada por variant)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='order_items' AND column_name='size') THEN
        ALTER TABLE public.order_items DROP COLUMN size;
    END IF;
END $$;
