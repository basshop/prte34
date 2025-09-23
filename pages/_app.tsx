import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/ui/Navbar"; // เพิ่ม Navbar


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar /> {/* Navbar จะแสดงทุกหน้าและไม่โหลดซ้ำ */}

      <Component {...pageProps} />
    </>
  );
}
