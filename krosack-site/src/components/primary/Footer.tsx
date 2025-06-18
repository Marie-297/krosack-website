import React from 'react'
import Image from "next/image"
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '../ui/dropdown-menu'

function Footer() {
  return (
    <div className='w-full bg-blue-500 text-white'>
      {/* Footer Top */}
      <div className='px-10 lg:px-40 xl:px-80 py-10 text-xs md:text-base'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8'>
          <div className='flex flex-col gap-5'>
            <h1 className='font-extrabold tracking-wider'>OUR COMPANY</h1>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2'>
                <Image src="/num.svg" alt="list" width={8} height={8}/>
                <Link href={""} className="cursor-pointer hover:underline hover:text-yellow-500 transition duration-300">About Us</Link>
              </div>
              <div className='flex gap-2'>
                <Image src="/num.svg" alt="list" width={8} height={8}/>
                <Link href={""} className="cursor-pointer hover:underline hover:text-yellow-500 transition duration-300">Our Products</Link>
              </div>
              <div className='flex gap-2'>
                <Image src="/num.svg" alt="list" width={8} height={8}/>
                <Link href={""} className="cursor-pointer hover:underline hover:text-yellow-500 transition duration-300">Contact Us</Link>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <h1 className='font-extrabold tracking-wider'>FOLLOW US</h1>
            <div className='flex flex-col'>
              <div className='flex gap-2'>
                <Image src="/num.svg" alt="list" width={8} height={8}/>
                <Link href={""} className="cursor-pointer hover:underline hover:text-yellow-500 transition duration-300">Facebook</Link>
              </div>
              <div className='flex gap-2'>
                <Image src="/num.svg" alt="list" width={8} height={8}/>
                <Link href={""} className="cursor-pointer hover:underline hover:text-yellow-500 transition duration-300">LinkedIn</Link>
              </div>
              <div className='flex gap-2'>
                <Image src="/num.svg" alt="list" width={8} height={8}/>
                <Link href={""} className="cursor-pointer hover:underline hover:text-yellow-500 transition duration-300">Twitter</Link>
              </div>
              <div className='flex gap-2'>
                <Image src="/num.svg" alt="list" width={8} height={8}/>
                <Link href={""} className="cursor-pointer hover:underline hover:text-yellow-500 transition duration-300">Instagram</Link>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <h1 className='font-extrabold tracking-wider'>KROSACK</h1>
            <div className='flex flex-col'>
              <div className='flex gap-2'>
                <Image src="/address.svg" alt="postal-address" width={15} height={15}/>
                <p>P. O. Box AN 11599, Accra North</p>
              </div>
              <div className='flex gap-2'>
                <Image src="/mail.svg" alt="email" width={15} height={15}/>
                <Link className="cursor-pointer hover:underline hover:text-yellow-500 transition duration-300" href="mailto:krosack2013@yahoo.com" target="_blank">krosack2013@yahoo.com</Link>
              </div>
              <div className='flex gap-2'>
                <Image src="/call.svg" alt="dial" width={15} height={15}/>
                <div className="flex gap-1 items-center">
                  {[
                    { label: "+233249350297", number: "233249350297" },
                    { label: "+233241664998", number: "233241664998" },
                  ].map((contact, idx, arr) => (
                    <div className="flex items-center gap-1" key={idx}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="cursor-pointer text-left text-white hover:underline hover:text-yellow-500 transition duration-300">
                            {contact.label}
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white text-black">
                          <DropdownMenuItem asChild>
                            <Link href={`tel:+${contact.number}`} target="_blank" className='hover:text-blue-500 hover:bg-yellow-400 transition duration-300'>📞 Call</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`https://wa.me/${contact.number}`} target="_blank" className='hover:text-blue-500 hover:bg-yellow-400 transition duration-300'>💬 WhatsApp</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      {idx < arr.length - 1 && <span>/</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className='shadow-2xl py-2 px-10 flex flex-wrap justify-evenly gap-y-2 items-center border-t-1 border-gray-50/25 lg:text-center'>
        <p className=' text-[8px] lg:text-sm'>Copyright &copy; 2025 Krosack. All Rights Reserved</p>
        <div className='flex gap-3 text-[8px] lg:text-sm'>
          <Image
            src="/flag.png"
            alt="Ghana"
            width={20}
            height={10}
          />
          <Link className="hover:underline hover:text-yellow-500 transition duration-300" href={""}>Privacy Policy</Link>
          <Link className="hover:underline hover:text-yellow-500 transition duration-300" href={""}>Website Notice</Link>
          <Link className="hover:underline hover:text-yellow-500 transition duration-300" href={""}>Website Cookies</Link>
        </div>
        <div>
          <Image
            src="/white-logo.png"
            alt="Ghana"
            width={150}
            height={300}
          />
        </div>
      </div>
    </div>
  )
}

export default Footer
