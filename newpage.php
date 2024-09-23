<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>New Page Anketa</title>
        <link rel="stylesheet" href="http://localhost/TestAnketa/styles.css">
    </head>
    <body>
<?php
//    echo '<link rel="stylesheet" href="styles.css">';
    echo '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>';
    echo '<script type="text/javascript" src="http://localhost/TestAnketa/function_auditor.js"></script>';
    $input = fopen("config.txt", "r");
    while(!feof($input)) { 
        $dataDB[] = trim(fgets($input));
    }
    $servername = $dataDB[0];
    $username = $dataDB[1];
    $password = $dataDB[2];
    $dbname = $dataDB[3];
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset('utf8');
    include 'pic_block_1.php';
    include 'editAnketa.php';
    
    
    $data = drawX5Photos($conn);
    edit_anketa($conn, $data);
        ?>
    </body>
</html>

    