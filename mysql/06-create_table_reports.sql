CREATE TABLE IF NOT EXISTS reports (
    created_at DATETIME NOT NULL,
    sender_uid VARCHAR(20) NOT NULL,
    reporte VARCHAR(256) NOT NULL,
    post_id VARCHAR(41) NOT NULL,
    reported_uid VARCHAR(41) NOT NULL,
    FOREIGN KEY (sender_uid) REFERENCES users(id)
);
