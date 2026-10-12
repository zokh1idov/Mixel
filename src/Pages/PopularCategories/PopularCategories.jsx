import rasm1 from "../../../public/PopularCategories/rasm1.png";
import rasm2 from "../../../public/PopularCategories/rasm2.png";
import rasm3 from "../../../public/PopularCategories/rasm3.png";
import rasm4 from "../../../public/PopularCategories/rasm4.png";

const categories = [
  { title: "Компьютеры", img: rasm1 },
  { title: "Телефоны, планшеты", img: rasm2 },
  { title: "Ноутбуки", img: rasm3 },
  { title: "Товары для офиса", img: rasm4 },
];

function PopularCategories() {
  return (
    <div className="PopularCategories bg-white py-6 dark:bg-gray-900 md:py-0">
      <div className="container_1200 px-4">
        <h2 className="text-lg text-black dark:text-white md:text-[20px]">
          Популярные категории
        </h2>

        <div
          className="mt-5 flex items-center gap-4 overflow-x-auto md:mt-[28px] lg:justify-center
                     [-ms-overflow-style:none] [scrollbar-width:none]
                     [&::-webkit-scrollbar]:hidden"
        >
          {categories.map(({ title, img }) => (
            <div
              key={title}
              className="flex shrink-0 cursor-pointer items-center gap-3 md:gap-5"
            >
              <span className="max-w-[110px] text-base leading-tight dark:text-white md:max-w-[140px] md:text-[20px]">
                {title}
              </span>
              <img
                src={img}
                alt={title}
                className="h-24 w-24 object-contain md:h-35 md:w-35"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularCategories;