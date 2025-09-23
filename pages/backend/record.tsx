"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { MoreHorizontal, Pencil, Trash2, CheckCircle, CircleX, AlertTriangle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  TableOfContents,
  History,
} from "lucide-react";

// กำหนด type สำหรับสมาชิกและกิจกรรม
interface Member {
  id: number;
  firstName: string;
  lastName: string;
  studentId: string;
  activity_id?: number;
  activity_name?: string;
}

interface Activity {
  id: number;
  name: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const [alertContent, setAlertContent] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">("success");

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);

  const showAlert = (message: string, type: "success" | "error" | "warning") => {
    setAlertContent(message);
    setAlertType(type);
    setTimeout(() => setAlertContent(null), 3000);
  };

  // ใช้ useCallback เพื่อลด warning ของ useEffect
  const fetchActivities = useCallback(async () => {
    try {
      const res = await fetch("/api/activities");
      const data: Activity[] = await res.json();
      setActivities(data);
    } catch (err) {
      console.error(err);
      showAlert("เกิดข้อผิดพลาดในการโหลดกิจกรรม", "error");
    }
  }, []);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/students");
      const data: Member[] = await res.json();
      setMembers(data);
    } catch (err) {
      console.error(err);
      showAlert("เกิดข้อผิดพลาดในการโหลดสมาชิก", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
    fetchMembers();
  }, [fetchActivities, fetchMembers]);

  const handleSaveEdit = async () => {
    if (!currentMember) return;
    try {
      const res = await fetch("/api/students", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentMember),
      });
      if (!res.ok) throw new Error("Failed to update");
      showAlert("แก้ไขสมาชิกเรียบร้อย", "success");
      setEditDialogOpen(false);
      fetchMembers();
    } catch (err) {
      console.error(err);
      showAlert("เกิดข้อผิดพลาดในการแก้ไข", "error");
    }
  };

  const openDeleteDialog = (member: Member) => {
    setMemberToDelete(member);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!memberToDelete) return;
    try {
      const res = await fetch(`/api/students?id=${memberToDelete.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      showAlert("ลบสมาชิกเรียบร้อย", "success");
      fetchMembers();
    } catch (err) {
      console.error(err);
      showAlert("เกิดข้อผิดพลาดในการลบ", "error");
    } finally {
      setDeleteDialogOpen(false);
      setMemberToDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-16">
      <h2 className="text-sky-500 font-bold">Members</h2>
      <p className="text-black text-xl font-semibold mt-1">สมาชิกทั้งหมด</p>

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
          <div className="hover:border-sky-400 hover:bg-sky-50 hover:text-sky-400 flex items-center gap-2 border-gray-300 border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50">
            <TableOfContents className="w-4 h-4" />
            <p className="font-semibold">กิจกรรม</p>
          </div>
        </Link>
        <Link href="/backend/record">
          <div className="border-sky-400 bg-sky-50 text-sky-400 flex items-center gap-2 border-gray-300 border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50">
            <History className="w-5 h-5" />
            <p className="font-semibold">ประวัติต่างๆ</p>
          </div>
        </Link>
      </div>

      {/* ตารางสมาชิก */}
      <div className="bg-white rounded-xl border p-6 mt-6">
        <Label>รายชื่อสมาชิก</Label>
        {loading ? (
          <p className="mt-3 text-gray-500">กำลังโหลด...</p>
        ) : (
          <div className="mt-4 border rounded-lg overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">ชื่อ</th>
                  <th className="px-4 py-2 text-left">นามสกุล</th>
                  <th className="px-4 py-2 text-left">รหัสสมาชิก</th>
                  <th className="px-4 py-2 text-left">กิจกรรม</th>
                  <th className="px-4 py-2 text-center">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {[...members].reverse().map((m) => (
                  <tr key={m.id} className="border-t">
                    <td className="px-4 py-2">{m.id}</td>
                    <td className="px-4 py-2">{m.firstName}</td>
                    <td className="px-4 py-2">{m.lastName}</td>
                    <td className="px-4 py-2">{m.studentId}</td>
                    <td className="px-4 py-2">{m.activity_name || "ไม่ได้เลือกกิจกรรม"}</td>
                    <td className="px-4 py-2 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentMember(m);
                              setEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            แก้ไข
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => openDeleteDialog(m)}
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

      {/* Dialog แก้ไข */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>แก้ไขข้อมูลสมาชิก</DialogTitle>
          </DialogHeader>
          {currentMember && (
            <div className="space-y-4">
              <div>
                <Label>ชื่อ</Label>
                <Input
                  value={currentMember.firstName}
                  onChange={(e) =>
                    setCurrentMember({ ...currentMember, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>นามสกุล</Label>
                <Input
                  value={currentMember.lastName}
                  onChange={(e) =>
                    setCurrentMember({ ...currentMember, lastName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>รหัสสมาชิก</Label>
                <Input
                  value={currentMember.studentId}
                  onChange={(e) =>
                    setCurrentMember({ ...currentMember, studentId: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>กิจกรรม</Label>
                <Select
                  value={currentMember.activity_id?.toString() || ""}
                  onValueChange={(val) =>
                    setCurrentMember({ ...currentMember, activity_id: parseInt(val) })
                  }
                >
                  <SelectTrigger>
                    {activities.find((a) => a.id === currentMember.activity_id)?.name ||
                      "เลือกกิจกรรม"}
                  </SelectTrigger>
                  <SelectContent>
                    {activities.map((a) => (
                      <SelectItem key={a.id} value={a.id.toString()}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleSaveEdit} className="bg-sky-500 text-white">
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AlertDialog ลบสมาชิก */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>คุณแน่ใจหรือไม่?</AlertDialogTitle>
            <p>
              คุณต้องการลบสมาชิก &quot;{memberToDelete?.firstName} {memberToDelete?.lastName}
              &quot; หรือไม่
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 text-white" onClick={confirmDelete}>
              ยืนยันการลบ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert */}
      {alertContent && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto">
          <Alert className="shadow-lg rounded-lg bg-white flex items-center gap-2 px-4 py-2">
            {alertType === "success" && <CheckCircle className="w-5 h-5" stroke="green" />}
            {alertType === "error" && <CircleX className="w-5 h-5" stroke="red" />}
            {alertType === "warning" && <AlertTriangle className="w-5 h-5" stroke="orange" />}
            <AlertDescription>{alertContent}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
