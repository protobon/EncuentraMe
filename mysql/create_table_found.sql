CREATE TABLE IF NOT EXISTS found_pets (
    id VARCHAR(41) PRIMARY KEY,
    created_at VARCHAR(36) NOT NULL,
    mascota VARCHAR(10) NOT NULL,
    fecha DATE NOT NULL,
    hora VARCHAR(9) NOT NULL,
    calle_1 VARCHAR(30) NOT NULL,
    calle_2 VARCHAR(30) NOT NULL,
    barrio VARCHAR(30) NOT NULL,
    foto VARCHAR(40) NOT NULL
);
