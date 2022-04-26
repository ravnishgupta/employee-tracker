INSERT INTO department (name) values ('FINANCE');
INSERT INTO department (name) values ('LEGAL');
INSERT INTO department (name) values ('ENGINEERING');

INSERT INTO role (title, salary, department_id) values ('SENIOR ACCOUNTANT', 80000, 1);
INSERT INTO role (title, salary, department_id) values ('FRONT-END ENGINEER', 120000, 3);
INSERT INTO role (title, salary, department_id) values ('LEGAL COUNSEL', 120000, 2);

INSERT INTO employee (first_name, last_name, role_id) values ('JOHN', 'SMITH', 1);
INSERT INTO employee (first_name, last_name, role_id) values ('WILL', 'SMITH', 2);
INSERT INTO employee (first_name, last_name, role_id) values ('OSCAR', 'WILDE', 3);

UPDATE employee SET manager_id = 2 WHERE id = 1;
UPDATE employee SET manager_id = 3 WHERE id = 2;