"use client";
import Link from "next/link";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  LogOut,
  Settings,
  User,
  CreditCard,
  Gift,
  ShoppingCart,
  LayoutDashboard,
} from "lucide-react";

export function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full ring-offset-background focus:outline-none">
          <Avatar className="h-5 w-5 rounded-full">
            <AvatarImage
              src="/image copy 5.png"
              alt="Profile"
              className="rounded-full object-cover h-8 w-8"
            />
            <AvatarFallback className="rounded-full text-xs h-5 w-5">U</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-52 bg-white text-gray-800 border border-gray-200 shadow-xl"
      >
        <Link href="/profile" passHref>
          <DropdownMenuItem className="flex items-center gap-2 font-medium hover:bg-zinc-100 cursor-pointer text-[13px]">
            <User className="h-4 w-4" />
            โปรไฟล์
          </DropdownMenuItem>
        </Link>

        <Link href="/users/settings" passHref>
          <DropdownMenuItem className="flex items-center gap-2 font-medium hover:bg-gray-100 cursor-pointer text-[13px]">
            <Settings className="h-4 w-4" />
            ตั้งค่าผู้ใช้
          </DropdownMenuItem>
        </Link>
                <Link href="/backend/dashboard" passHref>
          <DropdownMenuItem className="flex items-center gap-2 font-medium hover:bg-gray-100 cursor-pointer text-[13px]">
            <LayoutDashboard className="h-4 w-4" />
            หลังบ้าน
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator className="bg-gray-200" />

        <Link href="/feed/history" passHref>
          <DropdownMenuItem className="flex items-center gap-2 font-medium hover:bg-gray-100 cursor-pointer text-[13px]">
            <CreditCard className="h-4 w-4" />
            ประวัติการเติมเงิน
          </DropdownMenuItem>
        </Link>

        <Link href="/feed/random-history" passHref>
          <DropdownMenuItem className="flex items-center gap-2 font-medium hover:bg-gray-100 cursor-pointer text-[13px]">
            <Gift className="h-4 w-4" />
            ประวัติการสุ่มสินค้า
          </DropdownMenuItem>
        </Link>

        <Link href="/feed/orders" passHref>
          <DropdownMenuItem className="flex items-center gap-2 font-medium hover:bg-gray-100 cursor-pointer text-[13px]">
            <ShoppingCart className="h-4 w-4" />
            รายการสั่งซื้อ
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator className="bg-gray-200" />

        <DropdownMenuItem
          className="flex items-center gap-2 font-medium text-red-500 hover:bg-gray-100 cursor-pointer"
          onClick={async () => {
            await fetch("/api/logout", { method: "POST" });
            window.location.href = "/auth/login";
          }}
        >
          <LogOut className="h-4 w-4" />
          ออกจากระบบ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
