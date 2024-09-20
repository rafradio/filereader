<?php

function drawPictureBlock1($auditor_pic_array, $x5_cat_arr_list, $cat, $doubled_pics_array  = array(), $can_delete = 1, $flag = false, $arrayForSelect = array() ) {
    if (!$flag) {
//pre($doubled_pics_array);

//pre($x5_cat_arr_list);

// $true_in_debug_mode = true - условие при отладке (потом false)
// обходим проверку $project_id и $start_wave_id (?) нужны ли они вообще?

$true_in_debug_mode = true;


// Картинки в массиве   $auditor_pic_array
/////// drawPictureBlock1()
            $ins_pic='';
            $_n_pic = 0;
$_js_pic_cat_counter='';
//            $_js_pic_cat_counter = ' pic_cat_counter = new Array();';

            $auditor_pic_txt = "";
            $auditor_pic_txt .= '<div class="PictureBlock"  id="PictureBlock_c_' . $cat . '">' . PHP_EOL;

            $selfi_condition = ($cat==444) ? true : false;

            $min_str = $max_str ='';
            foreach($x5_cat_arr_list as $x5) {
                if ( $x5['x5cat']==$cat ) {
                    if ($x5['min'] !==null) { $min_str = ' от ' . $x5['min']  . ' '; }
                    if ($x5['max'] !==null) { $max_str = ' до ' . $x5['max']  . ' '; }
                }
            }
            foreach ($auditor_pic_array as $row_auditor_pic) {
                
//                if (!$flag) {

//              if ($row_auditor_pic['x5_cat']==$cat ) {
                  if ($row_auditor_pic['x5_cat']==$cat && is_null($row_auditor_pic['question_id'])) {



                $sha256[]=$row_auditor_pic["sha256"];
// GEH. EXIF на этом этапе не гарантирован - оригиналы могут быть удалены или не содержать информацию
//                $pt = GetExif($row_auditor_pic["pic"]);
                $pt = [];
                $onmaptxt = "";
                if (isset($pt["long"]) && isset($pt["lat"])) {
                    $onmaptxt = "<a class='showinsidemap' href='#mapinside' onclick='ShowToPointOnMap([" . $pt["lat_txt"] . "," . $pt["long_txt"] . "]);'>На карте</a>";
                }
//      if  (($project_id >=25 || $project_id == 2 || ($project_id == 15 || $project_id == 16 || $project_id == 10 || $project_id == 25 || $project_id == 17  ||   $project_id == 26 || $project_id == 23 || $project_id == 19 || $project_id == 20 || $project_id == 21 || $project_id == 22  || $project_id == 100 )|| $true_in_debug_mode) ) {
                    if (($selfi_condition==false) && ( $true_in_debug_mode )) {
                        $x5_cat_select='Раздел для фото:<br>' .makeX5CatSelect($x5_cat_arr_list, $cat, $row_auditor_pic  /* null = no selected, group operation */  );
                        $x5_cat_txt = '<div style="padding:5px;background-color:white;position:relative; ">' . $x5_cat_select . "</div>";
                        $onmaptxt .= $x5_cat_txt;
                    }
//                    $onmaptxt .= "<div style='clear:both; height:5px;'></div><a onclick='window.open(\"" . $row_auditor_pic["pic"] . "\")' href='javascript:' target='_blank'>Фото в новом окне</a><div style='clear:both; height:15px;'></div>";
//      }

                $lat = isset($pt['lat']) ? $pt['lat'] : '';
                $lng = isset($pt['long']) ? $pt['long'] : '';
                $timeMake = isset($pt['time_make']) ? $pt['time_make'] : '';
//                $_foto_time_arr[] = isset($pt['datetime']) ? $pt['datetime'] : '';
// GEH Zoom & Rotate
                $ins_pic .= drawPhoto($row_auditor_pic, $pt, $onmaptxt, $doubled_pics_array , $selfi_condition, $can_delete );
                $_n_pic++;
                if (!isset($pic_arr[$row_auditor_pic["rc"]])) {
                    $pic_arr[$row_auditor_pic["rc"]] = array();
                }
                $pic_arr[$row_auditor_pic['rc']][] = array(
                    'pic' => $row_auditor_pic['pic'],
                    'time_make' => $timeMake,
                    'lat' => $lat,
                    'long' => $lng
                );
                if ($selfi_condition==true)  {
                    $pic_arr[$row_auditor_pic['rc']][] = array(
                    'pic' => $row_auditor_pic['pic'],
                    'time_make' => $timeMake,
                    );
                }
                $selfi_condition=false;

              }
//            } 
            }


////////////////////////////////////////////////
// Эта часть кода нужна? В user_answer.pic_url нет информации на текущий момент, все  NULL
// ( 1 фото к пользовательским ответам на вопросы )
// Нужна, для прикрепления фото к ответу. Функционал реализован в мобилке
//
////////////////////////////////////////////////

/*
            $query_auditor_pic_from_anketa = "select * from user_answer where pic_url!='' and task_id=" . $task_id;

            $ins_pic_from_anketa = "";

            $result_auditor_pic_from_anketa = mysql_log_query($query_auditor_pic_from_anketa);

            while ($row_auditor_pic_from_anketa = mysql_fetch_array($result_auditor_pic_from_anketa) ) {

                 // GEH
                $ins_pic_from_anketa .= "<div id='wrap_aud_pic_from_anketa" . $row_auditor_pic_from_anketa["id"] . "' style='width:300px; position:relative; float:left; margin-right:40px;'><a  rel='photo' target='_blank' href='" . $row_auditor_pic_from_anketa["pic_url"] . "'><img src='" . $row_auditor_pic_from_anketa["pic_url"] . "' style='width:300px; margin-bottom:20px;' /></a><div style='cursor:pointer;padding:5px;background-color:white;position:absolute; top:0px; right:0px; color:red;' onclick='if (confirm(\"Действительно удалить?\")) { delete_user_answer({id:" . $row_auditor_pic_from_anketa["id"] . "});$(\"#wrap_aud_pic_from_anketa" . $row_auditor_pic_from_anketa["id"] . "\").remove(); } '>УДАЛИТЬ</div></div>";

                $ins_pic_from_anketa_geh = ".<div id='wrap_aud_pic_from_anketa" . $row_auditor_pic_from_anketa["id"] . "' style='width:300px; position:relative; float:left; margin-right:40px;'>
                    <div rel='photo' ><img alt='" . $row_auditor_pic_from_anketa["pic_url"] . "' src='" . $row_auditor_pic_from_anketa["pic_url"] . "' style='width:300px; margin-bottom:20px;' onclick='return gallery.init(\"ins_pic_wrap\", " . $_n_pic . " );'   /></div>
                    <div style='cursor:pointer;padding:5px;background-color:white;position:absolute; top:0px; right:0px; color:red;' onclick='if (confirm(\"Действительно удалить?\")) { delete_user_answer({id:" . $row_auditor_pic_from_anketa["id"] . "});$(\"#wrap_aud_pic_from_anketa" . $row_auditor_pic_from_anketa["id"] . "\").remove(); } '>УДАЛИТЬ</div></div>";


            }

            //echo "..." . $_n_pic;
            $ins_pic .= $ins_pic_from_anketa;
*/
////////////////////////////////////////////////
// Перенести в css

            switch ( $_n_pic) {
                case 0 : $_btn_color = '#ff0000;'; break;
// #f40089 - недобор фото (< 2)
                case 1 : $_btn_color = '#dd0000;'; break;
                default :$_btn_color = '#00bb00;'; break;
            }
            $min_max_str = '';
            if ($min_str . $max_str > '') { $min_max_str = '('.$min_str . $max_str .')' ;}
            $auditor_pic_txt .=  "<div style='clear:both; height:20px'></div><div style='display:none1;' id='ins_pic_wrap_c" . $cat. "'>"; 
            if ($cat==0) {$auditor_pic_txt .= selectAllForm($cat);}
            $auditor_pic_txt .= '&nbsp;&nbsp;&nbsp;&nbsp;' .  makeX5CatSelect($x5_cat_arr_list, $cat);
            $auditor_pic_txt .=  "<div  id='ins_pic_wrap_geh_c_" . $cat . "'> " . $ins_pic . " " . "</div></div><div style='clear:both; height:20px'></div>";
            $auditor_pic_txt = "<div style='clear:both; height:20px'></div><a id='btn_sph_" . $cat . "' style='color:white; background-color: " . $_btn_color . "; padding:5px; text-decoration:none; border:solid 1px #CCCCCC' 
                href='javascript:' onclick='$(\"#ins_pic_wrap_c". $cat ."\").toggle();' >ПОСМОТРЕТЬ ФОТОГРАФИИ  <b>[<span id='btn_cat_cnt_" . $cat . "'>" . $_n_pic .   "</span>]</b>
" . $min_max_str .  "
</a><div style='clear:both; height:10px'></div>" . $auditor_pic_txt;
        return ($auditor_pic_txt . "</div>") . $_js_pic_cat_counter . "";
    } else {
        
        // данный блок для отрисовки фото в вопросе
        $true_in_debug_mode = true;
        $selfi_condition = ($cat==444) ? true : false;
        $htmlString= "<div class='wrap-picture-front'>";
        foreach ($auditor_pic_array as $row_auditor_pic) {
            if ($row_auditor_pic['question_id']==$cat ) {
                $htmlString .= "<div class='picture-front-block'>";
                $sha256[]=$row_auditor_pic["sha256"];
// GEH. EXIF на этом этапе не гарантирован - оригиналы могут быть удалены или не содержать информацию
//                $pt = GetExif($row_auditor_pic["pic"]);
                $pt = [];
                $onmaptxt = "";
//                if (isset($pt["long"]) && isset($pt["lat"])) {
//                    $onmaptxt = "<a class='showinsidemap' href='#mapinside' onclick='ShowToPointOnMap([" . $pt["lat_txt"] . "," . $pt["long_txt"] . "]);'>На карте</a>";
//                }
//      if  (($project_id >=25 || $project_id == 2 || ($project_id == 15 || $project_id == 16 || $project_id == 10 || $project_id == 25 || $project_id == 17  ||   $project_id == 26 || $project_id == 23 || $project_id == 19 || $project_id == 20 || $project_id == 21 || $project_id == 22  || $project_id == 100 )|| $true_in_debug_mode) ) {
                    if (($selfi_condition==false) && ( $true_in_debug_mode )) {
                        $x5_cat_select='Раздел для фото:<br>' .makeX5CatSelect($x5_cat_arr_list, $cat, $row_auditor_pic  /* null = no selected, group operation */  );
                        $x5_cat_txt = '<div style="padding:5px;background-color:white;position:relative; ">' . $x5_cat_select . "</div>";
                        $onmaptxt .= $x5_cat_txt;
                    }
//                    $onmaptxt .= "<div style='clear:both; height:5px;'></div><a onclick='window.open(\"" . $row_auditor_pic["pic"] . "\")' href='javascript:' target='_blank'>Фото в новом окне</a><div style='clear:both; height:15px;'></div>";
//      }

                $lat = isset($pt['lat']) ? $pt['lat'] : '';
                $lng = isset($pt['long']) ? $pt['long'] : '';
                $timeMake = isset($pt['time_make']) ? $pt['time_make'] : '';
                $ins_pic = drawPhoto($row_auditor_pic, $pt, $onmaptxt, $doubled_pics_array , $selfi_condition, $can_delete );
                $htmlString .= $ins_pic;
                $htmlString .= "<button class='delete-for-photo'>Удалить</button>";
                $htmlSelect = "<select class='select-for-photo'>";
                foreach ($arrayForSelect as $optName) {
                    $str=$optName['name_rus'];
                    if (strlen($str) > 0 && ctype_digit(substr($str, 0, 1))) {
                        $htmlSelect .= "<option value='" . $optName['id'] . "'>" . $optName['name_rus'] . "</option>";
                    }
                    
                }
                $htmlSelect .= "</select>";
                $htmlString .= $htmlSelect;
                $htmlString .= "</div>";
            }
        }
        $htmlString .= "</div>";
//        $ins_pic = drawPhoto($row_auditor_pic, $pt, $onmaptxt, $doubled_pics_array , $selfi_condition, $can_delete );
        return $htmlString;
    }
}

