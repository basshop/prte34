'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Index() {
  const banners = [
    { id: 1, img: "https://img2.pic.in.th/pic/Banner61dc21c81c127e35.png" }
  ]

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [banners.length])

  return (
    <div className="container mx-auto flex justify-between items-center max-w-7xl px-4 mt-20">
      {/* แบนเนอร์ Carousel */}
      <div className="max-w-[2000px] mx-auto mt-2 mb-4 relative overflow-hidden rounded-xl">
        <div className="relative flex justify-center items-center">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`transition-opacity duration-700 ease-in-out ${
                index === current ? "opacity-100" : "opacity-0 absolute"
              }`}
            >
              <Image
                src={banner.img}
                alt={`Banner ${banner.id}`}
                width={2000}
                height={500}
                className="rounded-xl object-cover"
                priority={index === current}
              />
            </div>
          ))}
        </div>

        {/* ปุ่ม Prev */}
        {banners.length > 1 && (
          <button
            onClick={() =>
              setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
            }
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
          >
            ❮
          </button>
        )}

        {/* ปุ่ม Next */}
        {banners.length > 1 && (
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
          >
            ❯
          </button>
        )}
      </div>
      
    </div>
    
    
  )
}
