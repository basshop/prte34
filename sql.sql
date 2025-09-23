-- ตารางเก็บกิจกรรม
CREATE TABLE activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- ตารางเก็บข้อมูลนักศึกษา
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  studentId VARCHAR(50) NOT NULL,
  activity_id INT,
  note TEXT,
  file VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(id)
);


-- ตารางเก็บค่าตัวเลข
CREATE TABLE number_value (
  id INT PRIMARY KEY,
  value INT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ใส่ข้อมูลเริ่มต้น 1 record
INSERT INTO number_value (id, value) VALUES (1, 0)
  ON DUPLICATE KEY UPDATE value = value;