import { useEffect, useState } from "react";
import { MdShoppingCart, MdFavorite } from "react-icons/md";
import { LuScale } from "react-icons/lu";
import { IoInformationCircleOutline } from "react-icons/io5";
import { HiOutlineTruck, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { FiRefreshCw, FiChevronRight } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import InstallmentModal from "../../Componets/InstallmentModal/InstallmentModal";
import { getProductById } from "../../Sevices/App.js";
import { useShop } from "../../ShopContext";

const formatPrice = (value) => {
  const n = Number(value);
  return Number.isNaN(n) ? value : n.toLocaleString("ru-RU");
};

function ProductDteil() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const { cart, favorites, compare, toggleCart, toggleFavorite, toggleCompare } =
    useShop();

  useEffect(() => {
    getProductById(id).then((data) => {
      setProduct(data);
      setActiveImage(data?.main_image ?? null);
    });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container_1200 px-4 py-6 animate-pulse">
          <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-6 aspect-square w-full rounded-2xl bg-gray-200 dark:bg-gray-800 lg:w-[300px]" />
          <div className="mt-6 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-3 h-8 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    );
  }

  const inCart = cart.includes(product.id);
  const liked = favorites.includes(product.id);
  const inCompare = compare.includes(product.id);

  const thumbs = [
    ...(product.main_image ? [{ id: "main", image: product.main_image }] : []),
    ...(product.images ?? []).slice(0, 4),
  ];

  const iconBtn =
    "flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-[#ed3a2d] hover:text-[#ed3a2d] active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-[#ed3a2d] dark:hover:text-[#ed3a2d]";

  const activeBtn = "!border-[#ed3a2d] !text-[#ed3a2d]";

  const card =
    "rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-800/60";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container_1200 px-4 pb-32 pt-4 text-gray-900 dark:text-gray-100 lg:pb-10 lg:pt-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 overflow-x-auto whitespace-nowrap text-xs text-gray-400 sm:text-sm">
          <Link to="/" className="hover:text-gray-600 dark:hover:text-gray-200">
            Главная
          </Link>
          <FiChevronRight size={14} className="shrink-0" />
          <span className="truncate text-gray-500 dark:text-gray-300">{product.name}</span>
        </nav>

        <div className="mt-4 flex flex-col gap-6 lg:mt-6 lg:flex-row lg:items-start lg:gap-8">
          {/* Gallery */}
          <div className="w-full lg:w-[300px] lg:shrink-0">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              <img
                src={activeImage || product.main_image}
                alt={product.name}
                className="aspect-square w-full object-contain p-2 sm:max-h-[420px] lg:max-h-none"
              />
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {thumbs.map((img) => {
                const isActive = activeImage === img.image;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveImage(img.image)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-colors dark:bg-gray-800 ${
                      isActive
                        ? "border-[#ed3a2d]"
                        : "border-gray-200 hover:border-[#ed3a2d]/60 dark:border-gray-700"
                    }`}
                  >
                    <img src={img.image} alt="" className="h-full w-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main info */}
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-semibold leading-snug text-gray-900 dark:text-white sm:text-2xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-2xl font-bold text-[#ed3a2d] sm:text-3xl">
                {formatPrice(product.price)} сум
              </span>
              <IoInformationCircleOutline size={20} className="text-gray-400" />

              <div className="ml-auto flex items-center gap-2 lg:ml-4">
                <button
                  type="button"
                  aria-label="В корзину"
                  onClick={() => toggleCart(product.id)}
                  className={`${iconBtn} ${inCart ? activeBtn : ""}`}
                >
                  <MdShoppingCart size={20} />
                </button>
                <button
                  type="button"
                  aria-label="В избранное"
                  onClick={() => toggleFavorite(product.id)}
                  className={`${iconBtn} ${liked ? activeBtn : ""}`}
                >
                  <MdFavorite size={20} />
                </button>
                <button
                  type="button"
                  aria-label="Сравнить"
                  onClick={() => toggleCompare(product.id)}
                  className={`${iconBtn} ${inCompare ? activeBtn : ""}`}
                >
                  <LuScale size={20} />
                </button>
              </div>
            </div>

            <p className="mt-3 inline-block rounded-full bg-[#ed3a2d]/10 px-3 py-1 text-xs font-medium text-[#ed3a2d]">
              VIP скидки для VIP клиентов
            </p>

            {/* Desktop buttons (mobile uses sticky bar) */}
            <div className="mt-5 hidden items-center gap-4 lg:flex">
              <button className="h-11 cursor-pointer rounded-md bg-[#ed3a2d] px-8 text-sm font-medium text-white transition-opacity hover:opacity-90">
                Купить сейчас
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="h-11 cursor-pointer rounded-md bg-black px-8 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
              >
                Купить в рассрочку сейчас
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-white px-4 py-3 dark:bg-gray-800">
              <p className="text-xs text-gray-400">Название для договора</p>
            </div>

            <h2 className="mb-3 mt-8 text-base font-medium text-gray-900 dark:text-white sm:text-lg">
              Технические параметры
            </h2>

            <h2 className="mb-3 mt-8 text-base font-medium text-gray-900 dark:text-white sm:text-lg">
              Информация о модели
            </h2>
          </div>

          {/* Side cards */}
          <div className="flex w-full flex-col gap-3 sm:grid sm:grid-cols-2 lg:flex lg:w-[280px] lg:shrink-0 lg:flex-col lg:gap-4">
            <div className={card}>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ed3a2d]/10 text-[#ed3a2d]">
                  <FiRefreshCw size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    30 дней на обмен и возврат
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Если купите товар сегодня, до 06 мая можете вернуть или обменять.
                  </p>
                  <a href="#" className="mt-1 inline-block text-xs text-[#ed3a2d] hover:underline">
                    Подробнее о программе.
                  </a>
                </div>
              </div>
            </div>

            <div className={card}>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ed3a2d]/10 text-[#ed3a2d]">
                  <HiOutlineChatBubbleLeftRight size={18} />
                </span>
                <div className="min-w-0">
                  <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Есть вопросы?
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Телефон:{" "}
                    <a href="tel:+998999904527" className="text-[#ed3a2d]">
                      +998 99 990 45 27
                    </a>
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Телеграм:{" "}
                    <a href="#" className="text-[#ed3a2d]">
                      @mixel.uz
                    </a>
                  </p>
                  <p className="mt-1 break-all text-xs text-gray-500 dark:text-gray-400">
                    Эл. почта:{" "}
                    <a href="#" className="text-[#ed3a2d]">
                      mixel@emali.uz
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className={`${card} sm:col-span-2 lg:col-span-1`}>
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ed3a2d]/10 text-[#ed3a2d]">
                  <HiOutlineTruck size={18} />
                </span>
                <p className="self-center text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">Доставка: </span>
                  <span className="text-gray-500 dark:text-gray-400">Бесплатно</span>
                </p>
              </div>
              <p className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Способ оплаты:
              </p>
              <ul className="flex list-disc flex-col gap-1 pl-4 text-xs text-gray-500 dark:text-gray-400">
                <li>Наличными (При Доставке)</li>
                <li>Payme / Click</li>
                <li>Перечислением с НДС</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95 lg:hidden">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">Цена</span>
          <span className="text-lg font-bold text-[#ed3a2d]">
            {formatPrice(product.price)} сум
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="h-11 rounded-xl bg-[#ed3a2d] text-sm font-medium text-white active:scale-[0.98]">
            Купить сейчас
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-11 rounded-xl bg-black text-sm font-medium text-white active:scale-[0.98] dark:bg-white dark:text-black"
          >
            В рассрочку
          </button>
        </div>
      </div>

      {isModalOpen && (
        <InstallmentModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default ProductDteil;