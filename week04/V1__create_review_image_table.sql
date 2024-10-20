CREATE TABLE review_image (
    image_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    review_id BIGINT,
    image_url TEXT,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (review_id) REFERENCES review(review_id)
);