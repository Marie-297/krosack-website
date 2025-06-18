"use client"
import { useEffect, useState } from "react";
import { assets } from "../../../../public/assets/asset";
import ItemCard from "@/components/Others/ItemCard";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Others/Loading";
import { userContext } from "../../../../context/AppContext";
import React from "react";
import { FaCheck } from 'react-icons/fa'

const Product = () => {

  const { id } = useParams();

  const { products, router, addToCart } = userContext()

  const [mainImage, setMainImage] = useState<string | null>(null);
  const [productData, setProductData] = useState<any | null>(null);;

  useEffect(() => {
  if (products.length > 0 && id) {
    const product = products.find((product) => product._id === id);
    if (product) {
      setProductData(product);
    }
  }
  }, [id, products]);
  

  return productData ? (<>
    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="px-5 lg:px-16 xl:px-20">
          <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
            <Image
                src={mainImage || productData.image[0]}
                alt="alt"
                className="w-full h-auto object-cover mix-blend-multiply"
                width={1280}
                height={720}
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {productData.image.map((image:string, index: number) => (
              <div
                key={index}
                onClick={() => setMainImage(image)}
                className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
            >
                <Image
                  src={image}
                  alt="alt"
                  className="w-full h-auto object-cover mix-blend-multiply"
                  width={1280}
                  height={720}
                />
              </div>
            ))}
            </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-blue-500 mb-4">
            {productData.name}
          </h1>
          <hr className="border-t border-gray-300 mb-4" />
          <div>
            <h1 className="font-extrabold text-lg tracking-wider text-blue-950">Highlight:</h1>
            <ul className="text-gray-600 mt-3 list-disc list-inside space-y-1 ">
              {productData.highlight.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                <FaCheck className="text-green-950 mt-1" />
                <span>{item}</span>
              </li>
              ))}
            </ul>
          </div>
          {/* <p className="text-3xl font-medium mt-6">
            {productData.currency}{productData.offerPrice}
            <span className="text-base font-normal text-gray-800/60 line-through ml-2">
              {productData.currency}{productData.price}
            </span>
          </p> */}
           <div className="flex items-center mt-10 gap-4">
            <button onClick={() => addToCart(productData._id)} className="w-full py-3.5 bg-gray-100 text-blue-950 hover:bg-gray-200 transition">
              Request for price quote
            </button>
            <button onClick={() => { addToCart(productData._id); router.push('/cart') }} className="w-full py-3.5 bg-black text-white hover:bg-black/50 transition">
              Add to Cart
            </button>
          </div>
          <hr className="bg-gray-300 my-6" />
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full max-w-72">
              <tbody>
                <tr>
                  <td className="text-gray-600 font-medium">Brand</td>
                  <td className="text-gray-800/50 ">{productData.brand}</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Color</td>
                  <td className="text-gray-800/50 ">Multi</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Category</td>
                  <td className="text-gray-800/50">
                      {productData.category}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 border-t my-6" />
      <div>
        <h1 className="text-3xl font-medium text-blue-500 mb-4">
          Product Description
        </h1>
        <p className="text-gray-600 mt-3">
          {productData.description}
        </p>
      </div>
      <hr className="border-gray-300 border-t my-6" />
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <div className="flex flex-col">
          <h1 className="font-extrabold text-lg tracking-wider text-blue-950">Function:</h1>
          <ul className="text-gray-600 mt-3 list-disc list-inside space-y-1 ">
            {productData.function.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <h1 className="font-extrabold text-lg tracking-wider text-blue-950">Technical data:</h1>
          <table className="table-auto border border-gray-300 mt-6 w-full text-sm border-collapse">
            <tbody>
              {Object.entries(productData.technical).map(([key, value], index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2 font-medium border-r border-gray-300 text-gray-700 w-1/3">{key}</td>
                  <td className="px-4 py-2 text-gray-600">{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col bg-gray-100 px-10 items-center">
        <div className="flex flex-col items-center mb-4 lg:mt-16 mt-8">
            <p className="text-lg lg:text-3xl font-medium">Featured <span className="text-lg lg:font-medium text-blue-500">Products</span></p>
            <div className="w-28 h-0.5 bg-blue-500 mt-2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pb-14 w-full">
            {products.slice(0, 3).map((product) => <ItemCard key={product._id} product={product} />)}
        </div>
        <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
            See more
        </button>
      </div>
    </div>
  </>
  ) : <Loading />
};

export default Product;