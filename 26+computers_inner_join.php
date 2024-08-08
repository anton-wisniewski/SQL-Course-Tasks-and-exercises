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

        // inner join - zwraca połączone rekordy z obu tabel

        $sql = <<<TEST
            SELECT employees.id, employees.name, employees.surname, 
            computers.id, computers.brand, computers.model, computers.employee_id
            FROM employees
            INNER JOIN computers ON employees.id = computers.employee_id
        TEST;
        
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo("<br>id:".$row["id"]." name:".$row["name"]. " surname:".$row["surname"]
                    . " brand:".$row["brand"]. " model:".$row["model"] ." employee_id:".$row["employee_id"]);

            }
        }

 

        $conn->close();
    ?>
</body>
</html>