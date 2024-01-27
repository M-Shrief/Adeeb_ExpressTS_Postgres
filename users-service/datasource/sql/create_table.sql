CREATE TYPE signed_for AS ENUM ('adeeb','management','DBA','analytics');

CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    signed_for signed_for[] NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

    CONSTRAINT IdPk PRIMARY KEY (id)
);


-- create index
CREATE INDEX phone_index ON Users(phone);