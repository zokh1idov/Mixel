import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { GoChevronUp, GoChevronRight } from "react-icons/go";
import { LuScale } from "react-icons/lu";
import {
  MdChevronLeft,
  MdFilterList,
  MdGridView,
  MdViewList,
  MdShoppingCart,
  MdFavorite,
} from "react-icons/md";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { GrMoney } from "react-icons/gr";
import { PostProductsFilter } from "../../Sevices/Products";
import ProductCard from "../../Componets/ProductCard/ProductCard";

const cheaperProducts = [
  {
    image: "/imgs/Card9.png",
    line1: "Умные часы Haylou",
    line2: "RT-LS05S",
    price: "458 000",
    oldPrice: "529 000",
  },
  {
    image: "/imgs/Card8.png",
    line1: "Наушники Panasonic",
    line2: "RP-HJE125E-R",
    price: "18 000",
    oldPrice: "99 000",
  },
  {
    image: "/imgs/Card7.png",
    line1: "Iphone 13 pro 256 Gb",
    line2: "",
    price: "9 525 000",
    oldPrice: "10 520 000",
  },
  {
    image: "/imgs/Card6.png",
    line1: "Источник бесперебойного",
    line2: "питания AVT 600 AVR (EA260)",
    price: "600 000",
    oldPrice: "909 000",
  },
  {
    image: "/imgs/Card1.png",
    line1: "Беспроводная мышь",
    line2: "Logitech M220 SILENT",
    price: "130 000",
    oldPrice: "200 000",
  },
];

const brands = [
  { name: "LG", count: 30 },
  { name: "Samsung", count: 30 },
  { name: "Artel", count: 7 },
  { name: "Huawei", count: 30 },
];

const batteryOptions = ["1821 мА·ч", "3000 мА·ч", "4500 мА·ч", "5000 мА·ч"];
const countries = ["Вьетнам", "Китай", "Южная Корея", "США"];
const collapsedFilters = [
  "Количество ядер",
  "Фронтальная камера",
  "Фотокамера",
  "Версия ОС",
  "Разъем для наушников",
];
const tags = [
  "Realme",
  "Игровые",
  "Оптимальные",
  "Смартфоны Samsung",
  "Смартфоны Apple",
  "Смартфоны",
];

const card =
  "group relative flex w-full flex-col overflow-hidden rounded-lg border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-[3px] before:origin-left before:scale-x-0 before:bg-gradient-to-r before:from-[#E8382D] before:to-orange-400 before:transition-transform before:duration-500 hover:border-[#E8382D]/40 hover:shadow-[0_22px_44px_-14px_rgba(232,56,45,0.45)] hover:before:scale-x-100 motion-safe:hover:-translate-y-1.5";

