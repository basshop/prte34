"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/me", {
      method: "GET",
      credentials: "include", // ให้ส่ง cookie ด้วย
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(() => {
        setChecking(false); // login ผ่าน
      })
      .catch(() => {
        router.replace("/auth/login"); // ไม่ login → redirect
      });
  }, [router]);

  if (checking) {
    return null; // ✅ ไม่ต้อง render อะไรตอนตรวจสอบ
  }

  return <>{children}</>; // render เนื้อหาจริงของหน้า
}
