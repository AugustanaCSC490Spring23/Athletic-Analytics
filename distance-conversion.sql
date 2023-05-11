/*ALTER TABLE di
ADD COLUMN convDistance DOUBLE;

UPDATE di
SET convDistance = CASE 
WHEN Distance = '' THEN NULL
ELSE CAST(Distance AS DECIMAL(4,2))
END;

ALTER TABLE di
DROP COLUMN Distance;

ALTER TABLE di
CHANGE COLUMN convDistance Distance DOUBLE;

SElect * from di where event = 'shot put' order by distance desc; */