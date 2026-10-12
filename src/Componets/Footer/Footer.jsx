import {
  FaTelegramPlane,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import Logo from "../Logo/Logo";

const columns = [
  {
    title: "Категории",
    links: [
      "Ноутбуки",
      "Игровые кресла",
      "Телефоны",
      "Моноблоки",
      "Модули памяти",
    ],
  },
  {
    title: "Общее",
    links: [
      "Новости",
      "О нас",
      "Наши магазины",
      "Политика конфиденциальности",
      "Правила программы лояльности",
      "Контакты",
    ],
  },
  {
    title: "Покупателям",
    links: [
      "Покупка в рассрочку",
      "Доставка и оплата",
      "Правила покупок с cashback",
      "Возврат / Обмен",
      "Правила пользования купонами",
    ],
  },
];

const socials = [
  { Icon: FaTelegramPlane, size: 12, active: true },
  { Icon: FaInstagram, size: 12 },
  { Icon: FaFacebookF, size: 11 },
  { Icon: FaYoutube, size: 12 },
];

export function Footer() {
  return (
    <div className="Footer bg-[#222222] py-8 text-white md:py-10">
      <div className="container_1200 flex flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex w-full flex-col items-center text-center lg:w-[377px] lg:items-start lg:text-left">
          <div className="flex items-center justify-center lg:justify-start">
            <Logo />
          </div>
          <p className="mt-6 text-xs">График работы колл-центра</p>
          <p className="mt-1 text-xs">Понедельник - Суббота: 9:00–18:00</p>
          <p className="mt-6 text-xs lg:mt-8">Колл-центр:</p>
          <span className="mt-1 text-xs font-normal">+ 998 (71) 205-93-93</span>

          <div className="mt-6 flex items-center justify-center gap-2 lg:mt-8 lg:justify-start">
            {socials.map(({ Icon, size, active }, i) => (
              <div
                key={i}
                className={
                  active
                    ? "flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#ed3a2d] text-white"
                    : "flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-500 text-gray-300 transition-colors hover:border-white hover:text-white"
                }
              >
                <Icon size={size} />
              </div>
            ))}
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:flex lg:w-auto lg:gap-20">
          {columns.map((col) => (
            <div
              key={col.title}
              className="flex flex-col items-center gap-3 text-center sm:last:col-span-2 lg:w-[190px] lg:items-start lg:text-left lg:last:col-span-1"
            >
              <h3 className="mb-2 text-base font-medium text-white">
                {col.title}
              </h3>
              {col.links.map((text) => (
                <a
                  key={text}
                  href="#"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {text}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}