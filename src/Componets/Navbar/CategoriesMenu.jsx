import { useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { getCategories, getProducts } from "../../Sevices/App.js"; // yo'lni o'zingizdagiga moslang

const formatPrice = (n) => Number(n ?? 0).toLocaleString("ru-RU");
const productLink = (product) => `/deteil/${product.id}`;

export function CategoriesMenu({ onLinkClick }) {
  const [categories, setCategories] = useState([]);
  const [productsMap, setProductsMap] = useState({}); // { [categoryId]: [products] }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Kategoriyalar
  useEffect(() => {
    let ignore = false;

    getCategories({ page_size: 100 }).then((data) => {
      if (ignore) return;
      if (!data) {
        setError("Не удалось загрузить категории");
      } else {
        const list = data.results ?? [];
        setCategories(list);
        setActiveId(list[0]?.id ?? null);
      }
      setLoading(false);
    });

    return () => {
      ignore = true;
    };
  }, []);

  // Tanlangan (desktop) yoki ochilgan (mobile) kategoriya mahsulotlari, har biri bir marta yuklanadi
  useEffect(() => {
    [activeId, openId].forEach((id) => {
      if (id == null || productsMap[id] !== undefined) return;
      getProducts({ category: id, page_size: 50 }).then((data) => {
        setProductsMap((prev) => ({ ...prev, [id]: data?.results ?? [] }));
      });
    });
  }, [activeId, openId, productsMap]);

  const activeCategory = categories.find((item) => item.id === activeId);
  const activeProducts = productsMap[activeId];

  // O'ng tomonda ko'rsatiladigan rasm: mahsulot ustida turilsa o'sha mahsulotniki, aks holda kategoriyaniki
  const previewImage = hoveredProduct?.main_image ?? activeCategory?.image;
  const previewAlt = hoveredProduct?.name ?? activeCategory?.name;

  const selectCategory = (id) => {
    setActiveId(id);
    setHoveredProduct(null);
  };

  const wrapper =
    "absolute left-0 right-0 top-full z-50 max-h-[75vh] overflow-y-auto border-t border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 lg:max-h-none lg:overflow-visible";

  if (loading) {
    return (
      <div className={wrapper}>
        <p className="container_1200 px-4 py-6 text-gray-500">Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={wrapper}>
        <p className="container_1200 px-4 py-6 text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={wrapper}>
      {/* Mobile */}
      <div className="container_1200 px-4 py-2 lg:hidden">
        {categories.map((item) => {
          const isOpen = openId === item.id;
          const products = productsMap[item.id];
          return (
            <div
              key={item.id}
              className="border-b border-gray-100 last:border-b-0 dark:border-gray-800"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center gap-3 py-3 text-left"
              >
                <img src={item.icon} alt="" className="h-7 w-7 shrink-0 object-contain" />
                <span className="flex-1 text-[15px] text-black dark:text-white">
                  {item.name}
                </span>
                <MdChevronRight
                  size={24}
                  className={`shrink-0 text-gray-600 transition-transform dark:text-gray-300 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mb-2 ml-10 flex max-h-72 flex-col overflow-y-auto">
                  {products === undefined && (
                    <span className="py-2 text-sm text-gray-500">Загрузка...</span>
                  )}
                  {products?.length === 0 && (
                    <span className="py-2 text-sm text-gray-500">Нет товаров</span>
                  )}
                  {products?.map((product) => (
                    <Link
                      to={productLink(product)}
                      key={product.id}
                      onClick={onLinkClick}
                      className="flex items-center gap-3 rounded py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <img
                        src={product.main_image}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded bg-white object-contain"
                      />
                      <span>{product.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop */}
      <div className="container_1200 relative hidden gap-6 py-6 lg:flex">
        {/* Chap: kategoriyalar */}
        <div className="w-[280px] shrink-0">
          {categories.map((item) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => selectCategory(item.id)}
                onClick={() => selectCategory(item.id)}
                className={`grid cursor-pointer grid-cols-[32px_1fr_24px] items-center gap-4 rounded-lg px-4 py-3 transition-colors ${
                  isActive ? "bg-gray-100 dark:bg-gray-800" : ""
                }`}
              >
                <img src={item.icon} alt="" className="h-8 w-8 object-contain" />
                <span
                  className={`text-[16px] ${
                    isActive ? "text-red-500" : "text-black dark:text-white"
                  }`}
                >
                  {item.name}
                </span>
                <MdChevronRight size={24} className="text-gray-600 dark:text-gray-300" />
              </div>
            );
          })}
        </div>

        {/* O'rta: mahsulotlar */}
        {activeCategory && (
          <div className="w-[360px] shrink-0 px-2">
            <h3 className="mb-4 text-[26px] font-normal text-black dark:text-white">
              {activeCategory.name}
            </h3>

            <div
              className="max-h-[420px] overflow-y-auto pr-2"
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {activeProducts === undefined && (
                <p className="px-2 py-3 text-gray-500">Загрузка...</p>
              )}
              {activeProducts?.length === 0 && (
                <p className="px-2 py-3 text-gray-500">Нет товаров</p>
              )}
              {activeProducts?.map((product) => (
                <Link
                  to={productLink(product)}
                  key={product.id}
                  onClick={onLinkClick}
                  onMouseEnter={() => setHoveredProduct(product)}
                  onFocus={() => setHoveredProduct(product)}
                  className={`block rounded px-2 py-4 text-[15px] transition-colors hover:text-red-500 ${
                    hoveredProduct?.id === product.id
                      ? "bg-gray-50 text-red-500 dark:bg-gray-800"
                      : "text-black dark:text-white"
                  }`}
                >
                  {product.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* O'ng: rasm (mahsulot yoki kategoriya) */}
        {activeCategory && (
          <div className="min-w-0 flex-1 pl-6">
            {hoveredProduct ? (
              <Link
                to={productLink(hoveredProduct)}
                onClick={onLinkClick}
                className="flex h-[340px] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg bg-white p-4 text-center"
              >
                <img
                  key={hoveredProduct.id}
                  src={previewImage}
                  alt={previewAlt}
                  className="min-h-0 max-h-full max-w-full flex-1 object-contain"
                />
                <div>
                  <p className="text-sm font-medium text-black">{hoveredProduct.name}</p>
                  <p className="text-sm font-bold text-[#E8382D]">
                    {formatPrice(hoveredProduct.discount_price || hoveredProduct.price)} сум
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex h-[340px] w-full items-center justify-center overflow-hidden rounded-lg bg-white p-4">
                <img
                  key={activeCategory.id}
                  src={previewImage}
                  alt={previewAlt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}