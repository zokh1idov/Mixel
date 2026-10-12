import { useState, useEffect } from "react";
import PopularCategories from "../../Pages/PopularCategories/PopularCategories"
import { Brands } from "./Sections/Brands/Brands";
import Cards from "./Sections/Card/Cards";
import Recomend from "./Sections/Discount/Recomend";
import Gaget from "../../../src/Pages/Home/Sections/Gagets/Gaget";
import Product from "./Sections/Products/Product";
import { getProducts } from "../../Sevices/App";

function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    getProducts()
      .then((result) => {
        setAllProducts(result?.results ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Gaget products={allProducts.slice(0, 10)} loading={loading} /> 
      <PopularCategories />
      <Product />
      <Cards products={allProducts.slice(0, 10)} loading={loading}  />
      <Recomend products={allProducts.slice(0, 12)}  loading={loading} />
      <Brands />
    </>
  );
}

export default Home;