function ProductsPage() {
  const [minPrice, setMinPrice] = useState(300000);
  const [maxPrice, setMaxPrice] = useState(103300000);

  const [appliedMinPrice, setAppliedMinPrice] = useState(300000);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(103300000);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  const [activeTag, setActiveTag] = useState("Игровые");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const filters = {
        min_price: appliedMinPrice,
        max_price: appliedMaxPrice,
        page,
      };

      const result = await PostProductsFilter(filters);
      const items = result?.results ?? [];

      setFilteredProducts(items);

      if (result?.count) {
        const pageSize =
          result?.page_size || result?.limit || items.length || 1;
        setTotalPages(Math.ceil(result.count / pageSize));
      } else if (result?.total_pages) {
        setTotalPages(result.total_pages);
      } else if (result?.pages) {
        setTotalPages(result.pages);
      } else {
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Products API error:", err);
      setError("Не удалось загрузить товары");
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, appliedMinPrice, appliedMaxPrice]);

  const handleApplyFilter = () => {
    setCurrentPage(1);
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage || loading) {
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="ProductsPage min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="container_1200 py-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center lg:gap-46">
            <h1 className="text-[20px]">Смартфоны в Ташкенте</h1>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="flex items-center gap-2 text-gray-500 transition hover:text-[#ed3a2d] dark:text-white"
              >
                <GrMoney size={30} />
                <span>По цене</span>
              </button>

              <button
                type="button"
                className="flex items-center gap-2 text-gray-500 transition hover:text-[#ed3a2d] dark:text-white"
              >
                <MdFilterList size={30} />
                <span>По популярности</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Сетка"
            >
              <MdGridView
                size={25}
                color={viewMode === "grid" ? "#ed3a2d" : undefined}
                className={
                  viewMode === "grid" ? "" : "text-gray-500 dark:text-white"
                }
              />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="Список"
            >
              <MdViewList
                size={25}
                color={viewMode === "list" ? "#ed3a2d" : undefined}
                className={
                  viewMode === "list" ? "" : "text-gray-500 dark:text-white"
                }
              />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-10 lg:flex-row">
          <aside className="left h-fit w-full rounded-lg border border-gray-200 bg-white px-[30px] py-[30px] dark:border-gray-700 dark:bg-gray-800 lg:w-[360px]">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px]">Цена (сум)</h2>
              <GoChevronUp size={30} />
            </div>

            <div className="mt-5 flex">
              <div className="w-1/2 border border-gray-400 dark:border-gray-600">
                <p className="py-[13px] text-center text-gray-400 dark:text-white">
                  от {minPrice.toLocaleString()}
                </p>
              </div>

              <div className="w-1/2 border border-gray-400 dark:border-gray-600">
                <p className="py-[13px] text-center text-gray-400 dark:text-white">
                  до {maxPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="relative mt-6 h-6">
              <input
                type="range"
                min={0}
                max={103300000}
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(Math.min(Number(e.target.value), maxPrice - 1))
                }
                className="absolute z-20 w-full accent-[#ed3a2d]"
              />

              <input
                type="range"
                min={0}
                max={103300000}
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Math.max(Number(e.target.value), minPrice + 1))
                }
                className="absolute z-10 w-full accent-[#ed3a2d]"
              />
            </div>

            <div className="border-t border-gray-100 py-[30px] dark:border-gray-700">
              <h2 className="mb-3 text-[16px]">Наличие</h2>

              <label className="flex cursor-pointer items-center gap-3 rounded-md border border-[#ed3a2d] px-4 py-3">
                <input type="checkbox" defaultChecked className="peer hidden" />
                <span className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 text-xs text-white peer-checked:border-[#ed3a2d] peer-checked:bg-[#ed3a2d]">
                  ✓
                </span>
                <span className="text-[15px]">Забрать сегодня</span>
              </label>
            </div>

            <div className="border-t border-gray-100 py-[10px] dark:border-gray-700">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[16px]">Бренд</h2>
                <GoChevronUp size={30} />
              </div>

              <div className="flex flex-col gap-4">
                {brands.map((brand) => (
                  <label
                    key={brand.name}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <input type="checkbox" className="peer hidden" />
                    <span className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 text-xs text-white peer-checked:border-[#ed3a2d] peer-checked:bg-[#ed3a2d]">
                      ✓
                    </span>
                    <span className="text-[15px]">
                      {brand.name}{" "}
                      <span className="text-gray-400">({brand.count})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 py-[30px] dark:border-gray-700">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[16px]">Емкость аккумулятора</h2>
                <GoChevronUp size={30} />
              </div>

              <div className="flex flex-col gap-4">
                {batteryOptions.map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <input type="checkbox" className="peer hidden" />
                    <span className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 text-xs text-white peer-checked:border-[#ed3a2d] peer-checked:bg-[#ed3a2d]">
                      ✓
                    </span>
                    <span className="text-[15px] text-gray-500 dark:text-gray-300">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 py-[30px] dark:border-gray-700">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[16px]">Страна производитель</h2>
                <GoChevronUp size={30} />
              </div>

              <div className="flex flex-col gap-4">
                {countries.map((country) => (
                  <label
                    key={country}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <input type="checkbox" className="peer hidden" />
                    <span className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 text-xs text-white peer-checked:border-[#ed3a2d] peer-checked:bg-[#ed3a2d]">
                      ✓
                    </span>
                    <span className="text-[15px]">{country}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 border-t border-gray-100 py-[10px] dark:border-gray-700">
              {collapsedFilters.map((filter, index) => (
                <div
                  key={`${filter}-${index}`}
                  className="flex cursor-pointer items-center justify-between"
                >
                  <span className="text-[16px]">{filter}</span>
                  <GoChevronRight
                    size={22}
                    className="text-gray-400 dark:text-gray-300"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleApplyFilter}
              disabled={loading}
              className="mt-8 h-12 w-full cursor-pointer rounded-md bg-[#ed3a2d] text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Загрузка..." : "Показать"}
            </button>
          </aside>

          <main className="right min-w-0 flex-1">
            {loading && (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#ed3a2d]" />
              </div>
            )}

            {!loading && error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600">
                {error}
              </div>
            )}

            {!loading && !error && filteredProducts.length === 0 && (
              <div className="rounded-lg border border-gray-200 p-10 text-center text-gray-500 dark:border-gray-700">
                Товары не найдены
              </div>
            )}

            {!loading && !error && filteredProducts.length > 0 && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-3"
                    : "flex flex-col gap-4"
                }
              >
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} viewMode={viewMode} />
                ))}
              </div>
            )}

            {!loading && !error && filteredProducts.length > 0 && (
              <>
                <div className="m-auto py-8">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages || loading}
                    className="mx-auto block rounded-lg border border-red-600 px-4 py-2 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Показать еще
                  </button>

                  <div className="mt-5 flex justify-center">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="disabled:opacity-30"
                      >
                        <MdChevronLeft size={30} />
                      </button>

                      <div className="flex items-center gap-4">
                        {getPageNumbers().map((page, index) =>
                          page === "..." ? (
                            <span key={`dots-${index}`}>...</span>
                          ) : (
                            <button
                              type="button"
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`flex h-9 min-w-9 items-center justify-center rounded-md px-2 ${
                                currentPage === page
                                  ? "bg-[#ed3a2d] text-white"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                            >
                              {page}
                            </button>
                          ),
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="disabled:opacity-30"
                      >
                        <FaAngleRight size={25} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="mb-4 text-xl font-medium">
                    Популярные категории и модели
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setActiveTag(tag)}
                        className={`h-9 cursor-pointer rounded-full border px-4 text-sm transition-colors ${
                          activeTag === tag
                            ? "border-gray-200 bg-gray-200 text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mx-auto max-w-[1200px] px-4 py-8">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-[20px] font-semibold">
                      Товары дешевле:
                    </h2>

                    <a
                      href="#"
                      className="group flex items-center gap-2 text-[13px] font-light text-neutral-400 transition-colors hover:text-[#E8382D]"
                    >
                      Посмотреть все
                      <HiOutlineArrowLongRight className="h-7 w-7 transition-transform group-hover:translate-x-1.5" />
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-3">
                    {filteredProducts.slice(0,6).map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
