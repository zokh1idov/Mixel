import { useEffect, useState } from "react";
import ProductCard from "../../Componets/ProductCard/ProductCard";
import { getProducts } from "../../Sevices/App";

function SearchResultsPage({searchResults}) {

  

  return (
    <div className="dark:bg-gray-900">
      <div className="container_1200 pb-30">
        <div className="py-[26px] text-sm text-gray-400 dark:text-gray-300">
          Главная
          <span className="mx-1">›</span>
          Результаты поиска
        </div>


          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
           {

            

            searchResults?.map((p)=>
            <ProductCard key={p.id} product={p}/>
            
            )

           }
          </div>
      </div>
    </div>
  );
}

export default SearchResultsPage;
