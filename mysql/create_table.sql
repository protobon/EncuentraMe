CREATE TABLE IF NOT EXISTS lost_pets (
    id VARCHAR(36) PRIMARY KEY,
    titulo VARCHAR(80) NOT NULL,
    descripcion VARCHAR(300) NOT NULL,
    contacto VARCHAR(30) NOT NULL,
    img_id VARCHAR (40) NOT NULL
);
