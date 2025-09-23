"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // สำหรับ redirect
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Share, CheckCircle, CircleX, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function StudentForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    activity_id: "",
    note: "",
    file: null as File | null,
  });

  const [activities, setActivities] = useState<{ id: number; name: string }[]>([]);

  const [alertContent, setAlertContent] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "warning" | null>(null);

  useEffect(() => {
    fetch("/api/activities")
      .then((res) => res.json())
      .then((data) => setActivities(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.studentId || !form.activity_id) {
      setAlertType("warning");
      setAlertContent("กรุณากรอกข้อมูลให้ครบถ้วน");
      setTimeout(() => setAlertContent(null), 3000);
      return;
    }

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setAlertType("success");
        setAlertContent("ส่งข้อมูลเรียบร้อย");
        setForm({ firstName: "", lastName: "", studentId: "", activity_id: "", note: "", file: null });

        // รอ 2 วินาทีแล้ว redirect ไปหน้า succeed
        setTimeout(() => {
          router.push("/succeed");
        }, 2000);
      } else {
        setAlertType("error");
        setAlertContent("เกิดข้อผิดพลาดในการส่งข้อมูล");
        setTimeout(() => setAlertContent(null), 3000);
      }
    } catch {
      setAlertType("error");
      setAlertContent("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
      setTimeout(() => setAlertContent(null), 3000);
    }
  };

  return (
    <>
      <Head>
        <title>Xyven</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 font-sans">
        <Card className="w-full max-w-md bg-white text-black shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold">ฟอร์มข้อมูลนักศึกษา</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* First Name */}
              <div className="flex flex-col space-y-1">
                <Label htmlFor="firstName">ชื่อ</Label>
                <Input id="firstName" name="firstName" placeholder="กรอกชื่อ"
                  value={form.firstName} onChange={handleChange} />
              </div>

              {/* Last Name */}
              <div className="flex flex-col space-y-1">
                <Label htmlFor="lastName">นามสกุล</Label>
                <Input id="lastName" name="lastName" placeholder="กรอกนามสกุล"
                  value={form.lastName} onChange={handleChange} />
              </div>

              {/* Student ID */}
              <div className="flex flex-col space-y-1">
                <Label htmlFor="studentId">รหัสนักศึกษา</Label>
                <Input id="studentId" name="studentId" placeholder="กรอกรหัสนักศึกษา"
                  value={form.studentId} onChange={handleChange} />
              </div>

              {/* Select Activity */}
              <div className="flex flex-col space-y-1">
                <Label>กิจกรรม</Label>
                <Select onValueChange={(value) => setForm((prev) => ({ ...prev, activity_id: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกกิจกรรม" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>กิจกรรมทั้งหมด</SelectLabel>
                      {activities.map((act) => (
                        <SelectItem key={act.id} value={String(act.id)}>{act.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* File Upload */}
              <div className="flex flex-col space-y-1">
                <Label htmlFor="file">แนบรูปภาพ</Label>
                <Input id="file" type="file" onChange={handleFile} />
              </div>

              {/* Notes */}
              <div className="flex flex-col space-y-1">
                <Label htmlFor="note">หมายเหตุ</Label>
                <Textarea
                  id="note"
                  name="note"
                  placeholder="เขียนหมายเหตุ..."
                  value={form.note}
                  onChange={handleChange}
                  className="text-black"
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full bg-sky-500 text-white hover:bg-sky-800 mt-2">
                <Share className="w-4 h-4 mr-2" /> ส่งข้อมูล
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      {/* Alert */}
      {alertContent && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto">
          <Alert className="animate-fade-in-out shadow-lg rounded-lg backdrop-blur-sm bg-white/90 flex items-center gap-2 px-4 py-2">
            {alertType === "success" && <CheckCircle className="w-5 h-5 text-green-600" />}
            {alertType === "error" && <CircleX className="w-5 h-5 text-red-600" />}
            {alertType === "warning" && <AlertTriangle className="w-5 h-5 text-orange-500" />}
            <AlertDescription>{alertContent}</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}
