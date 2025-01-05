DROP TYPE IF EXISTS gender_enum;
CREATE TYPE gender_enum AS ENUM ('Laki-Laki', 'Perempuan');

CREATE TABLE employee_profile (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    place_of_birth VARCHAR(255),
    date_of_birth DATE,
    gender gender_enum,
    is_married BOOLEAN,
    prof_pict VARCHAR(255),
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(id)
);