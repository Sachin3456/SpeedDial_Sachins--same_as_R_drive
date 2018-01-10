/*
$(document).ready(function () {

	var obj= {}; var obj_1= {}; var obj_2= {}; 
		// Load json values into textboxes.
		//load_json_values();
	} //End of ready fn

	function load_json_values() {


	} //End of load_json_values()


	// Save changed-textarea-values  to JSON
$('#btnSave').click(function () {
		/*
			for (var i=1; i<9; i++) { 				// i will start with 1, as, #txt_bm_1 is id of first textarea
			
			var textarea_val = $('#txt_bm_' + i).val();

			//if (textarea_val !== "") {
						obj["bm_"+i] = textarea_val;
			//} 			// End of if
	} 					// End of for--loop
	
	});


	// Save changed-textarea-values  to JSON
$('#btnSave_1').click(function () {

});










	$('#btnClear').click(function () {

		localStorage.removeItem("url");
		$('#txt_bm_1').val('');
		ShowSavedMessage();

	});	

function ShowSavedMessage(){

	$('#saved').fadeIn(150, function () {
		setTimeout(function(){
			$('#saved').fadeOut(700);
		}, 2000);	
	});

}

function ShowSavedMessage_1(){

	$('#saved_1').fadeIn(150, function () {
		setTimeout(function(){
			$('#saved_1').fadeOut(700);
		}, 2000);	
	});

}
*/


//---------- 23March16 ------ New array system Added below:
//https://www.kirupa.com/html5/storing_and_retrieving_an_array_from_local_storage.htm

function qs(x){
    return document.querySelector(x);
}
function qsa(x){
    return document.querySelectorAll(x);
}

	var Category_ar = [];	//global var

//This if is only for first-run, Install
if (localStorage["CategoryNames_arr"] === undefined){

	Category_ar = ["Home"];

	localStorage.setItem("CategoryNames_arr", JSON.stringify(Category_ar));

	console.log("key ---CategoryNames_arr--- created");
}

/*  this btn for Category add closed by me, on 9June16, Add again carefully reading-from Main_speedDial_page.js
$('#add_Category').click(function () {

	var temp_ar = JSON.parse( localStorage.getItem("CategoryNames_arr") );	
	console.log( temp_ar + " -- " + $('#input_add_Category').val() );
	var new_Category_Name = $('#input_add_Category').val();
	//console.log(temp);
	temp_ar.push( new_Category_Name );
	localStorage.setItem("CategoryNames_arr", JSON.stringify(temp_ar));
	var new_arr = []; 
	new_arr[0] = new_Category_Name.toString();
	localStorage.setItem( ("Category__" + new_Category_Name), JSON.stringify(new_arr) );
	console.log( temp_ar.length + " --- " + temp_ar );
});
*/
$('#edit_Name_Category').click(function () {

});	

$('#remove_Category').click(function () {
	//with confirmation box
});	




/* New for popup search feature , textarea Added, 9June16 */

