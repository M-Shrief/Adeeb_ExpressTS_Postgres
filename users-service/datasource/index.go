package datasource

import (
	"context"
	"fmt"
	"users-service/config"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

var DB *Queries

func ConnectDB() (*pgx.Conn, error) {
	ctx := context.Background()

	connStr := fmt.Sprintf("host=%v port=%v user=%v dbname=%v password=%v sslmode=disable", config.DB_HOST, config.DB_PORT, config.DB_USER, config.DB_NAME, config.DB_PASSWORD)
	conn, err := pgx.Connect(ctx, connStr)
	if err != nil {
		return nil, err
	}
	DB = New(conn)
	return conn, err
}

func ToString(uuid pgtype.UUID) string {
	uuidStr := fmt.Sprintf("%x-%x-%x-%x-%x", uuid.Bytes[0:4], uuid.Bytes[4:6], uuid.Bytes[6:8], uuid.Bytes[8:10], uuid.Bytes[10:16])
	return uuidStr
}
