import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { VscChevronDownCompact } from "react-icons/vsc";
import { Link } from "react-router-dom";

const linkClass =
  "shrink-0 cursor-pointer whitespace-nowrap transition-opacity hover:opacity-80";

export function Topbar() {
  return (
    <div className="Topbar h-[42px] bg-[#ed3a2d] text-white">
      <div className="container_1200 mx-auto flex h-full items-center justify-between gap-3 px-4 lg:gap-0">
        <div className="flex shrink-0 items-center gap-1.5">
          <CiLocationOn size={22} />
          <span className="text-[13px] sm:text-[14px]">Ташкент</span>
        </div>

        <nav
          className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto text-[13px]
                     lg:flex-none lg:gap-5 lg:overflow-visible xl:gap-7 xl:text-[14px]
                     [-ms-overflow-style:none] [scrollbar-width:none]
                     [&::-webkit-scrollbar]:hidden"
        >
          <a className={linkClass}>Наши магазины</a>
          <a className={linkClass}>B2B продажи</a>
          <Link to="/info" className={linkClass}>
            Покупка в рассрочку
          </Link>
          <a className={linkClass}>Способы оплаты</a>
          <a className={linkClass}>Гарантия на товары</a>
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <div className="hidden items-center gap-2 xl:flex">
            <IoCallOutline size={16} />
            <span className="whitespace-nowrap text-[14px]">
              +998 95 123 55 88
            </span>
          </div>

          <div className="flex cursor-pointer items-center gap-1">
            <span className="text-[13px] sm:text-[14px]">Rus</span>
            <VscChevronDownCompact size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}