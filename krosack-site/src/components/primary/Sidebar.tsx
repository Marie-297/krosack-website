"use client"

import React from 'react';
import Link from 'next/link';
import { assets } from '../../../public/assets/asset';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname()
    const menuItems = [
        { name: 'Add Product', path: '/admin', icon: assets.add },
        { name: 'All Products', path: '/admin/productLists', icon: assets.list },
        { name: 'All P.O.', path: '/admin/orders', icon: assets.order },
    ];

    return (
        <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-300 py-2 flex flex-col shadow-2xl'>
            {menuItems.map((item) => {

                const isActive = pathname === item.path;

                return (
                    <Link href={item.path} key={item.name} passHref>
                        <div
                            className={
                                `flex md:flex-row flex-col items-center py-3 px-4 gap-3 ${isActive
                                    ? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-500/90"
                                    : "hover:bg-gray-100/50 border-white"
                                }`
                            }
                        >
                            <Image
                                src={item.icon}
                                alt={`${item.name.toLowerCase()}_icon`}
                                className="w-7 h-7"
                            />
                            <p className='text-[8px] md:text-base text-center'>{item.name}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBar;