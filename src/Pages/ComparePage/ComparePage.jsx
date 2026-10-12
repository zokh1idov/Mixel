import { FaAngleRight } from "react-icons/fa";
import { GoX } from "react-icons/go";
// import { products } from "../../Data/Product";
import ProductCard from "../../Componets/ProductCard/ProductCard";
import { useState } from "react";
const specs = [
  { label: "Степень защиты", values: ["IP67", "", "", ""] },
  {
    label: "Версия ОС",
    values: ["Android 11", "Android 11", "Android 11", "Android 11"],
  },
  { label: "Количество ядер", values: ["6", "6", "5", "6"] },
  { label: "Степень защиты", values: ["IP68", "IP68", "IP68", "IP68"] },
  {
    label: "Макс. разрешение видео",
    values: ["3840x2160", "3840x2160", "3840x2160", "3840x2160"],
  },
  {
    label: "Фотокамера",
    values: ["12 МП, 12 МП", "12 МП, 12 МП", "12 МП, 12 МП", "12 МП, 12 МП"],
  },
  {
    label: "Емкость аккумулятора",
    values: ["3110 мА·ч", "3110 мА·ч", "3110 мА·ч", "3110 мА·ч"],
  },
  {
    label: "Версия ОС",
    values: ["Android 11", "Android 11", "Android 11", "Android 11"],
  },
];
function ComparePage({ products }) {
  const [onlyDifferences, setOnlyDifferences] = useState(false);
  return (
    <>
      <div className="ComparePage dark:bg-gray-900">
        <div className="container_1200 ">
          <div className="flex items-center gap-2 text-gray-400 dark:text-white  py-[27px]">
            <div className="flex items-center gap-1">
              <a href="">Главная</a>
              <span>
                <FaAngleRight />
              </span>
            </div>
            <a href="">Сравнить</a>
          </div>

          <h1 className="text-[18px] dark:text-white font-bold">Сравнение товаров</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 py-4">
              <button className="flex items-center gap-2 px-8 text-[17px] bg-red-500 py-1 rounded-4xl text-white ">
                Смартфоны 5 <GoX size={23}  className="dark:text-white"/> 
              </button>
              <button className="flex items-center gap-2 px-8 text-[17px] border border-gray-300 py-1 rounded-4xl  dark:text-white ">
                Смартфоны 5 <GoX size={23}  className="dark:text-white"/>
              </button>
              <button className="flex items-center gap-2 px-8 text-[17px] border border-gray-300 py-1 rounded-4xl dark:text-white  ">
                Смартфоны 5 <GoX size={23} className="dark:text-white" />
              </button>
            </div>
            <div className="flex items-center  gap-2">
              <button className="border border-gray-300  dark:border-white  rounded-[50px] p-1.5">
                <GoX  className="dark:text-white"/>
              </button> 
              <h2 className="text-[14px] dark:text-white ">Добавить товары</h2>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={onlyDifferences}
                onChange={() => setOnlyDifferences(!onlyDifferences)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-[#ed3a2d] transition-colors"></div>
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
            </label>
            <span className="text-sm dark:text-white">Только отличия</span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  py-[32px]">
          {
            products.results.map((p)=>(
              <ProductCard key={p.id} product={p} />
            ))
          }
          </div>
          <div>
            <h1 className="text-[18px] dark:text-white ">Характеристики товара</h1>
            <p className="text-gray-400 dark:text-white">Герцовка</p>
          </div>


          <div>
            {specs.map((spec, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-6 py-4 border-b dark:border-white border-gray-200"
              >
                {spec.values.map((value, i) => (
                  <div key={i}>
                    <p className="text-xs dark:text-white text-gray-400">{spec.label}</p>
                    <p className="text-sm mt-1 dark:text-white">{value || "—"}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ComparePage;
