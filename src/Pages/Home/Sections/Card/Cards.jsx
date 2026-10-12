import { HiOutlineArrowLongRight } from "react-icons/hi2";
import ProductCard from "../../../../Componets/ProductCard/ProductCard";
import CardsSkeletonList from "../../../../Componets/CardSelekton/SelektonList";

export default function Cards({ products=[] ,loading }) {
  return (
    <section className="bg-white dark:bg-gray-900 font-[Montserrat,sans-serif]">
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[20px] dark:text-white font-semibold text-neutral-900">
            Товары дешевле:
          </h2>
          <a
            href="#"
            className="group flex items-center gap-2 text-[13px] font-light text-neutral-400 dark:text-white transition-colors hover:text-[#E8382D]"
          >
            Посмотреть все
            <HiOutlineArrowLongRight className="h-7 w-7 transition-transform group-hover:translate-x-1.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {
          loading  ? <CardsSkeletonList/>:
          
          products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}