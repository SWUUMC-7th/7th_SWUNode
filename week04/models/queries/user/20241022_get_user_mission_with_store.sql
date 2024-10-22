SELECT 
    um.user_mission_id,
    u.username,
    m.mission_name,
    s.store_name,  -- 가게 정보 추가
    um.is_completed,
    um.completed_at,
    um.created_at
FROM user_mission um
JOIN user u ON um.user_id = u.user_id
JOIN mission m ON um.mission_id = m.mission_id
JOIN store s ON m.store_id = s.store_id  -- 가게 정보 추가
WHERE um.user_id = :userId
ORDER BY um.created_at DESC
LIMIT :limit OFFSET :offset;