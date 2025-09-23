"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Img from "next/image";

export default function SubmissionComplete() {
  const router = useRouter();

  const handleBackHome = () => {
    router.push("/"); // เปลี่ยนเป็น path ของหน้าหลักของคุณ
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">

        <img 
  src="/Confetti emoji (1).gif" 
  alt="Confetti" 
  className="mx-auto mb-4 w-32 h-32 object-contain"
/>
        <h1 className="text-2xl font-bold text-green-600 mb-4">ส่งสำเร็จ!</h1>

        <p className="text-gray-700 mb-6">คุณได้ส่งข้อมูลเรียบร้อยแล้ว</p>

        <Button
          onClick={handleBackHome}
          className="bg-sky-500 hover:bg-sky-600 text-white"
        >
          กลับหน้าหลัก
        </Button>
      </div>
    </div>
  );
}
