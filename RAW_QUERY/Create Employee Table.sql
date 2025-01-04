CREATE TABLE employee (
  "id" int4 NOT NULL,
  "nik" varchar(255),
  "name" varchar(255),
  "is_active" bool,
  "start_date" date NOT NULL,
  "end_date" date NOT NULL,
  "created_by" varchar(255),
  "updated_by" varchar(255),
  "created_at" date NOT NULL,
  "updated_at" date NOT NULL,
  PRIMARY KEY ("id")
);