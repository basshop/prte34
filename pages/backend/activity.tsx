"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  CircleX,
  CheckCircle,
  AlertTriangle,
  CirclePlus,
  LayoutDashboard,
  Settings,
  CreditCard,
  TableOfContents,
  History,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Banner {
  id: number;
  name: string;
}

export default function BannerUpload() {
  const [name, setName] = useState("");
  const [alertContent, setAlertContent] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loadingBanners, setLoadingBanners] = useState(true);

  // สำหรับ AlertDialog
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchBanners = async () => {
    setLoadingBanners(true);
    try {
      const res = await fetch("/api/activities");
      const data: Banner[] = await res.json();
      setBanners(data);
    } catch (err) {
      console.error(err);
    }
    setLoadingBanners(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      setAlertType("warning");
      setAlertContent("กรุณากรอกชื่อกิจกรรม");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (res.ok) {
        setAlertType("success");
        setAlertContent("เพิ่มกิจกรรมเรียบร้อย");
        setName("");
        fetchBanners();
      } else {
        setAlertType("error");
        setAlertContent(data.error || "เกิดข้อผิดพลาด");
      }
    } catch (err) {
      console.error(err);
      setAlertType("error");
      setAlertContent("เกิดข้อผิดพลาด");
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/activities?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setAlertType("success");
        setAlertContent("ลบกิจกรรมเรียบร้อย");
        fetchBanners();
      } else {
        setAlertType("error");
        setAlertContent(data.error || "เกิดข้อผิดพลาด");
      }
    } catch (err) {
      console.error(err);
      setAlertType("error");
      setAlertContent("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-16 max-w-7xl px-4">
      <h2 className="text-sky-500 font-bold">เพิ่มกิจกรรม</h2>
      <p className="text-black text-xl font-semibold mt-1">Add an activity</p>

      {/* Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 mt-8">
        <Link href="/backend/dashboard">
          <div className="hover:border-sky-400 hover:bg-sky-50 hover:text-sky-400 flex items-center gap-2 border-gray-300 border rounded-lg px-4 py-2 cursor-pointer hover:bg-sky-100">
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
          <div className="border-sky-400 bg-sky-50 text-sky-400 flex items-center gap-2 border-gray-300 border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50">
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

      {/* Form Upload */}
      <div className="bg-white rounded-xl border p-6 mb-10">
        <Label>เพิ่มกิจกรรม</Label>
        <span className="text-xs text-gray-400 ml-0">Add an activity</span>
        <div className="mt-3 flex items-center gap-3">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="พิมพ์ชื่อกิจกรรม..."
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-sky-400"
          />
        </div>
        <Button
          onClick={handleSave}
          className="w-full mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold flex items-center justify-center gap-2"
        >
          <CirclePlus className="w-6 h-6 text-white" />
          {loading ? "กำลังเพิ่มรอสักครู่..." : "เพิ่มกิจกรรม"}
        </Button>
      </div>

      {/* ตารางกิจกรรม */}
      <div className="bg-white rounded-xl border p-6">
        <Label>กิจกรรมทั้งหมด</Label>
        {loadingBanners ? (
          <p className="mt-3 text-gray-500">กำลังโหลด...</p>
        ) : (
          <div className="mt-4 border rounded-lg overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">ชื่อกิจกรรม</th>
                  <th className="px-4 py-2 text-center">More</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner.id} className="border-t">
                    <td className="px-4 py-2">{banner.id}</td>
                    <td className="px-4 py-2">{banner.name}</td>
                    <td className="px-4 py-2 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => {
                              setDeleteId(banner.id);
                              setOpenDialog(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            ลบ
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* AlertDialog ยืนยันการลบ */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบหรือไม่?</AlertDialogTitle>
            <AlertDialogDescription>
              คุณแน่ใจหรือไม่ว่าต้องการลบกิจกรรมนี้? การลบไม่สามารถกู้คืนได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                if (deleteId != null) handleDelete(deleteId);
                setOpenDialog(false);
              }}
              className="bg-red-500 text-white hover:bg-red-600 flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" /> ยืนยันการลบ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert */}
      {alertContent && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto">
          <Alert className="animate-fade-in-out shadow-lg rounded-lg backdrop-blur-sm bg-white/300 flex items-center gap-2 px-4 py-2">
            {alertType === "success" && (
              <CheckCircle className="w-5 h-5" stroke="green" />
            )}
            {alertType === "error" && (
              <CircleX className="w-5 h-5" stroke="red" />
            )}
            {alertType === "warning" && (
              <AlertTriangle className="w-5 h-5" stroke="orange" />
            )}
            <AlertDescription>{alertContent}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
