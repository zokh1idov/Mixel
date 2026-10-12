import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { getBrands } from "../../../../Sevices/App";

export function Brands() {
  const [brands, setBrands] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    getBrands().then((result) => {
      setBrands(result?.results ?? []);
    });
  }, []);

  const scroll = (dir) => {
    listRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  return (
    <div className="Brands bg-white py-8 transition-colors dark:bg-gray-900 md:py-12">
      <div className="container_1200 px-4">
        {/* Sarlavha va Navigatsiya tugmalari */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white md:text-[24px]">
            Бренды
          </h2>
          <div className="flex items-center gap-3 text-neutral-400 dark:text-gray-300">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Назад"
              className="rounded-lg p-1.5 transition-all hover:bg-neutral-100 hover:text-black active:scale-95 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <LuMoveLeft className="h-6 w-6 md:h-7 md:w-7" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Вперёд"
              className="rounded-lg p-1.5 transition-all hover:bg-neutral-100 hover:text-black active:scale-95 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <LuMoveRight className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          </div>
        </div>

        {/* Brandlar ro'yxati (Scrollable container) */}
        <div
          ref={listRef}
          className="flex items-center gap-3 overflow-x-auto py-8 md:py-12 lg:justify-between
                     [-ms-overflow-style:none] [scrollbar-width:none]
                     [&::-webkit-scrollbar]:hidden"
        >
          {brands.slice(0, 5).map((brand) => (
            <div
              key={brand.id}
              className="flex h-[90px] w-[160px] shrink-0 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:border-red-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:shadow-gray-950/50 md:h-[110px] md:w-[223px]"
            >
              <img
                src={brand.image}
                alt={brand.name || "Brand logo"}
                loading="lazy"
                className="max-h-[60px] w-full object-contain transition-transform duration-300 hover:scale-105 dark:brightness-95 md:max-h-[70px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
