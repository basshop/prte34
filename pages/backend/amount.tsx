"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  TableOfContents,
  History,
  Save,
} from "lucide-react";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!value) return alert("กรุณากรอกตัวเลข");

    try {
      setLoading(true); // เริ่ม loading
      const res = await fetch("/api/save", {
        method: "POST",
        body: JSON.stringify({ value: Number(value) }),
      });
      const data = await res.json();
      alert(data.message);
      setValue("");
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setLoading(false); // จบ loading
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-16">
      <h2 className="text-sky-500 font-bold">จัดการยอดเงิน</h2>
      <p className="text-black text-xl font-semibold mt-1">Manage balance</p>

      {/* Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 mt-8">
        <Link href="/backend/dashboard">
          <div className="hover:border-sky-400 hover:bg-sky-50 hover:text-sky-400 flex items-center gap-2 border-gray-300 border rounded-lg px-4 py-2 cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            <p className="font-semibold">แดชบอร์ด</p>
          </div>
        </Link>
        <Link href="#">
          <div className="hover:border-sky-400 hover:bg-sky-50 hover:text-sky-400 flex items-center gap-2 border-gray-300 border rounded-lg px-4 py-2 cursor-pointer">
            <Settings className="w-4 h-4" />
            <p className="font-semibold">ตั้งค่าเว็บไซต์</p>
          </div>
        </Link>
        <Link href="/backend/amount">
          <div className="border-sky-400 bg-sky-50 text-sky-400 flex items-center gap-2 border-gray-300 border rounded-lg px-4 py-2 cursor-pointer">
            <CreditCard className="w-4 h-4" />
            <p className="font-semibold">จัดการยอดเงิน</p>
          </div>
        </Link>
        <Link href="/backend/activity">
          <div className="hover:border-sky-400 hover:bg-sky-50 hover:text-sky-400 flex items-center gap-2 border-gray-300 border rounded-lg px-4 py-2 cursor-pointer">
            <TableOfContents className="w-4 h-4" />
            <p className="font-semibold">กิจกรรม</p>
          </div>
        </Link>
        <Link href="/backend/record">
          <div className="hover:border-sky-400 hover:bg-sky-50 hover:text-sky-400 flex items-center gap-2 border-gray-300 border rounded-lg px-4 py-2 cursor-pointer">
            <History className="w-5 h-5" />
            <p className="font-semibold">ประวัติต่างๆ</p>
          </div>
        </Link>
      </div>

      {/* Form Upload */}
      <div className="bg-white rounded-xl border p-6">
        <Label>จัดการยอดเงิน</Label>
        <span className="text-xs text-gray-400 ml-0">Manage balance</span>
        <div className="mt-3 flex items-center gap-3"></div>
        <div style={{ padding: "20px" }}>
          <h1>อัปเดตตัวเลข</h1>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="กรอกตัวเลข"
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-sky-400"
          />
          <Button
            onClick={handleSave}
            disabled={loading}
            className="w-full mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold flex items-center justify-center gap-2"
          >
            <Save className="w-6 h-6 text-white" />
            {loading ? "กำลังเพิ่มรอสักครู่..." : "บันทึก"}
          </Button>
        </div>
      </div>
    </div>
  );
}
