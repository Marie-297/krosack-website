"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { Button } from "@/components/ui/button";
import { IoCart } from "react-icons/io5";
import HeaderSlider from "@/components/Others/HeaderSlides";
import HomeProducts from "@/components/Others/HomepageProducts";
import HighDemandProduct from "@/components/Others/HighDemand";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeaderSlider />

      {/* Below the carousel */}
      <div className="text-center py-8">
        <h1>OUR COMPANY</h1>
        <p className="text-gray-400 text-base">Welcome to <span className="text-blue-600 font-semibold">KROSACK</span>. We are a major distributor of Industrial and Laboratory Equipments, Chemicals, Glassware and Diagnostics for Hospital, Laboratories and General Merchants. Our products are Crafted and delivered by top-tier, globally recognized manufacturers.</p>
        <HighDemandProduct />
        <HomeProducts />
      </div>
    </div>
  );
}