function Load_Categories_for_Search(){
    var Category_ar_retrieved = JSON.parse( localStorage.getItem("CategoryNames_arr") );	
    console.log( Category_ar_retrieved );
    var arr = Category_ar_retrieved;

    for (var i=0; i<arr.length ;i++){

    //Add checkboxes & textarea for Category
    var span = $("<span/>").html( i + "&nbsp;" ).addClass( "span_no" );
    var chkbox = $('<input/>').attr({ "type": "checkbox", "id": "chkbox"+i , "marked": i,
                                    "class": "Select_a_Category" })
                .click(function() {
                    $("#div14_1").text( $('#div13 :checkbox:checked').length );
                    console.log( $('#div13 :checkbox:checked').length, "clicked checkbox -- checking" );
                });
    var ta = $("<textarea/>").text( arr[i] ).attr({ "id": "ta"+i, "cols": 40, "rows": 1, "disabled": "true" });
    //make alternate ta blue & red & grey,
    var br = $("<br>");
    
    $("#div13").append( span ).append( chkbox ).append( ta ).append( br );
    }  //End of for--loop


        /*  the below was working here on 8Feb17, when I found what the prob was.
            the click--handler was being attached to chkbox, even when it was created, programatically, by js, see the for--loop above.
            So, when I attached the below event-handler, from console, it was working. Also, it was working with setTimeout--in DOMContentLoaded, because setTimeout gave time for programatic creation of chkboxes.
            But, now even when this works ok here, below, tested on 8Feb17, I am attaching this handler, directly, in the for--loop, when chkbox is created.
            Also, the btn -- ("#how_many_checked_btn14") , I have closed in options.js & options.html, thru options.css -- display:none , not fully removing it. 
            I will remove it later.

            //the below not working, whereas, working in codepen & console--command
            //http://codepen.io/sahni4you/pen/Goaxov
            //solution found\clicked by\on me -- this event--handler, should be applied, after html is loaded.
            //solution date = 8Feb17
            //window.onload = function(){
            function onChekbox_clicked(){
                $('#div13 input:checkbox').click(function() {
                    $("#div14_1").text( $('#div13 :checkbox:checked').length );
                    console.log( $('#div13 :checkbox:checked').length, "clicked checkbox -- checking" );
                    //console.log("clicked checkbox -- checking");
                }); 
            }
            onChekbox_clicked();
            document.getElementById("how_many_checked_btn14").onclick = function(){
                $("#div14_1").text( $('#div13 :checkbox:checked').length );
            }     */



    /*   .filter() | jQuery API Documentation
         http://api.jquery.com/filter/    */
    $("#div13 textarea:even" ).css( "background-color", "orange" );  //$("#div13 textarea").filter( ":even" ).css also gives the same results
    //$("#div13 textarea:odd" ).css( "background-color", "rgba(0, 240, 0, 0.1)" );

    document.getElementById("Save_Category_GroupName_btn14").onclick = function(){Save_Category_Name()};

        
        /*  Set checkbox easily, Get value of all :checked in a div, 22Feb16
            http://codepen.io/sahni4you/pen/XXLYvO?editors=1010    
                        Checkbox checked -- get Value of All contained in a div
                        http://codepen.io/sahni4you/pen/Goaxov?editors=0010    */
    function Save_Category_Name(){
        var Category_GroupNames_sub_arr = [];
        var cnt = 0;
        $('#div13 :checkbox:checked').each(function(index, value) { 
            var No = $(this).attr('marked');
            Category_GroupNames_sub_arr.push( $("#ta"+No).val() );
            cnt++;
        });
        console.log( Category_GroupNames_sub_arr );
        $("#div14_1").text( cnt );
                                            //var Category_GroupNames_arr = [];  //temp use getItem
        var Category_GroupNames_arr = JSON.parse( localStorage.getItem("Category_GroupNames_arr") );

        var Cat_Name = $("#ta_Category_GroupName").val().trim();
        if (Cat_Name.trim().length===0) { alert("textarea empty,\ntype-in a Category_Group Name\n you want to save & \ntry again"); skip; }
        if (Category_GroupNames_sub_arr.length===0) { alert("No checkbox checked,\nfirst check some &\ntry again"); skip; }
        var New_arr = [];
        New_arr[0] = Cat_Name;
        New_arr[1] = Category_GroupNames_sub_arr;
        Category_GroupNames_arr.push( New_arr );
                            console.log( Category_GroupNames_arr );
        localStorage.setItem("Category_GroupNames_arr", JSON.stringify( Category_GroupNames_arr ));

        $("#div14_2").fadeIn();
    }  //End of func Save_Category_Name()

}   //End of func Categories_for_Search()

