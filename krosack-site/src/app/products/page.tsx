'use client'
import ItemCard from "@/components/Others/ItemCard";
import { productsDummyData } from "../../../public/assets/asset";
import { userContext } from "../../../context/AppContext";
import { useEffect, useState } from "react";

const AllProducts = () => {

    // const { products } = userContext();
    const [products, setProducts] = useState(productsDummyData);

    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/product');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        if (Array.isArray(data.products) && data.products.length > 0) {
          setProducts([...productsDummyData, ...data.products]);
        } else {
          setProducts(productsDummyData);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts(productsDummyData);
      }
    };

    fetchProducts();
  }, []);

    return (
      <>
        <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
          <div className="flex flex-col items-end pt-12">
            <p className="text-2xl font-bold">All Products</p>
            <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-col items-center gap-6 mt-12 pb-14 w-full">
              {products.map((product) => <ItemCard key={product.id} product={ product } />)}
          </div>
        </div>
      </>
    );
};

export default AllProducts;