import { ShoppingCart, Star } from "lucide-react";

import { Button } from "../ui/button";
import { Item } from "@/interfaces/Item.interface";
import { formatCurrency } from "@/utils/currency.util";
import { truncate } from "@/utils/str.util";

interface ItemProps {
  item: Item;
}

export function ItemComponent(props: ItemProps) {
  const { item } = props;

  return (
    <div className="bg-gray-100 shadow-lg h-fit rounded-xl p-3 flex flex-col gap-2">
      <span className="text-base">{item.title}</span>
      <img src="https://picsum.photos/200" alt="Random Image" />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="flex items-center text-sm gap-2"> <Star className="h-4 w-4" /> {item.rating}/10 </span>
          <Button variant='default'><ShoppingCart /> </Button>
        </div>
        <div className="flex justify-between items-center gap-4">
          <span className="text-xs">{truncate(item.description, 100)}</span>
          <span>{formatCurrency(item.price, item.currency)}</span>
        </div>
      </div>
    </div>
  )
}