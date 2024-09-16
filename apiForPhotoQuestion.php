<?php
//    
    $file = $_SERVER['DOCUMENT_ROOT'] . 'functions.php';
    $file1 = $_SERVER['DOCUMENT_ROOT'] . '_connect.php';
    include $file1;
    include $file;
    
        
//    function myFunc($test) {
//        $file = $_SERVER['DOCUMENT_ROOT'] . 'functions.php';
//        include $file;
//        $result= $test*5;
//        return $result;
//    }
//    $new = myFunc(10);
    $bodyFromFront = file_get_contents('php://input');
    $data = json_decode($bodyFromFront);
    $data1 = explode(',', $data->{'data'});
    $out['data'] = $data1[1];
    
    $query = "insert into _materiallinks (material) VALUES ('New TEst');";
    mysql_log_query($query);
//    
//    $query = "select user_task.user_id, user_task.wave_id,wave.project_id, location.city_id as city_id , user_task.location_id as location_id
//                        from user_task
//                        join wave ON wave.id=245
//                        join location ON location.id=508820
//                        WHERE user_task.id=" . $data->{'task_id'};
//    $mainResult = mysql_log_query($query);
//    while ($row = mysql_fetch_array($mainResult)) {
//        $user_id1     = $row['user_id'];
//        $wave_id1     = $row['wave_id'];
//        $project_id1  = $row['project_id'];
//        $location_id1 = $row['location_id'];
//        $__city_id1   = $row['city_id'];
//    }
    
    
//    $out['data'] = "hello from api logging";
    $str_first = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    $str_result = substr(str_shuffle($str_first), 0, 8);
    $project_id = 17;
    $wave_id = 377;
//    $key = 'test';
    $key = $str_result;
    $ext = 'jpeg';
    $path_absolute = $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . 'rafail';
    $path_relative = "/rafail";
    $out['data'] = $path_absolute;
    $gettimeofday = gettimeofday(); 
    $qid = $gettimeofday['sec'] . $gettimeofday['usec'];
    $new_image_name = $qid . '_' . $key . '.' . $ext;

    $dirPath = array();
    $dirPath[0] = '/pn' . $project_id;
    $dirPath[1] = $dirPath[0] . "/" . date('Y');
    $dirPath[2] = $dirPath[1] . "/" . $wave_id;
    $dirPath[3] = $dirPath[2] . "/" . date('md');
    $dirPath[4] = $dirPath[3] . "/" . date('H');

    $new_image_name = $qid . '_' . $key . '.' . $ext;
    $new_path = $path_absolute . $dirPath[4];

    foreach ($dirPath as $dir) {
        if (!file_exists($path_absolute . $dir)) {
            if (!@mkdir($path_absolute . $dir, 0777)) {
                trigger_error('Cannot create dir: ' . $path_absolute . $dir);
            } else {
                $out['data'] = "данные работают";
            }

            if (!is_dir($path_absolute . $dir)) {
                trigger_error('Cannot create dir - filename conflict: ' . $path_absolute . $dir);
            }

            if (!is_writable($path_absolute . $dir)) {
                trigger_error('Access for write on dir denied: ' . $path_absolute . $dir);
            }

//            $out['data'] = $path_absolute . $dir;
        }

    }
    
    
    $filename = $new_path . "/" . $new_image_name;
    $url_relative = $path_relative . $dirPath[4] . DIRECTORY_SEPARATOR . $new_image_name;
    $ifp = fopen( $filename, 'w' ) or die("Unable to open file!");
    fwrite($ifp, base64_decode($data1[1]));
    fclose($ifp);
    
    if ($ifp != false) {
//        $query_q = "insert into auditor_pic (user_id, task_id, pic) VALUES (" . $data->{'user_id'} . "," . $data->{'task_id'} . ",'" . $url_relative . "');";
        $query_q = "insert into auditor_pic (user_id, task_id, pic) VALUES ('". $data->{'user_id'} ."','". $data->{'task_id'} ."','". $url_relative ."');";
        mysql_log_query($query_q);
        
    }
    
//    $path_absolute = $_SERVER['DOCUMENT_ROOT']
//    $dir = '/rafail/';
    
    
//    if (file_exists($path_absolute . $dir)) {
//        $newDir = $path_absolute . $dir . '/test/';
//        mkdir($newDir, 0777);
//        $out['data'] = $path_absolute . $dir;
//    }
    $out['data'] = $_SERVER['DOCUMENT_ROOT'];
    $out['user'] = $data->{'user_id'};
    $out['task_id'] = $data->{'task_id'};
//    $out['ifp'] = $ifp;
    
    echo json_encode($out);
    