SELECT mm.id AS member_mission_id, 
mm.mission_id,
mm.status,
mm.created_at,
m.mission_spec,
m.deadline
s.name AS store_name,

FROM member_mission AS mm
JOIN mission AS m ON mm.mission_id = m.id
JOIN store AS s ON m.store_id = s.id

WHERE mm.member_id = 3
AND mm.status IN ('COMPLETED', 'PENDING') 
ORDER BY m.deadline ASC, mm.created_at DESC
LIMIT 10 OFFSET 40; 