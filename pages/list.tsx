"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SubmissionComplete() {
  const router = useRouter();

  const handleBackHome = () => {
    router.push("/"); // เปลี่ยนเป็น path ของหน้าหลักของคุณ
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">

        <Image 
          src="/Thinking Boy With Question Marks.gif" 
          alt="Confetti" 
          width={128} 
          height={128} 
          className="mx-auto mb-4 object-contain"
        />

        <h1 className="text-2xl font-bold text-green-600 mb-4">ยังไม่มีกรรม</h1>

        <p className="text-gray-700 mb-6">กิจกรรมจะมาในเร็วๆนี้</p>

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