function selectAllForm($cat = 0){

//    btn_sph_0
    $r='';
    $r='<input type="button" value="Выбрать / Сбросить" onclick="selectPics(' . $cat .')" />';
    return $r;
}

function makeX5CatSelect($x5_cat_arr_list,  $cat=0, $row_auditor_pic = null /* null = no selected, group operation */ ){
// GEH. Картинки по категориям
    $r='';


    if (isset($row_auditor_pic["id"]) && $row_auditor_pic["id"]!==null) {
        $pid = $row_auditor_pic["id"] ;
        $id = 'slct_p_' . $pid;
        $hidden_style = '';
        $x5_cat_select = "<select " . $hidden_style . " id='". $id . "' onchange='if (SetX5CatAdminPic(" . $pid . ",this)==false) {return false;} chgCatPic(" . $pid . ",  " . $cat . ", this);'><option value='0'>-- без категории --<!--Выберите раздел для фото--></option>";

    }
    else {
        $pid = null;
        $id = 'slct_c_' . $cat;
        $hidden_style = ' style ="display: none; color: #dd0000;"';
        $x5_cat_select = "<select " . $hidden_style . " id='". $id . "' onchange=' SetX5CatAdminPic(getCheckedPics(" . $cat ."),this); chgCatPic(getCheckedPics(" . $cat ."), " . $cat . ", this);resetMultiSelect(this);'><option value='0'>-- без категории --</option>";
    }

    foreach ($x5_cat_arr_list as $_cat) {
        $x5_selected = "";
        if (isset($row_auditor_pic["x5_cat"])  &&  $row_auditor_pic["x5_cat"] ==  $_cat["x5cat"]) {
            $x5_selected = "selected";
        }
        $x5_cat_select .= "<option " . $x5_selected . " value='" .  $_cat["x5cat"] . "'>" .  $_cat["name_rus"] . "</option>";
    }
    $x5_cat_select .= "</select>";
    $r = $x5_cat_select;
    return $r;
}

