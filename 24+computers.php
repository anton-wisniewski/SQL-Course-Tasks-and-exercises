<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        $conn = new mysqli("localhost", "root", "", "testdb");

        $sql = <<<TEST
            CREATE TABLE IF NOT EXISTS computers (
                id int(6) AUTO_INCREMENT PRIMARY KEY,
                employee_id INT(6),
                brand VARCHAR(24),
                model VARCHAR(24),
                FOREIGN KEY (employee_id) REFERENCES employees(id)
            );
        TEST;

        if ($conn->query($sql) === TRUE) {
            echo("TABLE CREATED");
        }

        $conn->close();
    ?>
</body>
</html>