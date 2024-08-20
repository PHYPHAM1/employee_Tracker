/*//TODO: Create seed data for the department table */
INSERT INTO department (department_name)
VALUES  ('IT'), 
        ('HR'),
        ('Marketing'),
        ('Finance'),
        ('Sales');

/*//TODO: Create seed data for the review table */
INSERT INTO roles (department_id, title, salary)
VALUES  (1, 'IT support', 80000.00),
        (2, 'HR specialist', 100000.00),
        (3, 'Social media marketing', 90000.00),
        (4, 'This movie sucks', 110000.00),
        (5, 'Sales Representative', 150000.00);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bob', 'Hope', 4, 1);
        

        