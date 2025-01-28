'use client';

import { ArrowDownUp, ArrowUpDown, DollarSign, Footprints, ShoppingCart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Item } from "@/interfaces/Item.interface";
import { ItemComponent } from "@/components/common/item.component";
import { addItem } from "@/redux/items.state";
import axios from "axios";
import { formatCurrency } from "@/utils/currency.util";

export default function Home() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const cartItems: Item[] = useSelector(state => (state as any).cart.cartItems);

  const items: Item[] = useSelector(state => (state as any).items.items);

  const fetchData = async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/items?_page=${page}&_per_page=10`);
      const newItems: Item[] = response?.data?.data ?? [];

      if (response?.data?.next === null) setHasMore(false);

      if (newItems.length > 0) {
        newItems.forEach((item) => {
          dispatch(addItem(item));
        });

        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    fetchData()
  }, [false]);

  useEffect(() => {
    const element = document.querySelector('.listItems > div.w-full.h-full.overflow-y-auto');

    if (!element) return;

    const timeoutId: NodeJS.Timeout | null = null;

    const listenScroll = () => {
      if (loading) return;

      const { scrollTop, scrollHeight, clientHeight } = element;
      const SCROLL_CLOSE_BOTTOM = scrollHeight - scrollTop - clientHeight < 100;

      if (SCROLL_CLOSE_BOTTOM) {
        setLoading(true);
        setTimeout(() => fetchData(), 100);
      }
    };

    element.addEventListener('scroll', listenScroll);

    return () => {
      element.removeEventListener('scroll', listenScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading]);



  const iconSort = (sorting: boolean) => {
    return sorting ? <ArrowUpDown /> : <ArrowDownUp />
  }

  const sumAllItems = (): number => {
    return (cartItems ?? []).reduce((acc, curr) => acc + curr.price, 0)
  }

  return (
    <div className="px-[5%] md:px-[10%] lg:px-[10%] xl:px-[10%] h-screen grid grid-cols-12 grid-rows-[auto_1fr_auto]">
      <header className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between gap-2  w-full col-span-full h-fit py-4">
        {/* logo */}
        <div className="w-full h-10 flex items-center gap-3">
          <Footprints />
          <span className="font-bold text-2xl">ShoeShop</span>
        </div>

        {/* search and car */}
        <div className="flex items-center justify-end w-full ml-auto gap-3">
          {/* search */}
          <Input placeholder="Search by name" className="w-full xl:max-w-[50%]" />

          {/* car */}
          <Button variant='secondary'><ShoppingCart />{cartItems?.length ?? 0} | {formatCurrency(sumAllItems())}</Button>
        </div>
      </header>

      {/* Main Content (Takes Remaining Space) */}
      <main className="listItems flex flex-col gap-3 col-span-full max-h-full overflow-auto">
        {/* Image Presentation */}
        <div className="w-full h-[30%] rounded-xl overflow-hidden">
          <img
            src="https://picsum.photos/200"
            alt="Random Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* title && sort options */}
        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-between items-center gap-3">
          <span className="sm:text-sm md:text-md lg:text-lg xl:text-xl">Your perfect pair, just a step away</span>

          <div className="h-10 flex items-center gap-3">
            <span className="sm:text-xs md:text-sm lg:text-md xl:text-lg">Sort by:</span>
            <Button variant='secondary'>
              <DollarSign />
              Price
              {iconSort(false)}
            </Button>

            <Button variant='secondary'>
              <Star />
              Raiting
              {iconSort(true)}
            </Button>
          </div>
        </div>

        {/* items */}
        <div className="w-full h-full flex-grow overflow-y-auto ">
          <ul className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-3">
            {items.map((item) => (
              <li key={item.id} >
                <ItemComponent item={item} />
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="col-span-full  py-4">
        <div className="flex items-center gap-3">
          <Footprints />
          <span className="font-bold text-2xl">ShoeShop</span>
        </div>
      </footer>
    </div>
  );
}