import { FaAngleRight } from "react-icons/fa";
import { GoX } from "react-icons/go";
import { Link } from "react-router-dom";
import CardSkeleton from "../../Componets/CardSelekton/CardSelekton";
import { useShop } from "../../ShopContext";

function CartPage({ products, loading }) {
  const { cart, toggleCart } = useShop();
  const list = (products.results ?? []).filter((p) => cart.includes(p.id));

  return (
    <div className="CartPage bg-white dark:bg-gray-900 p-3">
      <div className="container_1200">
        <div className="flex items-center gap-2 text-gray-400 py-[27px]">
          <div className="flex items-center gap-1">
            <Link to="/">Главная</Link>
            <span>
              <FaAngleRight />
            </span>
          </div>
          <span>Корзина</span>
        </div>

        <h1 className="text-[20px] font-bold text-black dark:text-white mb-4">Корзина</h1>

        <div className="flex flex-col gap-4 py-5">
          {loading ? (
            <CardSkeleton />
          ) : list.length === 0 ? (
            <p className="text-gray-400">Ничего не найдено</p>
          ) : (
            list.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800"
              >
                <Link to={`/deteil/${p.id}`} className="flex items-center gap-4 flex-1">
                  {/* Расм контейнери қатъий ўлчамга эга бўлиши керак */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-50 dark:bg-white overflow-hidden p-1">
                    <img
                      src={p.main_image}
                      alt={p.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-black dark:text-white">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[15px] font-semibold text-[#E8382D] dark:text-red-500">
                      {p.price} сум/мес
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  aria-label="Удалить"
                  onClick={() => toggleCart(p.id)}
                  className="rounded-full border border-gray-300 p-2 transition-colors hover:border-[#E8382D] hover:text-[#E8382D] dark:border-gray-500 dark:text-white"
                >
                  <GoX size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {list.length > 0 && (
          <div className="mt-4">
            <Link
              to="/Checkout"
              className="inline-block rounded-md bg-[#E8382D] px-8 py-3 text-white transition-opacity hover:opacity-90"
            >
              Оформить заказ
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;