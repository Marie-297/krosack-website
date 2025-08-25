'use client'
import React, { useEffect, useState } from "react";
import { assets, productsDummyData } from "../../../../public/assets/asset";
import Image from "next/image";
import { userContext } from "../../../../context/AppContext";
import Loading from "@/components/Others/Loading";

const ProductList = () => {

  const { router, products } = userContext()

  const [productData, setProductData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true)
  const [mainImage, setMainImage] = useState<string | null>(null);

  const handleEdit = (id: string) => {
  router.push(`/admin/productLists/${id}`);
};

const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const res = await fetch(`/api/product/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete product");

    setProductData((prev: any) => prev.filter((p: any) => p.id !== id));
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete product");
  }
};


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/product');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        if (Array.isArray(data.products) && data.products.length > 0) {
          setProductData([...productsDummyData, ...data.products]);
        } else {
          setProductData(productsDummyData);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setProductData(productsDummyData);
      }finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const images: string[] = Array.isArray(productData?.imageUrl)
    ? productData.imageUrl
    : productData?.imageUrl
      ? [productData.imageUrl]
      : [];

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? <Loading /> : <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Product</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className=" table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">Product</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Category</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {productData.map((product:any, index: number) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="bg-yellow-300 rounded p-2">
                      <Image
                        src={product.imageUrl?.[0] || assets.fallbackProduct}
                        alt="product Image"
                        className="w-16"
                        width={1280}
                        height={720}
                      />
                    </div>
                    <span className="truncate w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">{product.category?.name}</td>
                  <td className="px-4 py-3 max-sm:hidden text-center">
                    <div className="flex gap-2 items-center justify-center">
                      <button onClick={() => router.push(`/products/${product.id}`)} className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-blue-500 text-white rounded-md">
                        <span className="hidden md:block">View</span>
                      </button>
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
    </div>
  );
};

export default ProductList;