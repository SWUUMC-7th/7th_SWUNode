CREATE TABLE review_image(
id BIGINT AUTO_INCREMENT PRIMARY KEY,
review_id BIGINT,
image_url TEXT,
created_at TIMESTAMP,
updated_at TIMESTAMP,
FOREIGN KEY (review_id) REFERENCES review(id) ON DELETE CASCADE);
