'use client'

import { productsDummyData, userDummyData } from '../public/assets/asset'
import { useRouter } from 'next/navigation'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { useUser } from "@clerk/nextjs"
import type { UserResource } from "@clerk/types";

// Define types for product and user (adjust according to actual structure)
interface Product {
  _id: string
  brand?: string
  userId: string;
  image: string[]
  description: string
  highlight?: string[]
  function?: string[]
  name: string
  color: string
  highDemand: boolean
  technical: {
    [key: string]: string | undefined;
  }
  category: string;
  date: number
  __v: number
  price: number
  offerPrice: number
  currency: string
  [key: string]: any
}

interface User {
  id: string
  name: string
  [key: string]: any
}

interface AppContextType {
  user?: UserResource | null
  currency: string | undefined
  router: ReturnType<typeof useRouter>
  isClient: boolean
  setIsClient: (value: boolean) => void
  userData: User | false
  fetchUserData: () => Promise<void>
  products: Product[]
  fetchProductData: () => Promise<void>
  cartItems: { [itemId: string]: number }
  setCartItems: (items: { [itemId: string]: number }) => void
  addToCart: (itemId: string) => Promise<void>
  updateCartQuantity: (itemId: string, quantity: number) => Promise<void>
  getCartCount: () => number
  getCartAmount: () => number
}

// Create context with default undefined
export const AppContext = createContext<AppContextType | undefined>(undefined)

// Custom hook with error guard
export const userContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('userContext must be used within an AppContextProvider')
  }
  return context
}

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY
  const router = useRouter()
  const {user} = useUser();

  const [products, setProducts] = useState<Product[]>([])
  const [userData, setUserData] = useState<User | false>(false)
  const [isClient, setIsClient] = useState<boolean>(true)
  const [cartItems, setCartItems] = useState<{ [itemId: string]: number }>({})

  const fetchProductData = async () => {
    setProducts(productsDummyData)
  }

  const fetchUserData = async () => {
  const formattedUser = {
    id: userDummyData._id,
    name: userDummyData.name,
    email: userDummyData.email,
    imageUrl: userDummyData.imageUrl,
    cartItems: userDummyData.cartItems,
    __v: userDummyData.__v,
  };
  setUserData(formattedUser);
};


  const addToCart = async (itemId: string) => {
    const cartData = structuredClone(cartItems)
    if (cartData[itemId]) {
      cartData[itemId] += 1
    } else {
      cartData[itemId] = 1
    }
    setCartItems(cartData)
  }

  const updateCartQuantity = async (itemId: string, quantity: number) => {
    const cartData = structuredClone(cartItems)
    if (quantity === 0) {
      delete cartData[itemId]
    } else {
      cartData[itemId] = quantity
    }
    setCartItems(cartData)
  }

  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, qty) => acc + qty, 0)
  }

  const getCartAmount = () => {
    let totalAmount = 0
    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => p._id === itemId)
      if (itemInfo && cartItems[itemId] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[itemId]
      }
    }
    return Math.floor(totalAmount * 100) / 100
  }

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    fetchProductData();
    fetchUserData();
  }, []);

  const value: AppContextType = {
    user,
    currency,
    router,
    isClient,
    setIsClient,
    userData,
    fetchUserData,
    products,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
  }

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  )
}
