//15Aug16 ko started\made

//SpeedDial Sac -- Move Dials to pos -- adjusting arr using Splice Method
//http://codepen.io/sahni4you/pen/WxPRaV?editors=1011

$("button#Move_dial").click(function(){
	console.time("button#Move_dial");

	$(this).attr("disabled", "true");

	//$("#Dial_pos_up_dn_msg").html("Wait... <br>(moving Dial + straightening)");

	//$("#Dial_pos_up_dn_msg").fadeIn();   //.delay(2000).text("Done!!").fadeOut();

	var Cat_name = $("li.selected").text();
	Cat_name = "Category__" + Cat_name;
				console.log( Cat_name );

	var Cat_ar = JSON.parse( localStorage.getItem(Cat_name) );
	var Cat_len = Cat_ar.length;
	//console.log( Cat_ar, Cat_ar.length );

	var new_pos = $("#input_no_2").val().trim();

	var pos_tobeMoved= $("#Dial_id_no").text().substr(3);     		//arr[3];

	move_pos_up();

	function move_pos_up() {
	                							//Moving pos3 to position 1  (Assuming positions to start from 0)
	    var arr_item_in_ques = Cat_ar[pos_tobeMoved];
	    console.log(new_pos, pos_tobeMoved, arr_item_in_ques);

	    Cat_ar.splice(pos_tobeMoved, 1);     //1 removed, at arr--pos tobeMoved.
	    Cat_ar.splice(new_pos, 0, arr_item_in_ques);	//Added at new pos

	    //console.log(Cat_ar);
	}

	//find which pos is smaller & straighten from there, as both pos are Moved\New & therefore, need straightening.
	/*if (new_pos<pos_tobeMoved){
		//straightening of Cat_ar after pos--Moved
		for(var i = new_pos-3; i<Cat_ar.length; i++){
			Cat_ar[i][0] = i;
		}
	}
	else{
		for(var i = pos_tobeMoved-3; i<Cat_ar.length; i++){
			Cat_ar[i][0] = i;
		}
	}*/
	console.timeEnd("button#Move_dial");
	for(var i = 1; i<Cat_len; i++){
			Cat_ar[i][0] = i;
	}
	console.timeEnd("button#Move_dial");

	//setTimeout(function(){
		//Saving changed Cat_ar to lStorage
	localStorage.setItem(Cat_name, JSON.stringify(Cat_ar)); 
	console.timeEnd("button#Move_dial");
	//}, 2000);

	/*setTimeout(function(){
		$("#btn_Reload_Category_by_li_click").click(); }, 3000);*/
	Refresh_Reload_Category(1000);
	this.innerHTML= "Moved";
	setTimeout(function(){
		$("button#Move_dial").removeAttr("disabled").html("Move dial");
	}, 1000);
	console.timeEnd("button#Move_dial");
	
	//setTimeout(function(){
		//$("#Dial_pos_up_dn_msg").text("Done!!") }, 1200);
		
	//$("#Dial_pos_up_dn_msg").html( "Wait... <br>(moving + straightening)" );
		
	//setTimeout(function(){ $("#Dial_pos_up_dn_msg").hide() }, 3000);


});