function Load_Category_Groups_on_options_page_Open(){

    var Category_GroupNames__arr = JSON.parse( localStorage.getItem("Category_GroupNames_arr") );
    var ar = Category_GroupNames__arr;
    $("#h4_in_div15__1 span").append( ar.length );

    for (var i=0; i<ar.length ;i++){
            var containing_div = $("<div/>").attr({ "id": "contain"+i }).addClass("containing_div");
            var chkbox = $('<input/>').attr({ "type": "checkbox", "id": "chkbox"+i,
                                                         "marked": i, "class": "Active_Groups" })
                                            .css({ "width": "22px", "height": "22px" });  //.class css did not work, as in css rule for  input[type="checkbox"] is 16px, which cancels .class-rule of 28px, so used .css javascript here.
            var h4 = $("<h4/>").text( ar[i][0] ).addClass("h4_Cat_GroupName");
            var span_1 = $("<span/>").text( "#"+i ).addClass("span__serial_No_in__Category_GroupNames_arr");
            var ar_item_1 = ar[i][1];
            var span = $("<span/>").text( ar_item_1.length ).addClass("ar_len__No_of_items");
            $(h4).append( span_1 ).append( span );
            $(containing_div).append( h4 );
            
        for (var m=0; m<ar_item_1.length ;m++){
            var li = $("<li/>").text( ar_item_1[m] ).addClass("li_Cat_GroupNames");
            $(containing_div).append( li );
        }  //End of for--loop
        $(containing_div).append( chkbox );
        $("#div15_2").append( containing_div );
    }  //End of for--loop

    //Part2 -- check Active checkboxes, from Active_arr
    var Cat_GroupNames_Active_arr = JSON.parse( localStorage.getItem("Cat_GroupNames_Active_arr") );

    $("#All_Active_Categories_count span").text( Cat_GroupNames_Active_arr[1].length );

    Cat_GroupNames_Active_arr[0].forEach(function(item,index) {

                                            //document.getElementById("myCheck").checked = true;
        $("input#chkbox"+item+".Active_Groups").prop( 'checked', true );
        //Note: the selector  $("input#chkbox0.Active_Groups") -- I took from chrome Elements panel, when checkbox selected\Inspect--el

        //Added later on 23July16   -- this is optional, just changing css of selected--groups.
        //$("#contain"+item).css({"background-color": "rgba(0, 240, 0, 0.3)"});  this also works, but I have used Plain Javascript 'csstext' & querySelector, as newDoing\better instead.
        var csstxt = "background-color: rgba(255, 192, 203, 0.3); padding-top: 1px; ";  //rgb(255, 192, 203) is pink. So pink with 0.2 opacity. Other alternative lightcoral.
        csstxt += "border: 2px solid orange; "
        document.querySelector("#contain"+item).style.cssText = csstxt;
    });


}  //End of func Load_Category_Groups_on_options_page_Open()

$("#delete_Group").one("click", function(){

    $(this).attr("disabled", "true");

    var Category__GroupNames_arr = JSON.parse( localStorage.getItem("Category_GroupNames_arr") );
    var arrr = Category__GroupNames_arr;
                                    //var chkbox_no = $("")
    //Add checkboxes, for deletion
    for (var i=0; i<arrr.length ;i++){
        var chkbox = $('<input/>').attr({ "type": "checkbox", "id": "chkboxx"+i,
                                                    "marked": i, "class": "chkbox_delete_Groups"})
                                  .css({ "width": "28px", "height": "28px" });  //.class css did not work, as in css rule for  input[type="checkbox"] is 16px, which cancels .class-rule of 28px, so used .css javascript here.
        $("#contain"+i).append( chkbox );
        $("#contain"+i+" #chkbox"+i).attr({ "disabled": "true" });
    }  //End of for--loop

    $("#delete_Groups___checked_ones").removeAttr( "disabled" );
    
 
});    //End of  ("delete_Group").onclick


