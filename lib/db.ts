// // lib/db.ts
// import mysql from "mysql2/promise"

// export const db = mysql.createPool({
//   host: process.env.MYSQL_HOST || "localhost",
//   user: process.env.MYSQL_USER || "xdowxyz_lul_",
//   password: process.env.MYSQL_PASSWORD || "3DM*xp0lm*atbn3V",
//   database: process.env.MYSQL_DATABASE || "xdowxyz_lul_",
// })
// lib/db.ts
// lib/db.ts
import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",   // เซิร์ฟเวอร์ MySQL
  user: process.env.MYSQL_USER || "betashif_py2",        // User MySQL
  password: process.env.MYSQL_PASSWORD || "pdXXFwrDDJgHwWV6AXmA",    // รหัสผ่าน
  database: process.env.MYSQL_DATABASE || "betashif_py2" // ชื่อฐานข้อมูล
});

