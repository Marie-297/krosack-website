"use client"; // if using in a Next.js app with server components

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Measuring Tools & Equipment that best suit your Preference",
      offer: "Offering the best @ Unbeatable Prices",
      buttonText1: "About Krosack",
      buttonText2: "Explore more",
      imgSrc: "/carousel1.png",
    },
    {
      id: 2,
      title: "Measuring Devices to inspire you...",
      offer: "Discover our top notch quality products",
      buttonText1: "About Krosack",
      buttonText2: "View All",
      imgSrc: "/carousel2.png",
    },
    {
      id: 3,
      title: "Products With Innovative Designs",
      offer: "We have the best deals ever!. Both wholesale and retail",
      buttonText1: "About Krosack",
      buttonText2: "Discover All",
      imgSrc: "/carousel3.webp",
    },
  ];

  return (
    <div className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        interval={3000}
        showIndicators
        stopOnHover
        swipeable
        emulateTouch
      >
        {sliderData.map((slide) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-blue-500 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center justify-between md:justify-normal mt-4 md:mt-6">
                <button className="md:px-10 px-2 md:py-2.5 py-2 bg-blue-500 rounded-lg text-white text-sm md:text-base font-bold">
                  {slide.buttonText1}
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 font-semibold md:text-sm whitespace-nowrap">
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-1 transition w-6 h-6"
                    src="/arrow.svg"
                    width={10}
                    height={10}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image className="md:w-72 w-48" src={slide.imgSrc} alt={slide.title} width={300} height={300} />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeaderSlider;
