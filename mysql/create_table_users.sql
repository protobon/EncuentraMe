CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(25) NOT NULL
);
