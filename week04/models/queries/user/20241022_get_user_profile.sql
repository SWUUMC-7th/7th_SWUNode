SELECT 
    u.username,
    u.email,
    u.point
FROM user AS u
WHERE u.user_id = :userId;