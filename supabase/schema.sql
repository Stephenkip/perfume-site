-- PROPOSED Supabase schema for the perfume storefront.
-- Run this in the Supabase SQL editor, then: supabase gen types typescript
-- Row Level Security is enabled on every table; browser (anon key) only reads
-- public catalog data and writes its own cart/order/subscription rows.

-- Enable extensions
create extension if not exists "pgcrypto";

-- Core catalog
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  concentration text,            -- e.g. 'Eau de Parfum', 'Travel Size', 'Gift Set'
  size_ml integer,
  price_cents integer not null,
  bestseller boolean default false,
  preorder boolean default false,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  alt_text text,
  position integer default 0,
  is_primary boolean default false
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  size_label text,               -- e.g. '30 ml', '10 ml travel', 'Discovery set'
  size_ml integer,
  price_cents integer,
  stock_qty integer default 0,
  active boolean default true
);

create table if not exists product_categories (
  product_id uuid references products(id) on delete cascade,
  category_id uuid references categories(id) on delete cascade,
  primary key (product_id, category_id)
);

-- Scent notes / glossary
create table if not exists scent_notes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  note_type text check (note_type in ('top','heart','base')),
  description text,
  icon_url text,
  active boolean default true
);

create table if not exists product_notes (
  product_id uuid references products(id) on delete cascade,
  note_id uuid references scent_notes(id) on delete cascade,
  note_type text check (note_type in ('top','heart','base')),
  primary key (product_id, note_id, note_type)
);

-- Reviews
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  author_name text,
  rating integer check (rating between 1 and 5),
  title text,
  body text,
  active boolean default true,
  created_at timestamptz default now()
);

-- Journal / articles
create table if not exists journal_articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text,
  cover_image text,
  author text,
  published_at timestamptz default now(),
  active boolean default true
);

-- Orders & checkout (created server-side via RPC)
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  status text default 'pending',
  total_cents integer not null,
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  variant_id uuid references product_variants(id),
  quantity integer not null default 1,
  price_cents integer not null
);

-- Cart persistence for logged-in users (guests use localStorage)
create table if not exists carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  updated_at timestamptz default now()
);

create table if not exists cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid references carts(id) on delete cascade,
  product_id uuid references products(id),
  variant_id uuid references product_variants(id),
  quantity integer not null default 1,
  unique (cart_id, product_id, variant_id)
);

-- Addresses & subscriptions (account area)
create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  label text,
  full_name text,
  line1 text,
  line2 text,
  city text,
  postal_code text,
  country text,
  created_at timestamptz default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid references products(id),
  variant_id uuid references product_variants(id),
  cadence text,                  -- e.g. 'monthly', 'quarterly'
  status text default 'active',  -- active, paused, cancelled
  next_charge_at timestamptz,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_products_slug on products(slug);
create index if not exists idx_products_active on products(active);
create index if not exists idx_product_images_product on product_images(product_id);
create index if not exists idx_product_variants_product on product_variants(product_id);
create index if not exists idx_reviews_product on reviews(product_id);
create index if not exists idx_reviews_active on reviews(active);
create index if not exists idx_journal_slug on journal_articles(slug);
create index if not exists idx_scent_notes_type on scent_notes(note_type);

-- Row Level Security
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;
alter table categories enable row level security;
alter table product_notes enable row level security;
alter table scent_notes enable row level security;
alter table reviews enable row level security;
alter table journal_articles enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table carts enable row level security;
alter table cart_items enable row level security;
alter table addresses enable row level security;
alter table subscriptions enable row level security;

-- Public read access to catalog
create policy "Public catalog read" on products for select using (active = true);
create policy "Public images read" on product_images for select using (true);
create policy "Public variants read" on product_variants for select using (active = true);
create policy "Public categories read" on categories for select using (true);
create policy "Public scent notes read" on scent_notes for select using (active = true);
create policy "Public product notes read" on product_notes for select using (true);
create policy "Public active reviews read" on reviews for select using (active = true);
create policy "Public active articles read" on journal_articles for select using (active = true);

