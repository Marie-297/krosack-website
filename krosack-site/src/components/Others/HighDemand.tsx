import React from "react";
import { userContext } from "../../../context/AppContext";
import Image from "next/image";
import ItemCard from "./ItemCard";
import ArrowScrollContainer from "../primary/HorizontalScroll";

const HighDemandProduct = () => {
  const {products} = userContext();
  const featuredProducts = products.filter(product => product.highDemand);

  if (featuredProducts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No featured products available at the moment.
      </div>
    );
  }
  return (
    <div className="mt-14 bg-gray-100/50 py-10 px-8">
      <div className="flex flex-col items-center">
        <p className="text-xl md:text-3xl font-medium">High Demand Products</p>
        <div className="w-28 h-0.5 bg-blue-500 mt-2"></div>
      </div>

      <div className="mt-10 lg:px-24 px-5">
        <ArrowScrollContainer>
          {featuredProducts.map(product => (
            <ItemCard key={product._id} product={product} />
          ))}
        </ArrowScrollContainer>
      </div>
    </div>
  );
};

export default HighDemandProduct;