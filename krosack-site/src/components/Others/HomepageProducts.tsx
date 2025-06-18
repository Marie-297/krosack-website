import React from "react";
import ItemCard from "./ItemCard";
import { userContext } from "../../../context/AppContext";

const HomeProducts = () => {
  const { products, router } = userContext()

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-center w-full">Popular products</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products?.slice(0, 8).map(( product ) => (<ItemCard key={product._id} product={ product } />))}
      </div>
      <button onClick={() => { router.push('/products') }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
        See more
      </button>
    </div>
  );
};

export default HomeProducts;