-- Users manage their own data
create policy "Users read own orders" on orders for select using (auth.uid() = user_id);
create policy "Users read own order items" on order_items for select using (
  exists (select 1 from orders o where o.id = order_items.order_id and o.user_id = auth.uid())
);
create policy "Users own cart" on carts for all using (auth.uid() = user_id);
create policy "Users own cart items" on cart_items for all using (
  exists (select 1 from carts c where c.id = cart_items.cart_id and c.user_id = auth.uid())
);
create policy "Users own addresses" on addresses for all using (auth.uid() = user_id);
create policy "Users own subscriptions" on subscriptions for all using (auth.uid() = user_id);

grant usage on schema public to anon, authenticated;
grant select on products, product_images, product_variants, categories,
  scent_notes, product_notes, reviews, journal_articles
  to anon, authenticated;
grant select on orders, order_items to authenticated;
grant select, insert, update, delete on carts, cart_items, addresses, subscriptions
  to authenticated;

-- Guest and authenticated checkout can create pending orders using verified
-- catalog prices. This function does not process payment.
create or replace function public.create_order(
  items jsonb,
  email text
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_order_id uuid;
  v_total integer := 0;
  v_item record;
  v_product_id uuid;
  v_variant_id uuid;
  v_quantity integer;
  v_price integer;
begin
  if email is null or pg_catalog.length(pg_catalog.btrim(email)) > 320
     or email !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$' then
    raise exception 'A valid email address is required.';
  end if;

  if items is null
     or pg_catalog.jsonb_typeof(items) is distinct from 'array'
     or pg_catalog.jsonb_array_length(items) < 1
     or pg_catalog.jsonb_array_length(items) > 30 then
    raise exception 'The order must contain between 1 and 30 items.';
  end if;

  insert into public.orders (user_id, email, status, total_cents)
  values (auth.uid(), pg_catalog.btrim(email), 'pending', 0)
  returning id into v_order_id;

  for v_item in select value as item from pg_catalog.jsonb_array_elements(items)
  loop
    if pg_catalog.jsonb_typeof(v_item.item) <> 'object'
       or coalesce(v_item.item->>'product_id', '') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
       or coalesce(v_item.item->>'quantity', '') !~ '^(1[0-9]|20|[1-9])$'
       or (v_item.item ? 'variant_id'
           and v_item.item->>'variant_id' is not null
           and v_item.item->>'variant_id' <> ''
           and v_item.item->>'variant_id' !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$') then
      raise exception 'An order item is invalid.';
    end if;

    v_product_id := (v_item.item->>'product_id')::uuid;
    v_variant_id := nullif(v_item.item->>'variant_id', '')::uuid;
    v_quantity := (v_item.item->>'quantity')::integer;

    if v_quantity < 1 or v_quantity > 20 then
      raise exception 'Item quantities must be between 1 and 20.';
    end if;

    select price_cents into v_price
    from public.products
    where id = v_product_id and active = true
    for share;

    if not found then
      raise exception 'A product in this order is unavailable.';
    end if;

    if v_variant_id is not null then
      select coalesce(pv.price_cents, p.price_cents)
      into v_price
      from public.product_variants pv
      join public.products p on p.id = pv.product_id
      where pv.id = v_variant_id
        and pv.product_id = v_product_id
        and pv.active = true
        and p.active = true
        and (pv.stock_qty is null or pv.stock_qty >= v_quantity)
      for share of pv, p;

      if not found then
        raise exception 'A selected product variant is unavailable.';
      end if;
    end if;

    if v_price is null or v_price < 0 then
      raise exception 'A product in this order has an invalid price.';
    end if;

    insert into public.order_items (order_id, product_id, variant_id, quantity, price_cents)
    values (v_order_id, v_product_id, v_variant_id, v_quantity, v_price);

    v_total := v_total + v_price * v_quantity;
  end loop;

  update public.orders set total_cents = v_total where id = v_order_id;

  return pg_catalog.jsonb_build_object(
    'order_id', v_order_id::text,
    'status', 'pending',
    'total_cents', v_total
  );
end;
$$;

revoke all on function public.create_order(jsonb, text) from public;
grant execute on function public.create_order(jsonb, text) to anon, authenticated;

-- Revoke direct table access for anon, keep only policies above (default: no access)
