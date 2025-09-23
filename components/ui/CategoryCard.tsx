"use client";
import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  id: string | number;
  name: string;
  img?: string;
  productCount?: number;
  mainColor?: string;
}

export function CategoryCard({
  id,
  name,
  img = "/image copy 2.png",
  productCount = 0,
  mainColor = "#17aeff",
}: CategoryCardProps) {
  return (
    <Link href={`/category/${id}`} className="no-underline">
      <div
        className="relative p-2 border rounded-md transition-all duration-300 group bg-white"
        style={{ borderColor: "#ddd", borderRadius: "1vh" }}
      >
        {/* รูป */}
        <Image
          src={img}
          alt={name}
          width={500}
          height={300}
          className="rounded-md w-full transition-all duration-300 group-hover:grayscale"
        />

        {/* เอฟเฟกต์แสง */}
        <div className="absolute inset-0 rounded-md bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.3)_60%,rgba(255,255,255,0)_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        {/* ป้าย “ดูรายละเอียด” */}
        <div
          className="absolute px-3 py-1 text-white text-sm rounded-md border transform -translate-x-1/2 -translate-y-1/2 scale-0 transition-transform duration-300 group-hover:scale-100"
          style={{
            top: "50%",
            left: "50%",
            background: mainColor,
            borderColor: mainColor,
          }}
        >
          ดูรายละเอียด
        </div>

        {/* ข้อความด้านล่าง */}
        <p className="mt-1 font-medium text-gray-800 truncate">{name}</p>
        <p className="mt-0 text-gray-500 text-sm">
          มีสินค้าทั้งหมด {productCount} ชิ้น
        </p>
      </div>
    </Link>
  );
}
