function show_auditor_tasks()
{
	$("#auditor_task_div").show();
	$("#auditor_map_div").hide();
	
	$("#auditor_new_task_div").hide();
	
}


function show_auditor_new_tasks()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	
	
	GetAuditorAnketaNew();
	
	
}
function show_auditor_new_tasks_auchan()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	
	GetAuditorAnketaNewAuchan();
	
	
}




function show_new_sportmaster_tasks()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	
	
	GetSportmasterAuditorAnketaNew();
	
}


function show_old_sportmaster_tasks()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	
	
	GetSportmasterAuditorAnketaOld();
	
}


function show_old_jti_tasks()
{
//	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	GetJTIAuditorAnketaOld();

}

// GEH JTI 
function show_new_jti_tasks()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	GetJTIAuditorAnketa();

}





function show_new_sensus_tasks()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	
	
	GetSensusAuditorAnketaNew();
	
}


function show_old_sensus_tasks()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	
	
	GetSensusAuditorAnketaOld();
	
}





function show_new_megafon_tasks()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	
	
	GetMegafonAuditorAnketaNew();
	
}

function show_old_megafon_tasks()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	
	
	GetMegafonAuditorAnketaOld();
	
}






function show_new_eldorado_tasks()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	
	
	GetEldoradoAuditorAnketaNew();
	
}


function show_old_eldorado_tasks()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	
	
	GetEldoradoAuditorAnketaOld();
	
}







function show_new_rosneft_tasks()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	
	
	GetRosNeftAuditorAnketaNew();
	
}


function show_new_cola_tasks()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	
	
	GetColaAuditorAnketaNew();
	
}




function show_old_rosneft_tasks()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	
	
	GetRosNeftAuditorAnketaOld();
	
}




function show_old_cola_tasks()
{
	$("#auditor_task_div").hide();
	$("#auditor_new_task_div").show();
	
	
	GetColaAuditorAnketaOld();
	
}







function show_auditor_tasks_x5()
{
	$("#auditor_task_div").show();
	$("#auditor_new_task_div").hide();
	
	
	GetAuditorAnketaDone();
	
	
}


function show_auditor_tasks_auchan()
{
	$("#auditor_task_div").show();
	$("#auditor_new_task_div").hide();
	
	
	GetAuditorAnketaDoneAuchan();
	
	
}





function showOneAuditorAnketa(task_id)
{
	window.open(
	  '/edit_anketa/?task_id='+task_id,
	  '_blank'
	);
}




function showOneEldoradoAuditorAnketa(task_id)
{
	window.open(
	  'http://spectrum.romir.ru/page/anketanew/?chk_id='+task_id,
	  '_blank'
	);
}




function showOneEldoradoAuditorAnketaNew(url)
{
	window.open(
	  url,
	  '_blank'
	);
}




function showOneMegafonAuditorAnketaNew(url)
{
	window.open(
	  url,
	  '_blank'
	);
}