$("#delete_Groups___checked_ones").one("click", function(){

        var delete_arr = [];
    $('#div15_2 .chkbox_delete_Groups:checkbox:checked').each(function(index, value) { 
            var No = $(this).attr('marked');
            delete_arr.push( No );
                    //console.log( No );
    });

    var Cat__GroupNames_arr = JSON.parse( localStorage.getItem("Category_GroupNames_arr") );

    //sort numbers first in descending order  http://www.w3schools.com/jsref/jsref_sort.asp
    delete_arr.sort(function(a, b){return b-a});  
    console.log( delete_arr );

    delete_arr.forEach(function(item,index) {
        Cat__GroupNames_arr.splice(item, 1);     //At position item, remove 1 item, i.e., the item itself
    });
    console.log( Cat__GroupNames_arr );

    localStorage.setItem("Category_GroupNames_arr", JSON.stringify( Cat__GroupNames_arr ));

    $("#delete_Group__checked").attr({ "disabled": "true" });
    $("#div15_3_deleted__Reload").fadeIn();

});    //End of  $("#delete_Group__checked").one("click")


document.getElementById("Save_Active_Groups").onclick = function(){
    
    //Step1  -- checkboxes Nos -- into arr
        var save_active_arr = [];
    $('#div15_2 .Active_Groups:checkbox:checked').each(function(index, value) { 
            var No = $(this).attr('marked');
            save_active_arr.push( No );
                    console.log( No );
    });

    //Step2  -- remove Duplicate items, after concat
    var Cat_GroupNames_arr = JSON.parse( localStorage.getItem("Category_GroupNames_arr") );

        var Active_items_only_arr = [];
        save_active_arr.forEach(function(item,index) {
            Active_items_only_arr.push( Cat_GroupNames_arr[item][1] );
        });
    console.log( Active_items_only_arr );

    var flatten = [].concat.apply( [], Active_items_only_arr );
    console.log ( flatten, " -- flattened thru concat" );

    var arr_no_dup = flatten.filter(function (item, pos) {return flatten.indexOf(item) == pos});
    console.log( arr_no_dup );

    $("#All_Active_Categories_count span").text( arr_no_dup.length );
    $("#All_Active_Categories_count span").delay(1700).animate({fontSize: '2em'}, 1500)
           .delay(5500).animate({fontSize: '1em'}, 1500);

    var final_arr_no_dup_Cat_items_to_Save = [];
    final_arr_no_dup_Cat_items_to_Save[0] = save_active_arr;
    final_arr_no_dup_Cat_items_to_Save[1] = arr_no_dup;
        console.log( final_arr_no_dup_Cat_items_to_Save );

    //Step3
    localStorage.setItem("Cat_GroupNames_Active_arr", JSON.stringify( final_arr_no_dup_Cat_items_to_Save ));

    $("#Saved_Active_Groups_msg_show__div15_4").fadeIn().delay(3500).fadeOut(); 
}    




/* id --->> 'ul_CategoryNames_options_page'  made sortable ke liye code, 21June16 */

