export interface Product {
  id: number;
  name: string;
  price: number; // Decimal mapped to number
  image: string | null;
  description: string | null;
  created_at: Date | null;
}
