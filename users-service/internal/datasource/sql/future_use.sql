-- Some queries that we can use to extend service functionalities

-- name: IsSignedFor :one
SELECT id, phone, name, signed_for FROM users WHERE id = $1 AND $2::"signed_for"[] <@ signed_for;

-- name: IsSigned :one
SELECT id, phone,
  CASE
    WHEN '{"management"}'<@ users."signed_for" THEN 'Yes'
    ELSE 'No'
  END 
  AS is_signed
FROM users WHERE id = $1;

-- name: CreateUserOrUpdateIfExists :one
INSERT INTO users (name, phone, password, signed_for) 
VALUES ($1, $2, $3, $4::"signed_for"[])
ON CONFLICT("phone") 
DO UPDATE SET 
    signed_for = (select array_agg(distinct e) from unnest(array_append(users."signed_for", $5::"signed_for")) e)
RETURNING *;