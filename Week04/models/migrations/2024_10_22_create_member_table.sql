CREATE TABLE member(
id BIGINT AUTO_INCREMENT PRIMARY KEY, 
name VARCHAR(20),
gender VARCHAR(10),
age INT,
address VARCHAR(40),
spec_address VARCHAR(40),
status VARCHAR(15) CHECK (status IN ('ACTIVE', 'INACTIVE')),
inactive_date DATETIME,
social_type VARCHAR(10),
created_at DATETIME(6) 
updated_at DATETIME(6),
email VARCHAR(50),
point INT UNSIGNED
);

