export type OrderItem = {
  quantity: number;
  price_cents: number | null;
  products: { name: string | null } | null;
};

export type OrderRow = {
  id: string;
  total_cents: number | null;
  status: string | null;
  created_at: string | null;
  order_items: OrderItem[];
};