//The below func taken as it is from popup.js & changes made for options-page &
// Making it sortable & save\update back to lStorage
function Load_All_Categories_Into_ul_CategoryNames_options_page() {
    var Category_ar_retrieved = JSON.parse( localStorage.getItem("CategoryNames_arr") );

    var ul = "";    var mylist = "";
    Category_ar_retrieved.forEach(function(item,index) {
                                              //res += item + " &nbsp;&nbsp;--- fruits -- " + index + "<br>";
        mylist = $("<li />").html( item ).attr("id", "li"+index).addClass("myListClass_1")
            /*.click(function(e) {      //Remember (e) -- is very Imp! & forgotten often
                if (e.ctrlKey || e.metaKey) {
                    $(this).toggleClass("selected");
                } else {
                    $(this).addClass("selected").siblings().removeClass("selected");
                }  //End of if
                //$("#selected_li_count").html( $(".selected").length );
                //$("#Names_of_Categories_selected_in_ul").text( $("#ul_CategoryNames li.selected").text() );
            }); //End of .click func*/
                                        //.click(function() { $(this).css("background-color", "#ddd")   });
        $("#ul_CategoryNames_options_page").append( mylist );
        // The below is now done, using func Load_Settings(), which Loads the last .selected from obj_Settings
        //$("#li0").addClass("selected");    //Select the first li on load from Category_arr
    });
    //console.log( mylist );
    $("#ul_CategoryNames_options_page li:first-child").addClass("selected");  //.eq(0) also works //selecting first li on options page open\load
    //$("#ul_CategoryNames").html( mylist );    //gives an object as shown in console, how to get the [0],[1]... of that object ?? find


    $("#ul_CategoryNames_options_page").resizable();
    $("#ul_CategoryNames_options_page").multisortable({placeholder: "ui_list_placeholder"});
                    //revert: true  works only when single li moved, when multiple 
                    //selected & moved, it sorts\moves only 1 & other li do not show-up in their place.  margin-padding may be is disturbed.


/* This Code was working & ul was sortable & textarea getting updated, but 
   removed by me, because I used multisortable.js
   http://jsfiddle.net/sahni4you/53thuhs9/1/
  //$("#ul_CategoryNames_options_page").resizable();  // .sortable( "toArray" ); gives 3 more empty items , arr.length increases by 3 in the end of arr

  // below is for making ul Sortable & its update--to--array  //
  // Taken from http://jqueryui.com/sortable/
  //                 http://codepen.io/sahni4you/pen/QNQPee
  //$(function() {
                            var cnt = 0; var ct = 0;
                //ui_list_placeholder is a Class, see in CSS
    $("#ul_CategoryNames_options_page").sortable({placeholder: "ui_list_placeholder",

                          update: function( event, ui ) {
                            var sortedIDs = $("#ul_CategoryNames_options_page").sortable( "toArray" );
                            ct++;
                            $("textarea#ul_CategoryNames_Sortable_update").val(sortedIDs + "<br>" + ct );  
                            console.log( sortedIDs, sortedIDs.length );
                          }
                          
    }); 
  //});    
*/

}   //End of func Load_All_Categories_Into_ul_CategoryNames()


$("button#Save_ul_li").one("click", function(){    
    arr =[];
    $("#ul_CategoryNames_options_page li").each(function(){

         arr.push( $(this).text() );
    });
    $("button#Save_ul_li").attr("disabled", "true");
    console.log( arr, arr.length );
    localStorage.setItem("CategoryNames_arr", JSON.stringify( arr ));

    $("#div16_ul_Saved").fadeIn(); 
});    



/*  End of    id --->> 'ul_CategoryNames_options_page'   ke liye code */


//The below chkbox is used by popup.html-.js
document.getElementById("show__Categories_not_found__in_popup").onchange = function() {
    var obj_Settings = JSON.parse(localStorage.getItem("obj_Settings"));

    if (this.checked) { 
        //console.log("checked");
        obj_Settings["show__Categories_not_found__in_popup"] = true;
    }
    else {
        //console.log("not--checked");
        obj_Settings["show__Categories_not_found__in_popup"] = false;
    }

    localStorage.setItem("obj_Settings", JSON.stringify( obj_Settings ) );
};
function Load_Settings__on_Options_page_Open() {
    var obj_Settings = JSON.parse(localStorage.getItem("obj_Settings"));
    var chkbox_checked = obj_Settings["show__Categories_not_found__in_popup"];

    var the_chkbox = document.getElementById("show__Categories_not_found__in_popup");
    if (chkbox_checked == true) { the_chkbox.checked = true }
    else { the_chkbox.checked = false }
}

document.addEventListener('DOMContentLoaded', function () {
    scrollTo(0,50);
    setTimeout(Load_Categories_for_Search, 200);
    Load_Category_Groups_on_options_page_Open();
    Load_All_Categories_Into_ul_CategoryNames_options_page();
    //below func Added on 16Sep16
    Load_Settings__on_Options_page_Open();
    //Note: the below did not work, without setTimeout, even when I tried with window.onload
    //setTimeout(onChekbox_clicked, 500);
});
