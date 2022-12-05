CREATE table CreateUsers (
    id VARCHAR(255)PRIMARY KEY ,
    name VARCHAR(255)not NULL,
    email VARCHAR(255)UNIQUE NOT NULL,
    password VARCHAR(255)NOT NULL
)