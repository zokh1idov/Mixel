import { VscChevronDownCompact } from "react-icons/vsc";
import {
  IoCartOutline,
  IoHeartOutline,
  IoMicOutline,
  IoPersonOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { LuScale } from "react-icons/lu";
import Logo from "../../Componets/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiDark } from "react-icons/ci";
import { MdOutlineLightMode } from "react-icons/md";

export function MainHeader({ filterData }) {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <header className="MainHerader bg-white py-3 transition-colors duration-300 dark:bg-gray-900 md:py-4">
      <div className="container_1200 mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4">
        <Link to="/" className="flex shrink-0 items-center">
          <Logo />
        </Link>

        <div className="flex items-center gap-4 text-gray-900 dark:text-gray-200 md:hidden">
          <Link to={"/SingUp"}>
            <button
              type="button"
              aria-label="Войти"
              className="flex flex-col items-center gap-0.5 transition-colors hover:text-[#ed3a2d] cursor-pointer"
            >
              <IoPersonOutline size={23} />
              <span className="text-[10px]">Войти</span>
            </button>
          </Link>

          <Link to={"/Wishlist"}>
            <button
              type="button"
              aria-label="Корзина"
              className="relative flex flex-col items-center gap-0.5 transition-colors hover:text-[#ed3a2d] cursor-pointer"
            >
              <IoHeartOutline size={24} />
              <span className="text-[10px]">Избранное</span>
            </button>
          </Link>

          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            aria-label="Переключить тему"
            className="flex flex-col items-center gap-0.5 transition-colors hover:text-[#ed3a2d] cursor-pointer"
          >
            {isDark ? <MdOutlineLightMode size={23} /> : <CiDark size={23} />}
            <span className="text-[10px]">{isDark ? "Light" : "Dark"}</span>
          </button>
        </div>
        <div className="order-2 flex h-[42px] w-full overflow-hidden rounded-md border border-[#ed3a2d] bg-white dark:bg-gray-800 md:order-none md:w-auto md:max-w-[600px] md:flex-1 lg:mx-5">
          <div className="flex h-full shrink-0 cursor-pointer items-center gap-1 border-r border-gray-300 px-2 text-[11px] text-gray-700 dark:border-gray-600 dark:text-gray-200 sm:px-3 sm:text-xs md:gap-1 md:px-4 md:text-sm">
            <span className="whitespace-nowrap">Все категории</span>
            <VscChevronDownCompact
              className="shrink-0 text-gray-400"
              size={16}
            />
          </div>

          <form className="flex h-full min-w-0 flex-1 items-center">
            <input
              onChange={(e) => {
                const value = e.target.value;
                filterData(value);
                navigate("/search");
              }}
              type="text"
              placeholder="Телефоны и бытовая"
              className="h-full min-w-0 flex-1 bg-transparent px-2 text-xs text-gray-800 outline-none placeholder:text-gray-400 dark:text-gray-200 sm:px-3 sm:text-sm md:px-4"
            />

            <IoMicOutline
              size={18}
              className="mr-2 shrink-0 cursor-pointer text-gray-400 sm:mr-3"
            />

            <button
              type="submit"
              aria-label="Поиск"
              className="flex h-full shrink-0 items-center justify-center gap-2 bg-[#ed3a2d] px-3 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:px-5 md:px-8"
            >
              <IoSearchOutline size={18} />
              <span className="hidden sm:inline">Поиск</span>
            </button>
          </form>
        </div>

        <div className="hidden items-center gap-5 text-sm text-gray-900 dark:text-gray-200 lg:flex xl:gap-8">
          <Link
            to={"/SingUp"}
            type="button"
            className="flex cursor-pointer flex-col items-center gap-1 transition-colors hover:text-[#ed3a2d]"
          >
            <IoPersonOutline size={24} />
            <span>Войти</span>
          </Link>

          <Link
            to="/ComparePage"
            className="flex flex-col items-center gap-1 transition-colors hover:text-[#ed3a2d]"
          >
            <LuScale size={24} />
            <span>Сравнение</span>
          </Link>

          <Link
            to="/Wishlist"
            className="flex flex-col items-center gap-1 transition-colors hover:text-[#ed3a2d]"
          >
            <IoHeartOutline size={24} />
            <span>Избранное</span>
          </Link>

          <button
            type="button"
            className="flex flex-col items-center gap-1 transition-colors hover:text-[#ed3a2d]"
          >
            <IoCartOutline size={24} />
            <span>Корзина</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            className="flex cursor-pointer flex-col items-center gap-1 transition-colors hover:text-[#ed3a2d]"
          >
            {isDark ? <MdOutlineLightMode size={24} /> : <CiDark size={24} />}
            <span>{isDark ? "light" : "dark"}</span>
          </button>
        </div>

        <div className="hidden items-center gap-4 text-gray-900 dark:text-gray-200 md:flex lg:hidden">
          <Link
            to="/ComparePage"
            aria-label="Сравнение"
            className="hover:text-[#ed3a2d]"
          >
            <LuScale size={23} />
          </Link>
          <Link
            to="/Wishlist"
            aria-label="Избранное"
            className="hover:text-[#ed3a2d]"
          >
            <IoHeartOutline size={23} />
          </Link>
          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            aria-label="Переключить тему"
            className="hover:text-[#ed3a2d]"
          >
            {isDark ? <MdOutlineLightMode size={23} /> : <CiDark size={23} />}
          </button>
        </div>
      </div>
    </header>
  );
}
