<?php
    function edit_anketa($conn, $data) {
    $CheckUser=CheckUser(); 
    $_devdebug =  ($CheckUser['id'] == 107960 /* 115423 */ );

    $wave_id = 0;
    $project_id = 0;
    $query = "select user_task.wave_id,location.project_id, user_task.legend, user_task.parent_questionnaire_id
				from user_task
				left join location ON location.id=user_task.location_id
				WHERE user_task.id=" . $_REQUEST["task_id"];
    $result = $conn->query($query);
//if (geh()) {
//    pre($query);
//}

    while ($row = $result->fetch_assoc()) {
        $wave_id = $row["wave_id"];
        $project_id = $row["project_id"];
        $legend = $row["legend"];
        $questionnaire_id = $row["parent_questionnaire_id"];
    }

    if (isset($_FILES) && isset($_FILES["avatar"]) && is_null($_FILES["avatar"]) == false) {
        ini_set('upload_max_filesize', '1024M');
        ini_set('post_max_size', '1546M');
//        ini_set('memory_limit', '2048M');
        ini_set('memory_limit', '4096M');

        foreach ($_FILES["avatar"]["tmp_name"] as $key => $tmp_name) {
            $file_name = $_FILES["avatar"]["name"][$key];
            $file_tmp = $_FILES["avatar"]["tmp_name"][$key];
            $ext = pathinfo($file_name,PATHINFO_EXTENSION);
            $ext = strtolower($ext);
            $error = [];
            $extension = ["jpeg","jpg","png","gif",                "heic"];

            if (in_array($ext, $extension)) {
                $path_absolute = $_SERVER['DOCUMENT_ROOT'] . '/pics/';
                $path_relative = "/pics/";
                $gettimeofday = gettimeofday();
                $qid = $gettimeofday["sec"] . $gettimeofday["usec"];
                $new_image_name = $qid . "_" . time() . $key . "." . $ext;

                $dirPath = array();
                $dirPath[0] = "pn" . $project_id;
                $dirPath[1] = $dirPath[0] . DIRECTORY_SEPARATOR . date('Y');
                $dirPath[2] = $dirPath[1] . DIRECTORY_SEPARATOR . $wave_id;
                $dirPath[3] = $dirPath[2] . DIRECTORY_SEPARATOR . date('md');
                $dirPath[4] = $dirPath[3] . DIRECTORY_SEPARATOR . date('H');

                $new_path = $dirPath[4];
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

                $url_absolute = $path_absolute . $new_path . "/" . $new_image_name;
                $url_relative = $path_relative . $new_path . "/" . $new_image_name;
                $rez = move_uploaded_file($file_tmp, $url_absolute);

                if ($rez == true) {
                    $wave_id = 0;
                    $project_id = 0;
                    $query = "select user_task.wave_id,location.project_id
                from user_task 
                left join location ON location.id=user_task.location_id
                WHERE user_task.id=" . $_REQUEST["task_id"];
                    $result = $conn->query($query);
                    while ($row = $result->fetch_assoc()) {
                        $wave_id = $row["wave_id"];
                        $project_id = $row["project_id"];
                    }

                    if ($wave_id >= 39 && $project_id == 2) {

// GEH
//                        $fpath = "pics/" . $rootdir7 . "/" . $new_image_name;
//                        ResizeAndSetExif($fpath);
                        ResizeAndSetExif( $url_relative);
                    }

//                    $query_q = "insert into auditor_pic (user_id, task_id, pic) VALUES (" . $CheckUser["id"] . "," . $_REQUEST["task_id"] . ",'" . $url_relative . "') # Edit anketa";

//                    $conn->query($query_q);
                } else {
                    echo "Ошибка загрузки фотографии";
                }
            }
        }
        header("Location: /edit_anketa/?task_id=".$_GET["task_id"]);
        exit;
    }

    //добавление видео аудио
    //action video_add	 question_set_id
    if (isset($_FILES)&&isset($_FILES["video"])&&is_null($_FILES["video"])==false&&isset($_REQUEST["action"])&&$_REQUEST["action"]=="video_add"&&isset($_REQUEST["question_set_id"])) {

	    foreach($_FILES["video"]["tmp_name"] as $key=>$tmp_name) {
		//echo $tmp_name."<br>";
            $file_name=$_FILES["video"]["name"][$key];
            $file_tmp=$_FILES["video"]["tmp_name"][$key];
            $ext=pathinfo($file_name,PATHINFO_EXTENSION);
            $ext = strtolower($ext);
            $error=array();
            $extension=array("avi","mp4","m4a", "mp3","ogg","wav","wma","aac","amr","3gpp");

    	    if (in_array($ext,$extension)) {
                 $path_absolute =  $_SERVER['DOCUMENT_ROOT'] . "/pics/vid/";
                 $path_relative = "/pics/vid/";
                 $gettimeofday = gettimeofday();
                 $qid = $gettimeofday["sec"] . $gettimeofday["usec"];
                 $new_image_name = $qid . "_" . time() . $key . "." . $ext;
                 $new_image_name_mp3= $qid . "_" . time() . $key . ".mp3";



                //                $rootdir1 = substr($qid, -1, 1);
//                 $rootdir2 = $rootdir1 . "/" . substr($qid, -2, 1);
//                 $rootdir3 = $rootdir2 . "/" . substr($qid, -3, 1);
//                 $rootdir4 = $rootdir3 . "/" . substr($qid, -4, 1);
//                 $rootdir5 = $rootdir4 . "/" . substr($qid, -5, 1);
//                 $rootdir6 = $rootdir5 . "/" . substr($qid, -6, 1);
//                 $rootdir7 = $rootdir6 . "/" . substr($qid, -7, 1);

                 // if (is_dir($path_absolute.$rootdir1)==false) {mkdir($path_absolute.$rootdir1, 0777);}
                 // if (is_dir($path_absolute.$rootdir2)==false) {mkdir($path_absolute.$rootdir2, 0777);}
                 // if (is_dir($path_absolute.$rootdir3)==false) {mkdir($path_absolute.$rootdir3, 0777);}
                 // if (is_dir($path_absolute.$rootdir4)==false) {mkdir($path_absolute.$rootdir4, 0777);}
                 // if (is_dir($path_absolute.$rootdir5)==false) {mkdir($path_absolute.$rootdir5, 0777);}
                 // if (is_dir($path_absolute.$rootdir6)==false) {mkdir($path_absolute.$rootdir6, 0777);}
                 // if (is_dir($path_absolute.$rootdir7)==false) {mkdir($path_absolute.$rootdir7, 0777);}

                 // $url_absolute=$path_absolute.$rootdir7."/".$new_image_name;
                 // $url_relative=$path_relative.$rootdir7."/".$new_image_name;

                 $dirPath = array();

                 $dirPath[0] = "pn" . $project_id;
                 $dirPath[1] = $dirPath[0] . '/' . date('Y');
                 $dirPath[2] = $dirPath[1] . '/' . $wave_id;
                 $dirPath[3] = $dirPath[2] . '/' . date('md');
                 $dirPath[4] = $dirPath[3] . '/' . date('H');

                 $new_path = $dirPath[4];
                foreach ($dirPath as $dir) {
                    if (!file_exists($path_absolute . $dir)) {
                        if (!@mkdir($path_absolute . $dir, 0777)) {
                            trigger_error('Cannot create dir: ' . $path_absolute . $dir);
                        }

                        if (!is_dir($path_absolute . $dir)) {
                        }

                        if (!is_writable($path_absolute . $dir)) {
                            trigger_error('Access for write on dir denied: ' . $path_absolute . $dir);
                        }
                    }
                }

//		if (is_dir($path_absolute.$rootdir1)==false) {mkdir($path_absolute.$rootdir1, 0777);}
//		if (is_dir($path_absolute.$rootdir2)==false) {mkdir($path_absolute.$rootdir2, 0777);}
//		if (is_dir($path_absolute.$rootdir3)==false) {mkdir($path_absolute.$rootdir3, 0777);}
//		if (is_dir($path_absolute.$rootdir4)==false) {mkdir($path_absolute.$rootdir4, 0777);}
//		if (is_dir($path_absolute.$rootdir5)==false) {mkdir($path_absolute.$rootdir5, 0777);}
//		if (is_dir($path_absolute.$rootdir6)==false) {mkdir($path_absolute.$rootdir6, 0777);}
//		if (is_dir($path_absolute.$rootdir7)==false) {mkdir($path_absolute.$rootdir7, 0777);}

        		$url_absolute= $path_absolute . $new_path."/".$new_image_name;
		        $url_absolute_mp3 = $path_absolute . $new_path."/".$new_image_name_mp3;

        		$url_relative=$path_relative.$new_path."/".$new_image_name;
        		$relative_mp3=$path_relative.$new_path."/".$new_image_name_mp3;
        		$rez=move_uploaded_file($file_tmp, $url_absolute);

    			if ($rez==true) {
    				$query_q="insert into user_video (recieved_time, user_id, task_id, url) VALUES (NOW(), ".$CheckUser["id"].",".$_REQUEST["task_id"].",'".$url_relative."')";
				    $result=$conn->query($query_q);

                    if ($result) {
                        $user_video_id=0;
        				//select max(id) as max from user_video
    					$query="select max(id) as max from user_video
					where user_id=".$CheckUser["id"]." and task_id=".$_REQUEST["task_id"];
    					$result=$conn->query($query);

						while($row = $result->fetch_assoc()) {
                            $user_video_id=$row["max"];
                        }

        				if ($user_video_id!=0) {
                            $old_answer="";
                            $inbd=0;
                            $query="select comment_text
						from user_answer 
						where  question_set_id=".$_REQUEST["question_set_id"];
						$result=$conn->query($query);

                        while($row = $result->fetch_assoc()) {
                            $inbd=1;
                            $old_answer=$row["comment_text"];
                        }

    					$video_url="/video/?f=".$user_video_id;
    					if ($inbd==0) {
                            $query_q="insert into user_answer (user_id, task_id, question_set_id, comment_text) VALUES (".$CheckUser["id"].",".$_REQUEST["task_id"].",".$_REQUEST["question_set_id"].",'".$video_url."')";
                            $result=$conn->query($query_q);
    					}
					
                        if ($inbd==1) {
                            $query_s="update user_answer set comment_text='".$old_answer.$video_url."' where question_set_id=".$_REQUEST["question_set_id"];
                            $result_s=$conn->query($query_s);
                        }

						compress_audio($url_absolute,$url_absolute_mp3,$user_video_id,$relative_mp3,$ext);
                    }
    			}
    		} else {
		    	echo "Ошибка загрузки видео файла";
	    	}
        }
    }

// GEH. Логирование использования этой части кода
//        $_f_temp_347846=file_get_contents("http://cp6.ru/_c/old_video_loader.php?r=" . $_GET["task_id"]);
         header("Location: " . $_SERVER['HTTP_REFERER']);
         exit;
}


//$Settings = new Settings();
//echo $Settings->page_header_auditor;
echo "<div id='PopupInfo' style='display:block; position:fixed; top:-50px; left:0px; height:50px; width:100%; background-color:#3F3E3E; color:white; font-size:1.5em; text-align:center;line-height: 50px;'>123546</div><div style='display:none'></div>";

	 
	// $CheckUser=CheckUser();
	 
	   $user_id=$CheckUser["id"];
//	  $project_id=$CheckUser["project_id"];
	  $operator_user_rights_id=$CheckUser["user_rights_id"];

	
if  (
(($project_id==2||$project_id==3||$project_id==4||$project_id==5 ||($project_id == 15 || $project_id == 18   || $project_id == 16 || $project_id == 17 || $project_id == 23  || $project_id == 24 || $project_id == 25  || $project_id == 19 || $project_id == 20  || $project_id == 21  || $project_id == 22  || $project_id == 100 ))&&$operator_user_rights_id==1) 
||
($project_id == 17 && $user_id==111371)
||
($project_id == 6 )

)
{ 

echo "<script>




$(document).ready(function() {


$.datepicker.setDefaults({
	closeText: 'Закрыть',
	prevText: '&#x3C;Пред',
	nextText: 'След&#x3E;',
	currentText: 'Сегодня',
	monthNames: [ 'Январь','Февраль','Март','Апрель','Май','Июнь',
	'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь' ],
	monthNamesShort: [ 'Янв','Фев','Мар','Апр','Май','Июн',
	'Июл','Авг','Сен','Окт','Ноя','Дек' ],
	dayNames: [ 'воскресенье','понедельник','вторник','среда','четверг','пятница','суббота' ],
	dayNamesShort: [ 'вск','пнд','втр','срд','чтв','птн','сбт' ],
	dayNamesMin: [ 'Вс','Пн','Вт','Ср','Чт','Пт','Сб' ],
	weekHeader: 'Нед',
	dateFormat: 'yy-mm-dd',
	firstDay: 1,
maxDate:0,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: '',
	onSelect: function (dateText, inst) {
		var arr=inst.id.split('add_answer_digit_');
        // console.log(arr[1]);
		 
		 var task_id=$(inst.input).attr('task_id');
		 // console.log(task_id);
		  
		  var user_id=$(inst.input).attr('user_id');
		//  console.log(user_id);
		  
		  
		  var dfg=dateText;
		// console.log(dateText);		  
		  add_user_answer({user_id:user_id,task_id:task_id,qid:arr[1],val:dfg,type:'answer_digit'});
		  
		 
		 
      }
	
	});

	
     var obj=$('.is_date');       
	 $.each( obj, function( key, value ) {
			var queryDate = $(value).val();
			if (queryDate!=='') {
				var dateParts = queryDate.match(/(\d+)/g);
				var realDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);  
				
			 }
				 
				$(value).datepicker();
			if (queryDate!=='') {
				$(value).datepicker('setDate', realDate);
			}
	});

   //$('.is_time').timepicker();  
    
	
 });</script>";
}	

