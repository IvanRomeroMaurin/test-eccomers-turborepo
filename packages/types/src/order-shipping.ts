export interface OrderShipping {
  id: number;
  order_id: bigint;
  recipient_name: string;
  address_id: number;
  notes: string | null;
}
