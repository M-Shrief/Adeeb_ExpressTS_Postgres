-- Some queries that we can use to extend service functionalities


-- name: NewServiceSignedFor :exec
UPDATE users set signed_for = array_append(signed_for, $2) WHERE phone = $1;

-- name: IsSignedFor :one
SELECT id, phone, name, signed_for FROM users WHERE id = $1 AND $2 <@ signed_for;
-- SELECT id, phone, name, signed_for FROM users WHERE id = '6049b5c5-6166-4808-8d72-d818ea583459' AND '{"management"}'::"signed_for"[] <@ signed_for;


-- name: IsSigned :one
-- SELECT id, phone,
--   CASE
--     WHEN '{"management"}'<@ users."signed_for" THEN 'Yes'
--     ELSE 'No'
--   END 
--   AS is_signed
-- FROM users WHERE id = $1;