// included in show_anketa.php

/////////////////////////////////////////////////////////////////////////////////////
// GEH Начало основного блока фото
/////////////////////////////////////////////////////////////////////////////////////


function drawPhoto($row_auditor_pic=array(), $pt=array(), $onmaptxt='', $doubled_pics_array=array() , $selfi_condition = false, $can_delete = 1){
//if (geh()) {
//    pre($row_auditor_pic);
//}
    $doubled_photo_link='';
    foreach ($doubled_pics_array as $d) {
        if ( $d['sha256'] == $row_auditor_pic['sha256'] ) { 
//            $_doubled_pics_tasks[] = $d['task_id']; 
            $doubled_photo_link .= '<a href="/show_anketa/?task_id=' .$d['task_id'] .'" target=_blank>'. $d['task_id'].'</a> - ' . $d['wave'] . ', '  . $d['status']   . '<br />';

        }
    }


$_lat = $_lng = null;
$url_pic_zoom=urlencode($row_auditor_pic['pic']);
$pic_rotate_param = (isset($row_auditor_pic['rotate']) && $row_auditor_pic['rotate']!==null) ? "&a=" . $row_auditor_pic['rotate'] : '';

if ( $selfi_condition == true ) {
    $border_style="solid 10px #090";
}
elseif ( $doubled_photo_link>''   /* count($_doubled_pics_tasks) > 0 */ )  {
    $border_style="solid 10px #900";
}
else {
    $border_style="solid 1px #CCC";
}
$img_src_str = (isset($_REQUEST['nc']) ) ? "/js/img_tool/lp.php?p=" . $row_auditor_pic['pic_tmb']. "&z=" . rand() : "TestAnketa" . $row_auditor_pic['pic_tmb'];



$r = "
<div id=\"wrap_aud_pic_" . $row_auditor_pic['id'] ."\" style=\"min-width:380px;border:" . $border_style . "; height:420px;position:relative;float:left;margin-right:40px;margin-bottom:40px;margin-top:40px;\">
    <a rel=\"photo\" title=\"" . (isset($pt['time_make']) ? $pt['time_make'] : '') . "\" target=\"_blank\" href=\"" . $row_auditor_pic['pic'] . "\" onclick=\"window.open('/show_pic/?p=" . $url_pic_zoom . $pic_rotate_param . "', '' ); return false;\"  > ";

// $r .="        <img src=\"" . $row_auditor_pic['pic_tmb'] ."\" alt=\"" . $row_auditor_pic['pic'] . "\" style=\"height:300px; margin-bottom:20px;\" /> ";
//$r .="        <img src=\"" . $img_src_str   ."\" alt=\"" . $row_auditor_pic['pic'] . "\" style=\"height:300px; margin-bottom:20px;\" /> ";
$img_src_str = "http://localhost/TestAnketa/rafail/pn17/2024/377/0916/17/1726495704440071_OkAK7baj.jpeg";
$questId = "qustionID=" . $row_auditor_pic['question_id'];
$questId .= "&pic=" . $row_auditor_pic['pic'];
$r .="        <img src=\"" . $img_src_str   ."\" alt=\"" . $row_auditor_pic['pic'] . "\" style=\"height:300px; margin-bottom:20px;\" name=\" " . $questId   ."\" /> ";

$r .= "
    </a>" ;

    $plashka = '';


    if ( $selfi_condition == true ) {
        $plashka =" <div style=\"padding:5px;background-color:white;position:absolute;top:0;right:0;color:#090;\";\">Фото ТП</div>";
    }

    if ( $selfi_condition == false && $can_delete > 0 ) {
        $plashka = "  <div style=\"cursor:pointer;padding:5px;background-color:white;position:absolute;top:0;right:0;color:red;\" onclick=\"if (confirm('Действительно удалить фото?')) DeleteAuditorPic({$row_auditor_pic['id']});\">УДАЛИТЬ                </div>";
    }

    $r .= $plashka;
    $r .= "

    <div class=\"pics_chkbox_div\" style=\"display: none; color:#000000;position:absolute; top:0; left:0; \" ><input class=\"pics_chkbox\"  id=\"pics_chkbox_" . $row_auditor_pic['id'] . "\" style=\"border:solid 1px #dd0000;  color: #dd0000; height: 30px; width: 30px;\" type=\"checkbox\" name=\"pid\" value=" . $row_auditor_pic['id'] . " /></div>";

//    if ($row_auditor_pic['shot_time']!=null) {
//        $r .= "<div class=\"exf\">" . $row_auditor_pic['shot_time'] . "</div>";
//    }
//
//    if ($row_auditor_pic['lat']!=null) {
//         $r .= "<div class=\"exf\">N: " . $row_auditor_pic['lat'] . "</div>";
//         $_lat = $row_auditor_pic['lat'];
//    }
//    if ($row_auditor_pic['lng']!=null) {
//        $r .= "<div class=\"exf\">E: " . $row_auditor_pic['lng'] . "</div>" ;
//        $_lng = $row_auditor_pic['lng'];
//    }
//
//
//    if ($_lat !=null &&  $_lng!=null && $lat !=null &&  $lng!=null) {
//        $r .= "<div class=\"exf\">дельта: " . round(distanceInMBetweenEarthCoordinatesE($lat, $lng, $_lat, $_lng),1) . " м.</div>" ;
//    }
//
//
//    if ($doubled_photo_link>'') {
//        $r .= "<div class=\"exf\">загружен: " . $row_auditor_pic['fio'] . "</div>" ;
//
//        $r .= "<div class=\"exf\">ДУБЛИКАТЫ ФОТО В АНКЕТАХ:<br/> " . $doubled_photo_link . "</div>" ;
//    }


    $r .= $onmaptxt. "</div>" ;

    return $r;
}


