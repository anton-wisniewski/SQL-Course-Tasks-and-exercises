CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(32) NOT NULL,
  surname VARCHAR(32) NOT NULL,
  email VARCHAR(128) NOT NULL,
  profession VARCHAR(45) NOT NULL COMMENT "for example: programmer, tester",
  department VARCHAR(45) NOT NULL,
  salary FLOAT NOT NULL, 
  age INT NOT NULL,
  city VARCHAR(32) NOT NULL
);

INSERT INTO employees (id, name, surname, email, profession, department, salary, age, city) VALUES (NULL, 'Kasia', 'Kowalska', 'kasia@example.com', 'programmer', 'IT', '14000', '32', 'Wawa');
INSERT INTO employees (id, name, surname, email, profession, department, salary, age, city) VALUES (NULL, 'Ania', 'Nowak', 'ania@example.com', 'recruiter', 'HR', '10000', '27', 'Krk');
INSERT INTO employees (id, name, surname, email, profession, department, salary, age, city) VALUES (NULL, 'Adam', 'Adamski', 'adam@example.com', 'programmer', 'IT', '15000', '36', 'Wawa');
INSERT INTO employees (id, name, surname, email, profession, department, salary, age, city) VALUES (NULL, 'Karol', 'Karolski', 'karol@example.com', 'tester', 'IT', '11000', '28', 'Wawa');
INSERT INTO employees (id, name, surname, email, profession, department, salary, age, city) VALUES (NULL, 'Monika', 'Kowalska', 'monika@example.com', 'programmer', 'IT', '12000', '33', 'Wawa');
INSERT INTO employees (id, name, surname, email, profession, department, salary, age, city) VALUES (NULL, 'Asia', 'Nowak', 'asia@example.com', 'recruiter', 'HR', '15000', '34', 'Krk');
INSERT INTO employees (id, name, surname, email, profession, department, salary, age, city) VALUES (NULL, 'Daniel', 'Danielski', 'daniel@example.com', 'programmer', 'IT', '17000', '37', 'Krk');
INSERT INTO employees (id, name, surname, email, profession, department, salary, age, city) VALUES (NULL, 'Olga', 'Karolska', 'olga@example.com', 'tester', 'IT', '8000', '25', 'Wawa');




ALTER TABLE employees ADD COLUMN (
  country varchar(12) DEFAULT 'Polska',
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);




SELECT * FROM  employees  WHERE profession = 'programmer' AND age >= 18

SELECT * FROM  employees  WHERE age = 27 OR age = 32

SELECT * FROM  employees  WHERE NOT age = 28

SELECT * FROM  employees  WHERE country = "Polska" AND (age = 28 OR age = 32)

SELECT * FROM employees WHERE age <> 28; /* NOT EQUAL */


/* 0 lub więcej znaków   wildcard */
SELECT * FROM employees WHERE surname LIKE '%ow%'; 

/* _ to jeden znak */
SELECT * FROM employees WHERE name LIKE '_asia'; 



/* Union - unie łączą dwie tabele */
CREATE TABLE employeesuk (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(32) NOT NULL,
  surname VARCHAR(32) NOT NULL,
  email VARCHAR(128) NOT NULL,
  profession VARCHAR(45) NOT NULL COMMENT "for example: programmer, tester",
  department VARCHAR(45) NOT NULL,
  salary FLOAT NOT NULL, 
  age INT NOT NULL,
  city VARCHAR(32) NOT NULL,
  country VARCHAR(32) NOT NULL,
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO employeesuk (id, name, surname, email, profession, department, salary, age, city, country) VALUES (NULL, 'John', 'Smith', 'john@example.com', 'programmer', 'IT', '4000', '32', 'London', 'Uk');
INSERT INTO employeesuk (id, name, surname, email, profession, department, salary, age, city, country) VALUES (NULL, 'Andrew', 'Goodman', 'andrew@example.com', 'programmer', 'IT', '4500', '32', 'London', 'Uk');
INSERT INTO employeesuk (id, name, surname, email, profession, department, salary, age, city) VALUES (NULL, 'Karol', 'Karolski', 'karol@example.com', 'tester', 'IT', '11000', '28', 'Wawa');


/* UNION ALL - zwraca wszystkie lącznie z duplikatami, szybsze niż UNION, które musi porównać rekordy */
SELECT * FROM employees UNION ALL SELECT * FROM employeesuk;

/* UNION - woniejszy bez duplikatów */
SELECT * FROM employees UNION   SELECT * FROM employeesuk;

/* Pobranie danych z tabeli których nie ma w innej tabeli */
SELECT * FROM employees WHERE name NOT IN (SELECT name FROM employeesuk);

/* Pobranie elementów wspólnych */
SELECT * FROM employees WHERE name IN (SELECT name FROM employeesuk);



/* Grupowanie rezultatów, zgrupowanie rekordów ze względu na miasto wraz z ich ilością */
SELECT COUNT(id), name, surname, city FROM employees GROUP BY city;

/* Grupowanie z kolejnością malejącą wyników */
SELECT COUNT(id), name, surname, city FROM employees GROUP BY city ORDER BY COUNT(id) DESC;


/* having - pokazuje ilość pracowników w danym mieście o ile w danym mieście jest więcej niż 2 pracowników */
SELECT COUNT(id), name, surname, city FROM employees GROUP BY city HAVING COUNT(id) > 2;




/* Exists */
CREATE TABLE tasks (
   id INT PRIMARY KEY AUTO_INCREMENT,
   title VARCHAR(256) NOT NULL,
   description VARCHAR(1024),
   status ENUM('NEW', 'ON HOLD', 'RESOLVED', 'CLOSED') NOT NULL DEFAULT 'NEW',   
   employeeId INT 
);

INSERT INTO tasks (title, description, employeeId) VALUES ('Task 1', 'Task 1 description', 1);
INSERT INTO tasks (title, description, employeeId) VALUES ('Task 2', 'Task 2 description', 1);
INSERT INTO tasks (title, description, employeeId) VALUES ('Task 3', 'Task 3 description', 1);

INSERT INTO tasks (title, description, employeeId) VALUES ('Task 4', 'Task 4 description', 2);
INSERT INTO tasks (title, description, employeeId) VALUES ('Task 5', 'Task 5 description', 2);

INSERT INTO tasks (title, description, employeeId) VALUES ('Task 6', 'Task 6 description', 3);
INSERT INTO tasks (title, description, employeeId) VALUES ('Task 7', 'Task 7 description', 3);

/* EXISTS testuje czy istniejre rekord w subquery, zwraca true jeśli w subquery jest jeden lub więcej rekordów */
/* Zwróci pracowników którzy mają powiązany task i id taska większe od 1 */
SELECT *
FROM employees
WHERE EXISTS (SELECT name FROM tasks WHERE employees.id = tasks.employeeId AND tasks.id > 1); 

 
/* ANY - operator zwracający true jeśli porównanie dla jakiegokolwiek (ANY) subquery 
   zwróci true 
   np zwróci pracowników jeśli any employee.id będzie równy tasks.employeeId
   czyli de facto pracowników mających jakiś task z id większym niż 3*/
SELECT *
FROM employees
WHERE employees.id = ANY (SELECT tasks.employeeId FROM tasks WHERE id > 3);

