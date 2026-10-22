import { useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PRODUCTS = [
  {
    id: 1,
    title: "Apple iPhone X 64 ГБ",
    description:
      "Совершенно новый дисплей Super Retina с диагональю 5,8 дюйма, который удобно лежит в руке и потрясающе выглядит. — это и есть iPhone X.",
    price: 1250900,
    oldPrice: 2220900,
    currency: "Сум",
    image: "/imgs/Xs.png",
    href: "#",
  },
  {
    id: 2,
    title: "Apple iPhone 11 128 ГБ",
    description: "Ikkinchi mahsulot tavsifi.",
    price: 1850900,
    oldPrice: 2520900,
    currency: "Сум",
    image: "/imgs/Ip11.png", // o'zingizdagi rasm
    href: "#",
  },
  {
    id: 3,
    title: "Apple iPhone 12 64 ГБ",
    description: "Uchinchi mahsulot tavsifi.",
    price: 2450900,
    oldPrice: 3120900,
    currency: "Сум",
    image: "/imgs/Ip12.png", // o'zingizdagi rasm
    href: "#",
  },
];

const fmt = new Intl.NumberFormat("ru-RU");

const arrowClass =
  "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-500 shadow-sm transition duration-200 hover:border-[#f04a36] hover:bg-[#f04a36] hover:text-white hover:shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f04a36]";

export default function Product({ products = PRODUCTS }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const total = products.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // Telefonda barmoq bilan surish
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) (diff > 0 ? prev : next)();
    touchStartX.current = null;
  };

  return (
    <section className="relative w-full overflow-hidden bg-white text-neutral-800 dark:bg-gray-900 dark:text-white">
      <button
        type="button"
        aria-label="Предыдущий товар"
        onClick={prev}
        className={`${arrowClass} left-3 md:left-6`}
      >
        <FiChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label="Следующий товар"
        onClick={next}
        className={`${arrowClass} right-3 md:right-6`}
      >
        <FiChevronRight className="h-5 w-5" />
      </button>

      {/* Slaydlar lentasi */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {products.map((product) => (
          <div key={product.id} className="w-full shrink-0">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-16 py-12 md:grid-cols-[1fr_auto_1fr] md:gap-14 md:py-16">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-extralight leading-[1.1] tracking-tight md:text-5xl">
                  {product.title}
                </h2>
                <p className="mx-auto mt-5 max-w-sm text-base font-normal leading-relaxed text-neutral-500 dark:text-white md:mx-0">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-56 w-auto object-contain drop-shadow-xl md:h-72"
                  draggable={false}
                />
              </div>

              <div className="flex flex-col items-center md:items-start md:justify-self-end">
                <div className="whitespace-nowrap text-4xl font-extrabold leading-none tracking-tight text-[#f04a36] md:text-5xl">
                  {fmt.format(product.price)} {product.currency}
                </div>

                {product.oldPrice && (
                  <div className="mt-3 text-lg font-medium text-neutral-400 line-through">
                    {fmt.format(product.oldPrice)} {product.currency}
                  </div>
                )}

                <a
                  href={product.href}
                  className="mt-7 inline-block cursor-pointer rounded-sm border-2 border-[#f04a36] px-10 py-3 text-base font-bold text-[#f04a36] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f04a36] hover:text-white hover:shadow-lg hover:shadow-[#f04a36]/30 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f04a36] focus-visible:ring-offset-2"
                >
                  Показать еще
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}