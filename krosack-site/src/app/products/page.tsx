'use client'
import ItemCard from "@/components/Others/ItemCard";
import { productsDummyData } from "../../../public/assets/asset";
import { userContext } from "../../../context/AppContext";

const AllProducts = () => {

    const { products } = userContext();

    return (
      <>
        <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
          <div className="flex flex-col items-end pt-12">
              <p className="text-2xl font-bold">All Products</p>
              <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-col items-center gap-6 mt-12 pb-14 w-full">
              {products.map((product) => <ItemCard key={product._id} product={ product } />)}
          </div>
        </div>
      </>
    );
};

export default AllProducts;