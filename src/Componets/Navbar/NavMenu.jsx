import { CategoriesMenu } from "./CategoriesMenu";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const links = [
  "Наши магазины",
  "Моноблоки",
  "Телефоны, планшеты",
  "Ноутбуки",
  "Комплектующие",
  "Сетевое оборудование",
  "Оргтехника",
];

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="NavMenu relative bg-white dark:bg-gray-900 p-2">
      <div className="container_1200 flex items-center gap-3 md:gap-5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex shrink-0 items-center gap-2 rounded-[4px] bg-red-500 px-4 py-2 sm:px-8 lg:px-12"
        >
          <RxHamburgerMenu size={18} className="text-black dark:text-white" />
          <span className="whitespace-nowrap text-sm font-medium text-black dark:text-white md:text-base">
            Категории
          </span>
        </button>

        <nav
          className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto md:gap-7
                     [-ms-overflow-style:none] [scrollbar-width:none]
                     [&::-webkit-scrollbar]:hidden"
        >
          {links.map((text) => (
            <a
              key={text}
              className="shrink-0 cursor-pointer whitespace-nowrap py-2 text-sm transition-opacity hover:opacity-80 dark:text-white md:text-base"
            >
              {text}
            </a>
          ))}
        </nav>
      </div>

      {isOpen && <CategoriesMenu onLinkClick={() => setIsOpen(false)} />}
    </div>
  );
}
