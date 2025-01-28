import { Item } from "@/interfaces/Item.interface";

export const items = Array.from({ length: 100 }).map<Item>((_, index) => ({
  id: index.toString(),
  currency: 'USD',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
  image: 'https://source.unsplash.com/random',
  price: Math.floor(Math.random() * 1000),
  rating: Math.floor(Math.random() * 5),
  title: `Item ${index}`,
}));