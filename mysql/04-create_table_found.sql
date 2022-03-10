CREATE TABLE IF NOT EXISTS found_pets (
    id VARCHAR(41) PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    user_name VARCHAR(30) NOT NULL,
    phone VARCHAR(21),
    estado VARCHAR(9) NOT NULL,
    created_at DATETIME NOT NULL,
    mascota VARCHAR(10) NOT NULL,
    fecha VARCHAR(10) NOT NULL,
    hora VARCHAR(9) NOT NULL,
    calle_1 VARCHAR(30) NOT NULL,
    calle_2 VARCHAR(30) NOT NULL,
    barrio VARCHAR(30) NOT NULL,
    foto VARCHAR(41) NOT NULL,
    latitude FLOAT(10,6) NOT NULL,
    longitude FLOAT(10,6) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);