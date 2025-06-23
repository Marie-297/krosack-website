"use client";
import React, { useEffect, useState } from "react";

interface ArrowScrollContainerProps {
  children: React.ReactNode[];
  className?: string;
}

const ArrowScrollContainer = ({ children, className = "" }: ArrowScrollContainerProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const totalItems = children.length;

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsPerPage(3);
      else if (width >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const maxIndex = Math.max(0, totalItems - itemsPerPage);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0)); // Scroll one item at a time
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <div className={`relative w-full ${className}`}>
      {startIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full"
        >
          ◀
        </button>
      )}
      {startIndex < maxIndex && (
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full"
        >
          ▶
        </button>
      )}

      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 gap-6"
          style={{
            transform: `translateX(-${(100 / itemsPerPage) * startIndex}%)`,
            width: `${(100 / itemsPerPage) * totalItems}%`,
          }}
        >
          {children.map((child, idx) => (
            <div
              key={idx}
              style={{
                flex: `0 0 ${100 / itemsPerPage}%`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArrowScrollContainer;
