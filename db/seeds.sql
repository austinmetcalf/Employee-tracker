USE employee_db;

INSERT into departments(name)
VALUES ("IT"),("HR"),("management");

INSERT into role(title, salary, department_id)
VALUES ("engineer",80000, 1), ("HR rep", 40000, 2), ("manager", 60000, 3);

INSERT into employee (first_name, last_name, role_id, manager_id)
VALUES ("Austin", "Metcalf", 1, NULL),("Robbie","Kurle", 2, 1), ("Jon", "Doe", 3, 1);
DESCRIBE employee;