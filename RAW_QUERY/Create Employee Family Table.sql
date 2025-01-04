DROP TYPE IF EXISTS religion_enum;
CREATE TYPE religion_enum AS ENUM('Islam', 'Katolik', 'Buda', 'Protestan', 'Konghucu');
DROP TYPE IF EXISTS relation_status_enum;
CREATE TYPE relation_status_enum AS ENUM('Suami', 'Istri', 'Anak', 'Anak Sambung');

CREATE TABLE employee_family (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    identifier VARCHAR(255),
    job VARCHAR(255),
    place_of_birth VARCHAR(255),
    date_of_birth DATE,
    religion religion_enum,
    is_life BOOLEAN,
    is_divorced BOOLEAN,
    relation_status relation_status_enum,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(id)
);