CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(41) PRIMARY KEY,
    created_at DATETIME NOT NULL,
    descripcion VARCHAR(512) NOT NULL,
    post_id VARCHAR(41) NOT NULL,
    user_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
