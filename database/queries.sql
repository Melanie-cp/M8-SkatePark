DROP TABLE IF EXISTS skaters;

CREATE TABLE skaters (
	id SERIAL PRIMARY KEY, 
	email VARCHAR(50) NOT NULL, 
	nombre VARCHAR(50) NOT NULL, 
	password VARCHAR(100) NOT NULL, 
	anos_experiencia INT NOT NULL, 
	especialidad VARCHAR(50) NOT NULL, 
	foto VARCHAR(255) NOT NULL, 
	estado BOOLEAN NOT NULL
);

INSERT INTO skaters(email, nombre, password, anos_experiencia, especialidad, foto, estado)
VALUES
	('tonyhawk@mail.com','Tony Hawk', '12345', 12, 'Kickflip', 'tony.jpg', true),
	('e.bouilliart@mail.com','Evelien Bouilliart', '123123', 10, 'Heelflip', 'Evelien.jpg', true),
	('dannyway@mail.com','Danny Way', '54321', 8, 'Ollie', 'Danny.jpg', False);
	
SELECT * FROM skaters;