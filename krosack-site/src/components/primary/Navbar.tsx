"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { HiMenu, HiX } from "react-icons/hi"


export default function Navbar() {
   const [menuOpen, setMenuOpen] = useState(false)

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
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md border border-gray-300 rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {!menuOpen && (
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Open Menu">
              <HiMenu size={28} />
            </button>
          </div>
        )}


        <ul className="hidden md:flex space-x-6">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link href="/products" className="hover:text-blue-600">Products</Link></li>
          <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
        </ul>

        {menuOpen && (
          <div className="absolute top-2 right-6 w-1/3 bg-white px-6 py-4 shadow-md z-50 md:hidden">
            <div className="flex">
              <button
                onClick={toggleMenu}
                aria-label="Close Menu"
                className="absolute top-2 right-2"
              >
                <HiX size={28} />
              </button>
            </div>
            <ul className="flex flex-col space-y-2 mt-4 md:hidden">
              <li><Link href="/" className="hover:text-blue-600" onClick={toggleMenu}>Home</Link></li>
              <li><Link href="/products" className="hover:text-blue-600" onClick={toggleMenu}>Products</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600" onClick={toggleMenu}>Contact</Link></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
