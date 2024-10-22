SELECT m.id AS mission_id,
m.mission_spec,
m.deadline,
s.name AS store_name,
COUNT(mm.id) AS completed_missions
(10 - COUNT(mm.id)) AS remaining_missions 
CASE
		WHEN COUNT(mm.id) < 10 THEN 'AVAILABLE'
		ELSE 'COMPLETED'
	END AS mission_status

FROM mission AS m
JOIN store AS s ON m.store_id = s.id
JOIN region AS r ON s.region_id = r.id
LEFT JOIN member_mission AS mm ON m.id = mm.mission_id AND mm.status = 'COMPLETED'
WHERE r.id = 35 
GROUP By m.id
HAVING mission_status = 'AVAILABLE' 
ORDER BY m.deadline ASC 
LIMIT 5 OFFSET 5; 
