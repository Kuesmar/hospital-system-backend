CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    phone VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR, -- Será NULL si el usuario se registra con un proveedor externo
    provider VARCHAR NOT NULL,
    provider_id VARCHAR UNIQUE, -- Será NULL si el usuario se registra con email y password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    person_id INT UNIQUE REFERENCES persons(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    person_id INT UNIQUE REFERENCES persons(id) ON DELETE CASCADE,
    specialty VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id),
    doctor_id INT REFERENCES doctors(id),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    appointment_status VARCHAR DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

CREATE TABLE doctor_availability (
    id SERIAL PRIMARY KEY,
    doctor_id INT REFERENCES doctors(id) ON DELETE CASCADE,
    available_day VARCHAR NOT NULL CHECK (available_day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
    available_hour TIME NOT NULL
);

-- Crear función para actualizar updated_at antes de cada UPDATE
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar el trigger en cada tabla
CREATE TRIGGER trigger_update_patients
BEFORE UPDATE ON patients
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_doctors
BEFORE UPDATE ON doctors
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_appointments
BEFORE UPDATE ON appointments
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_users
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar personas (doctores y pacientes)
INSERT INTO persons (first_name, last_name, email, phone) VALUES
-- Doctores (ID 1-10)
('Carlos', 'Ramirez', 'carlos.ramirez@example.com', '+541112345678'),
('Laura', 'Gomez', 'laura.gomez@example.com', '+541112345679'),
('Andres', 'Lopez', 'andres.lopez@example.com', '+541112345680'),
('Mariana', 'Fernandez', 'mariana.fernandez@example.com', '+541112345681'),
('Sergio', 'Gutierrez', 'sergio.gutierrez@example.com', '+541112345682'),
('Rosa', 'Martinez', 'rosa.martinez@example.com', '+541112345683'),
('Javier', 'Mendez', 'javier.mendez@example.com', '+541112345684'),
('Natalia', 'Ortega', 'natalia.ortega@example.com', '+541112345685'),
('Hernan', 'Diaz', 'hernan.diaz@example.com', '+541112345686'),
('Paula', 'Castro', 'paula.castro@example.com', '+541112345687'),
-- Pacientes (ID 11-30)
('Pedro', 'Sanchez', 'pedro.san56@gmail.com', '+541128590004'),
('Lucia', 'Perez', 'lu.perez@gmail.com', '+541123044123'),
('Angeles', 'Pedroso', 'pedrosoangeles@gmail.com', '+541128433221'),
('Julio', 'Lampiño', 'lampiño-julio@gmail.com', '+54119399214'),
('Roberto', 'Gomez', 'roberto.gomez@gmail.com', '+541112345688'),
('Esteban', 'Vega', 'esteban.vega@gmail.com', '+541112345689'),
('Carla', 'Suarez', 'carla.suarez@gmail.com', '+541112345690'),
('Daniel', 'Torres', 'daniel.torres@gmail.com', '+541112345691'),
('Fernando', 'Silva', 'fernando.silva@gmail.com', '+541112345692'),
('Isabel', 'Navarro', 'isabel.navarro@gmail.com', '+541112345693'),
('Monica', 'Peralta', 'monica.peralta@gmail.com', '+541112345694'),
('Raul', 'Ordoñez', 'raul.ordoñez@gmail.com', '+541112345695'),
('Elena', 'Molina', 'elena.molina@gmail.com', '+541112345696'),
('Victor', 'Ramos', 'victor.ramos@gmail.com', '+541112345697'),
('Gabriela', 'Sosa', 'gabriela.sosa@gmail.com', '+541112345698'),
('Lucas', 'Acosta', 'lucas.acosta@gmail.com', '+541112345699'),
('Miriam', 'Salazar', 'miriam.salazar@gmail.com', '+541112345700'),
('Joaquin', 'Beltran', 'joaquin.beltran@gmail.com', '+541112345701'),
('Silvana', 'Herrera', 'silvana.herrera@gmail.com', '+541112345702'),
('Martina', 'Fernandez', 'martina.fernandez@gmail.com', '+541112345800');

-- Insertar doctores (ID 1-10 en person)
INSERT INTO doctors (person_id, specialty) VALUES
(1, 'Cardiology'),
(2, 'Pediatrics'),
(3, 'Dermatology'),
(4, 'Neurology'),
(5, 'General Medicine'),
(6, 'Orthopedics'),
(7, 'Ophthalmology'),
(8, 'Psychiatry'),
(9, 'Endocrinology'),
(10, 'Gynecology');

-- Insertar pacientes (ID 11-30 en person)
INSERT INTO patients (person_id) VALUES
(11), (12), (13), (14), (15), (16), (17), (18), (19), (20),
(21), (22), (23), (24), (25), (26), (27), (28), (29), (30);

-- Insertar disponibilidad de los doctores
INSERT INTO doctor_availability (doctor_id, available_day, available_hour) VALUES
(1, 'Monday', '08:00'), (1, 'Wednesday', '10:00'), (1, 'Friday', '14:00'),
(2, 'Tuesday', '09:00'), (2, 'Thursday', '15:00'),
(3, 'Monday', '11:00'), (3, 'Friday', '13:00'),
(4, 'Wednesday', '16:00'), (4, 'Thursday', '12:00'),
(5, 'Monday', '07:00'), (5, 'Friday', '17:00'),
(6, 'Tuesday', '10:00'), (6, 'Thursday', '18:00'),
(7, 'Wednesday', '08:00'), (7, 'Saturday', '14:00'),
(8, 'Monday', '09:00'), (8, 'Thursday', '13:00'),
(9, 'Friday', '11:00'), (9, 'Sunday', '15:00'),
(10, 'Tuesday', '07:00'), (10, 'Thursday', '10:00');

-- Insertar turnos (appointments)
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, appointment_status) VALUES
(1, 1, '2025-02-15', '08:00', 'Confirmed'),
(2, 2, '2025-02-16', '09:00', 'Pending'),
(3, 3, '2025-02-17', '11:00', 'Confirmed'),
(4, 4, '2025-02-18', '16:00', 'Cancelled'),
(5, 5, '2025-02-19', '07:00', 'Pending'),
(6, 6, '2025-02-20', '10:00', 'Confirmed'),
(7, 7, '2025-02-21', '08:00', 'Cancelled'),
(8, 8, '2025-02-22', '09:00', 'Confirmed'),
(9, 9, '2025-02-23', '11:00', 'Pending'),
(10, 10, '2025-02-24', '07:00', 'Confirmed');

INSERT INTO users (email, password, provider) 
VALUES ('user@example.com', 'hashedpassword', 'local');

INSERT INTO users (email, provider, provider_id) 
VALUES ('googleuser@example.com', 'google', 'google-oauth-id-12345');