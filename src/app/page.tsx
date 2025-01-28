import { ItemComponent } from "@/components/common/item.component";

export default function Home() {
  return (
    <div className="px-[5%] md:px-[10%] lg:px-[10%] xl:px-[10%] bg-slate-300 h-screen grid grid-cols-12 grid-rows-[auto_1fr_auto]">
      <header className="grid-cols-12 gap-2 flex items-center justify-between w-full col-span-full bg-red-200 h-fit py-4">
        {/* logo */}
        <div className="bg-purple-100 w-[20%] h-10">
          this is my logo
        </div>

        {/* search and car */}
        <div className="flex items-center justify-end w-full ml-auto gap-3">
          {/* search */}
          <div className="bg-purple-300 col-span-3 w-[20%] h-10">
            search by
          </div>

          {/* car */}
          <div className="bg-purple-500 w-[10%] h-10">
            car
          </div>
        </div>
      </header>

      {/* Main Content (Takes Remaining Space) */}
      <main className="bg-green-200 flex flex-col gap-3 col-span-full max-h-full overflow-auto">
        {/* Image Presentation */}
        <div className="w-full h-[30%] bg-blue-400 rounded-xl">
        </div>

        {/* title && sort options */}
        <div className="flex justify-between items-center gap-3">
          <span>This is for your</span>

          <div className="h-10 bg-orange-300 w-[15%]">
            sort options
          </div>
        </div>

        {/* items */}
        <div className="bg-teal-300 w-full h-full flex-grow overflow-y-auto ">
          <ul className="w-full grid grid-cols-4 gap-3">
            {Array.from({ length: 50 }).map((_, index) => (
              <li key={index} >
                <ItemComponent />
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="col-span-full bg-gray-500 py-4">
        Footer Content
      </footer>
    </div>
  );
}
