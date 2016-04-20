# select all the requests a volunteer has signed up, for ordered by date
SELECT v.name,elderid,r.location,r.time,requestid
FROM requests r INNER JOIN volunteers v
ON r.volunteerid = v.volunteerid
WHERE v.volunteerid = 11
ORDER BY r.time;
# select all the requests an elder has asked, ordered by date//can be done clientside filter on name with map
SELECT *
FROM requests r INNER JOIN elders e
ON r.elderid = e.elderid
WHERE e.elderid = 12
ORDER BY r.time;

# select all elders who have elders who has had a request in the last 6 months
SELECT DISTINCT e.*
FROM requests r INNER JOIN  elders e
ON r.elderid = e.elderid
WHERE datediff(curdate(),r.time) < 180;

# select all volunteers who have signed up for a request in the last 6 months
SELECT DISTINCT v.*
FROM requests r INNER JOIN  volunteers v
ON r.volunteerid = v.volunteerid
WHERE datediff(curdate(),r.time) < 180
