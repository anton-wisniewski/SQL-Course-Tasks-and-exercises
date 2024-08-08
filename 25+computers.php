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

        $sql2 = <<<TEST
            INSERT INTO computers (employee_id, brand, model)
            VALUES (1, 'Dell', 'Inspiron x1'),
            (2, 'Dell2', 'Inspiron x2'),
            (3, 'Dell3', 'Inspiron x3'),
            (4, 'Dell4', 'Inspiron x4');
        TEST;

        $sqlUpdate = <<<TEST
            UPDATE computers SET brand='Compaq' WHERE id >= 2 
        TEST;

        if ($conn->query($sqlUpdate) === TRUE) {
            echo("db ok");
        }

        $sqlDelete = <<<TEST
            DELETE FROM computers WHERE id = 3;
        TEST;
        
        $result = $conn->query($sqlDelete);


        $sql3 = <<<TEST
            SELECT * from computers;
        TEST;
        
        $result = $conn->query($sql3);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo("<br>id:".$row["id"]." brand:".$row["brand"]
                    ." model:".$row["model"]." employee_id:".$row["employee_id"]);
            }
        }


        /*if ($conn->query($sql2) === TRUE) {
            echo("db ok");
        }*/

        $conn->close();
    ?>
</body>
</html>