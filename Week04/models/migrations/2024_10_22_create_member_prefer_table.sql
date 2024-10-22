CREATE TABLE member_prefer(
id BIGINT AUTO_INCREMENT PRIMARY KEY,
member_id BIGINT,
category_id BIGINT,
created_at TIMESTAMP,
updated_at TIMESTAMP,
FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE,
FOREIGN KEY (category_id) REFERENCES food_category(id) ON DELETE CASCADE);