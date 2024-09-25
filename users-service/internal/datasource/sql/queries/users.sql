
-- name: CreateUser :one
INSERT INTO users (name,phone,password, signed_for) VALUES ($1, $2, $3, $4) RETURNING *;

-- name: NewServiceSignedFor :one
UPDATE users set signed_for =  (select array_agg(distinct e) from unnest(array_append(users."signed_for", $2::"signed_for")) e) WHERE phone = $1 RETURNING *;

-- name: GetUserByPhone :one
SELECT id, phone, name, password, signed_for FROM users WHERE phone = $1 LIMIT 1;

-- name: UpdateUser :exec
UPDATE users SET
  name = COALESCE(NULLIF($2::varchar, ''), name),
  phone = COALESCE(NULLIF($3::varchar, ''), phone),
  password = COALESCE(NULLIF($4::varchar, ''), password),
  update_at = CURRENT_TIMESTAMP
WHERE id = $1;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;
