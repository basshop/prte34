"use client";

import { LayoutDashboard, Settings, CreditCard, TableOfContents, History } from "lucide-react";
import Link from "next/link";


export default function DashboardPage() {

  return (
    <div className="max-w-6xl mx-auto p-6 mt-16 max-w-7xl px-4">
      <h2 className="text-sky-500 font-bold" >Dashboard</h2>
      <p className="text-black text-xl font-semibold mt-1">แดชบอร์ด</p>

      {/* Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 mt-8">
        <Link href="/backend/dashboard">
          <div className="border-sky-400 bg-sky-50 text-sky-400 flex items-center gap-2 border-gray-300 border rounded-lg px-4 py-2 cursor-pointer hover:bg-sky-100">
            <LayoutDashboard className="w-5 h-5" />
            <p className="font-semibold">แดชบอร์ด</p>
          </div>
        </Link>
        <Link href="#">
          <div className="hover:border-sky-400 hover:bg-sky-50 hover:text-sky-400 flex items-center gap-2 border-gray-300 border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50">
            <Settings className="w-4 h-4" />
            <p className=" font-semibold">ตั้งค่าเว็บไซต์</p>
          </div>
        </Link>

        <Link href="/backend/amount">
          <div className="hover:border-sky-400 hover:bg-sky-50 hover:text-sky-400 flex items-center gap-2 border-gray-300 border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50">
            <CreditCard className="w-4 h-4" />
            <p className=" font-semibold">จัดการยอดเงิน</p>
          </div>
        </Link>
        <Link href="/backend/activity">
          <div className="hover:border-sky-400 hover:bg-sky-50 hover:text-sky-400 flex items-center gap-2 border-gray-300 border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50">
            <TableOfContents className="w-4 h-4" />
            <p className="font-semibold">กิจกรรม</p>
          </div>
        </Link>
        <Link href="/backend/record">
          <div className="hover:border-sky-400 hover:bg-sky-50 hover:text-sky-400 flex items-center gap-2 border-gray-300 border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50">
            <History className="w-5 h-5" />
            <p className="font-semibold">ประวัติต่างๆ</p>
          </div>
        </Link>
      </div>

      {/* กราฟยอดเติม */}
      {/* <Card>
        <CardHeader className="w-full max-w-md  max-w-7xl px-4">
          <CardTitle>ยอดเติมเงินรายเดือน </CardTitle>
        </CardHeader>
        <CardContent className="w-full max-w-md text-center max-w-7xl px-4">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={topupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="angpao" name="อั่งเปา" stroke="#ff1717" strokeWidth={3} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="bank" name="ธนาคาร" stroke="#0aab1d" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
      
    </div>
  );
}
