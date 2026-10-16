import { createContext, useContext, useState, useEffect } from "react";

const ShopContext = createContext(null);

// LocalStorage'дан маълумот олиш учун ёрдамчи функция
const getInitialState = (key) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

export function ShopProvider({ children }) {
  // 1. Маълумотларни юкланишда localStorage'дан оламиз
  const [cart, setCart] = useState(() => getInitialState("cart"));
  const [favorites, setFavorites] = useState(() => getInitialState("favorites"));
  const [compare, setCompare] = useState(() => getInitialState("compare"));

  // 2. cart ўзгарганда localStorage'га сақлаш
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 3. favorites ўзгарганда localStorage'га сақлаш
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 4. compare ўзгарганда localStorage'га сақлаш
  useEffect(() => {
    localStorage.setItem("compare", JSON.stringify(compare));
  }, [compare]);

  const toggle = (setList, id) =>
    setList((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    );

  const value = {
    cart,
    favorites,
    compare,
    toggleCart: (id) => toggle(setCart, id),
    toggleFavorite: (id) => toggle(setFavorites, id),
    toggleCompare: (id) => toggle(setCompare, id),
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);