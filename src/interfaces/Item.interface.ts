export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
}

export interface ItemResponse {
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
  data: Item[]
}