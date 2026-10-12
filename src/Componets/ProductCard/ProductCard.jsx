import { MdShoppingCart, MdFavorite } from "react-icons/md";
import { LuScale } from "react-icons/lu";
import { Link } from "react-router-dom";

const card =
  "group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200 dark:border-gray-700 bg-white text-center transition-all duration-300 dark:bg-gray-900 before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-[3px] before:origin-left before:scale-x-0 before:bg-gradient-to-r before:from-[#E8382D] before:to-orange-400 before:transition-transform before:duration-500 hover:border-[#E8382D]/40 hover:shadow-[0_22px_44px_-14px_rgba(232,56,45,0.45)] hover:before:scale-x-100 motion-safe:hover:-translate-y-1.5";

export default function ProductCard({ product }) {
  return (
    <article className={card} id="">
      <Link to={`/deteil/${product.id}`} className="contents">
        <div className="mx-3 mt-3 flex h-[132px] items-center justify-center rounded-lg dark:bg-white transition-colors duration-300 group-hover:bg-red-50">
          <img
            src={product.main_image}
            alt={product.name}
            loading="lazy"
            className="h-[110px] w-full object-contain mix-blend-multiply transition-transform duration-500 motion-safe:group-hover:scale-110"
          />
        </div>

        <p className="mt-6 text-[15px] font-semibold text-[#E8382D] dark:text-red-600">
          {product.price} сум/мес
        </p>
        <p className="mt-1 text-[12px] text-neutral-400">{product.oldPrice}</p>

        <h3 className="mt-4 min-h-[44px] px-2 text-[13px] font-bold leading-[22px] dark:text-white text-black">
          {product.name}
          <br />
        </h3>
      </Link>
      <div className="mt-5 flex border-t dark:border-gray-700 border-neutral-200">
        <button
          type="button"
          aria-label="В корзину"
          className="flex flex-1 justify-center py-4 text-neutral-400 transition-colors duration-300 group-hover:bg-[#E8382D] group-hover:text-white active:scale-95"
        >
          <MdShoppingCart className="h-6 w-6 dark:text-white " />
        </button>
        <button
          type="button"
          aria-label="В избранное"
          className="flex flex-1 justify-center border-x dark:border-gray-700 border-neutral-200 py-4 text-neutral-400 transition dark:hover:bg-gray-800 hover:bg-red-50 hover:text-[#E8382D] active:scale-95"
        >
          <MdFavorite className="h-6 w-6 dark:text-white" />
        </button>
        <button
          type="button"
          aria-label="Сравнить"
          className="flex flex-1 justify-center py-4 text-neutral-400 transition dark:hover:bg-gray-800 hover:bg-neutral-100 hover:text-neutral-900 active:scale-95"
        >
          <LuScale className="h-6 w-6 dark:text-white" />
        </button>
      </div>
    </article>
  );
}
