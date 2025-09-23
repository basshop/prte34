import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import type { ResultSetHeader } from "mysql2";

// กำหนด type ของ row students
interface StudentRow {
  id: number;
  firstName: string;
  lastName: string;
  studentId: string;
  activity_id: number | null;
  note: string | null;
  file: string | null;
  activity_name?: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const [rows] = await db.execute<import('mysql2').RowDataPacket[]>(`
        SELECT s.*, a.name as activity_name
        FROM students s
        LEFT JOIN activities a ON s.activity_id = a.id
      `);
      return res.status(200).json(rows as StudentRow[]);
    }

    if (req.method === "POST") {
      const { firstName, lastName, studentId, activity_id, note, file } = req.body;
      const [result] = await db.execute<ResultSetHeader>(
        `INSERT INTO students (firstName, lastName, studentId, activity_id, note, file) VALUES (?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, studentId, activity_id || null, note || null, file || null]
      );
      return res.status(201).json({ id: result.insertId });
    }

    if (req.method === "PUT") {
      const { id, firstName, lastName, studentId, activity_id, note, file } = req.body;
      await db.execute<ResultSetHeader>(
        `UPDATE students SET firstName=?, lastName=?, studentId=?, activity_id=?, note=?, file=? WHERE id=?`,
        [firstName, lastName, studentId, activity_id || null, note || null, file || null, id]
      );
      return res.status(200).json({ message: "อัปเดตเรียบร้อย" });
    }

    if (req.method === "DELETE") {
      const id =
        Array.isArray(req.query.id) ? parseInt(req.query.id[0]) : parseInt(req.query.id as string);
      if (isNaN(id)) return res.status(400).json({ message: "id ไม่ถูกต้อง" });

      await db.execute<ResultSetHeader>(`DELETE FROM students WHERE id=?`, [id]);
      return res.status(200).json({ message: "ลบเรียบร้อย" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "เกิดข้อผิดพลาด";
    return res.status(500).json({ message });
  }
}
