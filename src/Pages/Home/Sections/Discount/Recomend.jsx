import {
  FiArrowRight,
} from "react-icons/fi";
import ProductCard from "../../../../Componets/ProductCard/ProductCard";
import CardsSkeletonList from "../../../../Componets/CardSelekton/SelektonList";


export default function Recomend({ products = [], loading }) {
  return (
    <div className="Recomend bg-white py-6 dark:bg-gray-900 md:py-8">
      <div className="container_1200 px-4">
        <div className="mb-5 flex items-center justify-between md:mb-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white md:text-2xl">
            Рекомендуем
          </h2>
          <a
            href="#"
            className="group flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-red-500 dark:text-white"
          >
            Посмотреть все
            <FiArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-5">
          <div className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-[#e52e30] to-[#c92a2c] p-5 text-white shadow-sm transition-shadow duration-300 hover:shadow-xl lg:min-h-[580px] lg:flex-col lg:justify-center lg:gap-8 lg:p-8 lg:text-center">
            <div className="flex items-center gap-3 lg:flex-col lg:gap-5">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-3xl font-black lg:h-24 lg:w-24 lg:text-6xl">
                %
              </span>
              <span className="text-xl font-black uppercase tracking-wider lg:text-2xl">
                Ликвидация
              </span>
            </div>
            <div className="flex shrink-0 items-baseline gap-1 rounded-xl bg-white px-4 py-2 font-black text-[#d9383a] lg:px-6 lg:py-3">
              <span className="text-sm font-medium">до</span>
              <span className="text-3xl leading-none lg:text-4xl">45%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:col-span-4 lg:gap-4">
            {
            loading ? <CardsSkeletonList/>:
            
            products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
