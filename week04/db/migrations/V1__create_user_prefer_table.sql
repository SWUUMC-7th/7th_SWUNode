CREATE TABLE user_prefer (
    user_prefer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    category_id BIGINT,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (category_id) REFERENCES food_category(category_id)
);