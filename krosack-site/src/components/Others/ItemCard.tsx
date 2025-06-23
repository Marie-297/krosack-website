import React from 'react'
import { assets } from '../../../public/assets/asset';
import Image from 'next/image';
import { userContext } from '../../../context/AppContext';

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string[];
  currency: string;
  description: string;
  offerPrice: number;
};

const ItemCard = ({ product }: { product: Product }) => {

    const { router, addToCart } = userContext()
     if (!product) return null;

    return (
        <div
            onClick={() => { router.push('/products/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[300px] w-full cursor-pointer"
        >
            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-55 flex items-center justify-center">
              <Image
                  src={product.image?.[0] ?? "/public/logo.png"}
                  alt={product?.name || "null"}
                  className="group-hover:scale-105 transition object-contain bg-transparent w-4/5 h-4/5 md:w-full md:h-full"
                  width={800}
                  height={800}
              />
              <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md" title='btn'>
                <Image
                    className="h-3 w-3"
                    src={assets.heart_icon}
                    alt="heart_icon"
                />
              </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full text-left truncate">{product.name}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>

            <div className="flex items-end justify-between w-full mt-1">
              <button
                onClick={() => { router.push('/products/' + product._id); scrollTo(0, 0) }}
                className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-blue-600 hover:text-white transition" type='button' title='view-product'
              >
                View
              </button>
              <button onClick={(e) => {addToCart(product._id); e.stopPropagation();}} className="max-sm:hidden px-4 py-1.5 text-white border bg-black border-gray-500/20 rounded-lg text-xs hover:bg-transparent hover:text-gray-500 transition" type='button' title='add-to-cart'>
                Add to Cart
              </button>
            </div>
        </div>
    )
}

export default ItemCard