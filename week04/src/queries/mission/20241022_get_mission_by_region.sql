SELECT 
    mission_id,
    mission_name,
    points,
    expiration_date,
    created_at
FROM mission
WHERE store_id IN (
    SELECT store_id
    FROM store
    WHERE region_id = :selectedRegionId
)
ORDER BY created_at DESC
LIMIT :limit OFFSET :offset;