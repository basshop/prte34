// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-white shadow-inner py-4 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-center text-center text-sm">
        <p className="text-orange-400 font-semibold">
          © 2025 ร้านค้าเปิดใหม่ All Rights Reserved
        </p>
        <p className="mt-1">
          <span className="text-orange-400 font-semibold">Betashifts</span>{" "}
          <a
            href="#"
            className="text-sky-500 hover:underline"
          >
            ติดต่อเจ้าของร้านไม่ได้ / แจ้งปัญหาร้านค้าโกง
          </a>
        </p>
      </div>
    </footer>
  );
}
