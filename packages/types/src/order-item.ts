export interface OrderItem {
  id: number;
  order_id: bigint;
  product_id: number | null;
  quantity: number;
  price: number; // Decimal mapped to number
  size: string | null;
}
