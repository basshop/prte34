import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const [rows] = await db.execute<RowDataPacket[]>("SELECT * FROM activities");
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const { name } = req.body;
      if (!name) return res.status(400).json({ message: "กรุณากรอกชื่อกิจกรรม" });

      const [result] = await db.execute<ResultSetHeader>(
        "INSERT INTO activities (name) VALUES (?)",
        [name]
      );

      return res.status(201).json({ id: result.insertId, name });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: "Missing id" });

      const [result] = await db.execute<ResultSetHeader>(
        "DELETE FROM activities WHERE id = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "ไม่พบกิจกรรมนี้" });
      }

      return res.status(200).json({ message: "ลบกิจกรรมเรียบร้อย" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
}
