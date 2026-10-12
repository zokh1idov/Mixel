import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthModal from "./Componets/AuthModal/AuthModal";
import { Footer } from "./Componets/Footer/Footer";
import { Hero } from "./Componets/Hero/Hero";
import { Navbar } from "./Componets/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import ProductDteil from "./Pages/Deteil/ProductDteil";
import CheckoutPage from "./Pages/Checkoutpage/Checkoutpage";
import SearchResultsPage from "./Pages/SearchResultsPage/SearchResultsPage";
import InfoPage from "./Pages/InfoPage/InfoPage";
import ComparePage from "./Pages/ComparePage/ComparePage";
import Wishlist from "./Pages/Wishlist/Wishlist";
import SingUp from "./Pages/Home/Register/SingUp/SingUp";
import Login from "./Pages/Home/Register/Login/Login";
import { useEffect, useState } from "react";
import { getProducts } from "./Sevices/App";
import { Toaster } from "sonner";
function App() {
  const [products, setProducts] = useState([]);
  const [loading,setLoading]=useState(true)
  const [searchResults, setSearchResults] = useState([]);

  const filterData = (text) => {
    const filtered = products.results.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setSearchResults(filtered);
  };
  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false)
    });

  }, []);
  return (
    <>
    <Toaster position="top-center"  expand={false} richColors duration={2000}/>
      <Navbar filterData={filterData} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Home />
            </>
          }
        />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/category/:id" element={<ProductsPage />} />
        <Route path="/Deteil/:id" element={<ProductDteil />} />
        <Route
          path="/search"
          element={<SearchResultsPage searchResults={searchResults} />}
        />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/ComparePage" element={<ComparePage products={products } />} />
        <Route path="/Wishlist" element={<Wishlist products={products } loading={loading} />}  />
        <Route path="/SingUp" element={<SingUp />} />

        <Route path="/Login" element={<Login />} />
      </Routes>
      <AuthModal />
      <Footer />
    </>
  );
}

export default App;