"use client";

import { useState, useEffect } from "react"; 
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ✅ type ตรงกับ API จริง (API ส่ง field: value)
interface NumberRecord {
  value: number;
}

export default function Dashboard() {
  const [record, setRecord] = useState<NumberRecord | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/save");
        const data = await res.json();
        console.log("API data:", data);

        if (Array.isArray(data)) {
          setRecord(data[0]);
        } else {
          setRecord(data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ สร้าง data หลังจากได้ record
  const data = [
    { name: "ม.ค.", amount: 0 },
    { name: "ก.พ.", amount: 0 },
    { name: "มี.ค.", amount: 0 },
    { name: "เม.ย.", amount: 0 },
    { name: "พ.ค.", amount: 0 },
    { name: "มิ.ย.", amount: 0 },
    { name: "ก.ค.", amount: 0 },
    { name: "ส.ค.", amount: 0 },
    { name: "ก.ย.", amount: record?.value ?? 0 }, // ใช้ record แบบ optional chaining
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen font-sans mt-16 max-w-7xl mx-auto px-4">
      {/* การ์ดยอดรวม */}
      <Card className="flex items-center gap-4 p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-600 text-white">
          <DollarSign className="w-6 h-6" />
        </div>
        
        <div>
          <p className="text-sm text-gray-600">ยอดเงินทั้งหมด</p>
          <p className="text-2xl font-bold text-green-600">
            {/* ✅ ใช้ optional chaining ป้องกัน error */}
            ฿ {record?.value?.toLocaleString() ?? "0"}
          </p>
        </div>
      </Card>

      {/* กราฟเส้น */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">กราฟยอดเงินทั้งหมด</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#15bd18"
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
