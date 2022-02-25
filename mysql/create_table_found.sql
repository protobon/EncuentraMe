CREATE TABLE IF NOT EXISTS found_pets (
    id VARCHAR(36) PRIMARY KEY,
    created_at VARCHAR(36) NOT NULL,
    updated_at VARCHAR(36) NOT NULL,
    titulo VARCHAR(80) NOT NULL,
    descripcion VARCHAR(300) NOT NULL,
    contacto VARCHAR(30) NOT NULL,
    img_id VARCHAR(40) NOT NULL,
    fb_post_id VARCHAR(40),
    animal_type VARCHAR(5) NOT NULL,
    user_id VARCHAR(36),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