$_projects_allowed = [2, 3, 4, 5, /* 6, */ 7, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 100];
if (
( $operator_user_rights_id==1 && in_array( $project_id, $_projects_allowed) )
    || $project_id == 6
)



{

		if (isset($_REQUEST["task_id"])) 
		{
			$task_id=$_REQUEST["task_id"];

		}

		 if (isset($task_id))
		{


	$user_got_answers=1;

	 $qua="SELECT user_answer.* FROM user_answer  WHERE task_id=".$task_id;
	 $result_ua=$conn->query($qua);	
	 $num_ua = $result_ua->num_rows;
	 if ($num_ua==0){
	   $user_got_answers=0;	 
	 }
		
		
	
		


   
   
   //доп редактирование
   echo "<div style='clear:both; height:30px;'></div>";

		
			
					
		

		
		//тип анкеты
   $project_id==17;
   $operator_user_rights_id==1;
   $user_id = 111357;
		global  $task_questionnaire_id;
		$task_questionnaire_id=0;
		$loc_adress="";
		$qaz="SELECT user_task.*,  location.name as loc_adress ,  location.address as adr, location.attr_2, q_nair.name as qnair_name FROM user_task 
                        LEFT JOIN location ON location.id=user_task.location_id 
                        join questionnaire as q_nair on q_nair.id = user_task.parent_questionnaire_id
                        WHERE status in (0,7) AND  user_task.user_id=".$user_id." AND  user_task.id=".$task_id;
		
		if ($project_id==17&&$operator_user_rights_id==1) {
		$qaz="SELECT user_task.*,  concat('\"',location.name ,'\", ', location.address)as loc_adress , q_nair.name as qnair_name FROM user_task 
                        LEFT JOIN location ON location.id=user_task.location_id 
                        join questionnaire as q_nair on q_nair.id = user_task.parent_questionnaire_id
                        WHERE status in (0,7) AND  user_task.user_id=".$user_id." AND  user_task.id=".$task_id;

		$qaz="SELECT user_task.*,  location.address as loc_adress , location.attr_2, location.photo_id, q_nair.name as qnair_name FROM user_task 
                        LEFT JOIN location ON location.id=user_task.location_id 
                        join questionnaire as q_nair on q_nair.id = user_task.parent_questionnaire_id
                        WHERE status in (0,7) AND  user_task.user_id=".$user_id." AND  user_task.id=".$task_id;
                }
if ($project_id==19&&$operator_user_rights_id==1) { 
		$qaz="SELECT user_task.*,   location.name as location_name, location.shop_id , location.address as loc_adress , q_nair.name as qnair_name FROM user_task 
                        LEFT JOIN location ON location.id=user_task.location_id 
                        join questionnaire as q_nair on q_nair.id = user_task.parent_questionnaire_id
                        WHERE status in (0,7) AND  user_task.user_id=".$user_id." AND  user_task.id=".$task_id;



                }
// GEH. Костыль Магнит - Аксенова
/* if ($project_id==17 &&  $user_id==111371) {
		$qaz="SELECT user_task.*,  concat('\"',location.name ,'\", ', location.address)as loc_adress , q_nair.name as qnair_name FROM user_task 
                        LEFT JOIN location ON location.id=user_task.location_id 
                        join questionnaire as q_nair on q_nair.id = user_task.parent_questionnaire_id

  join coordinator_task ct on ct.task_id=user_task.id

                        WHERE status in (0,7) AND  ct.user_id=".$user_id." AND  user_task.id=".$task_id;
                }
*/

if ($project_id==6 /* &&$operator_user_rights_id==1 */) { 
			$qaz="SELECT user_task.*, location.name as loc_adress
			FROM user_task
			LEFT JOIN location ON location.id=user_task.location_id 
			WHERE location.project_id=".$project_id." AND user_task.status in (0,7) AND user_task.id=".$task_id;
// pre($qaz,1);
// pre($qaz);

		}


		if ($project_id==5&&$operator_user_rights_id==1) { 
			$qaz="SELECT user_task.*, location.name as loc_adress,
			smdb.shops.sname, smdb.shops.adr 
			FROM user_task 
			LEFT JOIN location ON location.id=user_task.location_id 
			LEFT JOIN smdb.shops ON smdb.shops.shop_id=location.shop_id
			WHERE location.project_id=".$project_id." AND user_task.status in (0,7) AND user_task.id=".$task_id;
		}
		
		
		
		if ($project_id==7&&$operator_user_rights_id==1) { 
			$qaz="SELECT user_task.*, location.name as loc_adress
			FROM user_task 
			LEFT JOIN location ON location.id=user_task.location_id 
			WHERE location.project_id=".$project_id." AND user_task.status in (0,1,7) AND user_task.id=".$task_id;
		}
		
		
		
		if ($project_id==4&&$operator_user_rights_id==1) { 
				$qaz="SELECT user_task.*,  location.name as loc_adress,
				rosneft_dict.kod_azs_azk, rosneft_dict.nazv_azs_azk				
				FROM user_task 
				LEFT JOIN location ON location.id=user_task.location_id 
				left join  rosneft_dict ON  rosneft_dict.shop_id=location.shop_id
				WHERE status in (0,7) AND user_task.id=".$task_id;
				//echo $qaz;
		}		


		if ($project_id==22 && $operator_user_rights_id==1) { 
                    $qaz="SELECT user_task.*,  location.name as shop_name, b.name as brand,  location.address as loc_adress, location.attr_2, location.photo_id,  q_nair.name as qnair_name FROM user_task 
                        LEFT JOIN location ON location.id=user_task.location_id 
                        join questionnaire as q_nair on q_nair.id = user_task.parent_questionnaire_id
                        left join tele2.shops s on location.shop_id=s.shop_id && location.project_id=22
                        left join tele2.brands b on b.id=s.brand_id 

                        WHERE status in (0,7) AND  user_task.user_id=".$user_id." AND  user_task.id=".$task_id;

		}

		
//		pre( $qaz,1);
		//rosneft_dict.kod_azs_azk, rosneft_dict.nazv_azs_azk,
		
		
		$result_qaz=$conn->query($qaz);
		
		
		$num_rows = $result_qaz->num_rows;
		
		if ($num_rows==0) {
			echo "Нет данной анкеты";
			exit;
		}
		
		while($row_qaz = $result_qaz->fetch_assoc())
		{
			$wave_id=$row_qaz["wave_id"];
			$loc_adress=$row_qaz["loc_adress"];
			$location_id=$row_qaz["location_id"];
                        $qnair_name = $row_qaz["qnair_name"];
                        $brand_name = $row_qaz["brand"];
			if ($project_id==5){
				$loc_adress=$row_qaz["sname"].", ".$row_qaz["adr"];
			}			
			$task_questionnaire_id=$row_qaz["parent_questionnaire_id"];
			
			
			if ($project_id==4){
				$kod_azs_azk=$row_qaz["kod_azs_azk"];
				$nazv_azs_azk=$row_qaz["nazv_azs_azk"];
			}	
			if ($project_id==19){
                            $location_name=$row_qaz["location_name"];
                            $shop_id=$row_qaz["shop_id"];
                        }
			if ($project_id==22){
//				$loc_adress = $row_qaz["brand"]  $row_qaz["adr"];
			}
                        $recieved_time = $row_qaz['recieved_time'];
                        $material_link = $row_qaz['material_link'];
                        $attr_2 = $row_qaz['attr_2'];
                        $photo_id = $row_qaz['photo_id'];
// Режим работы
                        $open_time = $row_qaz['open_time'];
// ТТ закрыта
                        $closed_date = $row_qaz['closed_date'];
// ТТ закрыта, ревизия. Из Магнита
                        $revisions_date=$row_qaz['revisions_date'];
               }
		
		echo "<span style='font-size:20px;'>Анкета № <b>$task_id</b></span><br><br>";
                if ($project_id == 19) {
                    echo "<span style='font-size:25px;'>Название точки: <b>".$location_name."</b></span><br><br>";
                    echo "<span style='font-size:25px;'>Код точки: <b>".$shop_id."</b></span><br><br>";
            	}
		echo "<span style='font-size:25px;'>Адрес: <b>". $row_qaz["shop_n"]. ' '.  $loc_adress.  "</b></span><br><br><br>";

                if ($open_time!==null && $open_time>"" ) {
                    echo "<span style='font-size:18px;'>Режим работы: ".$open_time."</span><br><br><br>";
                }

                if ($closed_date!==null && $closed_date>"" ) {
                    echo "<span style='font-size:18px;'>Закрыто, по плану: <b style='color: red;'>".$closed_date."</b></span><br><br><br>";
                }

                if ($revisions_date!==null && $revisions_date>"" ) {
                    echo "<span style='font-size:18px;'>Закрыто, ревизия: <b style='color: red;'>".$revisions_date."</b></span><br><br><br>";
                }

                if ($attr_2!==null && $attr_2>"") {
                    echo "<span style='font-size:25px;'>Категория ТТ: <b>".$attr_2."</b></span><br><br><br>";
                }


//                $photo_shop_str = showShopPhoto( $location_id);
////                if ($CheckUser['id']==107960) { pre($location_id);}
//                if ($photo_shop_str>'' && $project_id == 23) {
//                    echo  $photo_shop_str. '<br />';
//                }

//                if ($photo_id!==null && $photo_id>"") {
//                    $q_pic="select * from auditor_pic where id=" . $photo_id . " limit 1";
//                    $result_pic=$conn->query($q_pic);
//                    while($row_pic = $result_pic->fetch_assoc()){
//                        $pic_tmb= $row_pic['pic_tmb'];
//                        $pic= $row_pic['pic'];
//                        break;
//                    }
//"<a href='" .$pic ."'><img border='0' src='" .$pic_tmb ."' height='300' /></a><br>";
//                }
////                    echo "<a href='" .$pic ."'><img border='0' src='" .$pic_tmb ."' height='300' /></a><br>";
//                }

		if ($project_id==22) { 
                        echo "<span style='font-size:25px;'>Оператор : <b>". $brand_name  ."</b></span><br><br><br>";
//			 echo "><div style='clear:both; height:10px;'></div>";
		}

		echo "<span style='font-size:25px;'>Тип анкеты: <b>".$qnair_name."</b></span><br><br><br>";
                if ($legend!==null && $legend>"") {
                    echo "<span style='font-size:25px;'>Легенда: <b>".$legend."</b></span><br><br><br>";
                }

                if ($material_link!==null && $material_link>"") {
                    echo "<span style='font-size:25px;'><a target=_blank href='".$material_link."'>Инструкция по проверке</a></span><br><br><br>";
                }




		if ($project_id==4) {
			 echo "<b>Код АЗС/АЗК: ".$kod_azs_azk."</b><div style='clear:both; height:10px;'></div>";
		     echo "<b>Название АЗС/АЗК: ".$nazv_azs_azk."</b><div style='clear:both; height:10px;'></div>";
		}






                $_deb_info = (date('Y-m-d H:i:s') < '2024-03-09 00:00:00');
                if ($project_id == 23 && $_deb_info ) {
/*                    echo "
<div>
<center>
<b style='color: red;'>ВНИМАНИЕ!</b><br />
                    Активные тайные покупатели!<br /> В декабре с <b>1.12</b> по <b>7.12</b> услуга копирайта <b>бесплатная!</b><br />
Давайте вместе сделаем нашу работу быстро, качественно и будем готовится к новогодним праздникам 👍 <br/>
</center>
</div>
<br/><br/>
";
*/
/*
                    echo "
<div>
<center>
<b style='color: red;'>ВНИМАНИЕ!</b><br />
                    <span style='color: red;'>По проверкам, совершенным со <b>02</b> января по <b>10</b> января 2024
                    </span>, услуга копирайта <span style='color: red;'>бесплатная</span>.<br />
(Перед отправкой анкеты, внесите свои ФИО, номер телефона, имя и описание сотрудника, дату и время визита).
<br/>
</center>
</div>
<br/><br/>
";
*/
/*
                    echo "
<div>
<center>
<b style='color: red;'>ВНИМАНИЕ!</b><br />
                    <span style='color: red;'>По проверкам, совершенным со <b>01</b> по <b>07</b> февраля 2024
                    </span>, услуга копирайта <span style='color: red;'>бесплатная</span>.<br />
(Перед отправкой анкеты, внесите свои ФИО, номер телефона, имя и описание сотрудника, дату и время визита).
<br/>
</center>
</div>
<br/><br/>
";
*/

                    echo "
<div>
<center>
<b style='color: red;'>ВНИМАНИЕ!</b><br />
                    <span style='color: red;'>По проверкам, совершенным со <b>01</b> по <b>08</b> марта 2024
                    </span>, услуга копирайта <span style='color: red;'>бесплатная</span>.<br />
(Перед отправкой анкеты, внесите свои ФИО, номер телефона, имя и описание сотрудника, дату и время визита).
<br/>
</center>
</div>
<br/><br/>
";

                }
                unset($_deb_info);

// $_deb_info= ($CheckUser['id'] == 107960 );
                if ($project_id == 17 /* && $_deb_info */) {

                    echo "
    <div>
    <center>
    <b style='color: red;'>ВНИМАНИЕ!</b><br /><br />
    <span style='color: red;'> В случае выявления сговора или попыток сговора с сотрудниками сети, Вы будете отстранены от проекта без оплаты всех ранее выполненных визитов! <br /><br />

    Я предупрежден, что предоставление заведомо ложной информации, а также подделка документов/фото, подтверждающих мою личность,<br />
 может повлечь привлечение меня к ответственности в соответствии с действующим законодательством Российской Федерации.
<br/>
</span>
</center>
</div>
<br/><br/>
";

                }

                $pic_limit_note_query = 'select questionnaire_id from efes.auditor_pic_limits where questionnaire_id = ' .  $questionnaire_id . ' && max>0 limit 1';
                $result_pic_limit_note_query = $conn->query($pic_limit_note_query);

                if ( $result_pic_limit_note_query->num_rows > 0   ) {
                    $info_str='Обращаем Ваше внимание, что в некоторых разделах
                        введено ограничение по максимальному количеству фото.<br />
                        Установленные ограничения, если они есть, указаны перед каждым разделом на кнопке "ПОСМОТРЕТЬ ФОТОГРАФИИ (...)", в круглых скобках.<br />';
                     echo "<b style='color: orange;'>".$info_str."</b><div style='clear:both; height:10px;'></div>";
                }




		$for_correct="";
	  	
		//$is_comment=0;
	
		if ($project_id==4&&$operator_user_rights_id==1) { 
		  $for_correct=" and question.id not in(1866) ";
		}
		
		
		if ($project_id==5&&$operator_user_rights_id==1) { 
		  $for_correct=" and question.id not in(2059, 2060 ) ";
		}
		
		
		$sub_section_name=null;
		$section_name=null;
		
		
		

		$query="select user_question_set.*, user_task.location_id as loc_id, user_task.user_id, 
#		question.is_section_name, question.is_comment as is_comment, 
### question.is_date, question.is_time,
# question.describe,
#		question.text_tag as  question_text_tag,  question.is_text_result as is_text_result_from_question, question.is_answer_digit as  is_answer_digit_from_question,question.is_jti,
		section.name_rus as section_name,
		sub_section.name_rus as sub_section_name,
/* TEMP */
question.name_eng,

		user_answer.answer_set_id as real_answer, user_answer.comment_text as real_comment_text, user_answer.digit_result as real_digit_result
		from user_question_set
		inner join question on question.id=user_question_set.parent_question_id
		
		left join section ON section.id=user_question_set.section_id
		left join sub_section ON sub_section.id=user_question_set.sub_section_id
		
		
		left join user_task on user_task.id=user_question_set.user_task_id
		
		left join user_answer on user_answer.question_set_id=user_question_set.id
		
		where  user_question_set.questionnaire_id=$task_questionnaire_id and user_question_set.user_task_id=$task_id and user_question_set.is_picture=0
		and question.is_hidden=0 and question.id not in(196,241,340,602,1601) 
		$for_correct
		order by user_question_set.sorting /* trap why */ ";
		 
// GEH. (196,241,340,602,1601) - комментарии в project_id ==1   && Фотоматериалы в  project_id ==2



                if ($project_id==6) {
			$query="select user_question_set.*, user_task.location_id as loc_id, user_task.user_id, 

    location.jti_net_id, location.jti_country_id,

#		question.is_section_name, question.is_comment as is_comment, 
#### question.is_date, question.is_time,  question.describe,
#		question.text_tag as  question_text_tag,  question.is_text_result as is_text_result_from_question, question.is_answer_digit as  is_answer_digit_from_question, question.is_jti,
		section.name_rus as section_name,
		sub_section.name_rus as sub_section_name,
		user_answer.answer_set_id as real_answer, user_answer.comment_text as real_comment_text, user_answer.digit_result as real_digit_result
		from user_question_set
		inner join question on question.id=user_question_set.parent_question_id
		
		left join section ON section.id=user_question_set.section_id
		left join sub_section ON sub_section.id=user_question_set.sub_section_id
		
		
		left join user_task on user_task.id=user_question_set.user_task_id
		
    left join location on location.id=user_task.location_id

		left join user_answer on user_answer.question_set_id=user_question_set.id
		
		where  user_question_set.questionnaire_id=$task_questionnaire_id and user_question_set.user_task_id=$task_id and user_question_set.is_picture=0
		and question.is_hidden=0 and question.id not in(196,241,340,602,1601)
		$for_correct
		order by user_question_set.sorting /* trap why */";

// if (geh()) { pre($query); }
                }
// GEH. ВОПРОСЫ И ОТВЕТЫ. ВЫВОД

// Devtest
if ( /* true  true || $user_id==110062 */ $project_id!=6 ) {

		$query="select user_question_set.*, user_task.location_id as loc_id, user_task.user_id, 
#		question.is_section_name, question.is_comment as is_comment, 
#### question.is_date, question.is_time,  question.describe,
#		question.text_tag as  question_text_tag,  question.is_text_result as is_text_result_from_question, question.is_answer_digit as  is_answer_digit_from_question,question.is_jti, question.is_hidden,
		section.name_rus as section_name,
		sub_section.name_rus as sub_section_name,
question.name_eng,

location.jti_net_id, location.jti_country_id,

		user_answer.answer_set_id as real_answer, user_answer.comment_text as real_comment_text, user_answer.digit_result as real_digit_result
		from user_question_set
		left /* inner */ join question on question.id=user_question_set.parent_question_id || question.id is null
		
		left join section ON section.id=user_question_set.section_id
		left join sub_section ON sub_section.id=user_question_set.sub_section_id
		
		
		left join user_task on user_task.id=user_question_set.user_task_id

left join location on location.id=user_task.location_id

		
		left join user_answer on user_answer.question_set_id=user_question_set.id
		
		where  user_question_set.questionnaire_id=$task_questionnaire_id and user_question_set.user_task_id=$task_id and user_question_set.is_picture=0
#		and question.id not in(196,241,340,602,1601) 
		$for_correct
		order by user_question_set.sorting /* trap f_au show_a */ ";
//pre($query);

}



//        if (geh()) pre($query);

        $result=$conn->query($query);
        $cq=0;


        require_once('pic_block.php');

// GEH Upload
        define ("DIR_GEH", $_SERVER['DOCUMENT_ROOT']  . "/geh/" );
        define ("CLASS_DIR_GEH", DIR_GEH . "class/" );
//        require_once(DIR_GEH . "config_load_form.php");
// EO GEH



        while($row = $result->fetch_assoc())
                  {


                        $cq=$cq+1;
                        $qwrap_sty_txt="";
                        if ($user_got_answers==0 && $cq>1 ){
                            $qwrap_sty_txt="style='display:none;'";
                        }


                        if ($project_id==3||$project_id==4||$project_id==5 || ($project_id == 15 || $project_id == 16  || $project_id == 100 || $project_id == 17 || $project_id == 23 || $project_id == 24 || $project_id == 25  || $project_id == 19  || $project_id == 20  || $project_id == 21  || $project_id == 22  || $project_id == 18  || $project_id == 6)) { 
                            if ($row['is_hidden']>0) {
                                $qwrap_sty_txt="style='display:none;'";
                            }
                            else {
                                $qwrap_sty_txt="style='display:block;'";
                            }
			}
			  // GEH JTI добавить SKU
			  
			  
//			echo "<div ".$qwrap_sty_txt." id='qwrap".$row["parent_question_id"]."'>";
                        $qwrap_sty_txt =  "<div ".$qwrap_sty_txt." id='qwrap".$row["parent_question_id"]."' class='test'>";
			 
			  
			   
			$task_questionnaire_id=(int)$row["questionnaire_id"];
			  
		  
			  

			if (isset($row["digit_result"])&& $row["digit_result"]!="")	{ 
				$digit_result=$row["digit_result"];	
				$tarr=explode("|-|",$row["digit_result"]);
			}
			
			
			
			$question_describe="";
			if ($row["describe"]!=""){
				$question_describe="<div style='clear:both; height:10px;'></div><i>".$row["describe"]."</i>";
			}
			
			
			
			$is_section_name=$row["is_section_name"];
			if ($is_section_name==0 )
			{
				
				$section_draw=0;
				
				if ($row["section_name"]!=="" && $section_name!==$row["section_name"]) {
					$section_name=$row["section_name"];
					$section_draw=1;
				}	

				$sub_sectio_draw=0;
				
				if ($row["sub_section_name"]!="" && $sub_section_name!=$row["sub_section_name"]) {
					$sub_section_name=$row["sub_section_name"];
					$sub_sectio_draw=1;
				}		
					 
				
				 if ($section_draw==1) {
                                     $idFile='qwrap' . $row["parent_question_id"] . '_file';
                                        echo '<form action=""><input type="file" class="choose_photo_block" id="'.$idFile.'" name="myfile" accept=".jpg, .jpeg, .png, .gif, .heic" multiple><br><br></form>';
                                        echo "<p class='section_class'>".$section_name."</p>";
//                                        if ($_devdebug) {
//                                                echo  drawPictureBlock($auditor_pic_array, $x5_cat_arr_list, $row['x5cat'] /* ,  $row['x5subcat'],  $row['lat'] , $row['lng'] */ );
//                                        }
                                }


				  if ($sub_sectio_draw==1) {
					 echo "<p class='sub_section_class'>".$sub_section_name."</p>";
				 }








				$question_text_tag=$row["text_tag"];


if ($project_id == 22) {
//if (geh() ) {
//    $logg=[
//$q_text_block ,
//$question_text_tag,
//$question_describe,
//$row["question_text"],
//$qwrap_sty_txt
//
//];
//    pre ($logg);
//}
$q_text_block = $_del_str = '';
$_del_str = "<input style='margin-left:20px;' onclick='delete_user_answer_by_qid_n_task( {id:" . $row["id"] . ", q_id:" .$row["parent_question_id"] ."} );' type='button' value='Очистить/Удалить ответ на вопрос'/> <div style='clear:both; height:10px;'></div>";

				$q_text_block = $qwrap_sty_txt .
                                  "<a name='".$row["parent_question_id"]."'/><b>".$question_text_tag."</b> <b>". ( ( $row["name_eng"] >'') ? ($row["name_eng"]. ". ") : '') .$row["question_text"]."</b>".$question_describe.
 $_del_str .

"<div style='clear:both; height:10px;'></div>";


}
else
{				
//				echo "<a name='".$row["parent_question_id"]."'/><b>".$question_text_tag."</b> <b>".$row["question_text"]."</b>".$question_describe."<div style='clear:both; height:10px;'></div>";
                                $q_text_block = $qwrap_sty_txt .
                                    "<a name='".$row["parent_question_id"]."'/><b>".$question_text_tag."</b> <b>".$row["question_text"]."</b>".$question_describe."<div style='clear:both; height:10px;'></div>";
}
			}
			else
                        {

//				echo "<b style='font-size:22px;'>".$row["question_text"]."</b><div style='clear:both; height:10px;'></div>";
                                $q_text_block = "<b style='font-size:22px;'>".$row["question_text"]."</b><div style='clear:both; height:10px;'></div>";

			}





//if (geh()) {
//    pre($row);
//}


                echo $q_text_block ;


//            if ($project_id != 16 && $project_id != 6 && $row['x5cat'] !=444 && $row['x5subcat']==0 /* && geh()==true */ ) {
//                    echo  drawPictureBlock($auditor_pic_array, $x5_cat_arr_list, $row['x5cat']);
//            }
                $text_v="";


            if (isset($row['is_jti']) && $row["is_jti"] == 1 && ($row["questionnaire_id"] == 21 || $row["questionnaire_id"] == 26) ) {
// JTI RUSSIA
                include('f_jti.php');
            }
///GEH /////////////////////////////// JTI end



// GEH answer ORDER
		$query_v="select *
		from user_answer_set
		where question_set_id=".$row["id"]." ORDER BY sorting, parent_answer_id";
		
		
		if ($row["is_answer_multiple_select"]==0) {
//if (geh()) pre($query_v);
// GEH Оформление ответов ДА НЕТ
		
		$result_v=$conn->query($query_v);
			while($row_v = $result_v->fetch_assoc())
		  {
			  $ch_label="";
			  
			  if ($row_v["id"]==$row["real_answer"]) {
				  
				   $ch_label=" checked='checked' ";
			  }
			  
			  $x5txt = mb_strtoupper($row_v["text"], 'UTF-8');
			  
				$text_dop=$row_v["text"];
				
				 $lavel_x5_class=""; 
				 $label_dop=""; 
                                 $label_dop="<label for='add_radio_".$row_v["id"]."'>".$row_v["text"]."</label>";	

				 $default_br="<br>"; 
				 $radio_class="";
				 
				 if (trim($x5txt)=="ДА" || trim($x5txt)=="1. ДА") {
					 $default_br="";
					 $radio_class="class='input_radio_gv'";	
					 $x5txt="";
					 $lavel_x5_class="class='yes'";  
                     $label_dop="<label ".$lavel_x5_class."  for='add_radio_".$row_v["id"]."'>".$x5txt."</label>";	
				     $text_dop="";
				 }
				  if (trim($x5txt)=="НЕТ" || trim($x5txt)=="2. НЕТ") {
					 $default_br="";
					 $radio_class="class='input_radio_gv'";	
					 $x5txt="";
					 $lavel_x5_class="class='no'"; 
				     $label_dop="<label ".$lavel_x5_class."  for='add_radio_".$row_v["id"]."'>".$x5txt."</label>";	
				     $text_dop="";					
				 }
				 
				  if ($x5txt=="Н/Д" || $x5txt=="Н\Д"  || $x5txt=="НД" || $x5txt=="NA" || $x5txt=="N/A" || $x5txt=="3. N/A" || $x5txt=="N\A" ) {
					 $default_br="";
					 $radio_class="class='input_radio_gv'";	
					 $x5txt="";
					 $lavel_x5_class="class='nd'";
                     $label_dop="<label ".$lavel_x5_class."  for='add_radio_".$row_v["id"]."'>".$x5txt."</label>";	
				     $text_dop="";
				 }
			  
			  
			  //$text_v.="<label><input ".$ch_label." onclick='var dfg=$(\"input[name=add_radio_".$row["id"]."]:checked\").val(); add_user_answer({user_id:".$row["user_id"].",task_id:".$task_id.",qid:".$row["id"].",answer_set_id:dfg, type:\"radio\"});' type='radio' value='".$row_v["id"]."' name='add_radio_".$row["id"]."'/>".$row_v["text"]."</label><br>";
			  
//			  if (geh()) {

//    pre($text_dop. '| ' .$label_dop.'| ' .$default_br);
//                            }
//			  $text_v.="<input ".$ch_label." onclick='var dfg=$(\"input[name=add_radio_".$row["id"]."]:checked\").val(); add_user_answer({user_id:".$row["user_id"].",task_id:".$task_id.",qid:".$row["id"].",answer_set_id:dfg, type:\"radio\"});'  id='add_radio_".$row_v["id"]."' type='radio' ".$radio_class."  value='".$row_v["id"]."' name='add_radio_".$row["id"]."'/>".$text_dop.$label_dop.$default_br;
			  $text_v.="<input ".$ch_label." onclick='var dfg=$(\"input[name=add_radio_".$row["id"]."]:checked\").val(); add_user_answer({user_id:".$row["user_id"].",task_id:".$task_id.",qid:".$row["id"].",answer_set_id:dfg, type:\"radio\"});'  id='add_radio_".$row_v["id"]."' type='radio' ".$radio_class."  value='".$row_v["id"]."' name='add_radio_".$row["id"]."'/>".$label_dop.$default_br;
			  
			  
		  }
                  $text_v.= "<div class='test_new_class'></div>";
		
		$num_rows = $result_v->num_rows; 
			 if ($num_rows>0) {
				 
			//	 $text_v.="<div style='clear:both; height:10px;'></div><input type='button' onclick='var dfg=$(\"input[name=add_radio_".$row["id"]."]:checked\").val(); add_user_answer({user_id:".$row["user_id"].",task_id:".$task_id.",qid:".$row["id"].",answer_set_id:dfg, type:\"radio\"});' value='Сохранить'/><div style='clear:both; height:10px;'></div>";
			 }
		
		
		
		}
		
// echo ",," ;
		
		
		if ($row["is_answer_multiple_select"]==1) {
		
		$result_v=$conn->query($query_v);
			while($row_v = $result_v->fetch_assoc())
		  {
			  
			    $ch_label="";
			  
			  // if ($row_v["id"]==$row["real_answer"]) {
				  
				   // $ch_label=" checked='checked' ";
			  // }
			  
			  if ($row["real_digit_result"]!="") {
			  	$rfv=explode("|-|",$row["real_digit_result"]);
				// $key = array_search($row_v["id"], $rfv); 
				// if (is_bool($key)==false)
			    // {
					 // $ch_label="";
				// }
				// else
				// {
					// $ch_label=" checked='checked' ";
				// }

				
				$pos = array_search($row_v["id"], $rfv); 
				if ($pos === false) {
				} else {
					$ch_label=" checked='checked' ";
				}


				
			  }
			  
// $row_v["id"]
			  $text_v.="<label><input ".$ch_label." onclick='var dfg=GetMultiChecked(".$row["id"]."); add_user_answer({user_id:".$row["user_id"].",task_id:".$task_id.",qid:".$row["id"].", answer_set_id:". $row_v["id"].", val:dfg, type:\"checkbox\"});' id='multiselect_".$row_v["id"]."' type='checkbox'  name='multi_select_".$row["id"]."'/>".$row_v["text"]."</label><br>";
		  }
	
		
		$num_rows = $result_v->num_rows; 
			 if ($num_rows>0) {
		//		 $text_v.="<div style='clear:both; height:10px;'></div><input type='button' onclick='var dfg=GetMultiChecked(".$row["id"]."); add_user_answer({user_id:".$row["user_id"].",task_id:".$task_id.",qid:".$row["id"].",val:dfg, type:\"checkbox\"});' value='Сохранить'/><div style='clear:both; height:10px;'></div>";
			 }
		
		}
		
		
			 
			 
			
			
			if ($row["is_date"]>=1) {
				
				 $text_v.="<input readonly class='is_date' type='text' value='".$row["real_digit_result"]."' task_id='".$task_id."' user_id='".$row["user_id"]."' id='add_answer_digit_".$row["id"]."' /><div style='clear:both; height:10px;'></div><div style='clear:both; height:10px;'></div>";
			}
			
			if ($row["is_time"]>=1) {
				
				 $text_v.="<input user_id='".$row["user_id"]."' qid='".$row["id"]."' task_id='".$task_id."' readonly class='is_time'  type='text' value='".$row["real_digit_result"]."' id='add_answer_digit_".$row["id"]."' /><div style='clear:both; height:10px;'></div><div style='clear:both; height:10px;'></div>";
				 
				 $text_v.="<script>
				 $(document).ready(function() {
					$('#add_answer_digit_".$row["id"]."').timepicker();
				 });
				 </script>"; 
				 
			}
			
			
			
			if ($row["is_answer_digit"]==1) {
				
				 $text_v.="<input onchange='var dfg=$(\"#add_answer_digit_".$row["id"]."\").val(); add_user_answer({user_id:".$row["user_id"].",task_id:".$task_id.",qid:".$row["id"].",val:dfg,type:\"answer_digit\"});' type='number' value='".$row["real_digit_result"]."' id='add_answer_digit_".$row["id"]."' /><div style='clear:both; height:10px;'></div>";
			}
			
			
			if ($row["is_text_result"]==1) {
				
				 $text_v.="<input onchange='var dfg=$(\"#add_answer_digit_".$row["id"]."\").val(); add_user_answer({user_id:".$row["user_id"].",task_id:".$task_id.",qid:".$row["id"].",val:dfg,type:\"answer_digit\"});' type='text' value='".$row["real_digit_result"]."' id='add_answer_digit_".$row["id"]."' /><div style='clear:both; height:10px;'></div>";
			}
			
			
			
			
			
			if ($row["is_answer_float_digit"]==1) {
			
				// $text_v.="<input type='text'  value='' id='add_answer_digit_".$row["id"]."' /><div style='clear:both; height:10px;'></div><input type='button' onclick='var dfg=$(\"#add_answer_digit_".$row["id"]."\").val(); add_user_answer({user_id:".$row["user_id"].",task_id:".$task_id.",qid:".$row["id"].",val:dfg,type:\"answer_digit\"});' value='Сохранить'/><div style='clear:both; height:10px;'></div>";
				
				 $text_v.="<input   type='text'  value='".$row["real_digit_result"]."' id='add_answer_digit_".$row["id"]."'  onchange='var dfg=$(\"#add_answer_digit_".$row["id"]."\").val(); add_user_answer({user_id:".$row["user_id"].",task_id:".$task_id.",qid:".$row["id"].",val:dfg,type:\"answer_digit\"});' /><div style='clear:both; height:10px;'></div>";
				

			}
			
			// if (dfg.length===0){alert(\"Количество символов должно быть больше 0!\");return;}; 
			if ($row["is_comment"]>=1) {
				 $text_v.="<textarea onblur='var dfg=$(\"#comment_".$row["id"]."\").val(); dfg=$.trim(dfg); if (dfg.length===0){return;};  add_user_answer({user_id:".$row["user_id"].",task_id:".$task_id.",qid:".$row["id"].",val:dfg,type:\"answer_comment\"});' style='width:300px; height:150px;'  id='comment_".$row["id"]."'>".$row["real_comment_text"]."</textarea><div style='clear:both; height:10px;'></div><div style='clear:both; height:10px;'></div>";
				 
				  
				 
				 //<input type='button' onclick='var dfg=$(\"#comment_".$row["id"]."\").val(); add_user_answer({user_id:".$row["user_id"].",task_id:".$task_id.",qid:".$row["id"].",val:dfg,type:\"answer_comment\"});' //value='Сохранить'/>

			}

// GEH is_jti
			if ($row["is_jti"]>0) {
// Автосохранение ответа 'jti'
                            $text_v.= PHP_EOL . "<script> add_user_answer({user_id:".$row["user_id"].",task_id:".$task_id.",qid:".$row["id"].",val:'jti',type:\"answer_comment\"});</script>";
			}

			
			
			//загрузка видео аудио
			//спортмастер
			
			//if ($row["parent_question_id"]==1945&&($user_id==21376||$user_id==21415))
			if ($row["parent_question_id"]==1945) {	
				 $text_v.="<div style='clear:both; height:10px;'></div><b>Для отправки аудио/видео прикрепите файл:</b><div style='clear:both; height:10px;'></div><form id='video_add_".$_GET["task_id"]."' action='../edit_anketa/?action=video_add&question_set_id=".$row["id"]."&task_id=".$_GET["task_id"]."' method='post' class='pic_add' enctype='multipart/form-data'><input type='file' name='video[]' multiple><input onclick='SendVideo(".$_GET["task_id"].");' type='button' id='button' value='Отправить аудио/видео'></form><div style='clear:both; height:50px;'></div>";
				 

			}
			
			
			
			
			
			
			
				
			
			
			echo "<div style='clear:both; display:block;' id='add".$row["id"]."'>".$text_v."</div>";
			echo "<div style='clear:both; height:10px;'></div>";
                        
//                        if (in_array($row["parent_question_id"], $data[4])) {
//                            $flag = true;
//                            echo  drawPictureBlock1($data[0], $data[1], $row['x5cat'], $data[2], $data[3], $flag);
//                        }
                        
//                        foreach ($data[4] as $x) {
//                            echo "<script>console.log('" . $x . "', '" . $row["parent_question_id"] ."');</script>";
//                          }
                        
//                        echo  drawPictureBlock1($data['1'], $data['2'], $row['x5cat'], $data['3'], $data['4']);
				if ($is_section_name==0)		 
			{
				//echo "<a onclick='$(\"#add".$row["id"]."\").toggle(); $(\"#add_sbutt_".$row["id"]."\").toggle(); '  href='javascript:'>Редактировать</a><div style='clear:both; height:30px;'></div>";
			}
                        // Прорисовка фотоблока в вопросе
		echo "</a>";
                        if (in_array($row["parent_question_id"], $data[4])) {
                            $arrayForSelect = array();
                            foreach ($data[5] as $questArray) {
                                if ($row['x5cat'] == $questArray['x5cat']) {
                                    $arrayForSelect[] = array('name_rus' => $questArray['name_rus'], 'id' => $questArray['id']);
//                                    echo "<script>console.log('" . $questArray['name_rus'] . "')</script>";
                                }
                                
                            }
                            $flag = true;
                            echo  drawPictureBlock1($data[0], $data[1], $row['parent_question_id'], $data[2], $data[3], $flag, $arrayForSelect);
                        }
		  echo "</div>";
//                  echo "<div class='where_test_end'></div>";
                  if ($row['x5cat'] !=444 && $row['x5subcat']==0  ) {
                      //echo "<script>console.log('" . $data[0][0][0] . "')</script>";
                    echo  drawPictureBlock1($data[0], $data[1], $row['x5cat'], $data[2], $data[3]);
            }
		}
   
   
   
   //доп редактирование конец
	   
//if ($_devdebug ){
 // NEW режим отображения фото
//    require_once('pic_block.php');
//            if ( $project_id != 6 && $project_id != 16 && $row['x5cat'] !=444 && $row['x5subcat']==0  ) {
//                if ($row['x5cat'] !=444 && $row['x5subcat']==0  ) {
//                    echo  drawPictureBlock1($data['1'], $data['2'], $row['x5cat'], $data['3'], $data['4']);
//            }

// }



if (false ) {
 // Старый режим отображения фото

        	if ($project_id!=7 &&  $task_questionnaire_id !=77 && $task_questionnaire_id!=81 && $task_questionnaire_id!=82)	{
        	   echo "<div style='clear:both; height:10px;'></div><b>Для отправки анкеты прикрепите фотографии:</b><div style='clear:both; height:10px;'></div><form id='pic_add_".$_GET["task_id"]."' action='../edit_anketa/?task_id=".$_GET["task_id"]."' method='post' class='pic_add' enctype='multipart/form-data'><input type='file' name='avatar[]' multiple><div style='clear:both; height:10px;'></div><input onclick='SendAvatarPic(".$_GET["task_id"].");' type='button' id='button' value='Отправить фото'></form>";	
        	}
		
		$gpic=0;
		$query_pic="SELECT * FROM auditor_pic WHERE (converted is null || converted >=0)  && (auditor_pic.delete_error_status is null || auditor_pic.delete_error_status=0 ) && task_id=".$_GET["task_id"];
		$result_pic=$conn->query($query_pic);
			while($row_pic = $result_pic->fetch_assoc())
		  {
			  $gpic=1;
			  //echo "<img style='height:150px; margin-right:15px; margin-top:15px;' src='".$row_pic["pic"]."'/>";
			  
			  $x5_cat_txt="";
			  
/*			  
			  	   if ($project_id==2 || $project_id == -15) {
					   $x5_cat_select="<select onchange='SetX5CatAuditorPic(".$row_pic["id"].",this);'><option value='0'>Выберите раздел для фото</option>";
					   $x5_cat_arr=array();
					   $query_x5_cat="SELECT * FROM x5_cat";
					$result_x5_cat=$conn->query($query_x5_cat);
						while($row_x5_cat = mysql_fetch_array($result_x5_cat))
					  {
						  $x5_selected="";
						  
						  if ($row_pic["x5_cat"]==$row_x5_cat["id"]) {
							  $x5_selected="selected";
						  }
						  
						  $x5_cat_arr[$row_x5_cat["id"]]=$row_x5_cat["name"];
						  $x5_cat_select.="<option ".$x5_selected." value='".$row_x5_cat["id"]."'>".$row_x5_cat["name"]."</option>";
					  }	  
					  
					   $x5_cat_select.="</select>";		  
					   
					    if ($wave_id>=39) {
							$x5_cat_txt='<div style="padding:5px;background-color:white;position:absolute; bottom:7px; left:0px;;">'.$x5_cat_select."</div>";
						}
					   
				   }
			  
*/			  
			  
			  
			  
			     if ( $project_id==2 || $project_id == 15 ||  $project_id == 16 ||$project_id == 17 || $project_id == 23 || $project_id == 25 || $project_id == 24 || $project_id == 18  || $project_id == 19  || $project_id == 20  || $project_id == 21  || $project_id == 22  ) {
					   $x5_cat_select="<select onchange='SetX5CatAuditorPic(".$row_pic["id"].",this);'><option value='0'>Выберите раздел для фото:</option>";
					   $x5_cat_arr=array();
					   $query_x5_cat="SELECT question.* 
FROM question 
WHERE question.x5cat>0 AND question.x5subcat=0 AND question.questionnaire_id = $task_questionnaire_id && is_active = 1 order by sorting";
// echo  $query_x5_cat;
					$result_x5_cat=$conn->query($query_x5_cat);
						while($row_x5_cat = $result_x5_cat->fetch_assoc())
					  {
						  $x5_selected="";
						  
						  if ($row_pic["x5_cat"]==$row_x5_cat["x5cat"]) {
							  $x5_selected="selected";
						  }
						  
						  $x5_cat_arr[$row_x5_cat["x5cat"]]=$row_x5_cat["name_rus"];
						  $x5_cat_select.="<option ".$x5_selected." value='".$row_x5_cat["x5cat"]."'>".$row_x5_cat["name_rus"]."</option>";
					  }	  
					  
					   $x5_cat_select.="</select>";		  
					   $x5_cat_txt='<div style="padding:5px;background-color:white;position:absolute; bottom:7px; left:0px;;">'.$x5_cat_select."</div>";
					  
					   
				   }
			  
			 
			  
			  echo'<div id="wrap_aud_pic_'.$row_pic["id"].'" style="min-width:364px; border:solid 1px #CCC; height:380px; position:relative; float:left; margin-right:40px; margin-bottom:40px;  margin-top:40px;">
			  <img src="'.$row_pic["pic_tmb"].'" style="height:300px; margin-bottom:20px;">
			 <div style="cursor:pointer;padding:5px;background-color:white;position:absolute; top:0px; right:0px; color:red;" onclick="if (confirm(\'Действительно удалить это фото?\'))  DeleteAuditorPic('.$row_pic["id"].')  ;">УДАЛИТЬ</div>'.$x5_cat_txt.'</div>';
			  
			  
			  
		  }
            }
	
		
	   if ($gpic==1||$project_id==7||$project_id==2||($project_id == 15 ||  $project_id == 16 ||$project_id == 17  || $project_id == 23 || $project_id == 24 || $project_id == 25 || $project_id == 19  || $project_id == 20
                    || $project_id == 21  || $project_id == 22  || $project_id == 18  || $project_id == 6 )  ) {
		   echo "<div style='clear:both; height:20px'></div>";
		   
		   echo "<button style='position: fixed; right: 30px; top: 30px; width:130px;  height:50px;' onclick='AnketaComplete(".$task_id.");'>Анкета заполнена</button>";
	   }
	   
	   
	   
	   
	   
	   
	   // if ($project_id == 17 && $user_id == 111499)
            $_Tele2_copyrighted_questionnaire = [121,122,123,    74,104];  // switched off

		    if (/* $recieved_time === null /* публикуется впервые */ true && ($project_id == 17 || $project_id == 18 || $project_id == 23 /* || $project_id == 19 */  || $project_id == 20  || $project_id == 21  || 
                                ($project_id == 22 /* && in_array($task_questionnaire_id, $_Tele2_copyrighted_questionnaire) */ )  )   ){
		   echo "<div style='clear:both; height:20px'></div>";
		   echo "<button style=' background-color:blue; color:white;     border: 1px solid #CCCCCC;    position: fixed; right: 30px; top: 100px; width:130px;  height:50px;' onclick='AnketaCopyrightComplete(".$task_id.");'>Отправить на копирайт</button>";
	   }



           echo "<div style='clear:both; height:20px'></div>";





  }
// GEH Отработка скрытия / открытия доп. вопросов на основании уже данных ответов.
// для анкет на доработке и Ctrl+F5 cases

//        echo js_task_reopener($task_id);

// GEH Upload
if (false ) {
        define ("DIR_GEH", $_SERVER['DOCUMENT_ROOT']  . "/geh/" );
        define ("CLASS_DIR_GEH", DIR_GEH . "class/" );
        require_once(DIR_GEH . "config_load_form.php");
}



}
    echo ">";
    echo '<script src="http://localhost/TestAnketa/function_auditor.js"></script>';
    echo '<script src="http://localhost/TestAnketa/functionCheckComments.js"></script>';
    echo '<script src="http://localhost/TestAnketa/functionCreatePhotos.js"></script>';

}

function CheckUser() {
    $valueNew["id"] = 10;
    $valueNew[ "user_rights_id"] = 1;
    return $valueNew;
}

