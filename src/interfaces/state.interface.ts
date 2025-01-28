import { Item } from "./Item.interface"

export interface State {
  cart: {
    cartItems: Item[]
  },
  items: {
    items: Item[],
    cacheItems: Item[],
    sortBy: SortBy | null,
    sortOrder: 0 | 1 | 2,
    filterText: string,
  }
}

export type SortBy = 'price' | 'rating' 