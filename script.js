$(document).ready(function(){
   $(".page2,.btn2").hide();
   $(".btn").click(function(){
       $(".page2,.btn2").show();
       $(".mainform,.pic,.upload,.btn").hide();
       $( "ul li:nth-child(2)" ).addClass('active');
    //   alert($(".droplan").val());
   });
   //drodown for language and checkboxes
   $(".droplan").html("");
       $.ajax({
       	url: 'initialize.json',
       	type: 'GET',
       	dataType: 'json',
        success:function(data){
        	for(var i=0;i<data.languages.length;i++){
        	 $(".droplan").append("<option>"+data.languages[i].name+"</option>");

        	}
        	for(var j=0;j<data.practicing_court.length;j++){
        	$(".pracarea").append("<label class=checkbox-inline><input type=checkbox name=cbox1 value="+data.practicing_court[j].name+">"+data.practicing_court[j].name+"</label>");
         }
         for(var k=0;k<data.categories.length;k++){
         	$(".praccourt").append("<label class=checkbox-inline><input type=checkbox name=cbox value="+data.categories[k].category+">"+data.categories[k].category+"</label>");
         }
     }
       });
      
    //posting data 
        var arr=[];
        var arr2=[]; 
    $(".btn2").click(function(){
    	$.each($("input[name='cbox']:checked"), function(){            
                arr.push($(this).val());
            });
    	$.each($("input[name='cbox1']:checked"), function(){            
                arr.push($(this).val());
            });
    	alert(arr); 
    
    	//location.reload();
    });
  
       var obj={
  "success": true,
  "lawyerObj": {
    "user_id":$("#enroll").val(),
    "about": $(".about").val(),
    "categories": arr,
    "services": [],
    "practicing_court": arr2,
    "languages": $(".droplan").val()
  }
};
var obj2=JSON.stringify(obj);
	$.ajax({
    type: 'POST',
    data: obj2,
    url: 'submit.json',
    success: function(data){
    },
    error: function(){
        // do something on error
    }
});
});