import { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { IoCashOutline } from "react-icons/io5";
import {
  LuMessageCircle,
  LuMonitorSmartphone,
  LuNotepadText,
  LuShieldCheck,
  LuStar,
  LuTruck,
  LuWallet,
} from "react-icons/lu";

const menu = [
  {
    icon: IoCashOutline,
    title: "Покупка в рассрочку",
    text: "Удобная онлайн рассрочка на товары бытовой техники в Top -IT",
  },
  {
    icon: LuWallet,
    title: "Способы оплаты товара",
    text: "Платите удобным для вас способом: в ближайшем магазине, Сlick, Payme.",
  },
  {
    icon: LuShieldCheck,
    title: "Гарантия на товары",
    text: "Платите удобным для вас способом: в ближайшем магазине, Сlick, Payme.",
  },
  { icon: GrMoney, title: "Бонусная система", text: "Бонусная система" },
  {
    icon: LuTruck,
    title: "Бесплатная доставка",
    text: "Условия доставки товаров в Top-IT",
  },
  { icon: LuMessageCircle, title: "Бонусная система", text: "Бонусная система" },
  { icon: LuNotepadText, title: "Бонусная система", text: "Бонусная система" },
  { icon: LuStar, title: "Бонусная система", text: "Бонусная система" },
  { icon: LuMonitorSmartphone, title: "Бонусная система", text: "Бонусная система" },
  { icon: LuStar, title: "Бонусная система", text: "Бонусная система" },
];

const h2 =
  "mb-3 mt-8 text-lg font-bold text-gray-900 dark:text-white sm:text-[23px]";
const p = "text-sm leading-[1.8] text-gray-500 dark:text-gray-400";
const ol =
  "mb-6 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-500 marker:font-semibold marker:text-[#ED3729] dark:text-gray-400";

function InfoPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container_1200 px-4 pb-16 lg:pb-24">
        <nav className="flex items-center gap-1 py-4 text-xs text-gray-400 sm:py-6 sm:text-sm">
          <Link to="/" className="hover:text-gray-600 dark:hover:text-gray-200">
            Главная
          </Link>
          <FaAngleRight className="shrink-0" />
          <span className="text-gray-500 dark:text-gray-300">Покупка в рассрочку</span>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <aside className="-mx-4 lg:mx-0 lg:w-[358px] lg:shrink-0">
            <div className="flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
              {menu.map((item, i) => {
                const Icon = item.icon;
                const isActive = active === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? "border-[#ED3729] bg-[#ED3729] text-white"
                        : "border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-white" : "text-[#ED3729]"} />
                    {item.title}
                  </button>
                );
              })}
            </div>

            <div className="hidden overflow-hidden rounded-2xl bg-[#f7f7f7] py-2 dark:bg-gray-800 lg:block">
              {menu.map((item, i) => {
                const Icon = item.icon;
                const isActive = active === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`flex w-full items-start gap-3 border-l-4 px-7 py-4 text-left transition-colors ${
                      isActive
                        ? "border-[#ED3729] bg-white dark:bg-gray-700/60"
                        : "border-transparent hover:bg-white/60 dark:hover:bg-gray-700/30"
                    }`}
                  >
                    <Icon color="#ED3729" size={30} className="shrink-0" />
                    <span>
                      <span className="block text-base font-bold text-black dark:text-white">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block max-w-[210px] text-[13px] text-gray-500 dark:text-gray-400">
                        {item.text}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="min-w-0 max-w-[750px] flex-1">
            <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:text-[26px]">
              Как купить в рассрочку в Top-IT?
            </h1>
            <p className={p}>
              Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает
              сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или
              менее стандартное заполнение шаблона, а также реальное распределение букв и
              пробелов в абзацах, которое не получается при простой публикации.
            </p>

            <h2 className={h2}>Вы можете приобрести товар несколькими способами:</h2>
            <ol className={ol}>
              <li>
                Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает
                сосредоточиться.
              </li>
              <li>
                Lorem Ipsum используют потому, что тот обеспечивает более или менее
                стандартное заполнение шаблона.
              </li>
            </ol>

            <h2 className={h2}>Для покупки онлайн вам потребуется:</h2>
            <ol className={ol}>
              <li>
                Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает
                сосредоточиться.
              </li>
              <li>
                Lorem Ipsum используют потому, что тот обеспечивает более или менее
                стандартное заполнение шаблона.
              </li>
              <li>Оценке дизайна и композиции читаемый текст.</li>
              <li>Потому, что тот обеспечивает более или менее.</li>
            </ol>

            <h2 className={h2}>Кому выдается рассрочка?</h2>
            <p className={p}>
              Также реальное распределение букв и пробелов в абзацах, которое не получается
              при простой публикации. Здесь ваш текст... Здесь ваш текст... Многие программы
              электронной вёрстки и редакторы HTML используют.
            </p>

            <h2 className={h2}>До скольки работает Call-центр?</h2>
            <div className="rounded-2xl bg-[#f7f7f7] p-4 dark:bg-gray-800 sm:p-5">
              <p className={p}>Режим работы контакт-центра: каждый день с 9:00 до 21:00.</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Будем рады ответить на ваши вопросы по телефону{" "}
                <a href="tel:+998911234567" className="font-medium text-[#ED3729] hover:underline">
                  +998 91 123 45 67
                </a>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;