function degreesToRadiansE($degrees) {
  return $degrees * pi() / 180.0;
}

function distanceInMBetweenEarthCoordinatesE($lat1, $lon1, $lat2, $lon2) {

  $earthRadiusM = 6367444.65;

  $dLat = degreesToRadiansE($lat2-$lat1);
  $dLon = degreesToRadiansE($lon2-$lon1);

  $lat1 = degreesToRadiansE($lat1);
  $lat2 = degreesToRadiansE($lat2);

  $a = sin($dLat/2) * sin($dLat/2) +
          sin($dLon/2) * sin($dLon/2) * cos($lat1) * cos($lat2); 
  $c = 2 * atan2(sqrt($a), sqrt(1-$a)); 
  return $earthRadiusM * $c;
}

//////////////////////////////////////////////////////////////////////////////////////////

// КОД вне функции

function drawX5Photos($conn) {

//            if ($CheckUser["can"] == 1 && (
//                $CheckUser["user_rights_id"] == 1 ||
//
//                $CheckUser["user_rights_id"] == 7 ||
//                $CheckUser["user_rights_id"] == 8 ||
//                $CheckUser["user_rights_id"] == 9
//                )
//            ) {

            $task_id = '2692413';
            $ins_pic = "";
            $pic_arr = array();
            $ins_pic_x5 = "";
            $_n_pic=0;
            $_foto_time_arr = array();
            $sha256 = array();
/*

// GEH. X5 - отключена подгрузка категорий, сейчас категории определяются через:  `efes`.`user_question_set` where (x5cat<>0 && x5sub_cat=0)

            $query_auditor_pic = "select auditor_pic.id, auditor_pic.pic, auditor_pic.x5_cat, x5_cat.rc

                , auditor_pic.sha256, auditor_pic.pic_tmb

                        from auditor_pic
                        left join x5_cat on x5_cat.id=auditor_pic.x5_cat
                        where  (auditor_pic.converted is null || auditor_pic.converted >=0) && auditor_pic.task_id=" . $task_id;
*/


// Категории для картинок
            $x5_cat_arr = array();
            $x5_cat_arr_list = array();
            $x5_cat_quest_arr_list = array();

// Можно формировать для всех проектов
//            if ($project_id == 2 || ($project_id == 15 || $project_id == 16 || $project_id == 17 || $project_id == 19 || $project_id == 20 || $project_id == 21 )) {

// GEH. Картинки по категориям
// Списки категорий - $x5_cat_arr_list[]

//                        $query_x5_cat = 'SELECT  parent_question_id as id,  question_text as name_rus, x5cat  FROM user_question_set where x5cat<>0 && x5subcat=0 &&  user_task_id  = ' . $task_id . ' order by sorting ';

                        $query_x5_cat = '
                                SELECT  parent_question_id as id,  question_text as name_rus, uqs.x5cat , apl.min, apl.max FROM user_question_set uqs
                                left join auditor_pic_limits apl on uqs.questionnaire_id=apl.questionnaire_id && uqs.x5cat=apl.x5cat
                                where uqs.x5cat<>0 && uqs.x5subcat=0 &&  uqs.user_task_id  = ' . $task_id . ' && not (uqs.questionnaire_id=47 && uqs.x5cat=460)
                                order by uqs.sorting';

//                        $result_x5_cat = mysql_log_query($query_x5_cat);
                        $result_x5_cat = $conn->query($query_x5_cat);
//                        while ($row_x5_cat = mysql_fetch_array($result_x5_cat)) {
                        while ($row_x5_cat = $result_x5_cat->fetch_assoc()) {
                            $x5_cat_arr[$row_x5_cat["id"]] = $row_x5_cat["name_rus"];
                            $x5_cat_arr_list[]=array('x5cat'=>$row_x5_cat['x5cat'],'name_rus'=>$row_x5_cat['name_rus'], 'min'=>$row_x5_cat['min'] , 'max'=>$row_x5_cat['max'] ) ;
                        }
                        
                        $query_x5_quest_cat = '
                                SELECT  parent_question_id as id,  question_text as name_rus, uqs.x5cat , apl.min, apl.max FROM user_question_set uqs
                                left join auditor_pic_limits apl on uqs.questionnaire_id=apl.questionnaire_id && uqs.x5cat=apl.x5cat
                                where uqs.x5cat<>0 && uqs.x5subcat<>0 &&  uqs.user_task_id  = ' . $task_id . ' && not (uqs.questionnaire_id=47 && uqs.x5cat=460)
                                order by uqs.sorting';
                        
                        $result_x5_quest_cat = $conn->query($query_x5_quest_cat);
                        
                        while ($row_x5_quest_cat = $result_x5_quest_cat->fetch_assoc()) {
                            //$x5_cat_arr[$row_x5_cat["id"]] = $row_x5_cat["name_rus"];
                            $x5_cat_quest_arr_list[]=array('x5cat'=>$row_x5_quest_cat['x5cat'],'name_rus'=>$row_x5_quest_cat['name_rus'], 'id'=>$row_x5_quest_cat['id'] ) ;
                        }
//            }

// Картинки в массиве

// Картинки СЕЛФИ, сейчас одна, из efes.user.selfi_ap_id
//            $selfi_pic_arr = get_users_selfi($auditor_id);
//            $selfi_pic_arr = ($project_id == 30 ) ? false : $selfi_pic_arr;


//            $doubled_pics_array = $auditor_pic_array = $doubled_pics_ids = [];

//            if ($selfi_pic_arr!=false){
//                $auditor_pic_array[] = $selfi_pic_arr;
//            }
// Картинки из анкеты

/*            $query_auditor_pic = "select auditor_pic.id, auditor_pic.pic, auditor_pic.x5_cat, ''  as rc
                , auditor_pic.sha256, auditor_pic.pic_tmb, shot_time, lat, lng, rotate, user_id, fio
                        from auditor_pic
left join user u on u.id = auditor_pic.user_id
                        where
                            (auditor_pic.converted is null || auditor_pic.converted >=0 || auditor_pic.converted = -3  )
                                && (auditor_pic.delete_error_status is null || auditor_pic.delete_error_status=0 )
                             && auditor_pic.task_id=" . $task_id;
*/

            $query_auditor_pic = "
select auditor_pic.id, auditor_pic.pic, auditor_pic.x5_cat, ''  as rc
  , auditor_pic.sha256, auditor_pic.pic_tmb, shot_time, lat, lng, rotate, auditor_pic.user_id, fio, auditor_pic.question_id # , min, max
from auditor_pic
  join user_task ut on ut.id=auditor_pic.task_id
#   left join auditor_pic_limits apl on apl.questionnaire_id=ut.parent_questionnaire_id && auditor_pic.x5_cat=apl.x5cat
  left join user u on u.id = auditor_pic.user_id
where
  (auditor_pic.converted is null || auditor_pic.converted >=0 || auditor_pic.converted = -3 /* перенесено из media */ )
  && (auditor_pic.delete_error_status is null || auditor_pic.delete_error_status=0 )
  && auditor_pic.task_id= " . $task_id;


//if (geh()) {
//    echo "<pre>" .$query_auditor_pic .PHP_EOL;
//    print_r($selfi_pic_arr);
//}
            $result_auditor_pic = $conn->query($query_auditor_pic);

            while ($row_auditor_pic = $result_auditor_pic->fetch_assoc()) {
                $auditor_pic_array[]=$row_auditor_pic;
            }
            
            $questions_arr_list = array();
            foreach ($auditor_pic_array as $row_auditor_pic) {
                $questions_arr_list[] = $row_auditor_pic['question_id'];
            }

// Дубликаты картинок

/*
            $query_doubled_pics='select task_id, sha256 from auditor_pic where task_id<> ' . $task_id . '  &&  sha256 in
                                (
                                  select sha256 from
                                    (select h.incomes , ap.* from auditor_pic ap
                                      join auditor_pic_hash h on ap.sha256=h.sha256 && incomes>1
                                    where task_id= ' . $task_id . ' ) t where incomes>1
                                )';
*/
            $query_doubled_pics = 'select t.id, a.task_id , st.name as status, w.name wave_name, t.sha256 from
                      (SELECT * from  auditor_pic where task_id = ' . $task_id . ' && auditor_pic.size>0  && (auditor_pic.delete_error_status is null || auditor_pic.delete_error_status=0 ) && not ( auditor_pic.converted < 0) ) t
                      join auditor_pic a on t.sha256=a.sha256 && a.task_id<>' . $task_id . ' && (a.delete_error_status is null || a.delete_error_status=0 )  && not ( a.converted < 0 )
                    join user_task ut on a.task_id=ut.id
                    join user_task_status st on st.id=ut.status
                    join wave w  on w.id=ut.wave_id;
';

            $result_doubled_pics = $conn->query($query_doubled_pics);
            while ($doubled_pics = $result_doubled_pics->fetch_assoc()) {

                $doubled_pics_array[] =  ['id' => $doubled_pics['id'],  'sha256' => $doubled_pics['sha256'], 'task_id' => $doubled_pics['task_id'], 'status' => $doubled_pics['status'] , 'wave' => $doubled_pics['wave_name'] ]  ;

//                $doubled_pics_array[ $doubled_pics['sha256']  ] = $doubled_pics['task_id']  ;
                $doubled_pics_ids [ $doubled_pics['id'] ] = $doubled_pics['task_id']  ;
            }

//            $auditor_pic_txt = drawPictureBlock1($auditor_pic_array, $x5_cat_arr_list, 0);

//        $auditor_pic_txt_form = drawLoadPhotoForm($project_id, $task_id);
echo "
<style>
.exf {font-size: 12px; color: #aa0000;}
</style>
" ;
//pre($doubled_pics_array);
//        if ($CheckUser["user_rights_id"]==1) { $doubled_pics_array =[]; } // Прячем от ТП
//if (geh()) { pre([$CheckUser["user_rights_id"], $task_status_id  ]) ;}
//        if ($CheckUser["user_rights_id"]==9 && $task_status_id == 3 ) { 
//                $can_delete = 0 ;   // Прячем от Координаторов
//        }
//        else {
//            $can_delete = 1 ;
//            echo $auditor_pic_txt_form ;
//        }
        $can_delete = 0;
        $data = array();
        echo drawPictureBlock1($auditor_pic_array, $x5_cat_arr_list, 0, $doubled_pics_array, $can_delete);
//        $data['1']=$auditor_pic_array;
//        $data['2']=$x5_cat_arr_list;
//        $data['3']=$doubled_pics_array;
//        $data['4']=$can_delete;
//        $data['5']=$questions_arr_list;
        
        $data[]=$auditor_pic_array;
        $data[]=$x5_cat_arr_list;
        $data[]=$doubled_pics_array;
        $data[]=$can_delete;
        $data[]=$questions_arr_list;
        $data[]=$x5_cat_quest_arr_list;
        return $data;
//}
        /////////////////////////////////////////////////////////////
        // GEH  Audio & media Upload
        /////////////////////////////////////////////////////////////

}