function TakeAnketa(user_id,task_id, request_type)
{
	
	$.ajax({
        type: 'POST',
        url: "/TakeAnketa",
		data: {"task_id":task_id,"user_id":user_id, "request_type":request_type},
        dataType: "json",
        success: function (data) {
			//console.log(data);
			if (data.status===true){
				//$("#wrap"+task_id).remove();
				$("#TakeAnketaWrap"+task_id).html("Анкета зарезервирована");
				NewRequest();
				
			}

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
}


function TakeAnketaAndGo(user_id,task_id, request_type)
{
	
	$.ajax({
        type: 'POST',
        url: "/TakeAnketa",
		data: {"task_id":task_id,"user_id":user_id, "request_type":request_type},
        dataType: "json",
        success: function (data) {
			//console.log(data);
			if (data.status===true){
				$("#TakeAnketaAndGoWrap"+task_id).html("Анкета зарезервирована");
				window.location.href="/edit_anketa/?task_id="+task_id;
			}

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
}




function AnketaRequest(user_id,task_id, request_type)
{
	
	$.ajax({
        type: 'POST',
        url: "/AnketaRequest",
		data: {"task_id":task_id,"user_id":user_id, "request_type":request_type},
        dataType: "json",
        success: function (data) {
			console.log(data);
			if (data.status===true){
				//$("#wrap"+task_id).remove();
				$("#wrap"+task_id).html("Отправлена");
			}

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
}







function GetColaAuditorAnketaOld()
{
	
	var obj={};
	$("#auditor_task_div").hide();
	$("#auditor_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetColaAuditorAnketaOld",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Номер анкеты</td><td>Статус</td><td>Адрес</td><td>Крайняя дата визита</td><td>Стоимость</td><td>Комментарий контролера</td></tr></thead>";
			
				
				
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}
						
						
                                                has_no_pictures_style='';

						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr class='forcheck' " + has_no_pictures_style  + " onclick='ShowAuditorPics("+data.task[i].id+");'><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].task_status+"</td><td>"+data.task[i].address+"</td><td>"+data.task[i].last_visit_time+"</td><td>"+data.task[i].cost+"</td><td>"+comment_txt+"</td></tr>";
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr  class='forpics'><td colspan='14'><div class='auditor_pic' id='auditor_pic_"+data.task[i].id+"' style='width:900px; min-height:200px; display:none;'></div></td></tr>";
						
						
						
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
							
				
				$("#auditor_task_div").html("кол-во пройденных анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);
				$("#auditor_task_div").show();

					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
	
}



function GetRosNeftAuditorAnketaOld()
{
	var wave_id=$("#auditor_wave_id").val();
	if (wave_id==="0") {
		return;
	}
	
	var obj={"wave_id":wave_id};
	$("#auditor_task_div").hide();
	$("#auditor_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetRosNeftAuditorAnketaOld",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Номер анкеты</td><td>Статус</td><td>Адрес</td><td>Код АЗС/АЗК</td><td>Крайняя дата визита</td><td>Стоимость</td><td>Комментарий контролера</td></tr></thead>";
			
				
				
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}
						
						
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr class='forcheck' onclick='ShowAuditorPics("+data.task[i].id+",1);'><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].task_status+"</td><td>"+data.task[i].address+"</td><td>"+data.task[i].kod_azs_azk+"</td><td>"+data.task[i].last_visit_time+"</td><td>"+data.task[i].cost+"</td><td>"+comment_txt+"</td></tr>";
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr  class='forpics'><td colspan='14'><div class='auditor_pic' id='auditor_pic_"+data.task[i].id+"' style='width:900px; min-height:200px; display:none;'></div></td></tr>";
						
						
						
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
							
				
				$("#auditor_task_div").html("кол-во пройденных анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);
				$("#auditor_task_div").show();

					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
}



function GetColaAuditorAnketaNew()
{
	var wave_id=$("#auditor_wave_id").val();
	
	if (wave_id==="0") {
		return;
	}
	
	var obj={};
	obj.wave_id=wave_id;
	
	$("#auditor_task_div").hide();
	
	$("#auditor_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetColaAuditorAnketaNew",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Номер анкеты</td><td>Адрес</td><td>Крайняя дата визита</td><td>Стоимость</td><td>Комментарий контролера</td></tr></thead>";
				
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}
						
						
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr onclick='showOneAuditorAnketa("+data.task[i].id+");'><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].address+"</td><td>"+data.task[i].last_visit_time+"</td><td>"+data.task[i].cost+"</td><td>"+comment_txt+"</td></tr>";
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
							
				
				$("#auditor_task_div").html("кол-во непройденных анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);
				$("#auditor_task_div").show();

					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
}



function GetRosNeftAuditorAnketaNew()
{
	var wave_id=$("#auditor_wave_id").val();
	
	if (wave_id==="0") {
		return;
	}
	
	var obj={};
	obj.wave_id=wave_id;
	
	$("#auditor_task_div").hide();
	
	$("#auditor_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetRosNeftAuditorAnketaNew",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Номер анкеты</td><td>Адрес</td><td>Код АЗС/АЗК</td><td>Крайняя дата визита</td><td>Стоимость</td><td>Комментарий контролера</td></tr></thead>";
			
				
				
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}
						
						
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr onclick='showOneAuditorAnketa("+data.task[i].id+");'><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].address+"</td><td>"+data.task[i].kod_azs_azk+"</td><td>"+data.task[i].last_visit_time+"</td><td>"+data.task[i].cost+"</td><td>"+comment_txt+"</td></tr>";
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
							
				
				$("#auditor_task_div").html("кол-во непройденных анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);
				$("#auditor_task_div").show();

					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
}




//


function GetSportmasterAuditorAnketaNew()
{
	var obj={};
	
	var auditor_wave_id=$("#auditor_wave_id").val();
	if (auditor_wave_id==="0") {
		return;
	}
	obj.wave_id=auditor_wave_id;
	
	$("#auditor_task_div").hide();
	
	$("#auditor_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetSportmasterAuditorAnketaNew",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Номер анкеты</td><td>Адрес</td><td>Комментарий контролера</td><td>Дата последнего визита</td><td>Стоимость</td></tr></thead>";
			
				
				
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}
						
						
						var cost="";
						if (data.task[i].cost!==null) {
							cost=data.task[i].cost;
						}
						
						
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr onclick='showOneAuditorAnketa("+data.task[i].id+");'><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].address+"</td><td>"+comment_txt+"</td><td>"+last_visit_time+"</td><td>"+cost+"</td></tr>";
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
							
				
				$("#auditor_task_div").html("кол-во непройденных анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);
				$("#auditor_task_div").show();

					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
}


function GetSportmasterAuditorAnketaOld()
{
	var obj={};
	$("#auditor_task_div").hide();
	$("#auditor_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetSportmasterAuditorAnketaOld",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Номер анкеты</td><td>Статус</td><td>Адрес</td><td>Крайняя дата визита</td><td>Стоимость</td><td>Комментарий контролера</td></tr></thead>";
			
				
				
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}
						
				
						
					
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr class='forcheck' onclick='ShowAuditorPics("+data.task[i].id+",1);'><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].task_status+"</td><td>"+data.task[i].address+"</td><td>"+data.task[i].last_visit_time+"</td><td>"+data.task[i].cost+"</td><td>"+comment_txt+"</td></tr>";
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr  class='forpics'><td colspan='14'><div class='auditor_pic' id='auditor_pic_"+data.task[i].id+"' style='width:900px; min-height:200px; display:none;'></div></td></tr>";
						
						
						
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
							
				
				$("#auditor_task_div").html("кол-во пройденных анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);
				$("#auditor_task_div").show();

					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
}








function GetSensusAuditorAnketaNew()
{
	var obj={};
	
	
	$("#auditor_task_div").hide();
	
	$("#auditor_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetSensusAuditorAnketaNew",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Номер анкеты</td><td>Адрес</td><td>Комментарий контролера</td><td>Анкета с неполными данными</td></tr></thead>";
			
				
				
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						var full_txt="";
						if (data.task[i].full!==null&&data.task[i].full===0) {
							full_txt="Да";
						}
						
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr onclick='showOneAuditorAnketa("+data.task[i].id+");'><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].address+"</td><td>"+comment_txt+"</td><td>"+full_txt+"</td></tr>";
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
							
				
				$("#auditor_task_div").html("кол-во непройденных анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);
				$("#auditor_task_div").show();

					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
}



function GetSensusAuditorAnketaOld()
{
	var obj={};
	$("#auditor_task_div").hide();
	$("#auditor_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetSensusAuditorAnketaOld",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Номер анкеты</td><td>Статус</td><td>Адрес</td><td>Комментарий контролера</td></tr></thead>";
			
				
				
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}
						
				
						
					
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr onclick='ShowAuditorPics("+data.task[i].id+",1);' class='forcheck'><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].task_status+"</td><td>"+data.task[i].address+"</td><td>"+comment_txt+"</td></tr>";
						
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr  class='forpics'><td colspan='14'><div class='auditor_pic' id='auditor_pic_"+data.task[i].id+"' style='width:900px; min-height:200px; display:none;'></div></td></tr>";
						
						
						
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
							
				
				$("#auditor_task_div").html("кол-во пройденных анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);
				$("#auditor_task_div").show();

					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
}













function GetMegafonAuditorAnketaNew()
{
	//var obj={};
	
	var wave_id=$("#auditor_wave_id").val();
	
	if (wave_id==="0") {
		alert("Выберите волну");
		return;
	}
	
	var obj={"wave_id":wave_id};
	
	
	
	
		
	
	$("#auditor_task_div").hide();
	
	$("#auditor_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetMegafonAuditorAnketaNew",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Номер анкеты</td><td>Тип анкеты</td><td>Адрес</td><td>Комментарий контролера</td></tr></thead>";
				
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						
						
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr onclick='showOneMegafonAuditorAnketaNew(\""+data.task[i].spektrum_url+"\");'><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].spectrum_anketa_name+"</td><td>"+data.task[i].address+"</td><td>"+comment_txt+"</td></tr>";
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
							
				
				$("#auditor_task_div").html("кол-во непройденных анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);
				$("#auditor_task_div").show();

					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
}


function GetJTIAuditorAnketaOld()
{
	$("#auditor_task_div").hide();
	$("#auditor_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetJTIAuditorAnketaOld",
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Время отправления</td><td>Номер анкеты</td><td>Статус</td><td>Комментарии контроля</td><td>Адрес</td><td>Фото</td></tr></thead>";
			
					
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}
						
				
						
					//recieved_time
						
// GEH JTI AUDIO
                                                has_no_pictures_style='';
                                                h='';
						if (data.task[i].has_pictures==0 || data.task[i].has_pictures===null) {
                                                    has_no_pictures_style =" style='color: #d08304;' ";
                        	                    h= data.task[i].has_pictures; //    '...';
                                                }

//						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr "+ has_no_pictures_style  +" class='forcheck'><td>"+h+data.task[i].shop_id+"</td><td>"+data.task[i].recieved_time+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].task_status+"</td><td>"+data.task[i].comment+"</td><td>"+data.task[i].address+"</td><td><button type='button' onclick='getMediaForm("+data.task[i].id+ ");  ShowAuditorPics("+data.task[i].id+",1);'>Фото</button></td></tr>";
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr class='forcheck' " + has_no_pictures_style  + "><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].recieved_time+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].task_status+"</td><td>"+data.task[i].address+"</td><td><button type='button' onclick='getMediaForm("+data.task[i].id+ ");  ShowAuditorPics("+data.task[i].id+",1);'>Фото</button> "+ has_no_pictures_style + data.task[i].has_pictures+ "</td></tr>";
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr  class='forpics'><td colspan='14'><div class='auditor_pic' id='auditor_pic_"+data.task[i].id+"' style='width:900px; min-height:200px; display:none;'></div></td></tr>";
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr  class='forpics'><td colspan='14'><div class='auditor_pic' id='audio_"+data.task[i].id+"' style='width:900px; min-height:200px; display:none;'></div></td></tr>";
						
						
						
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
							
				
				$("#auditor_task_div").html("Кол-вво пройденных анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);
				$("#auditor_task_div").show();

					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
					});
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
}



function GetJTIAuditorAnketa()
{
	$("#auditor_task_div").hide();
	$("#auditor_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetJTIAuditorAnketa",
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";

				table_wrap_txt = table_wrap_txt + "<thead><tr class='head'><td>Точка</td><td>Неделя визита JTI</td><td>Номер анкеты</td><td>Статус</td><td>Комментарии контроля</td><td>Адрес</td><!-- <td>Фото</td> --></tr></thead>";
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}
						
				
                                                a = ''; b = '';
                                                if (data.task[i].q_nair==62) {
                                                    a=' JTI_highlighted_task ';
                                                    b=" style = 'color: #0000AA;' ";
                                                }

						auditor_new_task_div_txt = auditor_new_task_div_txt+"<tr class='forcheck " + a + "' " + b + "> " +
// "<td><a target=_blank href='/edit_anketa/?task_id="+ data.task[i].id + "'>"+data.task[i].shop_id+"</a></td>" +
"<td>"+data.task[i].shop_id+"</td>" +
"<td>"+data.task[i].recieved_time+"</td>"+
// "<td>"+data.task[i].id+"</td>"+
"<td><a target=_blank href='/edit_anketa/?task_id="+ data.task[i].id + "'>"   +data.task[i].id+ "</a> </td>"+
"<td>"+data.task[i].task_status+"</td>"+
"<td>"+data.task[i].comment+"</td>"+
"<td>"+data.task[i].address+"</td>"+
// <!-- <td><button type='button' onclick='ShowAuditorPics("+data.task[i].id+",1);'>Фото</button></td> -->
"</tr>";
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr  class='forpics'><td colspan='14'><div class='auditor_pic' id='auditor_pic_"+data.task[i].id+"' style='width:900px; min-height:200px; display:none;'></div></td></tr>";
						
						
						
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
							
				
				$("#auditor_task_div").html("кол-во непройденных анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);
				$("#auditor_task_div").show();

					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
}



function GetMegafonAuditorAnketaOld()
{
	
	var wave_id=$("#auditor_wave_id").val();
	
	if (wave_id==="0") {
		alert("Выберите волну");
		return;
	}
	
	var obj={"wave_id":wave_id};
	$("#auditor_task_div").hide();
	$("#auditor_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetMegafonAuditorAnketaOld",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Номер анкеты</td><td>Тип анкеты</td><td>Статус</td><td>Адрес</td><td>Фото / звук</td><td>Комментарий контролера</td></tr></thead>";
			
					
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}
						
				
						
					
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr class='forcheck' ><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].spectrum_anketa_name+"</td><td>"+data.task[i].task_status+"</td><td>"+data.task[i].address+"</td><td><button type='button' onclick='ShowAuditorPics("+data.task[i].id+",1);'>Фото / звук</button></td><td>"+comment_txt+"</td></tr>";
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr  class='forpics'><td colspan='14'><div class='auditor_pic' id='auditor_pic_"+data.task[i].id+"' style='width:900px; min-height:200px; display:none;'></div></td></tr>";
						
						
						
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
							
				
				$("#auditor_task_div").html("кол-во пройденных анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);
				$("#auditor_task_div").show();

					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
}











function GetEldoradoAuditorAnketaNew()
{
	//var obj={};
	
	var wave_id=$("#auditor_wave_id").val();
	
	if (wave_id==="0") {
		alert("Выберите волну");
		return;
	}
	
	var obj={"wave_id":wave_id};
	
	
	
	
	
	
	
	$("#auditor_task_div").hide();
	
	$("#auditor_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetEldoradoAuditorAnketaNew",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Номер анкеты</td><td>Адрес</td><td>Комментарий контролера</td></tr></thead>";
			
				
				
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						
						
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr onclick='showOneEldoradoAuditorAnketaNew(\""+data.task[i].spektrum_url+"\");'><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].address+"</td><td>"+comment_txt+"</td></tr>";
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
							
				
				$("#auditor_task_div").html("кол-во непройденных анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);
				$("#auditor_task_div").show();

					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
}


function GetEldoradoAuditorAnketaOld()
{
	
	var wave_id=$("#auditor_wave_id").val();
	
	if (wave_id==="0") {
		alert("Выберите волну");
		return;
	}
	
	var obj={"wave_id":wave_id};
	$("#auditor_task_div").hide();
	$("#auditor_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetEldoradoAuditorAnketaOld",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Номер анкеты</td><td>Статус</td><td>Адрес</td><td>Фото / звук</td><td>Комментарий контролера</td></tr></thead>";
			
					
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}
						
				
						
					
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr class='forcheck' ><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].task_status+"</td><td>"+data.task[i].address+"</td><td><button type='button' onclick='ShowAuditorPics("+data.task[i].id+",1);'>Фото / звук</button></td><td>"+comment_txt+"</td></tr>";
						
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr  class='forpics'><td colspan='14'><div class='auditor_pic' id='auditor_pic_"+data.task[i].id+"' style='width:900px; min-height:200px; display:none;'></div></td></tr>";
						
						
						
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
							
				
				$("#auditor_task_div").html("кол-во пройденных анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);
				$("#auditor_task_div").show();

					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
}


















function GetAuditorAnketaNew()
{
	
	var obj={};
	
	obj.wave_id=$("#auditor_wave_id").val();
	
	
	$("#auditor_new_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetAuditorAnketaNew",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Номер анкеты</td><td>Адрес</td><td>Комментарий контролера</td><td>Дата крайнего визита</td><td>Стоимость</td><td style='width:143px;'>Штрафы</td></tr></thead>";
			
				var penalty_txt="";
				
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						
						//dtext=dtext+"<b>Сумма выплаты</b> "+(data.task_cost-data.penalty_money)+" <br><br>";
						
						penalty_txt=penalty_txt+"<b>Сумма штрафов</b> "+data.task[i].penalty_money+"<br>";
						penalty_txt=penalty_txt+"<b>Сумма выплат</b> "+(data.task[i].cost-data.task[i].penalty_money)+"<br>";
						for (var j=0; j<data.task[i].penalty.length; j++)
						{
							if (data.task[i].penalty[j].sum>0) {
								penalty_txt=penalty_txt+data.task[i].penalty[j].name+" / "+data.task[i].penalty[j].sum+"<br>";
							}
						}	
						
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}
						
						
						
//						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr onclick='showOneAuditorAnketa("+data.task[i].id+");'><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].address+"</td><td>"+comment_txt+"</td><td>"+last_visit_time+"</td><td>"+data.task[i].cost+"</td><td>"+penalty_txt+"</td></tr>";
						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr onclick='showOneAuditorAnketa("+data.task[i].id+");'><td>"+data.task[i].sap_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].address+"</td><td>"+comment_txt+"</td><td>"+last_visit_time+"</td><td>"+data.task[i].cost+"</td><td>"+penalty_txt+"</td></tr>";
						
						penalty_txt="";
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
				//table_wrap_txt="<b>"+data.task.length+"</b> анкет<div style='clear:both; height:10px></div>'"+table_wrap_txt;
				
				
				$("#auditor_new_task_div").html("кол-во анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);


					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
	
}



function GetAuditorAnketaNewAuchan()
{
	var obj={};
	
	obj.wave_id=$("#auditor_wave_id").val();
	
	
	$("#auditor_new_task_div").html("");
		$.ajax({
        type: 'POST',
        url: "/GetAuditorAnketaNewAuchan",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{  
				var table_wrap_txt="<table  id='auditor_anketa_new'  cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
                                if (data.task[0].project_id==22) {
//                                    table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Тип анкеты</td><td>Легенда</td><td>Режим работы</td><td>Запрещенные дни визита!</td><td>Оператор</td><td>Адрес</td><td>Статус</td><td>Комментарий контролера</td><td>Номер анкеты</td><td>Точка</td><td>Дата крайнего визита</td><!--<td>Стоимость</td> <td style='width:143px;'>Штрафы</td> --> </tr></thead>";
table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Тип анкеты</td><td>Цена</td><td>Легенда</td><td>Режим работы</td><td>Запрещенные дни визита!</td><td>Оператор</td><td>Адрес</td><td>Статус</td><td>Комментарий контролера</td><td>Номер анкеты</td><td>Точка</td><td>Дата крайнего визита</td></tr></thead>";

                                }
                                else if (data.task[0].project_id==23) {
//                                    table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Тип анкеты</td><td>Ранг</td><td>Режим работы</td> <td>Запрещенные дни визита!</td><td>Тип объекта</td><td>Адрес</td><td>Легенда</td><td>Статус</td><td>Комментарий контролера</td><td>Номер анкеты</td><td>Точка</td><td>Название</td><td>Дата крайнего визита</td> </tr></thead>";
table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Тип анкеты</td><td>Цена</td><td>Ранг</td><td>Режим работы</td> <td>Запрещенные дни визита!</td><td>Тип объекта</td><td>Адрес</td><td>Легенда</td><td>Статус</td><td>Комментарий контролера</td><td>Номер анкеты</td><td>Точка</td><td>Название</td><td>Дата крайнего визита</td> </tr></thead>";

                                }
                                else {
// table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Тип анкеты</td><td>Режим работы</td><td>Запрещенные дни визита!</td><td>Адрес</td><td>Легенда</td><td>Статус</td><td>Комментарий контролера</td><td>Номер анкеты</td><td>Точка</td><td>Название</td><td>Дата крайнего визита</td><!--<td>Стоимость</td> <td style='width:143px;'>Штрафы</td> --> </tr></thead>";
table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Тип анкеты</td><td>Цена</td><td>Режим работы</td><td>Запрещенные дни визита!</td><td>Адрес</td><td>Легенда</td><td>Статус</td><td>Комментарий контролера</td><td>Номер анкеты</td><td>Точка</td><td>Название</td><td>Дата крайнего визита</td><!--<td>Стоимость</td> <td style='width:143px;'>Штрафы</td> --> </tr></thead>";

                                }
				var penalty_txt="";
				
				
				var auditor_new_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						
						//dtext=dtext+"<b>Сумма выплаты</b> "+(data.task_cost-data.penalty_money)+" <br><br>";
						
//						penalty_txt=penalty_txt+"<b>Сумма штрафов</b> "+data.task[i].penalty_money+"<br>";
//						penalty_txt=penalty_txt+"<b>Сумма выплат</b> "+(data.task[i].cost-data.task[i].penalty_money)+"<br>";
						for (var j=0; j<data.task[i].penalty.length; j++)
						{
							if (data.task[i].penalty[j].sum>0) {
								penalty_txt=penalty_txt+data.task[i].penalty[j].name+" / "+data.task[i].penalty[j].sum+"<br>";
							}
						}	
						
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}


                                                var open_time="";
                                                if (data.task[i].open_time!==null) {
                                                    open_time=data.task[i].open_time;
                                                }


                                              var cost="";
                                                 if (data.task[i].cost!==null) {
                                                     cost=data.task[i].cost;
                                                 }


						status_name = (data.task[i].status==0) ? "Новая" : "На доработку";
                                                color_row_style = (data.task[i].status==0) ? '' : ' style="color: #f80000;" ';
//						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr onclick='showOneAuditorAnketa("+data.task[i].id+");'><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].address+"</td><td>"+comment_txt+"</td><td>"+last_visit_time+"</td><td>"+data.task[i].cost+"</td><td>"+penalty_txt+"</td></tr>";
//						auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr " + color_row_style + " onclick='showOneAuditorAnketa("+data.task[i].id+");'><td>"+data.task[i].qname+"</td><td>"+open_time+"</td><td>"+data.task[i].closed_date+"</td><td>"+data.task[i].address+"</td><td>"+status_name+"</td><td>"+comment_txt+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].location_name+"</td><td>"+last_visit_time+"</td><!-- <td>"+data.task[i].cost+"</td><td>"+penalty_txt+"</td> --></tr>";
                                if (data.task[i].project_id==22) {
                                    auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr " + color_row_style + " onclick='showOneAuditorAnketa("+data.task[i].id+");'><td>"+data.task[i].qname+"</td>"
+"<td>"+cost+ "</td>"
+"<td>"+data.task[i].legend+"</td><td>"+open_time+"</td><td>"+data.task[i].closed_date+"</td><td>"+data.task[i].brand_name+"</td><td>"+data.task[i].address+"</td><td>"+status_name+"</td><td>"+comment_txt+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].shop_id+"</td><td>"+last_visit_time+"</td><!-- <td>"+data.task[i].cost+"</td><td>"+penalty_txt+"</td> --></tr>";
                                }
                                else if (data.task[i].project_id==23) {
                                    auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr " + color_row_style + " onclick='showOneAuditorAnketa("+data.task[i].id+");'><td>"+data.task[i].qname+"</td>"
+"<td>"+cost+ "</td>"
+"<td>"+data.task[i].attr_1 +"</td>"
+"<td>"+open_time+"</td><td>"+data.task[i].revisions_date+' '+data.task[i].closed_date +"</td><td>"+data.task[i].attr_2 +"</td><td>"+data.task[i].address+"</td><td>"+data.task[i].legend+"</td><td>"+status_name+"</td><td>"+comment_txt+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].location_name+"</td><td>"+last_visit_time+"</td></tr>";
                                }
                                else {
//                                    auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr " + color_row_style + " onclick='showOneAuditorAnketa("+data.task[i].id+");'><td>"+data.task[i].qname+"</td><td>"+open_time+"</td><td>"+data.task[i].closed_date+"</td><td>"+data.task[i].address+"</td><td>"+status_name+"</td><td>"+comment_txt+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].location_name+"</td><td>"+last_visit_time+"</td><!-- <td>"+data.task[i].cost+"</td><td>"+penalty_txt+"</td> --></tr>";
                                    auditor_new_task_div_txt=auditor_new_task_div_txt+"<tr " + color_row_style + " onclick='showOneAuditorAnketa("+data.task[i].id+");'><td>"+data.task[i].qname+"</td>"
+"<td>"+cost+ "</td>"
+"<td>"+open_time+"</td><td>"+data.task[i].revisions_date+' '+data.task[i].closed_date+"</td><td>"+data.task[i].address+"</td><td>"+data.task[i].legend+"</td><td>"+status_name+"</td><td>"+comment_txt+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].location_name+"</td><td>"+last_visit_time+"</td><!-- <td>"+data.task[i].cost+"</td><td>"+penalty_txt+"</td> --></tr>";
                                }

						
						penalty_txt="";
					
					}
				
				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_new_task_div_txt+"</tbody>"+"</table>";
				
				
				//table_wrap_txt="<b>"+data.task.length+"</b> анкет<div style='clear:both; height:10px></div>'"+table_wrap_txt;
				
				
				$("#auditor_new_task_div").html("кол-во анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);


					$('#auditor_anketa_new tbody tr').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_new tbody tr').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});

				
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
	
}




function GetAuditorAnketaDone()
{
	var obj={};
	
	obj.wave_id=$("#auditor_wave_id").val();
	
	$("#auditor_task_div").html("");
	$.ajax({
        type: 'POST',
        url: "/GetAuditorAnketaDone",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{
				
				var table_wrap_txt="<table id='auditor_anketa_done' cellpadding='0' cellspacing='0' class='auditor_anketa'>";
				
				table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Точка</td><td>Номер анкеты</td><td>Адрес</td><td>Время прохождения</td><td>Комментарий контролера</td><td>Статус анкеты</td><td>Дата крайнего визита</td><td>Стоимость</td></tr></thead>";
				
				
				
				$("#auditor_task_div").html("");
				var auditor_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						
						
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}
						
						
//						auditor_task_div_txt=auditor_task_div_txt+"<tr class='forcheck' onclick='ShowAuditorPics("+data.task[i].id+",1);'><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].address+"</td><td>"+data.task[i].time+"</td><td>"+comment_txt+"</td><td>"+data.task[i].status+"</td><td>"+last_visit_time+"</td><td>"+data.task[i].cost+"</td></tr>";
						auditor_task_div_txt=auditor_task_div_txt+"<tr class='forcheck' onclick='ShowAuditorPics("+data.task[i].id+",1);'><td>"+data.task[i].sap_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].address+"</td><td>"+data.task[i].time+"</td><td>"+comment_txt+"</td><td>"+data.task[i].status+"</td><td>"+last_visit_time+"</td><td>"+data.task[i].cost+"</td></tr>";
						
						auditor_task_div_txt=auditor_task_div_txt+"<tr  class='forpics'><td colspan='14'><div class='auditor_pic' id='auditor_pic_"+data.task[i].id+"' style='width:900px; min-height:200px; display:none;'></div></td></tr>";
						
						
						
						//auditor_task_div_txt=auditor_task_div_txt+"<a class='auditor_tasks' href='javascript:' onclick='ShowAuditorPics("+data.task[i].id+")'>время - "+data.task[i].time+";  точка - "+data.task[i].shop_id+"; номер анкеты -  "+data.task[i].id+"; адрес -  "+data.task[i].address+"</a>";
					
					
						//auditor_task_div_txt=auditor_task_div_txt+"<div style='clear:both; height:15px'></div>";
						//auditor_task_div_txt=auditor_task_div_txt+"<div class='auditor_pic' id='auditor_pic_"+data.task[i].id+"' style='width:900px; min-height:200px; display:none;'></div>";
					
					}
					
					
			
					
					
			//$("#auditor_task_div").html(auditor_task_div_txt);	


				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_task_div_txt+"</tbody>"+"</table>";
				
				$("#auditor_task_div").html("кол-во анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);


					$('#auditor_anketa_done tbody tr.forcheck').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_done tbody tr.forcheck').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});



			
		   }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
	
}







function GetAuditorAnketaDoneAuchan()
{
	var obj={};
	
	obj.wave_id=$("#auditor_wave_id").val();
	
	$("#auditor_task_div").html("");
	$.ajax({
        type: 'POST',
        url: "/GetAuditorAnketaDoneAuchan",
		data: obj,
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{

				var table_wrap_txt="<table id='auditor_anketa_done' cellpadding='0' cellspacing='0' class='auditor_anketa'>";
if (data.task[0].project_id==22) {
                                table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Тип анкеты</td><td>Дата визита</td><td>Оператор</td><td>Адрес</td><td>Статус</td><td>Кол-во фото</td><td>Комментарий контролера.</td><td>Номер анкеты</td><td>Точка</td><td>Дата крайнего визита</td></tr></thead>";
}
else {
                                table_wrap_txt=table_wrap_txt+"<thead><tr class='head'><td>Тип анкеты</td><td>Адрес</td><td>Статус</td><td>Кол-во фото</td><td>Комментарий контролера.</td><td>Номер анкеты</td><td>Точка</td><td>Название</td><td>Дата крайнего визита</td></tr></thead>";
}
                                

				$("#auditor_task_div").html("");
				var auditor_task_div_txt="";
				for (var i=0; i<data.task.length; i++)
					{
						
						
						var comment_txt="";
						if (data.task[i].comment!==null) {
							comment_txt=data.task[i].comment;
						}
						
						
						var last_visit_time="";
						if (data.task[i].last_visit_time!==null) {
							last_visit_time=data.task[i].last_visit_time;
						}


// GEH Audio for auditor && medialess surveys
                                                no_media_str = (data.task[i].task_with_media===null) ? '<div style="color: red;">В анкете нет загруженных фото или аудио</div>'  : 'Ok';

                                                switch (data.task[i].status*1) {
                                                    case 3 : row_style = ' style="color: #00B050;" ';  break;
                                                    case 5 : row_style = ' style="color: red;" ';   break;
                                                    default: row_style = ' class="d" ';   break;
                                                }

                                                //auditor_task_div_txt=auditor_task_div_txt+"<tr "+ row_style +" class='forcheck' onclick='  getMediaForm("+data.task[i].id+ "); ShowAuditorPics("+data.task[i].id+",1); '><td>"+data.task[i].sap_id+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].qnair_name+"</td><td>"+data.task[i].status_name+"</td><td>"+data.task[i].shop_n+"</td><td>"+data.task[i].address+"</td><td>"+data.task[i].time+"</td><td>"+comment_txt+"</td><td>"+last_visit_time+"</td><!-- <td>"+data.task[i].cost+"</td> --> <td>"+ no_media_str +"</td></tr>";

                                                if (data.task[i].project_id !=22) {

//                                                    auditor_task_div_txt=auditor_task_div_txt+"<tr " + row_style + " onclick='getMediaForm("+data.task[i].id+ "); ShowAuditorPics("+data.task[i].id+");'><td>"+data.task[i].qname+"</td><td>"+data.task[i].address+"</td><td>Пройдена</td><td>"+data.task[i].pictures_count+"</td><td>"+comment_txt+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].location_name+"</td><td>"+last_visit_time+"</td></tr>";
                                                    auditor_task_div_txt=auditor_task_div_txt+"<tr " + row_style + " onclick_='getMediaForm("+data.task[i].id+ "); ShowAuditorPics("+data.task[i].id+");'><td>"+data.task[i].qname+"</td><td>"+data.task[i].address+"</td><td>Пройдена</td><td>"+data.task[i].pictures_count+"</td><td>"+comment_txt+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].shop_id+"</td><td>"+data.task[i].location_name+"</td><td>"+last_visit_time+"</td></tr>";

                                                    auditor_task_div_txt = auditor_task_div_txt+"<tr  class='forpics1'><td colspan='14'><div class='auditor_pic1' id='audio_"+data.task[i].id+"' style='width:900px; min-height:10px; display:none'></div></td></tr>";
                                                    auditor_task_div_txt = auditor_task_div_txt+"<tr  class='forpics'><td colspan='14'><div class='auditor_pic' id='auditor_pic_"+data.task[i].id+"' style='width:900px; min-height:200px; display:none;'></div></td></tr>";
                                                }
                                                else {
                                                    auditor_task_div_txt=auditor_task_div_txt+"<tr " + row_style + "><td>"+data.task[i].qname+"</td><td>"+data.task[i].user_visit_time+"</td><td>"+data.task[i].brand_name+"</td><td>"+data.task[i].address+"</td><td>Пройдена</td><td>"+data.task[i].pictures_count+"</td><td>"+comment_txt+"</td><td>"+data.task[i].id+"</td><td>"+data.task[i].sap_id+"</td><td>"+last_visit_time+"</td></tr>";
                                                }

						
						
						
					
					}
					
					
			
					
					
			//$("#auditor_task_div").html(auditor_task_div_txt);	


				table_wrap_txt=table_wrap_txt+"<tbody>"+auditor_task_div_txt+"</tbody>"+"</table>";
				
				$("#auditor_task_div").html("кол-во анкет: <b>"+data.task.length+"</b><div style='clear:both; height:10px'></div>"+table_wrap_txt);


					$('#auditor_anketa_done tbody tr.forcheck').on('mouseover', function() {
						$(this).css('background-color', '#E7E7E7');
		
					});
	
				$('#auditor_anketa_done tbody tr.forcheck').on('mouseout', function() {
					$(this).css('background-color', 'transparent');
		
				});



			
		   }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
	
}





function auditor_help()
{
	$("#auditor_task_div").html("");
	$.ajax({
        type: 'POST',
        url: "/auditor_help",
        dataType: "json",
        success: function (data) {
			if (data.result===true) 
			{
				
				
				$("#auditor_task_div").html("<a style='color:black;' target='_blank' href='files/portal_help.pdf'>Инструкция по порталу</a><br><br><a  target='_blank' style='color:black;' href='files/app_help.pdf'>Инструкция по мобильному приложению</a><br>");
				
				$("#auditor_task_div").show();
				


			
		   }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
	
}














function add_user_answer(obj, self)
{
        console.log("ajax", self);
        let siblings = Array.from(self.parentNode.children).filter((child) => (child !== self));
        siblings = siblings.filter((sibl) => {
            if (sibl.childNodes.length > 0) {
                if (sibl.childNodes[0].checked) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        });
        console.log("Поиск родственников = ", siblings);
        if (siblings.length > 0) {
            if (siblings[0].childNodes[1].nodeValue == "Мясная гастрономия") {
                console.log("Поиск проверки родственников ближайших = ", siblings[0].childNodes[1]);
            }
            console.log("Поиск родственников ближайших = ", siblings[0].childNodes[1].nodeValue);
        }
            
	$.ajax({
        type: 'POST',
        url: "http://localhost/TestAnketa/add_user_answer.php",
        data: obj,
        dataType: "json",
        success: function (data) {
            console.log("result data = ", data);
            console.log("result data.q_show = ", data.q_show);
//			if (data.result===true) 
//			{

				console.log(data.user_id);
//				console.log(data.q_show);


                          $(data.q_hide).each(function ( index, value) {
                                console.log('index='+value);
                                $("#qwrap"+value).hide();
                         });

                          $(data.q_show).each(function ( index, value) {
                                //console.log(value);
                                $("#qwrap"+value).show();
                         });

			 if (typeof data.all_answers!=="undefined") {
				  $(data.all_answers).each(function ( index, value) {
						$("#multiselect_"+value).prop("checked",false);
				 });
			 }

			 if (typeof data.checked_answers!=="undefined") {
				  $(data.checked_answers).each(function ( index, value) {
						$("#multiselect_"+value).prop("checked",true);
				 });
			 }

                         if (typeof data.error_txt!=="undefined") {
				  alert(data.error_txt);
			 }

//		    }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            console.log(status, errorThrown);
        },
        cache: false
    });


}




function GetMultiChecked(id)
{
	var answer="";
	var o=$("input[name=multi_select_"+id+"]");
	for (var i=0; i<o.length; i++)
	{
		var id_in=o[i].id;
		var id_in_arr=id_in.split("multiselect_");
		var id_ch=$(o[i]).prop("checked");
		if (id_ch===true) {
			answer=answer+id_in_arr[1]+"|-|";
		}
	}

	return answer;

}


function AnketaCopyrightComplete(task_id)
{
 
	if (confirm("Вы уверены в том, что Вы ответили на все вопросы анкеты?")) {
			SetAuditorAnketaStatusCopyright(task_id);
		} else {
		
	}

}




function SetAuditorAnketaStatusCopyright(tid)
{
		var obj={task_id:tid};
		$.ajax({
        type: 'POST',
        url: "/SetAuditorAnketaStatusCopyright",
        data: obj,
        dataType: "json",
        success: function (data) {
			if (data.rez===true)
			{
					alert("Анкета перешла в раздел 'Пройденные анкеты'");
					window.close();
			}
		
		
			if (data.no_answer===false)
			{
					alert("Вы не ответили на вопрос "+data.question_text);
					window.location.href="#"+data.question_id;
			}
		

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
}










function AnketaControlerCopyrightCompleteNext(task_id)
{
 
	if (confirm("Вы уверены в том, что Вы ответили на все вопросы анкеты?")) {
			SetControlerCopyrightAnketaStatusNext(task_id);
		} else {
		
	}

}




function SetControlerCopyrightAnketaStatusNext(tid)
{
	  var status_id = $("#status_id").val();
	  if (status_id == "-1"){
		  alert("Выберите статус анкеты");
		  return;
	  }
	  
	  var status_txt = $("#status_id option:selected").text();
	  
	  var controler_comment = $("#controler_comment").val();
	  controler_comment = $.trim(controler_comment);
	  if (controler_comment.length === 0){
		  alert("Введите комментарий");
		  return;
	  }
	
		var obj={
			task_id:tid,
			status_id:status_id,
			controler_comment:controler_comment
			
		};
		$.ajax({
        type: 'POST',
        url: "/SetControlerCopyrightAnketaStatusNext",
        data: obj,
        dataType: "json",
        success: function (data) {
			if (data.rez===true)
			{
					alert("Анкета получила статус '"+status_txt+"' .");
//					window.close();
					window.location.href=window.location.href.replace('edit_copyright_anketa','show_anketa');

			}
		
		
			if (data.no_answer===false)
			{
					alert("Вы не ответили на вопрос "+data.question_text);
					window.location.href="#"+data.question_id;
			}
		

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
}














function AnketaControlerCopyrightComplete(task_id)
{
 
	if (confirm("Вы уверены в том, что Вы ответили на все вопросы анкеты?")) {
			SetControlerCopyrightAnketaStatus(task_id);
		} else {
		
	}

}




function SetControlerCopyrightAnketaStatus(tid)
{
		var obj={task_id:tid};
		$.ajax({
        type: 'POST',
        url: "/SetControlerCopyrightAnketaStatus",
        data: obj,
        dataType: "json",
        success: function (data) {
			if (data.rez===true)
			{
					alert("Анкета получила статус 'Проверена'");
//					window.close();
					window.location.href=window.location.href.replace('edit_copyright_anketa','show_anketa');

			}
		
		
			if (data.no_answer===false)
			{
					alert("Вы не ответили на вопрос "+data.question_text);
					window.location.href="#"+data.question_id;
			}
		

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
}















function AnketaComplete(task_id)
{
 
	if (confirm("Вы уверены в том, что Вы ответили на все вопросы анкеты?")) {
			SetAuditorAnketaStatus(task_id);
		} else {
		
	}

}





function SetAuditorAnketaStatus(tid)
{
    var obj={task_id:tid};
    $.ajax({
        type: 'POST',
        url: "/SetAuditorAnketaStatus",
        data: obj,
        dataType: "json",
        success: function (data) {
                    if (data.rez===true)
                        {
                                alert("Анкета перешла в раздел 'Пройденные анкеты'");
                                window.close();
                        }


                        if (data.no_answer===false)
                            {
                            if (data.type_q===1) {
                                alert("Лишний ответ на вопрос "+data.question_text);
                            }
                            else {
                                alert("Вы не ответили на вопрос "+data.question_text);
                            }
                                window.location.href="#"+data.question_id;
                        }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });

}



function show_auditor_map()
{
	$("#auditor_task_div").hide();
	$("#auditor_map_div").show();
}




function SendAuditorEldoradoAudio(task_id)
{
	$("#el_audio_add_"+task_id).submit();
}



function SendAuditorMegafonAudio(task_id)
{
	$("#meg_audio_add_"+task_id).submit();
}


function getMediaForm(task_id)
{
	console.log("getMediaForm");

        var obj={};
        obj.task_id=task_id;
// alert (task_id);

	$.ajax({
        type: 'POST',
        url: "/geh/load_form_15.php",
        data: obj,
        dataType: "html",
        success: function (data) {
                        var w=data;
                        $("#audio_"+obj.task_id).html(w)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });

}



function ShowAuditorPics(id, show_delete_button, other_media_added)
{
	
	
	if ( $("#auditor_pic_"+id).is(':visible') )
	{
		$("#auditor_pic_"+id).hide();
		$("#audio_"+id).hide();
		return;
	}	
	
	
	
//	$(".auditor_pic").hide();
	
	
	
	
	
	
	
	$("#auditor_pic_"+id).show();
	$("#audio_"+id).show();

	
	//utaskid tcomment
	var obj={};
	obj.task_id=id;
	
	if (obj.status_id=="") {
	return;	
	}
	//console.log(obj);

   
	$.ajax({
        type: 'POST',
        url: "/auditor_get_pic",
        data: obj,
        dataType: "json",
        success: function (data) {
			//console.log(data);
			var w="";
			
			
			
			
			
			
			
				if (data.project_id==="11") {
				 	
						var dtext="<h1 style='color:red; display:none; font-size:1.8em;' id='pic_type_alert'>Внимание Вы не определилили тип фотографии для всех загруженных фото!</h1>";
						
						w=w+dtext;
			}
			
			
			
			
			
			
			
			
			
			
			
			
				if (data.project_id==="2") {
				 	
						var dtext="";
						if (data.penalty.length>0) {
							dtext=dtext+"<br><b>Штрафы:</b><br><br>";
						}

						 $(data.penalty).each(function ( index, value) {
							if (value.sum>0) {
								dtext=dtext+value.name+" / "+value.sum+"<br>";
							}
						});
						
						if (data.penalty.length>0) {
							dtext=dtext+"<b>Сумма штрафов</b> "+data.penalty_total+"<br>";
						}
						
						if (data.penalty.length>0) {
							dtext=dtext+"<b>Сумма выплаты</b> "+(data.task_cost-data.penalty_money)+" <br><br>";
						}
						
						
						w=w+dtext;
			}
			
			
				for (var i=0; i<data.pic.length; i++)
			{
				w=w+"<div id='wrap_aud_pic_"+data.pic[i].id+"' style='position:relative; width:500px;'><img style='width:500px;margin-bottom:10px;margin-top:10px;' src='"+data.pic[i].pic_tmb+"'/>";
				if (typeof show_delete_button==="undefined") {
//					w=w+"<div style='cursor:pointer;padding:5px;background-color:white;position:absolute; top:0px; right:0px; color:red;' onclick='if (confirm(\"Действительно удалить фото?\")) DeleteAuditorUploadPic("+data.pic[i].id+");'>УДАЛИТЬ</div>";
				}
				//console.log(data.pic[i]);
				//console.log(data.x5_cat_all);
				
				
				var x5_txt="";
				console.table(data);
//				if (true) {
				if (typeof data.x5_cat_all!=="undefined") {
					 x5_txt="Раздел для фото:<br><select onchange='SetX5CatAuditorPic("+data.pic[i].id+",this);'>";
					 $(data.x5_cat_all).each(function ( index, value) {
						    var selected_txt="";
							if (value.id===data.pic[i].x5_cat) {
								selected_txt="selected";
							}
							x5_txt=x5_txt+"<option "+selected_txt+" value='"+value.id+"'>"+value.name+"</option>";	
						});
					x5_txt=x5_txt+"</select><div style='clear:both; height:35px;'></div>";	
					
				}
				
				
			
				
				var pic_type_txt="";
				
				if (typeof data.pic_type_cat_all!=="undefined") {
					
					 pic_type_txt="Тип фото:<br><select onchange='SetTypeAuditorPic("+data.pic[i].id+",this, "+id+");'>";
					 $(data.pic_type_cat_all).each(function ( index, value) {
						    var selected_txt="";
							if (value.id===data.pic[i].type_id) {
								selected_txt="selected";
							}
							pic_type_txt=pic_type_txt+"<option "+selected_txt+" value='"+value.id+"'>"+value.name+"</option>";	
						});
					pic_type_txt=pic_type_txt+"</select><div style='clear:both; height:35px;'></div><hr><div style='clear:both; height:35px;'></div>";	
					
				}
				
				
				
				
				
				//x5_txt="";
				
				w=w+pic_type_txt+x5_txt+"</div>";
			}
			
			w=w+'<div style="clear:both; height:15px;"></div><div><h3>Добавить фото</h3></div><form id="pic_add_'+obj.task_id+'" action="../show_anketa" method="post" class="pic_add" enctype="multipart/form-data"><input type="hidden" name="task_id" id="task_id" value="'+obj.task_id+'"><input type="file" name="avatar[]" multiple><div style="clear:both; height:10px;"></div><input onclick="SendAvatarPic('+obj.task_id+');" type="button" id="button" value="Отправить"></form><div style="clear:both; height:35px;"></div>';
			
			
			
			
			if (data.project_id==="8") {
				if (typeof data.sound!=="undefined" ) {	
					var tqa="";
						for (var i=0; i<data.sound.length; i++)
					{
						
						tqa=tqa+'<div style="clear:both; height:15px;"></div><audio controls><source src="'+data.sound[i]+'" type="audio/mpeg"><a href="'+data.sound[i]+'">Скачать</a></audio><div style="clear:both; height:15px;"></div>';
						
										
					}	
					
					
					
					
				 }
				 
				 
				 
				var eldorado_audio_txt="<div style='display:none;' id='el_audio"+obj.task_id+"'><div style='clear:both; height:10px;'></div><b>Для отправки аудио прикрепите файл:</b><div style='clear:both; height:10px;'></div><form id='el_audio_add_"+obj.task_id+"' action='/show_anketa' method='post'  enctype='multipart/form-data'><input type='file' id='elfiles"+obj.task_id+"' name='video[]' multiple><input onclick='SendAuditorEldoradoAudio("+obj.task_id+");' type='button' id='button' value='Отправить аудио'><input type='hidden' name='action' id='action' value='eldorado'/><input type='hidden' name='tid' id='tid' value='"+obj.task_id+"'/></form><div style='clear:both; height:10px;'></div></div>";
						
				eldorado_audio_txt="<a onclick='$(\"#el_audio"+obj.task_id+"\").toggle();' href='javascript:'>Загрузить</a>"+eldorado_audio_txt;
						
				tqa=tqa+eldorado_audio_txt; 
				 
				w=w+'<div style="clear:both; height:35px;"></div><b>Звук</b><div style="clear:both; height:15px;"></div>'+tqa+'<div style="clear:both; height:35px;"></div>'; 
				 
			}			
			
			
			if (data.project_id==="11") {
				var tqa="";
				
				if (typeof data.sound!=="undefined" ) {	
					
						for (var i=0; i<data.sound.length; i++)
					{
						
						tqa=tqa+'<div style="clear:both; height:15px;"></div><audio controls><source src="'+data.sound[i]+'" type="audio/mpeg"><a href="'+data.sound[i]+'">Скачать</a></audio><div style="clear:both; height:15px;"></div>';
						
										
					}	
					
					
					
					
				 }
				 
			 
				 
				var megafon_audio_txt="<div style='display:none;' id='meg_audio"+obj.task_id+"'><div style='clear:both; height:10px;'></div><b>Для отправки аудио прикрепите файл:</b><div style='clear:both; height:10px;'></div><form id='meg_audio_add_"+obj.task_id+"' action='/show_anketa' method='post'  enctype='multipart/form-data'><input type='file' id='megfiles"+obj.task_id+"' name='video[]' multiple><input onclick='SendAuditorMegafonAudio("+obj.task_id+");' type='button' id='button' value='Отправить аудио'><input type='hidden' name='action' id='action' value='megafon'/><input type='hidden' name='tid' id='tid' value='"+obj.task_id+"'/></form><div style='clear:both; height:10px;'></div></div>";
						
				megafon_audio_txt="<a onclick='$(\"#meg_audio"+obj.task_id+"\").toggle();' href='javascript:'>Загрузить</a>"+megafon_audio_txt;
						
				tqa=tqa+megafon_audio_txt; 
				 
				w=w+'<div style="clear:both; height:35px;"></div><b>Звук</b><div style="clear:both; height:15px;"></div>'+tqa+'<div style="clear:both; height:35px;"></div>'; 
				 
			}
			
			
			
			
			
		
			
			
			$("#auditor_pic_"+obj.task_id).html(w);
		
			if (data.project_id==="11") {
				if (data.discribed===false){
					$("#pic_type_alert").show();
				}
			}	
	//
		

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
}



function SetX5CatAuditorPic(id,sel_obj)
{
	
	var obj={};
	obj.id=id;
	
	var x5_cat_id=$(sel_obj).val();
	
	obj.x5_cat_id=x5_cat_id;
	

	$.ajax({
        type: 'POST',
        url: "/SetX5CatAuditorPic",
        data: obj,
        dataType: "json",
        success: function (data) {

                        if (data.result===true)
                        {
                                // alert("Фото перемещено в раздел");
                                $("#PopupInfo").html("Сохранено");
                                $("#PopupInfo").animate({top: '0px'},700, function() {$("#PopupInfo").animate({top: '-50px'},1000)} );

                         }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
	
	

}









function DeleteAuditorUploadPic(id)
{
	
	var obj={};
	obj.id=id;
	console.log(obj);
	//return;
	$.ajax({
        type: 'POST',
        url: "/delete_auditor_pic",
        data: obj,
        dataType: "json",
        success: function (data) {
			//console.log(data);
			if (data.result===true) 
			{
				$("#wrap_aud_pic_"+id).remove();
			
		     }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
	
	
	

}






function SendAvatarPic(task_id)
{
	//console.log(task_id);
	$("#pic_add_"+task_id).submit();
}



function SendVideo(task_id)
{
	$("#video_add_"+task_id).submit();
}




function DeleteAuditorPic(id)
{
	
	var obj={};
	obj.id=id;
	
	$.ajax({
        type: 'POST',
        url: "/remove_auditor_pic",
        data: obj,
        dataType: "json",
        success: function (data) {

                        if (data.result===true) 
                        {
                            $("#wrap_aud_pic_"+id).remove();
                        }
                        else {
                            alert(data.description);
                        }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });

/*
function MarkAsSelfi(id, task_id)
{
        var obj={};
        obj.id=id;
        obj.task_id=task_id;

        $.ajax({
        type: 'POST',
        url: "/set_selfi_auditor_pic",
        data: obj,
        dataType: "json",
        success: function (data) {

                        if (data.result===true) 
                        {
                            $("#wrap_aud_pic_"+id).remove();
                        }
                        else {
                            alert(data.description);
                        }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });

*/

}


// function SetX5CatAuditorPic(id,sel_obj)
// {
	
	// var obj={};
	// obj.id=id;
	
	// var x5_cat_id=$(sel_obj).val();
	
	// obj.x5_cat_id=x5_cat_id;
	

	// $.ajax({
        // type: 'POST',
        // url: "/SetX5CatAuditorPic",
        // data: obj,
        // dataType: "json",
        // success: function (data) {
			// console.log(data);
			// // if (data.result===true) 
			// // {
            // // }

        // },
        // error: function (XMLHttpRequest, textStatus, errorThrown) {
            // var status = XMLHttpRequest.status;
            // ShowSystemError(404, status);
        // },
        // cache: false
    // });
	
	
	

// }



function delete_user_answer_by_qid_n_task(obj)
{

if (confirm("Вы уверены, что необходимо удалить ответ на этот вопрос?")) {
  $.ajax({
        type: 'POST',
        url: "/delete_user_answer_by_qid_n_task",
        data: obj,
        dataType: "json",
        success: function (data) {
            if (data.result===true)
            {
                alert("Ответ удален.");
                location.reload(true);
//                window.location.href = window.location.href.split( '#' )[0]+'#'+data.q_id;

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });
}


}

///////////////
// Clones  function_a , to complilate

function SetX5CatAdminPic(id, sel_obj) {

    var obj = {};
    obj.id = id;

    var x5_cat_id = $(sel_obj).val();

    obj.x5_cat_id = x5_cat_id;


    $.ajax({
        type: 'POST',
        url: "/SetX5CatAuditorPic",
        data: obj,
        dataType: "json",
        success: function (data) {

            if (data.result === true) {
                if(data.copyright>0) {
// auditors
// RB 931: alert's off
//                    alert('Фото перемещено в раздел "' + sel_obj.options[sel_obj.selectedIndex].text +'"');
                }
            }
            else {
                return false;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            ShowSystemError(404, status);
        },
        cache: false
    });


}



function chgCatPic(pid, pp_cat, cc){

// pid    - pictures id || id[].
// pp_cat - photo category
// cc     - control object.

// ReDrawing


    var cat=cc.value;
    if (Array.isArray(pid)){
        pid_a = pid;
    }
    else {
        pid_a =new Array();
        pid_a[0]=pid;
    }
    for(i=0;i<pid_a.length;i++) {
        pid_c=pid_a[i];
        var e=document.getElementById('wrap_aud_pic_'+pid_c);
        el=cc;

        k='ins_pic_wrap_geh_c_';
        if (el.id=='slct_c_0') {
            p_cat=0;
            setBtnSphBgColor(p_cat, false, pid_a.length);
            setBtnSphBgColor(cat,   true, pid_a.length);
        }
        while ((el = el.parentElement) && el!==null && el.id.indexOf(k)!==0);
        if (el!==null) {
            p_cat=el.id.slice(k.length);
            setBtnSphBgColor(p_cat, false, pid_a.length);
            setBtnSphBgColor(cat,   true, pid_a.length);
        }

        if(e!==null)document.getElementById("ins_pic_wrap_geh_c_"+cat).appendChild(e);
        document.getElementById('slct_p_'+pid_c).value=cc.value;
    }
}



function resetMultiSelect(el) {
    var picgroup = false;
        picgroup = true;
    if (picgroup) {
        var p = document.getElementsByClassName('pics_chkbox');
        for (i=0; i<p.length; i++) {
            p[i].checked=false;
        }
    }
}

function setBtnSphBgColor(pre_id, increase, ){
    var n=document.getElementById('btn_cat_cnt_'+pre_id).innerHTML*1;
    if (increase) {++n;} else {--n;}
        document.getElementById('btn_cat_cnt_'+pre_id).innerHTML=n;
               document.getElementById('btn_sph_'+pre_id).style.backgroundColor="#00bb00" ;
    if (n<2)  {document.getElementById('btn_sph_'+pre_id).style.backgroundColor="#ff0000";}
    if (n==0) {document.getElementById('btn_sph_'+pre_id).style.backgroundColor="#ff0000";}

}

// Отображение чекбоксов для картинок
function selectPics(cat){
    var y = document.getElementById('btn_sph_'+ cat);
    var p = document.getElementsByClassName('pics_chkbox_div');
    s=null;
    for (i=0; i<p.length; i++) {
        if (p[i]!=null && p[i]!='undefined') {
            if (s==null) {
                s=p[i].style.display;
                if (s=='none') {
                    s='';
                }
                else {
                    s='none';
                }
            }
            p[i].style.display=s;
            if (s=='none') {
                p[i].childNodes[0].checked =null;
            }
        }
    }
    document.getElementById('slct_c_'+cat).style.display=s;
    if (s=='none') {
        document.getElementById('slct_c_0').value=0;
    }
}

function getCheckedPics(cat){
    a=new Array();
    var p = document.getElementsByClassName('pics_chkbox');
    j=0;
    for (i=0; i<p.length; i++) {
        if (p[i]!=null && p[i]!='undefined' && p[i].checked==true) {
            a[j++]=p[i].id.slice(12);
        }
    }
    return a;
}

