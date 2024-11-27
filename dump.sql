CREATE DATABASE IF NOT EXISTS ParkingApp;
USE ParkingApp;

CREATE TABLE driver_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    car_license_plate VARCHAR(10) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(255) NOT NULL,
    car_model VARCHAR(50) NOT NULL,
    car_brand VARCHAR(50) NOT NULL,
    car_year INT NOT NULL,
    cnh_number VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO driver_users (name, cpf, email, password, car_license_plate, phone, address, car_model, car_brand, car_year, cnh_number) VALUES
('João Silva', '123.456.789-00', 'joao.silva@example.com', 'senha123', 'ABC-1234', '+55 11 91234-5678', 'Rua das Flores, 123, São Paulo, SP', 'Civic', 'Honda', 2018, '1234567890'),
('Maria Oliveira', '987.654.321-00', 'maria.oliveira@example.com', 'senha123', 'XYZ-5678', '+55 21 91234-5678', 'Av. Paulista, 456, São Paulo, SP', 'Corolla', 'Toyota', 2020, '0987654321'),
('Carlos Santos', '321.654.987-00', 'carlos.santos@example.com', 'senha123', 'DEF-4321', '+55 31 91234-5678', 'Praça da Liberdade, 789, Belo Horizonte, MG', 'Fiesta', 'Ford', 2017, '1122334455');


CREATE TABLE parkings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    price_per_hour DECIMAL(10, 2) NOT NULL,
    price_per_minute DECIMAL(10, 2) NOT NULL,
    price_per_day DECIMAL(10, 2) NOT NULL,
    opening_time TIME NOT NULL,
    closing_time TIME NOT NULL,
    total_spots INT NOT NULL,
    available_spots INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO parkings (name, address, price_per_hour, price_per_minute, price_per_day, opening_time, closing_time, total_spots, available_spots) VALUES
('Estacionamento Central', 'Rua A, 123, São Paulo, SP', 10.00, 0.50, 50.00, '06:00:00', '22:00:00', 50, 50),
('Estacionamento Norte', 'Avenida B, 456, Rio de Janeiro, RJ', 8.00, 0.40, 45.00, '07:00:00', '23:00:00', 40, 40),
('Estacionamento Sul', 'Praça C, 789, Belo Horizonte, MG', 9.00, 0.45, 48.00, '05:30:00', '21:30:00', 30, 30);

CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    parking_id INT NOT NULL,
    reservation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'expired') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES driver_users(id),
    FOREIGN KEY (parking_id) REFERENCES parkings(id)
);


CREATE TABLE garage_operator (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO garage_operator (name, email, password) VALUES
('Carlos Almeida', 'carlos.almeida@example.com', '$2b$10$U7UOqVOnz1h5zGi9J2HsLOs9L7E2q6KX9rNXc9vQ3D1Xy5G0hJ7uK'), -- senha: senha123
('Patrícia Silva', 'patricia.silva@example.com', '$2b$10$ZLk1XbIz9fY8LjKiOw.r3Owo1ekm0PnZ.pHbmUtX1jQoq8PEkDzja'), -- senha: senha123
('Marcos Santos', 'marcos.santos@example.com', '$2b$10$2QX5U7Xk/j/OsEmU7sZFOerw5Tu4E9/szIo2fO/m3l8Kw0GOLXsBC'); -- senha: senha123
