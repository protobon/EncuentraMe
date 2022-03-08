CREATE USER IF NOT EXISTS 'encuentrame'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'encuentrame'@'localhost';
FLUSH PRIVILEGES;