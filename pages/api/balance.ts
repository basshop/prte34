import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

// POST: บันทึกยอดเงิน
export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();
    const num = parseFloat(amount);

    if (isNaN(num) || num <= 0) {
      return NextResponse.json(
        { error: "กรุณากรอกจำนวนเงินที่ถูกต้อง" },
        { status: 400 }
      );
    }

    // ใช้ ResultSetHeader เวลา INSERT
    await db.query<ResultSetHeader>("INSERT INTO balances (amount) VALUES (?)", [num]);

    return NextResponse.json({ message: "บันทึกสำเร็จ" });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "เกิดข้อผิดพลาดบางอย่าง";
    console.error("POST error:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// GET: ดึงยอดรวม
export async function GET() {
  try {
    // ใช้ RowDataPacket[] เวลา SELECT
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT COALESCE(SUM(amount), 0) as total FROM balances"
    );

    // rows เป็น array ของ RowDataPacket
    const total = (rows[0] as { total: number })?.total ?? 0;

    return NextResponse.json({ total });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "เกิดข้อผิดพลาดบางอย่าง";
    console.error("GET error:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
