"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import { FaSearch } from "react-icons/fa"
import { FaCartShopping } from "react-icons/fa6";
import { userContext } from "../../../context/AppContext"
import { useUser, useClerk, UserButton } from "@clerk/nextjs"
import { FaUserCircle } from "react-icons/fa";
import { assets, BagIcon, CartIcon } from "../../../public/assets/asset"
import { FaLock } from "react-icons/fa";
import { toast } from "sonner";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartCount, isAdmin, router, user } = userContext();
  const handleAdminLogin = () => {
  const code = prompt("Enter admin code to access sign-in:");

  if (code === process.env.NEXT_PUBLIC_ADMIN_SECRET_CODE) {
    openSignIn?.();
  } else {
    toast.error("Incorrect code. Access denied.");
  }
};
  const { openSignIn } = useClerk();

  const toggleMenu = () => setMenuOpen(!menuOpen)
  return (
    <nav className="bg-white shadow-2xl px-6 py-1 relative">
      <div className="flex justify-between items-center lg:px-44 lg:flex-row-reverse">
        <Link href="/" className="flex items-center space-x-2">
          {/* On smaller screen */}
          <Image
            src="/logo.png"
            alt="Krosack Logo"
            width={80}
            height={80}
            className="lg:hidden block"
          />
          {/* On larger screens */}
          <Image
            src="/midlogo.png"
            alt="Krosack Logo"
            width={150}
            height={150}
            className="hidden lg:block"
          />
        </Link>

        <div className="hidden md:flex flex-1 justify-center mx-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-md border border-gray-300 rounded-full px-4 py-1 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              title="search"
              className="absolute right-0 top-1/2 transform bg-gray-100 rounded-r-full -translate-y-1/2 text-gray-500 hover:text-blue-500 h-full w-12 border-l-2 border-gray-300 border flex items-center justify-center active:scale-95 transition-transform duration-100"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {!menuOpen && (
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Open Menu">
              <HiMenu size={28} />
            </button>
          </div>
        )}


        <ul className="hidden md:flex space-x-6">
          <div className="flex items-center gap-3">
            {user ? ( <button title="account" className="flex items-center gap-2 hover:text-gray-900 transition">
              <div className="flex gap-2 justify-center items-center">
                <UserButton appearance={{elements: { userButtonAvatarBox: "w-8 h-8",},}}
                >
                  <UserButton.MenuItems>
                    <UserButton.Action label="My Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')}/>
                    <UserButton.Action label="My Request/Orders" labelIcon={<BagIcon />} onClick={() => router.push('/orders')}/>
                  </UserButton.MenuItems>
                </UserButton>
                <div>
                  <p className="text-xs">{user.firstName || user.fullName || "User"}</p>
                  <p className="text-[8px] text-gray-400">ADMIN</p>
                </div>
              </div>
            </button>
             ) : (
              <button
                onClick={handleAdminLogin}
                className="hover:text-blue-600 transition"
                title="Admin Login"
              >
                <FaLock size={14} />
              </button>
            )}
          </div>
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link href="/products" className="hover:text-blue-600">Products</Link></li>
          <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
          <li><Link href="/cart" className="hover:text-blue-600 flex gap-1 items-center">
            Cart
            <div className="relative">
              <FaCartShopping className="text-xl" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {getCartCount()}
                </span>
              )}
            </div>
          </Link></li>
          <li>
            {user && <button title="btn" onClick={() => router.push("/admin")}>Dashboard</button>}
          </li>
        </ul>

        {menuOpen && (
          <div className="absolute top-2 right-6 w-64 bg-white px-6 py-4 shadow-md z-50 md:hidden space-y-4 rounded-md overflow-visible">
            <button
              onClick={toggleMenu}
              aria-label="Close Menu"
              className="absolute top-2 right-2"
            >
              <HiX size={28} />
            </button>

            <div className="flex items-center gap-3 mt-6">
              {user ? (
                <div className="relative z-[60] flex gap-2">
                  <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
                  <div>
                    <p className="text-sm font-medium">{user.firstName || user.fullName}</p>
                    <p className="text-[10px] text-gray-400">ADMIN</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleAdminLogin}
                  className="flex items-center gap-2 text-blue-600 absolute top-2 left-2"
                  title="Admin Login"
                >
                  <FaLock size={14} />
                </button>
              )}
            </div>

            <ul className="flex flex-col gap-3 text-sm mt-4">
              <li><Link href="/" onClick={toggleMenu}>Home</Link></li>
              <li><Link href="/products" onClick={toggleMenu}>Products</Link></li>
              <li><Link href="/contact" onClick={toggleMenu}>Contact</Link></li>
              {!user && ( <li><Link href="/cart" onClick={toggleMenu}>Cart</Link></li> )}
              {user && (
              <>
                <li><Link href="/cart" onClick={toggleMenu}>My Cart</Link></li>
                <li><Link href="/orders" onClick={toggleMenu}>My Orders</Link></li>
                <li><button onClick={() => {
                  toggleMenu();
                  router.push("/Client");
                }}>Dashboard</button></li>
              </>
            )}
            </ul>
          </div>
        )}

      </div>
    </nav>
  )
}
