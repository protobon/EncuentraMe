CREATE TABLE IF NOT EXISTS lost_pets (
    id VARCHAR(41) PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    estado VARCHAR(9),
    created_at DATETIME NOT NULL,
    mascota VARCHAR(10) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    fecha DATE NOT NULL,
    hora VARCHAR(9) NOT NULL,
    calle_1 VARCHAR(30) NOT NULL,
    calle_2 VARCHAR(30) NOT NULL,
    barrio VARCHAR(30) NOT NULL,
    foto VARCHAR(41) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);