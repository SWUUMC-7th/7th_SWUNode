CREATE TABLE mission(
id BIGINT AUTO_INCREMENT PRIMARY KEY,
store_id BIGINT,
reward INT, 
deadline DATETIME,
mission_spec TEXT,
created_at TIMESTAMP,
updated_at TIMESTAMP,
FOREIGN KEY(store_id) REFERENCES store(id) ON DELETE CASCADE);

