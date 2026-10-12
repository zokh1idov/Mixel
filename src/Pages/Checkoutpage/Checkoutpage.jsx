import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const orderItems = [
  {
    image: "/imgs/Card1.png",
    name: "Galaxy A03 Core 2/32Gb Black",
    qty: 1,
    price: "1 334 000",
  },
  {
    image: "/imgs/Card1.png",
    name: "Galaxy A03 Core 2/32Gb Black",
    qty: 1,
    price: "1 334 000",
  },
];

const paymentMethods = [
  { id: "payme", label: "Оплата через Payme" },
  { id: "card", label: "Онлайн оплата по карте UZCARD и HUMO" },
  { id: "cash", label: "Наличными при получении" },
  { id: "card-on-delivery", label: "Картой при получении" },
  { id: "installment", label: "Рассрочка" },
];

const toNumber = (str) => Number(String(str).replace(/\s/g, ""));
const fmt = (n) => n.toLocaleString("ru-RU");

const input =
  "mt-1 h-12 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#ed3a2d] focus:ring-2 focus:ring-[#ed3a2d]/15 dark:border-gray-700 dark:bg-gray-800 dark:text-white";

const labelCls = "text-xs font-medium text-gray-500 dark:text-gray-400";

function Section({ step, title, action, children }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-800/50 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ed3a2d] text-xs font-semibold text-white">
            {step}
          </span>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function RadioCard({ name, checked, onChange, children }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors ${
        checked
          ? "border-[#ed3a2d] bg-[#ed3a2d]/5"
          : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-[#ed3a2d]/40 ${
          checked ? "border-[#ed3a2d]" : "border-gray-300 dark:border-gray-600"
        }`}
      >
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-[#ed3a2d]" />}
      </span>
      {children}
    </label>
  );
}

function CheckoutPage() {
  const [phone, setPhone] = useState("+998 99 123 45 67");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("Tojmazarov");
  const [activePayment, setActivePayment] = useState("payme");
  const [city, setCity] = useState("tashkent");

  const total = orderItems.reduce((sum, i) => sum + toNumber(i.price) * i.qty, 0);
  const count = orderItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container_1200 px-4 pb-32 pt-4 text-gray-900 dark:text-gray-100 lg:pb-10 lg:pt-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-xs text-gray-400 sm:text-sm">
          <Link to="/" className="hover:text-gray-600 dark:hover:text-gray-200">
            Главная
          </Link>
          <FiChevronRight size={14} />
          <span className="text-gray-500 dark:text-gray-300">Оформить покупку</span>
        </nav>

        <h1 className="mt-3 text-xl font-semibold sm:text-2xl">Оформить покупку</h1>

        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
          {/* Form column */}
          <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-5">
            {/* 1. Ваши данные */}
            <Section step="1" title="Ваши данные">
              <div className="flex flex-col gap-3">
                <div>
                  <label className={labelCls}>Телефон*</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={input}
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Имя*</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Введите имя"
                      className={input}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Фамилия*</label>
                    <input
                      type="text"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      className={input}
                    />
                  </div>
                </div>
              </div>
            </Section>

            {/* 2. Ваш заказ */}
            <Section
              step="2"
              title="Ваш заказ"
              action={
                <button className="text-sm font-medium text-[#ed3a2d] hover:underline">
                  Изменить
                </button>
              }
            >
              <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 sm:gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm">{item.name}</p>
                      <p className="mt-0.5 text-xs text-gray-400 sm:hidden">{item.qty} шт</p>
                    </div>

                    <span className="hidden text-sm text-gray-400 sm:block">{item.qty} шт</span>
                    <span className="shrink-0 text-sm font-semibold">{item.price} сум</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* 3. Способ оплаты */}
            <Section step="3" title="Выберите способ оплаты">
              <div className="flex flex-col gap-2.5">
                {paymentMethods.map((method) => (
                  <RadioCard
                    key={method.id}
                    name="payment"
                    checked={activePayment === method.id}
                    onChange={() => setActivePayment(method.id)}
                  >
                    <span className="text-sm">{method.label}</span>
                  </RadioCard>
                ))}
              </div>
            </Section>

            {/* 4. Способ получения */}
            <Section step="4" title="Способ получения">
              <p className={`${labelCls} mb-2`}>Ваш город</p>
              <div className="sm:w-fit">
                <RadioCard
                  name="city"
                  checked={city === "tashkent"}
                  onChange={() => setCity("tashkent")}
                >
                  <span className="text-sm font-medium">Ташкент</span>
                  <span className="text-xs text-gray-400">Доставка Fazo</span>
                </RadioCard>
              </div>

              <p className={`${labelCls} mb-2 mt-6`}>Укажите адрес доставки</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Регион / Область*</label>
                  <select className={input} defaultValue="">
                    <option value="" disabled>
                      Выберите
                    </option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Город / Район*</label>
                  <select className={input} defaultValue="">
                    <option value="" disabled>
                      Выберите
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3">
                <div className="col-span-3 sm:col-span-2">
                  <label className={labelCls}>Адрес</label>
                  <input
                    type="text"
                    defaultValue="O'zbekiston, Farg'ona, Sayfiqch ko'chasi, 18/2"
                    className={input}
                  />
                </div>
                <div className="col-span-3 sm:col-span-1">
                  <label className={labelCls}>Этаж</label>
                  <input type="text" inputMode="numeric" className={input} />
                </div>
              </div>

              <div className="mt-3">
                <label className={labelCls}>Дата доставки</label>
                <input type="date" className={`${input} dark:[color-scheme:dark]`} />
              </div>
            </Section>
          </div>

          {/* Summary */}
          <aside className="w-full lg:sticky lg:top-6 lg:w-[300px] lg:shrink-0">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-800/50">
              <h3 className="mb-4 text-sm font-semibold">Ваш заказ</h3>

              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-400">{count} товара на сумму</span>
                <span className="font-medium">{fmt(total)} сум</span>
              </div>
              <div className="mb-4 flex justify-between border-b border-gray-100 pb-4 text-sm dark:border-gray-700">
                <span className="text-gray-400">Доставка</span>
                <span className="font-medium text-green-600 dark:text-green-400">бесплатно</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-gray-400">Всего к оплате</span>
                <span className="text-lg font-bold text-[#ed3a2d]">{fmt(total)} сум</span>
              </div>

              <button className="mt-4 hidden h-12 w-full rounded-xl bg-[#ed3a2d] text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.99] lg:block">
                Оформить покупку
              </button>

              <p className="mt-3 text-[11px] leading-relaxed text-gray-400">
                Подтверждая заказ, я принимаю условия{" "}
                <a href="#" className="text-[#ed3a2d] hover:underline">
                  Пользовательского соглашения
                </a>
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95 lg:hidden">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <p className="text-xs text-gray-500 dark:text-gray-400">Всего к оплате</p>
            <p className="text-base font-bold text-[#ed3a2d]">{fmt(total)} сум</p>
          </div>
          <button className="h-12 flex-1 rounded-xl bg-[#ed3a2d] text-sm font-medium text-white active:scale-[0.98]">
            Оформить покупку
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;