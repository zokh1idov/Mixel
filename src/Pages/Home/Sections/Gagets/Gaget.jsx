import { HiOutlineArrowLongRight } from "react-icons/hi2";
import ProductCard from "../../../../Componets/ProductCard/ProductCard";
import CardSkeleton from "../../../../Componets/CardSelekton/CardSelekton";

export default function Gaget({ products,loading }) {
  return (
    <section className="bg-white dark:bg-gray-900 font-[Montserrat,sans-serif] ">
      <div className="mx-auto max-w-[1200px] px-4 py-18 ">
        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-[20px] text-black dark:text-white font-semibold text-neutral-900">
            Горящие предложения
          </h2>
          <a
            href="#"
            className="group flex items-center gap-2 text-[13px] font-light text-neutral-400 dark:text-gray-300 transition-colors hover:text-[#E8382D] dark:hover:text-[#E8382D]"
          >
            Посмотреть все
            <HiOutlineArrowLongRight className="h-7 w-7 transition-transform group-hover:translate-x-1.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {loading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton /> 
              <CardSkeleton />
              <CardSkeleton />

            </>
          ) : (
            products.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </div>
    </section>
  );
}
