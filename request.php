<?php
    $bodyFromFront = file_get_contents('php://input');
    $data = json_decode($bodyFromFront);
    $path = dirname(__FILE__);
    $data1 = explode(',', $data->{'data'});
    $extension = explode('/', mime_content_type($data->{'data'}))[1];
    $out['data'] = createPath();
//    createPath();
    $filename = $out['data'];
//    $filename = $path . DIRECTORY_SEPARATOR . 'test.' . $extension;
    $ifp = fopen( $filename, 'w' ) or die("Unable to open file!");
    fwrite($ifp, base64_decode($data1[1]));
    fclose($ifp);
//    $out['data'] = $data1;
    echo json_encode($out);
    
    function createPath() {
        $project_id = 17;
        $wave_id = 377;
        $key = 'test';
        $ext = 'jpeg';
        $path_absolute = dirname(__FILE__);
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
//        $rpath = str_replace("/", "\\",$new_path);
//        mkdir($new_path, 0777, true);
        foreach ($dirPath as $dir) {
            if (!file_exists($path_absolute . $dir)) {
                if (!@mkdir($path_absolute . $dir, 0777)) {
                    trigger_error('Cannot create dir: ' . $path_absolute . $dir);
                            }

                if (!is_dir($path_absolute . $dir)) {
                    trigger_error('Cannot create dir - filename conflict: ' . $path_absolute . $dir);
                }

                if (!is_writable($path_absolute . $dir)) {
                    trigger_error('Access for write on dir denied: ' . $path_absolute . $dir);
                }
            }
            
        }
        return $new_path . "/" . $new_image_name;

//        $rpath = str_replace("\\","/",$path_absolute) . $dirPath[4];
//        $rpath = str_replace("/","\\",$rpath);
//        $new_path = realpath($rpath);
//        return $rpath;
//        foreach ($dirPath as $dir) {
//            if (!file_exists($path_absolute . $dir)) {
//                if (!@mkdir($path_absolute . $dir, 0777)) {
//                    trigger_error('Cannot create dir: ' . $path_absolute . $dir);
//                }
//
//                if (!is_dir($path_absolute . $dir)) {
//                    trigger_error('Cannot create dir - filename conflict: ' . $path_absolute . $dir);
//                }
//
//                if (!is_writable($path_absolute . $dir)) {
//                    trigger_error('Access for write on dir denied: ' . $path_absolute . $dir);
//                }
//            }
//        }
        
    }