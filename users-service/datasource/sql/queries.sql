
-- name: CreateUser :one
INSERT INTO users (name,phone,password, signed_for) VALUES ($1, $2, $3, $4) RETURNING *;

-- name: GetUserByPhone :one
SELECT id, phone, name, password, signed_for FROM users WHERE phone = $1 LIMIT 1;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;
