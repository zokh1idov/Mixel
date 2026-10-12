import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoHeartOutline, IoHeart, IoClose } from "react-icons/io5";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { Link } from "react-router-dom";

const cardTypes = [
  { id: "start", name: "Start", color: "#3b82f6" },
  { id: "member", name: "Member", color: "#f97316" },
  { id: "classic", name: "Classic", color: "#a855f7" },
  { id: "silver", name: "Silver", color: "#9ca3af" },
  { id: "gold", name: "Gold", color: "#eab308" },
  { id: "platinum", name: "Platinum", color: "#eab308" },
];

const providers = [
  { id: "mixel", name: "MIXEL.UZ", price: "2 042 417" },
  { id: "paymart", name: "Paymart", price: "2 042 417" },
  { id: "7market", name: "7 MARKET", price: "2 042 417" },
];

const memberInfo = [
  { label: "Предоплата", value: "от 0%" },
  { label: "Кешбэк", value: "1%" },
  { label: "Максимальная сумма задолженности", value: "15 000 000 сум" },
  { label: "Срок перехода на карту", value: "4 месяца" },
];

const formatPrice = (value) => {
  const n = Number(value);
  return Number.isNaN(n) ? value : n.toLocaleString("ru-RU");
};

function InstallmentModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [activeProvider, setActiveProvider] = useState("");
  const [activeCard, setActiveCard] = useState("member");
  const [liked, setLiked] = useState(false);

  // Orqa fonni qotirish + Escape bilan yopish
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!product) return null;

  const totalPrice = Number(product.price) * quantity;

  const stepBtn =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-base text-gray-700 transition-colors hover:border-[#ed3a2d] hover:text-[#ed3a2d] active:scale-95 dark:border-gray-700 dark:text-gray-200";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-[2px] sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white text-gray-900 shadow-2xl dark:bg-gray-900 dark:text-gray-100 sm:max-h-[90vh] sm:max-w-[1100px] sm:rounded-2xl"
      >
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-700 sm:hidden" />

        <div className="flex items-center justify-between px-4 pb-2 pt-3 sm:px-6 sm:pt-5">
          <h1 className="text-lg font-semibold">Купить в рассрочку</h1>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 sm:px-6">
          <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-3 dark:bg-gray-800/60 sm:gap-6 sm:p-4">
            <img
              src={product.main_image}
              alt={product.name}
              className="h-20 w-20 shrink-0 rounded-xl bg-white object-contain p-1 dark:bg-gray-800 sm:h-28 sm:w-28"
            />

            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                {product.name}
              </p>
              <p className="mt-1 text-lg font-bold text-[#ed3a2d] sm:mt-3 sm:text-2xl">
                {formatPrice(totalPrice)} сум
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Уменьшить"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className={stepBtn}
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold text-[#ed3a2d]">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Увеличить"
                  onClick={() => setQuantity((q) => q + 1)}
                  className={stepBtn}
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <button
                  type="button"
                  aria-label="В избранное"
                  onClick={() => setLiked((v) => !v)}
                  className="transition-colors hover:text-[#ed3a2d]"
                >
                  {liked ? (
                    <IoHeart size={22} className="text-[#ed3a2d]" />
                  ) : (
                    <IoHeartOutline size={22} />
                  )}
                </button>
                <button
                  type="button"
                  aria-label="Удалить"
                  className="transition-colors hover:text-[#ed3a2d]"
                >
                  <RiDeleteBin6Line size={22} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {providers.map((provider) => {
              const isOpen = activeProvider === provider.id;
              return (
                <div
                  key={provider.id}
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    isOpen
                      ? "border-[#ed3a2d] bg-[#ed3a2d]/[0.03]"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveProvider(isOpen ? "" : provider.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left"
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        isOpen ? "border-[#ed3a2d]" : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {isOpen && <span className="h-2.5 w-2.5 rounded-full bg-[#ed3a2d]" />}
                    </span>

                    <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-6">
                      <span className="font-bold">{provider.name}</span>
                      <span className="text-xs leading-tight text-gray-400">
                        Срок рассрочки: 12 месяцев
                      </span>
                    </div>

                    <span className="shrink-0 text-right text-sm font-bold leading-tight">
                      {provider.price} сум
                      <span className="block text-xs font-normal text-gray-400">в месяц</span>
                    </span>

                    {isOpen ? (
                      <GoChevronUp size={20} className="shrink-0 text-gray-400" />
                    ) : (
                      <GoChevronDown size={20} className="shrink-0 text-gray-400" />
                    )}
                  </button>

                  {provider.id === "mixel" && isOpen && (
                    <div className="border-t border-gray-100 px-4 pb-4 dark:border-gray-800">
                      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        При первой покупке товара, каждый клиент получает карту Start
                      </p>

                      <p className="mb-2 mt-4 text-sm font-medium">По карте</p>

                      {cardTypes.map((c) => {
                        const cardOpen = activeCard === c.id;
                        return (
                          <div
                            key={c.id}
                            className="border-b border-gray-100 last:border-b-0 dark:border-gray-800"
                          >
                            <button
                              type="button"
                              onClick={() => setActiveCard(cardOpen ? "" : c.id)}
                              className="flex w-full items-center justify-between py-3"
                            >
                              <span className="flex items-center gap-3">
                                <span
                                  className="h-4 w-6 shrink-0 rounded"
                                  style={{ backgroundColor: c.color }}
                                />
                                <span className="text-sm">{c.name}</span>
                              </span>
                              {cardOpen ? (
                                <GoChevronUp size={18} className="text-gray-400" />
                              ) : (
                                <GoChevronDown size={18} className="text-gray-400" />
                              )}
                            </button>

                            {cardOpen && c.id === "member" && (
                              <div className="flex flex-col pb-3 text-xs">
                                {memberInfo.map((row, i) => (
                                  <div
                                    key={row.label}
                                    className={`flex items-start justify-between gap-4 rounded-lg px-3 py-2 ${
                                      i % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : ""
                                    }`}
                                  >
                                    <span className="text-gray-400">{row.label}</span>
                                    <span className="shrink-0 text-right font-medium">
                                      {row.value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-gray-100 bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:justify-end sm:gap-3 sm:px-6 sm:py-4">
          <button
            onClick={onClose}
            className="h-11 rounded-xl border border-[#ed3a2d] px-6 text-sm font-medium text-[#ed3a2d] transition-colors hover:bg-red-50 active:scale-[0.98] dark:hover:bg-[#ed3a2d]/10"
          >
            Продолжить покупки
          </button>
          <Link
            to="/Checkout"
            className="flex h-11 items-center justify-center rounded-xl bg-[#ed3a2d] px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            Оформить покупку
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InstallmentModal;