CREATE TABLE user_mission (
    user_mission_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    mission_id BIGINT,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at DATETIME,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (mission_id) REFERENCES mission(mission_id)
);