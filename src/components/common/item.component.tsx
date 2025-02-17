'use client';

import { ShoppingCart, Star } from "lucide-react";

import { Button } from "../ui/button";
import { Item } from "@/interfaces/Item.interface";
import { addItem } from "@/redux/cart.state";
import { formatCurrency } from "@/utils/currency.util";
import { truncate } from "@/utils/str.util";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";

interface ItemProps {
  item: Item;
}

export function ItemComponent(props: ItemProps) {
  const { item } = props;

  const { toast } = useToast()

  const dispatch = useDispatch();

  const handleAddItemToCart = () => {
    dispatch(addItem(item));
    toast({
      title: `Added in the cart: ${item.title}`
    })
  }

  return (
    <div className="bg-gray-100 shadow-lg h-fit rounded-xl p-3 flex flex-col gap-2">
      <span className="text-base">{item.title}</span>
      <img src={item.image} alt="Random Image" className="max-h-[250px] w-full h-full object-cover" />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="flex items-center text-sm gap-2"> <Star className="h-4 w-4" /> {item.rating}/10 </span>
          <Button variant='default' onClick={() => handleAddItemToCart()}><ShoppingCart /> </Button>
        </div>
        <div className="flex justify-between items-center gap-4">
          <span className="text-xs">{truncate(item.description, 100)}</span>
          <span>{formatCurrency(item.price, item.currency)}</span>
        </div>
      </div>
    </div>
  )
}