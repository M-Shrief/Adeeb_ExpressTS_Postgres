
-- name: CreateUser :one
INSERT INTO users (name,phone,password) VALUES ($1, $2, $3) RETURNING *;

-- name: GetUser :one
SELECT id, phone, name, password FROM users WHERE phone = $1 LIMIT 1;

-- name: UpdateUser :one
UPDATE users set name = $2 WHERE id = $1 RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;
