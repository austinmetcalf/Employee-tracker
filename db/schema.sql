DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;


CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL 

);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) UNIQUE NOT NULL,
    last_name VARCHAR(30) UNIQUE NOT NULL,
    role_id INT,
    manager_id INT
);
DESCRIBE departments;
DESCRIBE role;
DESCRIBE employee;