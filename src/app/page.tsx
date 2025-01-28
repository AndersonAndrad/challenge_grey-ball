import { ArrowDownUp, ArrowUpDown, DollarSign, Footprints, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ItemComponent } from "@/components/common/item.component";
import { items } from "@/mock/items.mock";

export default function Home() {
  const iconSort = (sorting: boolean) => {
    return sorting ? <ArrowUpDown /> : <ArrowDownUp />
  }

  return (
    <div className="px-[5%] md:px-[10%] lg:px-[10%] xl:px-[10%] h-screen grid grid-cols-12 grid-rows-[auto_1fr_auto]">
      <header className="grid-cols-12 gap-2 flex items-center justify-between w-full col-span-full h-fit py-4">
        {/* logo */}
        <div className=" w-[20%] h-10 flex items-center gap-3">
          <Footprints />
          <span className="font-bold text-2xl">ShoeShop</span>
        </div>

        {/* search and car */}
        <div className="flex items-center justify-end w-full ml-auto gap-3">
          {/* search */}
          <Input placeholder="Search by name" className="max-w-[30%]" />

          {/* car */}
          <Button variant='secondary'><ShoppingCart /></Button>
        </div>
      </header>

      {/* Main Content (Takes Remaining Space) */}
      <main className="flex flex-col gap-3 col-span-full max-h-full overflow-auto">
        {/* Image Presentation */}
        <div className="w-full h-[30%] rounded-xl overflow-hidden">
          <img
            src="https://picsum.photos/200"
            alt="Random Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* title && sort options */}
        <div className="flex justify-between items-center gap-3">
          <span className="text-xl">Your perfect pair, just a step away</span>

          <div className="h-10 flex items-center gap-3">
            <span>Sort by:</span>
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
          <ul className="w-full grid grid-cols-4 gap-3">
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
