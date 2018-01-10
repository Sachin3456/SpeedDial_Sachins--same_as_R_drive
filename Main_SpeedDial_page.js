function qs(x){  return document.querySelector(x);    }
function qsa(x){ return document.querySelectorAll(x); }
function gid(x){ return document.getElementById(x);   }

//---------- 23March16 ------ New array system Added below:
//https://www.kirupa.com/html5/storing_and_retrieving_an_array_from_local_storage.htm

    var Category_ar = [];   //global var

if (localStorage["CategoryNames_arr"] === undefined){

Category_ar = ["Home"];

localStorage.setItem("CategoryNames_arr", JSON.stringify(Category_ar));

console.log("key ---CategoryNames_arr--- created");
}

//not used yet
var arr_first_item = [[0,"title","url","img_Name","Notes","tags","Date entered"]];

$('#Add_Category_chkbox').on('change', function () {            //http://codepen.io/sahni4you/pen/Goaxov?editors=0010
    //console.log( "checkbox changed");
    $('#Add_Category_text_div').show().addClass("Add_category_clicked");
    $("#CategoryName_Add-Edit_div_on_left_side").addClass("Add_category_clicked")
        .css({ border: "10px solid gold", top: "-=70px" });  //border property, does not get changed thru addClass, So used Javascript. -->> border: 10px solid gold -- is in the Class Added, see "Main_SpeedDial_page.css"
    
    if (!this.checked) { 
        console.log("#Add_Category_chkbox is unchecked"); 
        $('#Add_Category_text_div').fadeOut();
        $("#CategoryName_Add-Edit_div_on_left_side").removeClass()
            .css({ border: "", top: "+=70px" });
    }
});

$('#Add_Category_cancel').click(function () {
    $('#Add_Category_text_div').fadeOut();
    $('#Add_Category_chkbox').prop('checked', false);

    $("#CategoryName_Add-Edit_div_on_left_side").removeClass()
            .css({ border: "", top: "+=70px" });  //border property, does not get changed thru addClass, So used Javascript. -->> border: 10px solid gold -- is in the Class Added, see "Main_SpeedDial_page.css"
}); 

$('#Add_Category_ok').click(function () {
    var Category_ar_retrieved = JSON.parse( localStorage.getItem("CategoryNames_arr") );    
    console.log( Category_ar_retrieved + " -- " + $('#Add_Category_input_text').val() );

    var new_Category_Name = $('#Add_Category_input_text').val().trim();
    var t = Category_ar_retrieved.indexOf(new_Category_Name);

    if (t!==-1){ //alert("this Category Name already exists, make some different");
        $('#Cat_Already_exists').fadeIn().delay(3000).fadeOut(); }
    else{   
        Category_ar_retrieved.push( new_Category_Name );
        localStorage.setItem("CategoryNames_arr", JSON.stringify(Category_ar_retrieved) );

        var new_Category_Name_with_Prefix = "Category__" + new_Category_Name;
        var new_arr = [[0,"title","url","img_Name","Notes","tags","Date entered"]];

        localStorage.setItem( new_Category_Name_with_Prefix, JSON.stringify(new_arr) );
        console.log( new_Category_Name_with_Prefix + " --- added to CategoryNames_arr" );

        $('#Success_Cat_Created').fadeIn().delay(3000).fadeOut();
        $('#Add_Category_text_div').delay(3000).fadeOut();
        $('#Add_Category_chkbox').prop('checked', false);
    }
    //$('#Add_Category_text_div').fadeOut();
    //$('#Add_Category_chkbox').prop('checked', false);
}); 

$('#edit_Name_Category').click(function () {

}); 

$('#remove_Category').click(function () {
    //with confirmation box
}); 


    

        /* http://www.w3schools.com/jsref/coll_select_options.asp 
           http://codepen.io/sahni4you/pen/QNQPee  
           Taken\Copied as it is from popup.js  */
function Load_All_Categories_Into_ul_CategoryNames() {
    var Category_ar_retrieved = JSON.parse( localStorage.getItem("CategoryNames_arr") );

    Category_ar_retrieved.forEach(function(item,index) {
                                              //res += item + " &nbsp;&nbsp;--- fruits -- " + index + "<br>";
        var li = $("<li />").html( item ).attr("id", "li"+index).addClass("myListClass")
            .click(function() {      //Remember (e) -- is very Imp! & forgotten often

                    $(this).addClass("selected").siblings().removeClass("selected").removeClass("selected_2");

                    var t = $("li.selected")[0].id;
                    if ( $("#"+t).attr("class") === "myListClass selected" ) { 
                        $("#"+t).addClass("selected_2");
                        /*console.log("true, class of selected--li is -- 'myListClass selected' ",
                            "\nSo, changing 'color' from white--given--by--.selected to #333" );
                        $("#"+t).css({"color": "#333", "background-color": "hsl(0, 0%, 88%)", "text-shadow": "0 0 2px goldenrod" });*/
                    };

                    //--- function show_CatName  --- when kept a function, does not work, may-be they are stopping
                                                        //addClass is not working, find ?
                                                    //$("#Show_CategoryName_1").addClass("Show_CategoryName_1__at_top_100px");
                        $("#Show_CategoryName_1").css("top", "100px");
                        $("#Show_CategoryName_1").text( $(this).text() ).fadeIn("fast").delay(3000)
                            .fadeOut(function(){    //this is callback func of fadeOut, once fadeOut is complete, it will do its work, written below, i.e., change css
                                                    /* jQuery Effect fadeOut() Method
                                                    http://www.w3schools.com/jquery/eff_fadeout.asp
                                                    See, "Using the callback parameter" on above page  */
                                $("#Show_CategoryName_1").css("top", "20px")
                            });  //Default is 400, fast is 200.
                                                        //setTimeout also works, but callback on fadeOut is better.    
                                                        //setTimeout(function(){ $("#Show_CategoryName_1").css("top", "20px") }, 5000);   //Note: if 3300 is kept, it moves it to pos top:20px just before it hides.
                    //End of --- function show_CatName ---

                    //hide on Cat--change, which happens on li.click
                    $("#Edit_Dial_dialog_box").hide();

                    Load_Category_arr( $(this).text() ); // this func loads all-dials, into '#main_container_div'
                    /*  this Closed on 13May17
                    // After loading dials, i.e., their html & some events--also, Attach more--events.
                    if ($(this).text().startsWith("youtube good") || $(this).text().startsWith("youtube download pending!!, passed")){
                        setTimeout(Attach_events, 2000);  // this is just contextmenu events.
                    }*/

                    tags_on_off_thru_checkbox___when_an_li_is_clicked_for_Load_in___ul_CategoryNames_1();

                    //Save li.selected to lStorage, So, that it can be loaded on Main_Speed_Dial--page Reload & F5, thru func 'Load_Settings__on_Ext_page_load()'
                    var obj_MSDial_Settings = JSON.parse(localStorage.getItem("obj_Main_Speed_Dial_Settings"));
                    obj_MSDial_Settings["last__li_selected_text-Name"] = $(this).text();
                    obj_MSDial_Settings["last__li_selected_id"] = this.id;    //$(this).attr("id")
                    localStorage.setItem("obj_Main_Speed_Dial_Settings", JSON.stringify( obj_MSDial_Settings ) );
                    console.log($(this).text(), this.id );
                    
                //$("#selected_li_count").html( $(".selected").length );
            }); //End of  li.click func
                                        //.click(function() { $(this).css("background-color", "#ddd")   });
        $("#ul_CategoryNames_1").append( li );

    }); //End of forEach


                    //ui_list_placeholder is a Class, see in CSS
    //$( "#ul_CategoryNames" ).sortable({placeholder: "ui_list_placeholder"});     
}   //End of func Load_All_Categories_Into_ul_CategoryNames()


function indexOf_item_0( item, array_name ) {
  for(var i=0;i<array_name.length;i++) {
    //console.log( array_name[i][0] + " -- " + item );
    if (array_name[i][0] == item) { return i+1 }
    
    //console.log( typeof array_name[i][0] + " -- " + typeof item );
  }
  return -1
}


function tags_on_off_thru_checkbox___when_an_li_is_clicked_for_Load_in___ul_CategoryNames_1() {
    //Sub--supporting func for func Load_All_Categories_Into_ul_CategoryNames()

            var obj_MSDial_Settings = JSON.parse(localStorage.getItem("obj_Main_Speed_Dial_Settings"));  //retrieved settings only once to use in for--loop
                 // thru "obj_Main_Speed_Dial_Settings"--key  , tags to display on pageLoad or not
                //var obj_Main_Speed_Dial_Settings = JSON.parse(localStorage.getItem("obj_Main_Speed_Dial_Settings"));  //retrieved settings only once to use in for--loop
    
                if (obj_MSDial_Settings.tags_on_off_checkbox == true) {
                    $(".tags").addClass("display_block");
                    console.log("chkbox tags true means 'checked' ");  // + " -- " + i
                    //$(".main_container_ke_sub_divs").css("height", "297");   //tags height is 21 at this time 298-21-2 for borders=275
                    $(".main_container_ke_sub_divs").addClass("height_when_tags_displayed");  // ".height_when_tags_displayed" has height 276
                }
                //when  ( == false) , ".main_container_ke_sub_divs" Class will work,  (no Class will be added\Removed)
                //                    which has height 255

                //if (document.getElementById("Notes_on_off_checkbox").checked == true) {   //this also works, however I used lStorage
                if (obj_MSDial_Settings.Notes_on_off_checkbox == true) {
                    $(".slide_up_divs__desc_Notes").addClass("display_block");
                    console.log("chkbox Notes true means 'checked' -- .display_block added, Notes will be shown");
                    //$(".main_container_ke_sub_divs").css("height", "297");
                    $(".main_container_ke_sub_divs").addClass("height_and_margin_when_Notes_displayed");
                }    
}   //End of func             


//below new func Added on 18Sep16 & Closed Also. Check for its operation, before Starting
/*
function Refresh_Reload_Category() {
    //Note: This is not F5, i.e., extension Main_page Reload, just equivalent --to-- li.click
    //F5 is  location.reload();  -- tab Refresh

    var len_before_Refresh = $("#CategoryName_heading_div_on_left_side #Cat_len").text(); 

    var CategoryName_from__ul = $("#ul_CategoryNames_1 li.selected").text(); 
    //Reload of li--Category  
    Load_Category_arr( CategoryName_from__ul );

    var full_CatName_from__ul = "Category__" + CategoryName_from__ul;
    var Cat_ar_retrieved = JSON.parse( localStorage.getItem(full_CatName_from__ul) );
    var new_len = Cat_ar_retrieved.length-1;    //as first [0] item in array is never used.
    var change_of_len = new_len - len_before_Refresh;
            console.log( len_before_Refresh +"\n", new_len );
    $("#CategoryName_heading_div_on_left_side span").text( change_of_len );


}    
*/


var ar_of_id_no = [];   //Global
var div_id = "";        //Global

                            
                            /* testing arr Load temporary , 17April16   Category__checko_delete */
// how the below func works, in words.                            
// the below is the main func. It loads dials in "#main_container_div", with classes.  Simple 2 Steps, in the big--code func.
// Step1 -- which class will be applied, depends-upon 'localStorage.No_of_Dials__string'
//    So, in the beginning it first reads this lStorage--key & decides a class, in a var.
//    that var is attached to dials, when dynamic createElement is done.
// Step2 -- 'some_arrName_as_String_passed' gives the Cat_name, which will be retrived from lStorage & looped for createElement.
//    Step2.1 -- .onclick for 'Edit_div' & 'delete_div'  ,  is also done, with createElement.
//    the dial has 5-6 el, which make the dial. only the above 2 el(divs) have onclick events.
function Load_Category_arr(some_arrName_as_String_passed) {  //thru li.onclick func above
    //var Category_ar_retrieved = JSON.parse( localStorage.getItem("Category__checko_delete") );

    var Category_from_ul = "Category__" + some_arrName_as_String_passed;
    //console.log(some_arrName_as_String_passed + " -- " + typeof some_arrName_as_String_passed );
    var Category_ar_retrieved = JSON.parse( localStorage.getItem(Category_from_ul) );

    var ar = Category_ar_retrieved;

    //Imp! checkpoint #1 console.log(Category_from_ul + " -- \n", ar, "\n ar.length : -- " + ar.length);

    //console.log( some_arrName_as_String_passed + " -- " + typeof some_arrName_as_String_passed );

    //console.log( "Category length: " + Category_ar_retrieved.length );

    //skip();

    $("#main_container_div").empty();

    var len_on_initial_Dials_Load = ar.length-1;    //as first [0] item in array is never used.
    $("#CategoryName_heading_div_on_left_side #Cat_len").text( len_on_initial_Dials_Load ); //Category_from_ul + "<br>" + 

    var arr_of_id_no = [];

    //before Dials are Added, class is decided for All Dials -------- starts here ---------------
    var No_of_Dials__str = localStorage.No_of_Dials__string;
    //Default No. of Dials -- 4     the below 4 classes, in 4 var, are default.
        var class_for__main_container_ke_sub_divs = "main_container_ke_sub_divs"; //string
    
        var class_for__img_container_divs = "img_container_divs";
                        
        var class_for__title_of_dials = "title_of_dials";

        var class_for__sub_div_Count_Nos = "sub_div_Count_Nos";

    if (No_of_Dials__str == 4) { //almost do nothing;
        console.log("4 Dials -- from lStorage"); 
        gid("4_Dials_checkbox").checked = true;  //#4_Dials_checkbox is radio, not chkbox
    }

        // this '1_Dial_only'--class--group Added on 24May17
        // only for this class--group , js is also added.  See, in for--loop, just after these ifs
    if (No_of_Dials__str == 1) { console.log("1_Dial_only -- from lStorage"); 

        gid("1_Dial_only").checked = true;  //#3_Dials_checkbox is radio, not chkbox

        class_for__main_container_ke_sub_divs = "main_container_ke_sub_divs main_container_ke_sub_divs__1_Dial_only"; //string
    
        class_for__img_container_divs = "img_container_divs img_container_divs__1_Dial_only";
                        
        class_for__title_of_dials = "title_of_dials title_of_dials__1_Dial_only";
    } //End of if -- 1_Dial_only

    if (No_of_Dials__str == 3) { console.log("3 Dials -- from lStorage"); 

        gid("3_Dials_checkbox").checked = true;  //#3_Dials_checkbox is radio, not chkbox

        class_for__main_container_ke_sub_divs = "main_container_ke_sub_divs main_container_ke_sub_divs__3_Dials"; //string
    
        class_for__img_container_divs = "img_container_divs img_container_divs__3_Dials";
                        
        class_for__title_of_dials = "title_of_dials title_of_dials__3_Dials";
    } //End of if -- 3Dials


    if (No_of_Dials__str == 5) { console.log("5 Dials -- from lStorage"); 

        gid("5_Dials_checkbox").checked = true;  //#5_Dials_checkbox is radio, not chkbox

        class_for__main_container_ke_sub_divs = "main_container_ke_sub_divs main_container_ke_sub_divs__5_Dials"; //string
    
        class_for__img_container_divs = "img_container_divs img_container_divs__5_Dials";
                        
        class_for__title_of_dials = "title_of_dials title_of_dials__5_Dials";

        class_for__sub_div_Count_Nos = "sub_div_Count_Nos sub_div_Count_Nos__5_Dials";
    } //End of if -- 5Dials


    if (No_of_Dials__str == 6) { console.log("6 Dials -- from lStorage"); 

        gid("6_Dials_checkbox").checked = true;  //#6_Dials_checkbox is radio, not chkbox

        class_for__main_container_ke_sub_divs = "main_container_ke_sub_divs main_container_ke_sub_divs__6_Dials"; //string
    
        class_for__img_container_divs = "img_container_divs img_container_divs__6_Dials";
                        
        class_for__title_of_dials = "title_of_dials title_of_dials__6_Dials";

        class_for__sub_div_Count_Nos = "sub_div_Count_Nos sub_div_Count_Nos__6_Dials";
    } //End of if -- 6Dials
    //before Dials are Added, class is decided for All Dials -------- ends here ---------------

    for (var i=1; i<ar.length ;i++) { 

    //Category_ar_retrieved[i].         //forEach(function(item,index) {
        
        var sub_divs =                  $("<div />").attr({"id": "main_container_ka_sub_div_"+ar[i][0], "id_no": ar[i][0] }).addClass(class_for__main_container_ke_sub_divs);
        var sub_div_Count_No =          $("<div />").attr({"id": "sub_div_Count_No_"+ar[i][0], "id_no": ar[i][0] }).addClass(class_for__sub_div_Count_Nos).text( ar[i][0] );
        var img_container =             $("<div />").attr("id", "img_container_"+ar[i][0]).addClass(class_for__img_container_divs);
        var a_link =                      $("<a />").attr("href", ar[i][2] ).attr("id", "href_"+ar[i][0]).addClass("href_for_sub_divs");
        var img =                       $("<img />").attr({"src": "images/"+ar[i][3], "title": ar[i][3], "id": "img_"+ar[i][0], class: "img_in_sub_divs img_filter_class" });
                                        //if (gid("decide_img_filter").checked==true){ img.addClass("img_filter_class");  }

        var title_txt = ar[i][1];
            if (some_arrName_as_String_passed.startsWith("youtube good") || some_arrName_as_String_passed.indexOf("passed") != -1){
                if ( title_txt.startsWith("hd pending ") ) {
                    // Note: if this condition is not given, even "hd pending " is prepended with span.
                    title_txt = ar[i][1].substr(10);   //11-1= 10
                    title_txt = "<span class='saved_on_hard_drive__pending'>hd pending </span>" + title_txt;
                }
                else if ( title_txt.startsWith("hd ") ) {
                    title_txt = ar[i][1].substr(2);     // 3-1= 2
                    title_txt = "<span class='saved_on_hard_drive'>hd </span>" + title_txt;
                    //title_of_dials.addClass("saved_on_hard_drive");  
                }

                if ( title_txt.indexOf("pending watching") != -1 ) {
                    var span_9 = "<span class='pending_watching_in_title'>&copysr; pending watching</span>";
                    title_txt = title_txt.replace("pending watching", span_9);
                }

                // the below is a separate if
                if ( title_txt.slice(-9)== "(explore)" ){
                                    // this div is absolutely placed, better than span or :before options, i tried both before this
                    title_txt = "<div class='explore_more_on_this_tab' " +
                                "title='explore more_on_this_tab\n\nTo add this E on a Tab,\n write (explore) @End_of_title'>E</div>" + title_txt.slice(0,-9);

                }
            }
        var title_of_dials =     $("<div />").html( title_txt ).attr("id", "title_"+ar[i][0]).addClass(class_for__title_of_dials);

        //27Aug16 -- dials with Notes are given 3px solid border-bottom, for Notice
                //if ( ar[i][4] !== "") { $("#title_"+ar[i][0]).addClass("Notes_are_present") }  Note: this was working ok, till 25May17
        if ( ar[i][4] !== "") { title_of_dials.addClass("Notes_are_present");  }

        /*
        // Idea cancelled on 13May17
        // g_drive class -- 24March17  -- tags wala dial-space, used for contextmenu
            var g_drive = ar[i][5];
            if (some_arrName_as_String_passed.startsWith("youtube good") || some_arrName_as_String_passed.startsWith("youtube download pending!!, passed")){
                if (g_drive=="") {}//do nothing
                else{ title_of_dials.addClass("saved_only_on_google_drive");  }
            }*/

        //tags Closed 27Aug16 forever
        //var tags =                      $("<div />").html( ar[i][5] ).attr("id", "tag_"+ar[i][0]).addClass("tags");

            // js for  '1_dial_only'  class--group     || Added this on 24May17, with '1_dial_only'  class--group
        if ( No_of_Dials__str == 1){
            var url_txt = ar[i][2];
            var url_from_lStorage = $("<div />").html( url_txt ).attr({ id: "url_from_lStorage_"+ar[i][0] });

            if ( url_txt.length < 130 ){ url_from_lStorage.attr({ class: "url_from_lStorage__divs less_characters" });   } //normal case, .less_characters makes font-weight: bold;
            else { url_from_lStorage.attr({ class: "url_from_lStorage__divs" });  }  //more than 130 characters, .less_characters is not there, So, font-weight: automatically becomes normal;  , but :hover gives it font-weight: bold;
        }
        
        var slide_up_divs__desc_Notes = $("<div />").html( ar[i][4] ).attr("id", "desc_Notes_"+ar[i][0]).addClass("slide_up_divs__desc_Notes");

        var Edit_div =                  $("<div />").html("E").attr("id", "Edit_div_"+ar[i][0]).addClass("Edit_div")
                                        .click( function() {  //Edit_Dial()
                                                Refresh_Reload_Category(500);
                                                $("button#Move_current_dial, #Copy_current_dial, #Edit_Modify_btn, #Move_dial").removeAttr("disabled");
                                                $("button#Move_current_dial").html( "Move<br>item" );

                                                //$(this).parent().css({ outline: "4px solid blue" }); is not working ??
                                                div_id = $(this).parent().attr("id");  //div_id is Global var
                                                $("#"+div_id).css({ outline: "4px solid rgb(0,0,243)", "outline-offset": "17px" });
                                                //console.log( this.id, $(this).parent().attr("id") );

                                                var id_no = $(this).parent().attr("id_no"); 
                                                console.log( "attr 'id_no' of parent-sub-divs -- ", id_no );
                                                ar_of_id_no.push( id_no );
                                                Edit_Dial_full_l();
                                            }); 
/* 
    //pending
    //Use $("#ul_CategoryNames_1 li.selected").text(); -- to get the Category--Name & separate this .click func

    //Part1 -- Retrieve array--text from Category_ar_retrieved, & show in "#Edit_Dial_dialog_box"
    var id = $(this).parent().attr("id");
    console.log( $(this).attr("id") + "\n" +  id );

    $("#Edit_Dial_dialog_box").show().draggable();

    var m = id.lastIndexOf("_");
    var id_no = id.substr(m+1);  //right-most no.
    console.log( id + " -- " + id_no);

    var t = indexOf_item_0( id_no, Category_ar_retrieved );
    console.log( t + " -- means " + t + "th item starting from 1 will be spliced -- index starts from 1, not 0, -- func indexOf_item_0" );
    var arr_item = Category_ar_retrieved[t-1];
    $("#Edit_Dial_dialog_box span#Dial_serial_no").html( t-1 ); 
    $("#Edit_Dial_dialog_box span#Dial_id_no").html( "id -" + arr_item[0] );
    $("#Edit_Dial_dialog_box #title").val( arr_item[1] );
    $("#Edit_Dial_dialog_box #url").val(   arr_item[2] );
    $("#Edit_Dial_dialog_box #img_Name").val( arr_item[3] );
    $("#Edit_Dial_dialog_box #Notes").val( arr_item[4] );
    $("#Edit_Dial_dialog_box #tags").val( arr_item[5] );
    $("#Edit_Dial_dialog_box #date").val( arr_item[6] );

    // this did not work
    // $("#Edit_cancel_btn").click(function(){
    //     $("Edit_div_"+id_no).off("click", Edit_Dial);
    //     console.log( "cancel done" );
    // });

    
    // $("#Edit_cancel_btn").click(function(){
    //     $("#Edit_Modify_btn").hide();
    //     $("#Reload_this_ext_page_to_Modify_another_Dial").html("Reload this ext page to Modify another Dial");
    // });

    $("#Edit_cancel_btn").click(function(){
        $("#Edit_Dial_dialog_box").hide();
    });        

    arr_of_id_no.push( id_no );
    console.log( arr_of_id_no.length + "\n", arr_of_id_no );
    if (arr_of_id_no.length>1) {
        $("#Edit_Modify_btn").hide();
        $("#Reload_this_ext_page_to_Modify_another_Dial").html("Reload this ext page to Modify another Dial");
    }

    $("#Edit_Modify_btn").one("click", function(){
    //Part2 -- Save Modified--text back  --> to particular 'arr_item' --> '[t-1]'  in 'Category_ar_retrieved'
    arr_of_id_no.length = 0;    //array emptied
    arr_item[1] = $("#Edit_Dial_dialog_box #title").val();
    arr_item[2] = $("#Edit_Dial_dialog_box #url").val();
    arr_item[3] = $("#Edit_Dial_dialog_box #img_Name").val();
    arr_item[4] = $("#Edit_Dial_dialog_box #Notes").val();
    arr_item[5] = $("#Edit_Dial_dialog_box #tags").val();
    arr_item[6] = $("#Edit_Dial_dialog_box #date").val();
    Category_ar_retrieved[t-1] = arr_item;
    console.log( "arr_item, after modification -- from #Edit_Dial_Dialog_box , below : \n" , arr_item );

        //backup full using Storage Explorer Ext. & then make a new Category & check many ways. Keep backup properly.
        localStorage.setItem(Category_from_ul, JSON.stringify( Category_ar_retrieved )); 
        console.log( Category_from_ul + "  updated" );

    //Updating the div--contents, which has been Edited thru Dialog-box 
    console.log( id + " -- " + id_no);
    $("#title_"+id_no).text( $("#Edit_Dial_dialog_box #title").val() );
    $("#href_"+id_no).attr("href", $("#Edit_Dial_dialog_box #url").val() );
    var img__name = "images/" + $("#Edit_Dial_dialog_box #img_Name").val();
    console.log( img__name );
    $("#img_"+id_no).attr({"src": img__name, "title": $("#Edit_Dial_dialog_box #img_Name").val()});
    $("#desc_Notes_"+id_no).text( $("#Edit_Dial_dialog_box #Notes").val() );
    $("#tag_"+id_no).text( $("#Edit_Dial_dialog_box #tags").val() );
    });

}   //End of func Edit_Dial()


                                            );  */
        var delete_div =                $("<div />").html("x").attr("id", "delete_div_"+ar[i][0]).addClass("delete_div")
                                        .click(function() {      //Remember (e) -- is very Imp! & forgotten often

                                            //$(this).parent().remove();
                                            //try the below line, when Good knowledge of siblings
                                            //console.log( $(this).parent().siblings(".img_container_div").siblings().attr("href") );
                                            //$("#Delete_Dial_Confirmation_msg").fadeIn();

                                            //function Ref() { Refresh_Reload_Category(2000); } not working properly, this msg does not come first, i.e., before Confirm Delete--Dialog.
                                            //Ref();

                                            var txt;
                                                var r = confirm("Are you sure you want to delete this Dial ?");
                                            if (r == true) {
                                                txt = "You pressed OK!";
                                            
                                                var id = $(this).parent().attr("id");
                                                var m = id.lastIndexOf("_");
                                                var id_no = id.substr(m+1);  //right-most nos.
                                            
                                                    //$("#"+t)
                                                console.log( id + " -- " + id_no);
                                                    //var href_for_id_no = $("#img_container_"+id_no+" a").attr("href");
                                                    //console.log( "#img_container_"+id_no+" a" + " -- " + href_for_id_no );
                                                    //console.log( Category_from_ul );
                                                var CategoryName____from_ul = $("#ul_CategoryNames_1 li.selected").text(); 
                                                var CategoryName_from_ul = "Category__" + CategoryName____from_ul;
                                                var Cat_arr_retrieved = JSON.parse( localStorage.getItem(CategoryName_from_ul) );
                                                    //console.log( Cat_arr_retrieved.length, Cat_arr_retrieved );

                                                    //var t = indexOf_item_0( id_no, Cat_arr_retrieved );
                                                    //console.log( t + " -- means " + t + "th item starting from 1 will be spliced -- index starts from 1, not 0, -- func indexOf_item_0" );

                                                Cat_arr_retrieved.splice(id_no, 1); //At position 2, delete 1 item
        //Imp! checkpoint #2                        console.log(Category_from_ul + " -- \n" +  Category_ar_retrieved + "\n -- " + Category_ar_retrieved.length);
                                                $(this).parent().remove();
                                                $("#Wait__dial_deleted__straightening_Saving").fadeIn().delay(2500).fadeOut();

                //Imp!! -- 3Sep16 ko straightening Added + function indexOf_item_0() ka use Ended. It is assumed that arr is always straight. Edit--dial(E) does not change serial--No of Cat_arr. Delete will always straighten. Sortable also straightens.
                                            //Once the dial is deleted\remove(), first straightening is Done & then arr Stored in lStorage
                                            
                                                /* These 3 Closed--if(s), are converted into below--2 ifs
                                                if (id_no == 1) { //do nothing }
                                                if (id_no == 2) { id_no = 1 }
                                                if (id_no == 3) { id_no = 1 }    */
                                                
                                                if (id_no < 5) { id_no = 1 }
                                                if (id_no > 4) { id_no = id_no - 4 }
                                                
                                                console.log( id_no );

                                                for( var m = id_no; m<Cat_arr_retrieved.length; m++){
                                                    Cat_arr_retrieved[m][0] = m;
                                                }
                                            
                                                setTimeout(function(){
                                                    //console.log( Cat_arr_retrieved.length, Cat_arr_retrieved );
                                                    localStorage.setItem(CategoryName_from_ul, JSON.stringify( Cat_arr_retrieved ));
                                                }, 200);

                                                setTimeout( function(){ Load_Category_arr( CategoryName____from_ul ) }, 1000);
                                                //len_on_initial_Dials_Load = len_on_initial_Dials_Load-1;
                                                //$("#CategoryName_heading_div_on_left_side #Cat_len").text( len_on_initial_Dials_Load );
                                                //$("#CategoryName_heading_div_on_left_side span").empty();

                                                $("#Edit_Dial_dialog_box").hide();  //this is necessary, because, after the Dial iss deleted, this--dialog_box still shows its info\data, 
                                                            //So, just hide it. Now, if you want to edit some Dial, you will have to press 'E' small-btn of the Dial & its info\data will be loaded.
                                                            // And, hence this Edit--dialog_box automatically loads new info.

                                            } //End of Confirm--if


                                        }); //End of .click func for delete_div;

//Imp! checkpoint #2       console.log(ar[i] + " -- " + sub_divs);


                   

        a_link.append(img); 
        img_container.append(a_link); 
        sub_divs.append( sub_div_Count_No ).append(img_container).append(title_of_dials)
            //.append(tags)  tags Closed 27Aug16 forever
            .append(slide_up_divs__desc_Notes)
            .append(Edit_div).append(delete_div);
        $("#main_container_div").append( sub_divs );

        if ( No_of_Dials__str == 1){
            $("#main_container_div").append( url_from_lStorage );
        }

    //});  //End of forEach

    }  //End of for--loop, that Adds Dials to #main_container_div

    

}   //End of func Load_Category_arr(Category_arr_Name)


$("#Delete_cancel_btn").click(function () {
    $("#Delete_Dial_Confirmation_msg").fadeOut();
}); 

/*
$("#Edit_cancel_btn").click(function () {
    $("#Edit_Dial_dialog_box").fadeOut();
}); 
*/

/*
    var Delete_ok_btn_clicked = "";  //Global var
$("#Delete_ok_btn").click(function () {
    Delete_ok_btn_clicked = "yes";
    //$("#Delete_Dial_Confirmation_msg").fadeOut();
}); 
*/

/*
//function Edit_Dial() {
$(".main_container_ke_sub_divs").click(function(){
    var id_no = $(this).parent().attr("id_no"); 
    console.log( id_no );
});
//}

*/
    //var id_no = $(".main_container_ke_sub_divs").attr("id_no"); 

function Edit_Dial_full_l(){
    console.log( ar_of_id_no.length +"\n", ar_of_id_no[ar_of_id_no.length-1] +"\n", ar_of_id_no );
    Edit_Dial_full();
}

function Edit_Dial_full() {
    
    //Part1 -- Retrieve array--text from Category_ar_retrieved, & show in "#Edit_Dial_dialog_box"
    var CategoryName_from_ul = $("#ul_CategoryNames_1 li.selected").text(); 
        var Current_CatName = CategoryName_from_ul;
    CategoryName_from_ul = "Category__" + CategoryName_from_ul;
    var Category__ar__retrieved = JSON.parse( localStorage.getItem( CategoryName_from_ul ) );
    //console.log( CategoryName_from_ul );
                                                        //var id = $(this).parent().attr("id");
                                                        //console.log( $(this).attr("id") + "\n" +  id );
    $("#Edit_Dial_dialog_box").show().draggable();      //var m = id.lastIndexOf("_");
    $("#Current_CatName span").text( Current_CatName );

    $("#Move_dial").removeAttr("disabled");
    $("#Move_dial").html("Move dial");
    //Added 4-lines below on 15Aug16, works in sync-with Move_Dial_pos_up_dn.js
    $("#input_no_2").attr("max", Category__ar__retrieved.length-1);  
    if ( $("#input_no_2").val()>(Category__ar__retrieved.length-1) ) {
        $("#input_no_2").val( Category__ar__retrieved.length-1 );
    }
                                                        
    var id_no = ar_of_id_no[ar_of_id_no.length-1];
    console.log( "from func Edit_Dial_full() -- " + id_no + " --id_no");

    var t = indexOf_item_0( id_no, Category__ar__retrieved );
    console.log( (t-1) + " -- means " + (t-1) + "th item starting from 1 will be 'edited & Saved-back' -- index starts from 1, not 0, -- func indexOf_item_0" );
    var arr_item = Category__ar__retrieved[t-1];
                                                    //Note:Imp!: if 't-1' is not given in brackets, this gives NAN, done using console & then rectified here
    $("#Edit_Dial_dialog_box span#Dial_serial_no").html( "pos-" + (t-1) );  
    $("#Edit_Dial_dialog_box span#Dial_id_no").html( "id-" + arr_item[0] );
        //Added 4-if(s) below on 30July16
        var txt_len = arr_item[1].length;
        //console.log( txt_len );
    if ( txt_len>75 ) { $("#Edit_Dial_dialog_box #title").attr({"rows": 2});  } 
    if ( txt_len>150 ) { $("#Edit_Dial_dialog_box #title").attr({"rows": 3});  }
    if ( txt_len<75 ) { $("#Edit_Dial_dialog_box #title").attr({"rows": 1});  }  
    if ( txt_len<150 && txt_len>75 ) { $("#Edit_Dial_dialog_box #title").attr({"rows": 2});  }

    $("#Edit_Dial_dialog_box #title").val( arr_item[1] );
    
    //Added if below on 30July16
    if ( arr_item[1].indexOf("</b>") > 0 || arr_item[1].indexOf("</span>") > 0 ) {
        $("#show_title_with_style").css({ "display": "block" });
        $("#Edit_Dial_dialog_box #div_title__text").html( arr_item[1] );
    }
    else{
        $("#Edit_Dial_dialog_box #div_title__text").html( "" );
        $("#show_title_with_style").css({ "display": "none" });
    }


    $("#Edit_Dial_dialog_box #url").val(   arr_item[2] );
    $("#Edit_Dial_dialog_box #img_Name").val( arr_item[3] );
    $("#Edit_Dial_dialog_box #Notes").val( arr_item[4] );
    $("#Edit_Dial_dialog_box #tags").val( arr_item[5] );
    $("#Edit_Dial_dialog_box #date").val( arr_item[6] );

    /* this did not work
    $("#Edit_cancel_btn").click(function(){
        $("Edit_div_"+id_no).off("click", Edit_Dial);
        console.log( "cancel done" );
    });  */

    /*
    $("#Edit_cancel_btn").click(function(){
        $("#Edit_Modify_btn").hide();
        $("#Reload_this_ext_page_to_Modify_another_Dial").html("Reload this ext page to Modify another Dial");
    });*/

    qs("button#Edit_cancel_btn").onclick = function(){
        $("#Edit_Dial_dialog_box").hide();
        $("#"+div_id).css({ outline: "" });
    };        

/*
    arr_of_id_no.push( id_no );
    console.log( arr_of_id_no.length + "\n", arr_of_id_no );
    if (arr_of_id_no.length>1) {
        $("#Edit_Modify_btn").hide();
        $("#Reload_this_ext_page_to_Modify_another_Dial").html("Reload this ext page to Modify another Dial");
    }
*/

    $("#Edit_Modify_btn").one("click", function(){
if (id_no == ar_of_id_no[ar_of_id_no.length-1]) {
    console.log(id_no);
    //Part2 -- Save Modified--text back  --> to particular 'arr_item' --> '[t-1]'  in 'Category_ar_retrieved'
    //arr_of_id_no.length = 0;    //array emptied
    arr_item[1] = $("#Edit_Dial_dialog_box #title").val();
    arr_item[2] = $("#Edit_Dial_dialog_box #url").val();
    arr_item[3] = $("#Edit_Dial_dialog_box #img_Name").val();
    arr_item[4] = $("#Edit_Dial_dialog_box #Notes").val();
    arr_item[5] = $("#Edit_Dial_dialog_box #tags").val();
    arr_item[6] = $("#Edit_Dial_dialog_box #date").val();
    Category__ar__retrieved[t-1] = arr_item;
    console.log( "'var arr_item', after modification -- from #Edit_Dial_Dialog_box , below : \n" , arr_item );


        //backup full using Storage Explorer Ext. & then make a new Category & check many ways. Keep backup properly.
        localStorage.setItem(CategoryName_from_ul, JSON.stringify( Category__ar__retrieved )); 
        console.log( CategoryName_from_ul + "  updated" );

    //Updating the div--contents, which has been Edited thru Dialog-box 
    console.log( id_no);
    $("#title_"+id_no).html( $("#Edit_Dial_dialog_box #title").val() );
    $("#href_"+id_no).attr("href", $("#Edit_Dial_dialog_box #url").val() );
    var img__name = "images/" + $("#Edit_Dial_dialog_box #img_Name").val();
    console.log( img__name );
    $("#img_"+id_no).attr({"src": img__name, "title": $("#Edit_Dial_dialog_box #img_Name").val()});
    $("#desc_Notes_"+id_no).html( $("#Edit_Dial_dialog_box #Notes").val() );
    $("#tag_"+id_no).html( $("#Edit_Dial_dialog_box #tags").val() );

    ar_of_id_no.length = 0;

    $("#Edit_Modify_btn__modified").fadeIn().delay(10500).fadeOut();
}
else { console.log( "nothing done\n" + ar_of_id_no.length ) }    

    });  //End of func  #Edit_Modify_btn--click 

}   //End of func Edit_Dial()















                //Load Setting from lStorage on Main_SpeedDial_page.html opening & li--Category click
function Load_Settings__on_Ext_page_load() {  

  //if ( localStorage["obj_Main_Speed_Dial_Settings"] ) {

  var obj_MSDial_Settings = JSON.parse(localStorage.getItem("obj_Main_Speed_Dial_Settings"));

    //tags Closed forever 27Aug16
    //document.getElementById("tags_on_off_checkbox").checked = obj_Main_Speed_Dial_Settings.tags_on_off_checkbox;
    document.getElementById("Notes_on_off_checkbox").checked = obj_MSDial_Settings.Notes_on_off_checkbox;

    $("#li2, #li3, #li4").addClass("li_Class_lightskyblue_bg");
  $("#li10, #li11").addClass("li_Class_lightgreen_bg");
  $("#li13, #li14, #li15, #li16, #li17, #li18, #li19, #li20, #li21").addClass("li_Class_pink_bg");
  $("#li24, #li25, #li30").addClass("li_Class_lightsalmon_bg");

    function load_last_li() {
                            
        Load_Category_arr( obj_MSDial_Settings["last__li_selected_text-Name"] );
        var last_li_sel_id = obj_MSDial_Settings["last__li_selected_id"];
        if ( $("#"+last_li_sel_id).attr("class") == "myListClass" ) {
            $("#"+last_li_sel_id).addClass("selected selected_2");
        }
        else{
            $("#"+last_li_sel_id).addClass("selected");
        }


            /*.css({ "color": "#333", "background-color": "hsl(0, 0%, 88%)", 
                    "text-shadow": "0 0 2px goldenrod" 
            });     //.siblings().removeClass("selected");*/
    }
    load_last_li();

  //}  //End of if




    function scroll_ul_So_that_sel_li_visible() {
                            //var selected_CategoryName_from_ul = $("#ul_CategoryNames_1 li.selected").text(); 
        var sel_li_in_ul__ka_id = $("#ul_CategoryNames_1 li.selected")[0].id;   //.textContent; 
        var sel_li_in_ul__ka_id_No = sel_li_in_ul__ka_id.substr(2);   
                    console.log( sel_li_in_ul__ka_id, sel_li_in_ul__ka_id_No );
        var sel_li_ki_position_in_ul = $("#"+sel_li_in_ul__ka_id).position().top;   //for some reasons Javascript is not working, but jQuery is. So, used jQuery. find why ?   document.getElementById("sel_li_in_ul__ka_id").offsetTop;  //this position is Always fixed, does not change, if ul is scrolled.
        if (sel_li_ki_position_in_ul > 50) {
            gid("ul_CategoryNames_1").scrollTop = sel_li_ki_position_in_ul-25;  //Note: 27 is by seeing approx., fixed by Sac, not technical
                console.log( "\nscrolled ul by:- " + sel_li_ki_position_in_ul+"-25 = " +(sel_li_ki_position_in_ul-25) );
        }

            console.log( sel_li_in_ul__ka_id, sel_li_in_ul__ka_id_No, "\n'sel_li_ki_position_in_ul': "+ sel_li_ki_position_in_ul,
                        "\nul ka scrollTop: " + gid("ul_CategoryNames_1").scrollTop );


    } //End of func scroll_ul_So_that_sel_li_visible()

    setTimeout(function(){                                  //Make a codepen on offsetTop -- pending
                                                             //https://api.jquery.com/category/offset/  &  https://api.jquery.com/position/ &  http://www.w3schools.com/jquery/css_offset.asp  &  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
        scroll_ul_So_that_sel_li_visible();
        
                            }, 500);



    //--- function show_CatName  --- when kept a function, does not work
    // in li.click event in func Load_All_Categories_Into_ul_CategoryNames(), may-be they are stopping
    //but here it works as a function, as can be seen here.
                                                        //addClass is not working, find ?
                                                    //$("#Show_CategoryName_1").addClass("Show_CategoryName_1__at_top_100px");
    function show_CatName() {                                                    
        $("#Show_CategoryName_1").css("top", "100px");
        $("#Show_CategoryName_1").text( $("#ul_CategoryNames_1 li.selected").text() ).fadeIn("fast").delay(3000)
            .fadeOut(function(){    //this is callback func of fadeOut, once fadeOut is complete, it will do its work, written below, i.e., change css
                                    /* jQuery Effect fadeOut() Method
                                    http://www.w3schools.com/jquery/eff_fadeout.asp
                                    See, "Using the callback parameter" on above page  */
                $("#Show_CategoryName_1").css("top", "20px")
            });  //Default is 400, fast is 200.
    }
    show_CatName();
                                                        //setTimeout also works, but callback on fadeOut is better.    
                                                        //setTimeout(function(){ $("#Show_CategoryName_1").css("top", "20px") }, 5000);   //Note: if 3300 is kept, it moves it to pos top:20px just before it hides.
    //End of --- function show_CatName ---


        // Added on 11May17
        // the below func gets fired thru popup.html
        // See, in popup.js --> 'res_arr_found.forEach(function(item,index) {}'  in onPopup() func.  approx--line--no 360 on 12May17
        // the below func should be run only after the above funcs.
    function scrollTo__dial_no(){
        //R:\Chrome F12 Sources tab -- Snippets\SpeedDial_Sac Snippets\Scroll to a particular dial, SpeedDial_sac.js
        var dial_no = obj_MSDial_Settings.scrollTo_dial_no;    
        document.querySelector("#sub_div_Count_No_"+dial_no).scrollIntoView();
        document.body.scrollTop -= 100;
        qs("#main_container_ka_sub_div_"+dial_no).style.outline= "4px solid red";
        qs("#main_container_ka_sub_div_"+dial_no).style.outlineOffset= "17px";
        setTimeout(function(){ 
            obj_MSDial_Settings.scrollTo_dial_no= "";  //this key is made null, once set by popup.html onclick , So that, on F5--reload, a dial--pos is not scroll-ed--To
            localStorage.setItem("obj_Main_Speed_Dial_Settings", JSON.stringify( obj_MSDial_Settings ) );
        }, 2500);
    }
    if (obj_MSDial_Settings.scrollTo_dial_no != "" ){ 
        setTimeout(scrollTo__dial_no, 1150);   //1000 was also ok, but i delayed scrollTo a little-bit
    }
    

}   //End of func Load_Settings__on_Ext_page_load()






    /* Note: as "func Load_Settings__on_Ext_page_load()" gets loaded on Main_SpeedDial_page.html & 
       it retrieves obj_Main_Speed_Dial_Settings--key from lstorage, therefore, in the below func

       var obj_MSDial_Settings = JSON.parse(localStorage.getItem("obj_Main_Speed_Dial_Settings"));

       was not done.
       Also, var "tags_on_off_checkbox" need not be in "obj_Main_Speed_Dial_Settings" key, it creates it, if
       it is not there.
    */
/* the below onchange func closed on 23May17.  this id '#tags_on_off_checkbox'  was closed in 'Main_SpeedDial_page.html' earlier in Aug2016.
    $("#tags_on_off_checkbox").on('change', function () {            //http://codepen.io/sahni4you/pen/Goaxov , http://codepen.io/sahni4you/pen/mPPjwq , http://codepen.io/sahni4you/pen/YqJmqv
        
        //Part1
        //checkbox--state Saved to localStorage(.setItem) on checkbox changed 
        console.log( "#tags_on_off checkbox changed");
        obj_Main_Speed_Dial_Settings["tags_on_off_checkbox"] = document.getElementById("tags_on_off_checkbox").checked;  //true or false will be Saved in ls
        //obj_Main_Speed_Dial_Settings["Notes_on_off_checkbox"] = document.getElementById("Notes_on_off_checkbox").checked;  //true or false will be Saved in ls    

        console.log( obj_Main_Speed_Dial_Settings["tags_on_off_checkbox"] );
        localStorage.setItem("obj_Main_Speed_Dial_Settings", JSON.stringify( obj_Main_Speed_Dial_Settings ) );
        //obj_Main_Speed_Dial_Settings = JSON.parse(localStorage.getItem("obj_Main_Speed_Dial_Settings"));

        //Part2 -- tags
      //what to do, once you have "obj_Main_Speed_Dial_Settings"--key  Saved  in localStorage(.setItem)
      if (document.getElementById("tags_on_off_checkbox").checked == false) {
        $(".tags").removeClass("display_block");
        console.log("chkbox tags false, .display_block removed, tags will not be shown");
        //$(".main_container_ke_sub_divs").css("height", "274");   //tags height is 21 at this time 298-21-2 for borders=275
        $(".main_container_ke_sub_divs").removeClass("height_when_tags_displayed");
      }    
      if (document.getElementById("tags_on_off_checkbox").checked == true) {
        $(".tags").addClass("display_block");
        console.log("chkbox tags true means 'checked' -- .display_block added, tags will be shown");
        //$(".main_container_ke_sub_divs").css("height", "297");
        $(".main_container_ke_sub_divs").addClass("height_when_tags_displayed");
      }    

    });
*/


$("#Notes_on_off_checkbox").on('change', function () {            //http://codepen.io/sahni4you/pen/Goaxov , http://codepen.io/sahni4you/pen/mPPjwq , http://codepen.io/sahni4you/pen/YqJmqv

    //Part1
    //checkbox--state Saved to localStorage(.setItem) on checkbox changed 
    console.log( "#Notes_on_off checkbox changed");
    //obj_Main_Speed_Dial_Settings["tags_on_off_checkbox"] = document.getElementById("tags_on_off_checkbox").checked;  //true or false will be Saved in ls
    obj_Main_Speed_Dial_Settings["Notes_on_off_checkbox"] = document.getElementById("Notes_on_off_checkbox").checked;  //true or false will be Saved in ls    

    console.log( obj_Main_Speed_Dial_Settings["Notes_on_off_checkbox"] );
    localStorage.setItem("obj_Main_Speed_Dial_Settings", JSON.stringify( obj_Main_Speed_Dial_Settings ) );

    //Part 2.1 -- Notes
  if (document.getElementById("Notes_on_off_checkbox").checked == false) {
    $(".slide_up_divs__desc_Notes").removeClass("display_block");
    console.log("chkbox Notes false, .display_block removed, Notes will not be shown");
    //$(".main_container_ke_sub_divs").css("height", "274");   //tags height is 21 at this time 298-21-2 for borders=275
    $(".main_container_ke_sub_divs").removeClass("height_and_margin_when_Notes_displayed");
  }    
  if (document.getElementById("Notes_on_off_checkbox").checked == true) {
    $(".slide_up_divs__desc_Notes").addClass("display_block");
    console.log("chkbox Notes true means 'checked' -- .display_block added, Notes will be shown");
    //$(".main_container_ke_sub_divs").css("height", "297");
    $(".main_container_ke_sub_divs").addClass("height_and_margin_when_Notes_displayed");
  }    

});

/*function get_className_at_diff__no_of_dials(){
    if ( localStorage["No_of_Dials__string"] == 2 ){ return }
}*/

gid("decide_img_filter").onchange = function(){  //chkbox
    //if ( this.checked == true) {
        $(".img_in_sub_divs").toggleClass("img_filter_class");
        //$(".img_in_sub_divs").addClass("img_filter_class");
    //}
    //else { $(".img_in_sub_divs").removeClass("img_filter_class");  }
}

gid("1_Dial_only").onchange = function(){  //radio

    if ( this.checked == true) {
        localStorage["No_of_Dials__string"] = 1;

        alert("1 dial only \nReload using F5 to get 1 dial with url.");
    }
}

$("#2_Dials_checkbox").on('change', function () {           //#2_Dials_checkbox is radio, not chkbox

    //Get "div.Notes_are_present", before changing other classes & then apply it back. 
    //As, ".Notes_are_present" is decided on title.text(), it is not applied to All divs. Only, divs, where Notes are present.
    //So, for selected-few divs, jQuery--each func used. If F5 reload is done, divs get the ".Notes_are_present" automatically, but were not getting when classes changed thru side--checkboxes.
    /*var arr = [];
    $("div.Notes_are_present").each(function(i,item){
        arr.push( this.id );    //item.id also works
    });
    console.log(arr.length, arr);     */

    if ( this.checked == true) {
        localStorage["No_of_Dials__string"] = 2;

        $(".main_container_ke_sub_divs").attr("class", "main_container_ke_sub_divs main_container_ke_sub_divs__2_Dials");
                    console.log("2_Dials_radio -- true means 'checked'");
        $(".img_container_divs").attr("class", "img_container_divs img_container_divs__2_Dials");

        $(".Notes_are_present").attr("class", "title_of_dials title_of_dials__2_Dials Notes_are_present");                            
        $(".title_of_dials:not(.Notes_are_present)").attr("class", "title_of_dials title_of_dials__2_Dials");

        $(".sub_div_Count_Nos").attr("class", "sub_div_Count_Nos");
    } 

    // ".Notes_are_present" applied back
    /*arr.forEach(function(item,i){
        $("#"+item).addClass("Notes_are_present");
    });*/
    //$("div.Notes_are_present")[0].id;        

}); //End of 2_Dials

$("#3_Dials_checkbox").on('change', function () {           //#3_Dials_checkbox is radio, not chkbox

    //Get "div.Notes_are_present", before changing other classes & then apply it back. 
    //As, ".Notes_are_present" is decided on title.text(), it is not applied to All divs. Only, divs, where Notes are present.
    //So, for selected-few divs, jQuery--each func used. If F5 reload is done, divs get the ".Notes_are_present" automatically, but were not getting when classes changed thru side--checkboxes.
    /*var arr = [];
    $("div.Notes_are_present").each(function(i,item){
        arr.push( this.id );    //item.id also works
    });
    console.log(arr.length, arr);    */

    if ( this.checked == true) {
        localStorage["No_of_Dials__string"] = 3;

        $(".main_container_ke_sub_divs").attr("class", "main_container_ke_sub_divs main_container_ke_sub_divs__3_Dials");
                    console.log("3_Dials_radio -- true means 'checked'");
        $(".img_container_divs").attr("class", "img_container_divs img_container_divs__3_Dials");
                            
                    //$(".title_of_dials").attr("class", "title_of_dials title_of_dials__3_Dials"); was using this earlier, with js for Notes
        // Imp! Note: the below 2 lines (use of :not selector) made close of .each $().func  for Notes 
        $(".Notes_are_present").attr("class", "title_of_dials title_of_dials__3_Dials Notes_are_present");
        $(".title_of_dials:not(.Notes_are_present)").attr("class", "title_of_dials title_of_dials__3_Dials");

        $(".sub_div_Count_Nos").attr("class", "sub_div_Count_Nos");
    } 

    // ".Notes_are_present" applied back
    /*arr.forEach(function(item,i){
        $("#"+item).addClass("Notes_are_present");
    });*/
    //$("div.Notes_are_present")[0].id;        

}); //End of 3_Dials

                                                //http://codepen.io/sahni4you/pen/Goaxov , http://codepen.io/sahni4you/pen/mPPjwq , http://codepen.io/sahni4you/pen/YqJmqv
//Note-Imp!!: 4_Dials is kept default, by me. Only in this case, no class is Added, just the basic, in css is applied.                                                
$("#4_Dials_checkbox").on('change', function () {            //#4_Dials_checkbox is radio, not chkbox

    //Get "div.Notes_are_present", before changing other classes & then apply it back. 
    //As, ".Notes_are_present" is decided on title.text(), it is not applied to All divs. Only, divs, where Notes are present.
    //So, for selected-few divs, jQuery--each func used. If F5 reload is done, divs get the ".Notes_are_present" automatically, but were not getting when classes changed thru side--checkboxes.
    /*var arr = [];
    $("div.Notes_are_present").each(function(i,item){
        arr.push( this.id );    //item.id also works
    });
    console.log(arr.length, arr);*/

    console.log( "lStorage value before changing anything: " + localStorage["No_of_Dials__string"] );

    if ( this.checked == true) {
        localStorage["No_of_Dials__string"] = 4;

        $(".main_container_ke_sub_divs").attr("class", "main_container_ke_sub_divs");
                    console.log("4_Dials_radio -- true means 'checked'");
        $(".img_container_divs").attr("class", "img_container_divs");
                            
                    //qsa(".title_of_dials").className= "title_of_dials";  qsa is not working, whereas $.() works
        // Imp! Note: the below 2 lines (use of :not selector) made close of .each $().func  for Notes 
        $(".Notes_are_present").attr("class", "title_of_dials Notes_are_present");
        $(".title_of_dials:not(.Notes_are_present)").attr("class", "title_of_dials");

        $(".sub_div_Count_Nos").attr("class", "sub_div_Count_Nos");
    } 

    // ".Notes_are_present" applied back
    /*arr.forEach(function(item,i){
        $("#"+item).addClass("Notes_are_present");
    });*/
    //$("div.Notes_are_present")[0].id;    

}); //End of 4_Dials

$("#5_Dials_checkbox").on('change', function () {       //#5_Dials_checkbox is radio, not chkbox
    

    /*if (document.getElementById("5_Dials_checkbox").checked == false) {
        localStorage["No_of_Dials__string"] = 4;

        $(".main_container_ke_sub_divs").attr("class", "main_container_ke_sub_divs");
                    console.log("5_Dials_checkbox -- false means 'un-checked'");
        $(".img_container_divs").attr("class", "img_container_divs");
                             //$(".img_in_sub_divs").removeClass("img_in_sub_divs_2_Dials");
        $(".title_of_dials").attr("class", "title_of_dials");
    }    */

    //Get "div.Notes_are_present", before changing other classes & then apply it back. 
    //As, ".Notes_are_present" is decided on title.text(), it is not applied to All divs. Only, divs, where Notes are present.
    //So, for selected-few divs, jQuery--each func used. If F5 reload is done, divs get the ".Notes_are_present" automatically, but were not getting when classes changed thru side--checkboxes.
    /*var arr = [];
    $("div.Notes_are_present").each(function(i,item){
        arr.push( this.id );    //item.id also works
    });
    console.log(arr.length, arr);*/

    if ( this.checked == true ) {
        localStorage["No_of_Dials__string"] = 5;

        /*  if (document.getElementById("2_Dials_checkbox").checked == true) {
            document.getElementById("2_Dials_checkbox").checked = false;
            }
            if (document.getElementById("3_Dials_checkbox").checked == true) {
            document.getElementById("3_Dials_checkbox").checked = false;
            }
            if (document.getElementById("6_Dials_checkbox").checked == true) {
            document.getElementById("6_Dials_checkbox").checked = false;
        }*/

        $(".main_container_ke_sub_divs").attr("class", "main_container_ke_sub_divs main_container_ke_sub_divs__5_Dials");
                    console.log("5_Dials_radio -- true means 'checked'");
        $(".img_container_divs").attr("class", "img_container_divs img_container_divs__5_Dials");

        $(".Notes_are_present").attr("class", "title_of_dials title_of_dials__5_Dials Notes_are_present");                            
        $(".title_of_dials:not(.Notes_are_present)").attr("class", "title_of_dials title_of_dials__5_Dials");

        $(".sub_div_Count_Nos").attr("class", "sub_div_Count_Nos");
    } 
    
    // ".Notes_are_present" applied back
    /*arr.forEach(function(item,i){
        $("#"+item).addClass("Notes_are_present");
    });*/
    //$("div.Notes_are_present")[0].id;

}); //End of 5_Dials

$("#6_Dials_checkbox").on('change', function () {
    
    /*if (document.getElementById("6_Dials_checkbox").checked == false) {
        localStorage["No_of_Dials__string"] = 4;

        $(".main_container_ke_sub_divs").attr("class", "main_container_ke_sub_divs");
                    console.log("5_Dials_checkbox -- false means 'un-checked'");
        $(".img_container_divs").attr("class", "img_container_divs");
                             
        $(".title_of_dials").attr("class", "title_of_dials");

        $(".sub_div_Count_Nos").attr("class", "sub_div_Count_Nos");
    } */   

    //Get "div.Notes_are_present", before changing other classes & then apply it back. 
    //As, ".Notes_are_present" is decided on title.text(), it is not applied to All divs. Only, divs, where Notes are present.
    //So, for selected-few divs, jQuery--each func used. If F5 reload is done, divs get the ".Notes_are_present" automatically, but were not getting when classes changed thru side--checkboxes.
    /*var arr = [];
    $("div.Notes_are_present").each(function(i,item){
        arr.push( this.id );    //item.id also works
    });
    console.log(arr.length, arr);    */

    if ( this.checked == true) {
        localStorage["No_of_Dials__string"] = 6;

        /*  if (document.getElementById("2_Dials_checkbox").checked == true) {
            document.getElementById("2_Dials_checkbox").checked = false;
            }
            if (document.getElementById("3_Dials_checkbox").checked == true) {
            document.getElementById("3_Dials_checkbox").checked = false;
            }
            if (document.getElementById("5_Dials_checkbox").checked == true) {
            document.getElementById("5_Dials_checkbox").checked = false;
        }  */      

        $(".main_container_ke_sub_divs").attr("class", "main_container_ke_sub_divs main_container_ke_sub_divs__6_Dials");
                    console.log("6_Dials_radio -- true means 'checked'");
        $(".img_container_divs").attr("class", "img_container_divs img_container_divs__6_Dials");

        $(".Notes_are_present").attr("class", "title_of_dials title_of_dials__6_Dials Notes_are_present");                            
        $(".title_of_dials:not(.Notes_are_present)").attr("class", "title_of_dials title_of_dials__6_Dials");

        $(".sub_div_Count_Nos").attr("class", "sub_div_Count_Nos sub_div_Count_Nos__6_Dials");
    } 

    // ".Notes_are_present" applied back
    /*arr.forEach(function(item,i){
        $("#"+item).addClass("Notes_are_present");
    });*/
    //$("div.Notes_are_present")[0].id;    

});

$("#divs_Sortable_checkbox").one('change', function () {

    Refresh_Reload_Category(2500);

    if ( $(this).is(":checked") ) { 

        $(this).attr("disabled", "true");

        $("#main_container_div").sortable({ revert: true });
        $("#Sortable_ON_msg").css({"display": "block"});      //.addClass("display_block__Sortable_ON_msg");

        //var CategoryName_from__ul = $("#ul_CategoryNames_1 li.selected").text(); 

        console.log("divs Sortable ON");

        setTimeout(function() {
            $("#Save_sorted").css("color", "hsl(236, 58%, 35%)" )
            .removeAttr("disabled");
                                }, 3000);

    }

    /*  Below not reqd.
    if ( !$(this).is(":checked") ) { 
        console.log("divs Sortable OFF");
    } */
});


/* The below uses separate--js--file:
arr_Sorted -- Chrome Console -- Code for sorting arr and then Saving in localStorage, 10Aug16.js
which contains the func get_sorted_info();  */
$("#Save_sorted").one("click", function(){
    get_sorted_info();
    $(this).attr("disabled", "true").css("color", "gray").html("Sorted<br>Done");

    var html_txt = "Sorted Done<br>F5 to reload page.<br>";
    var btn_reload = $("<button>Press F5</button><br>or<br><div id='Reloading'>Reloading automatically.</div>")
                        .click(function(){ 
                            location.reload();
                            
                            /*  This func will fire from Load_Settings(), not from here.
                            function load_last_li() {
                            var obj_MSDial_Settings = JSON.parse(localStorage.getItem("obj_Main_Speed_Dial_Settings"));
                            var last_li_sel_id = obj_MSDial_Settings.last__li_selected;
                            var last_li_sel_txt = $("#"+last_li_sel_id).text();
                            Load_Category_arr( last_li_sel_txt );
                            $("#"+last_li_sel_id).addClass("selected").siblings().removeClass("selected");
                            }*/

                            //setTimeout( load_last_li, 1000);
                            //load_last_li();  None of this & above-line works, may be page-reload() refreshes all & cancels All functions

                            //var li_Name = $("#ul_CategoryNames_1 li.selected").text();
                            //Load_Category_arr( obj_MSDial_Settings.last__li_selected );
                        });

    $("#Show_msg_container, #Show_msg").delay(300).show();                        
    $("#Show_msg").html(html_txt).append( btn_reload );
    window.setInterval(function(){ $("#Reloading").toggle() }, 700); 

    /* The below did not work, find why, try in Codepen
    but later, when I set width & height of div#Show_msg
    window.setTimeout(function(){ 
        $("#Reloading").css("visibility", "hidden"); }, 500 );
    window.setTimeout(function(){ 
        $("#Reloading").css("visibility", "visible"); }, 500 );*/

    setTimeout(function(){ location.reload() }, 5000);
        
}); 


/*  This closed on 22July16, as there is no "#CategoryName_1"
    May-be this I used in beginning of Ext., delete after some days, closed today.
$("#CategoryName_1").click(function() {      //#btn_Show_SpeedDial_page
    Load_Category_arr();    //(Category_arr_Name);
});

*/

                                //var Category_ar_len_before_Refresh = [];  var not used, Closed
//$("#btn_Reload_Category_by_li_click").click( Refresh_Reload_Category ); this was working, but because of 'msg_delay_seconds' arg, kept inside a function
$("#btn_Reload_Category_by_li_click").click(function(){ Refresh_Reload_Category(4000) });
function Refresh_Reload_Category(msg_delay_seconds) {
    //Part1 -- Main Reload
    var CategoryName_from__ul = $("#ul_CategoryNames_1 li.selected").text(); 
                                        //console.log( CategoryName_from__ul );
    var len_before_Refresh = $("#CategoryName_heading_div_on_left_side #Cat_len").text(); 
    //Reload of li--Category  
    Load_Category_arr( CategoryName_from__ul );
    tags_on_off_thru_checkbox___when_an_li_is_clicked_for_Load_in___ul_CategoryNames_1();

    //Part2 -- count of -- 'new Dials added'
    //Category_ar_len_before_Refresh.push( $("#CategoryName_heading_div_on_left_side #Cat_len").text() );
    
    var Category_from__ul = "Category__" + CategoryName_from__ul;
    var Category_ar__retrieved = JSON.parse( localStorage.getItem(Category_from__ul) );

    var new_len = Category_ar__retrieved.length-1;    //as first [0] item in array is never used.
    var change_of_len = new_len - len_before_Refresh;
            console.log( len_before_Refresh +"\n", new_len );
    $("#CategoryName_heading_div_on_left_side span").text( change_of_len );

    function Reload_Refresh_Done_msg(msg_delay_seconds) {
        $("#func__Refresh_Reload_Category__ka_msg div")
            .html( change_of_len + " more dials were loaded." );
        $("#func__Refresh_Reload_Category__ka_msg").fadeIn().delay(msg_delay_seconds).fadeOut();
    }
    Reload_Refresh_Done_msg(msg_delay_seconds); 

} //End of func  Refresh_Reload_Category()


document.getElementById("scroll_dn__160px").onclick = function(){
    $('body').animate({scrollTop: '+=160px'}, 800);
}



document.getElementById("scroll_to_Top_10").onclick = function(){
    //$('html, body').animate({scrollTop: 3}, 800);  simple-one Closed

    var bottom_of_page = document.body.scrollHeight - 705; //705

    if (bottom_of_page < 5000) {
        $('html, body').animate({ scrollTop: 2 }, 800);
        console.log( "bottom_calculated: " + bottom_of_page, " @800" );
                }
    else { 
        $('html, body').animate({ scrollTop: 2 }, 1500);
                                    //window.scrollTo(0, bottom_of_page);
        console.log( "bottom_calculated: " + bottom_of_page, " @1500" );                    
    }    

    if (document.body.scrollTop < 600) {
        $('html, body').animate({ scrollTop: 2 }, 400);
    }
    if (document.body.scrollTop < 300) {
        $('html, body').animate({ scrollTop: 2 }, 200);
    }
}

document.getElementById("scroll_to_Bottom").onclick = function(){

    var bottom_of_page = document.body.scrollHeight - 710; //705

    if (bottom_of_page < 5000) {
        $('html, body').animate({ scrollTop: bottom_of_page }, 800);
        console.log( "bottom_calculated: " + bottom_of_page, " @800" );
                }
    else { 
        $('html, body').animate({ scrollTop: bottom_of_page }, 1500);
        //window.scrollTo(0, bottom_of_page);
        console.log( "bottom_calculated: " + bottom_of_page, " @1500" );                    
    }
}


$("#Show_CategoryName").mouseenter(function(){
    //Note: it was working ok, but I want to show always, as ul sometimes need scroll to show the selected--category
    //So, if--condition removed.
    //if (document.body.scrollTop > 65){
        var li_sel = $("#ul_CategoryNames_1 li.selected").text();
        if (li_sel.length>45) {
            $("#Show_CategoryName_1").css({ left: "-=100px" });
                console.log( li_sel.length );
        }
        $("#Show_CategoryName_1").text( li_sel ).fadeIn("fast");  //Default is 400, fast is 200.
        setTimeout(function(){
            $("#Show_CategoryName_1").css({ left: "" });
        }, 8000);
    //}
});
$("#Show_CategoryName").mouseleave(function(){
    $("#Show_CategoryName_1").delay(1500).fadeOut();
});


document.getElementById("btn__Search_page_open").onclick = function() { 
    chrome.tabs.create({url: "Search_Categories_page.html"});
}


document.getElementById("Copy_current_dial").onclick = function() {   //#Copy_Category is a button
    console.time("Copy_current_dial");
    /* Imp!! -- See, Snippet in Sources Tab F12,  'SpeedDial--localStorage console.timeEnd test'  */

    // #1 -- first check for the 2 if--conditions below

    var sel_value = document.getElementById("CategoryName_Select").value;
    //Check whether this Category Exists, may-be it's name is Changed\Deleted. 
    //This is reqd. as I am putting Category--Names in Select, Manually.
    //Even if selected--Names are entered, in Select, using Javascript, this step will be useful.
    var CategoryNames_arr = JSON.parse( localStorage.getItem("CategoryNames_arr") );
    var index_found = CategoryNames_arr.indexOf( sel_value );
                console.log("index_found of Selected_CategoryName in Select--Control: " + index_found );
    if ( index_found == -1 ) { 
        alert( "the CategoryName selected in Select--Control,\n" +
                "does not exist.\nCheck for this Category in ul & lStorage, first.\n\n" +
                "I have entered options(CategoryNames) in Select, Manually. " +
                "So, there can be an error." );
        return; skip();
    }

    /* for--loop not used, Instead above arr.indexOf property\Method used.
    for (var i=0, CategoryNames_arr.length; i++) {
        if ( CategoryNames_arr[i] == sel_value )
    }*/
    
    
    var CategoryName_from_ul = $("#ul_CategoryNames_1 li.selected").text(); 
    var Cat_name = "Category__" + CategoryName_from_ul;

    if (sel_value===CategoryName_from_ul){
        alert("you have selected to copy onto the same \n" +
            "Category :-  '" + CategoryName_from_ul + 
            "'\nin which you are present.\n\n" +
            "Use btn--'Move dial' for moving a Dial,\nat some other pos  OR\n" +
            "Select another Category_Name.");
        return;
    }

    this.innerHTML = "Copied<br>item";

    this.setAttribute("disabled", "true");

    var Cat_arr = JSON.parse( localStorage.getItem(Cat_name) );

    var pos_tobeCopied = $("#Dial_id_no").text().substr(3);

    var ar_item_tobeCopied = Cat_arr[pos_tobeCopied];

    console.log(sel_value + "\n" + CategoryName_from_ul + "\n" + pos_tobeCopied + "\n" + ar_item_tobeCopied);

    var Cat_name_towhichtobeCopied = "Category__" + sel_value;
    var Cat_arr_towhichtobeCopied = JSON.parse( localStorage.getItem(Cat_name_towhichtobeCopied) );
    console.timeEnd("Copy_current_dial");

    ar_item_tobeCopied[0] = Cat_arr_towhichtobeCopied.length;     //the first pos of arr--item, will have to be changed.
    Cat_arr_towhichtobeCopied.push( ar_item_tobeCopied );

    localStorage.setItem(Cat_name_towhichtobeCopied, JSON.stringify(Cat_arr_towhichtobeCopied)); 
    console.timeEnd("Copy_current_dial");  //Returns 6.5ms approx.

    //Note: Imp!! -- As console shows-up very less--time--taken 6.5ms, I have reduced the timeout from 8000 to 2000, it should not be more than 1000.
    // If this goes well, make it less. 16April17
    window.setTimeout( function(){ 
        var btn = document.getElementById("Copy_current_dial");
        btn.removeAttribute("disabled");
        btn.innerHTML = "Copy<br>item"; 
    }, 2000) ; 

} //End of   ("#Copy_current_dial").onclick

document.getElementById("Move_current_dial").onclick = function() {   //#Copy_Category is a button
    console.time("Move_current_dial");

    //this.innerHTML = "Move<br>item";
    //this.removeAttribute("disabled");

    var sel_value = document.getElementById("CategoryName_Select").value;
    //Check whether this Category Exists, may-be it's name is Changed\Deleted. 
    //This is reqd. as I am putting Category--Names in Select, Manually.
    //Even if selected--Names are entered, in Select, using Javascript, this step will be useful.
    var CategoryNames_arr = JSON.parse( localStorage.getItem("CategoryNames_arr") );    
    var index_found = CategoryNames_arr.indexOf( sel_value );
                    console.log("index_found of Slected_CategoryName in Select--Control: " + index_found );
    if ( index_found == -1 ) { 
        alert( "the CategoryName selected in Select--Control,\n" +
                "does not exist.\nCheck for this Category in ul & lStorage, first.\n\n" +
                "I have entered options(CategoryNames) in Select, Manually. " +
                "So, there can be an error." );
        return;  skip();
    }
    
    var CategoryName_from_ul = $("#ul_CategoryNames_1 li.selected").text(); 
    var Cat_name = "Category__" + CategoryName_from_ul;

    if (sel_value===CategoryName_from_ul){
        alert("you have selected to move onto the same \n" +
            "Category :-  '" + CategoryName_from_ul + 
            "'\nin which you are present.\n\n" +
            "Select another Category_Name. & then try");
        var btn = document.getElementById("Move_current_dial");
        btn.removeAttribute("disabled");
        return;
    }    

    var Cat_arr = JSON.parse( localStorage.getItem(Cat_name) );

    var pos_tobeCopied = $("#Dial_id_no").text().substr(3);

    var ar_item_tobeCopied = Cat_arr[pos_tobeCopied];

            console.log(sel_value + "\n" + CategoryName_from_ul + "\n" + pos_tobeCopied + "\n" + ar_item_tobeCopied);
    console.timeEnd("Move_current_dial");

    var Cat_name_towhichtobeCopied = "Category__" + sel_value;
    var Cat_arr_towhichtobeCopied = JSON.parse( localStorage.getItem(Cat_name_towhichtobeCopied) );

    ar_item_tobeCopied[0] = Cat_arr_towhichtobeCopied.length;     //the first pos of arr--item, will have to be changed.
    Cat_arr_towhichtobeCopied.push( ar_item_tobeCopied );

    //Just one more step, in Addition to "#Copy_current_item" -- delete the dial--copied\Moved from current--Category + straightening of array
    Cat_arr.splice(pos_tobeCopied, 1); //At position 2, delete 1 item    
    //+ Straightening thru loop
    var loop_to_start_from_pos = pos_tobeCopied - 3;  //3 just taken, though 1 or nothing would have been ok.

        for(var i=loop_to_start_from_pos; i<Cat_arr.length; i++){

            Cat_arr[i][0] = i;

        }     //End of for--loop--straightening
        localStorage.setItem(Cat_name, JSON.stringify(Cat_arr));
        console.log( "just check for straightening & delete of dial, rest is ok", Cat_arr );

    localStorage.setItem(Cat_name_towhichtobeCopied, JSON.stringify(Cat_arr_towhichtobeCopied)); 
    console.timeEnd("Move_current_dial");

    window.setTimeout( function(){ 
        $("button#Move_current_dial, #Copy_current_dial, #Edit_Modify_btn, #Move_dial").attr("disabled", true);
        qs("button#Move_current_dial").innerHTML = "Moved<br>item"; 
    }, 1000); 

    $("#main_container_ka_sub_div_"+pos_tobeCopied).remove();  //Remove Dial, once the dial is Moved--in--lStorage

    /* the below closed on 20April17, when tooltip kept for this msg, delete in a few days.
        $("#Dial_Moved_msg").html( "Dial #"+ pos_tobeCopied +" Moved--Removed, from this Category." )
        .fadeIn().delay(6000).fadeOut();*/
    $(".mytooltip.myconfig_10").html( "Dial #"+ pos_tobeCopied +" Moved to-other-category, completed success!!" )
        .fadeIn().delay(3000).fadeOut();

    //setTimeout(function(){ $("#Edit_Dial_dialog_box").hide(); }, 2000);

    Refresh_Reload_Category(500);
    
} //End of   ("#Move_current_dial").onclick

var temp = 0;
document.getElementById("delete_Multiple_dials").onclick = function() {   //#Copy_Category is a button

    $("#div__delete_Multiple_dials").fadeIn("fast");
    temp = temp+1;

    var btn = $("#delete_Multiple_dials");
    var btn_same = document.getElementById("delete_Multiple_dials");

    if ( temp == 1 ) {                               //this.html == "delete Multiple dials" ) {

        btn.animate({ width: "250px", left: "-=15px" }, 300, function(){
            btn.html( "Enter dial_Nos, waiting..." ).css({ color: "rgb(205,0,0)" });
            temp = 35;
        })   //.delay(100);

        btn.animate({ right: "33px", fontSize: "+=2px", left: "+=15px" }, 500);

    } //End of if

    //this.setAttribute("disabled", "true");
    //"deleted dials";

    var the_textarea = document.getElementById("delete_Multiple_dials__textarea");

    the_textarea.oninput = function () {
        var len = $(this).val().length; 
        //$("#textarea_2__character_count").text( len );
                                                          //.height('2em'); also works
        if (len >= 1) { $("#delete_Multiple_dials").html("delete Dials"); console.log("oninput fired")  }
        if ( $(this).val() == "" ) { $("#delete_Multiple_dials").html("Enter dial_Nos, waiting..."); console.log("oninput fired")  }
    
    }


    //if ( btn_same.innerHTML == "Enter dial_Nos, waiting..." ) {  //this is coming 'true' on Chrome--console, but not from here, they are stopping it, for sure.

    var condition1, condition2A, condition2B, condition3, condition4;

    if ( temp >= 35) {

        console.log( the_textarea.value.trim(), the_textarea.value.trim().length, the_textarea.value.trim().indexOf("--") );


        //condition 1 -->> "--" should be present && condition 2 -->> length should be > 3
        // && condition 3 -->> which automatically comes from condition 1 -->> indexOf "--" should not be 0
        if ( the_textarea.value.trim().indexOf("--") > -1 && the_textarea.value.trim().length > 3 ) {  //-1 means not indexOf

            var arr_of_2 = the_textarea.value.trim().split("--");

                                            //condition 4, Note: condition 4 only exists, if the previous 3 are there
                                            //var pos_of_two_dashes = the_textarea.value.trim().indexOf("--");
            if ( arr_of_2[0] !== "" && arr_of_2[1] !== "" ) { 
                console.log("internal--con 1 is ok");
                condition1 = "ok";
            }
            else{ console.log( "arr_of_2[0]: " + arr_of_2[0], "arr_of_2[1]: " + arr_of_2[1] );
                alert( "dial Nos. not Entered properly. -- internal--if se3"); 
            }

            if (arr_of_2.length == 2) { 
                            console.log("internal--con 1 is ok");
                            condition1 = "ok";

                            var arr_of_2__pos_0 = Number(arr_of_2[0].trim() );
                            var arr_of_2__pos_1 = Number(arr_of_2[1].trim() );
                            if (isNaN(arr_of_2__pos_0) ) { console.log("arr_of_2[0] is NaN -- not a number", arr_of_2__pos_0, arr_of_2[0].trim() );
                                alert( "dial Nos. not Entered properly. -- internal--if se1A \nThese are not numbers");
                            }
                            else{  //if these successfully convert into numbers
                                arr_of_2[0] = arr_of_2__pos_0;
                                console.log("internal--con 2A is ok", arr_of_2[0], typeof arr_of_2[0] );
                                condition2A = "ok";
                            }

                            if (isNaN(arr_of_2__pos_1) ) { console.log("arr_of_2[1] is NaN -- not a number", arr_of_2__pos_1, arr_of_2[1].trim() );
                                alert( "dial Nos. not Entered properly. -- internal--if se1A \nThese are not numbers");
                            }
                            else{
                                arr_of_2[1] = arr_of_2__pos_1;
                                console.log("internal--con 2B is ok", arr_of_2[0], typeof arr_of_2[1] );
                                condition2B = "ok";
                            }
            }
            else{ console.log("arr_of_2.length: " + arr_of_2.length + " -- problem form else1");
                alert( "dial Nos. not Entered properly. -- internal--if se1"); }

            /*if ( Number.isInteger( arr_of_2[0] ) == true && Number.isInteger( arr_of_2[1] ) == true ) { console.log("internal--con 3 is ok")}
            else{ console.log( Number.isInteger(arr_of_2[0]), Number.isInteger(arr_of_2[1]), arr_of_2[0], arr_of_2[1], typeof arr_of_2[0] );
                alert( "dial Nos. not Entered properly. -- internal--if se3"); }*/

            if ( arr_of_2[1] > arr_of_2[0] ) { 
                console.log("internal--con 4 is ok");
                condition4 = "ok";
            }
            else{ console.log( arr_of_2[1], arr_of_2[0] );
                alert( "dial Nos. not Entered properly. -- internal--if se4"); 
            }

            //final All ok -- alert msg
            if ( condition1 == "ok" && condition2A == "ok" && condition2B == "ok" &&
                condition3 == "ok" && condition4 == "ok" ) { 

                    alert("dial Nos. Entered properly, All conditions met.");
            }

                //console.log( "dial Nos. properly Entered", arr_of_2.length, arr_of_2 );
         //End of if  //condition 4
            /*else{
                alert( "dial Nos. not Entered properly. -- internal--if se");
                console.log( "arr_of_2 ki length: "+arr_of_2.length +"\n", 
                    arr_of_2[0]+", " + arr_of_2[1] );
            }*/
        }
        else{
            alert( "dial Nos. not Entered properly.\nEnter Again");
            //console.log( "dial Nos. not Entered properly.",  );
        }

        
    }



    /*var sel_value = document.getElementById("CategoryName_Select").value;
    
    var CategoryName_from_ul = $("#ul_CategoryNames_1 li.selected").text(); 
    var Cat_name = "Category__" + CategoryName_from_ul;

    var Cat_arr = JSON.parse( localStorage.getItem(Cat_name) );    */

} //End of func  #delete_Multiple_dials.onclick


/*  Pending in association to--with above func
try this also + Make a permanent func
The below text taken from webpage:
html - Check if input is number or letter javascript - Stack Overflow
http://stackoverflow.com/questions/18042133/check-if-input-is-number-or-letter-javascript

A better(error-free) code would be like:

function isReallyNumber(data) {
    return typeof data === 'number' && !isNaN(data);
}

This will handle empty strings as well. 
Another reason, isNaN("12") equals to false but "12" is a string and not a number, 
so it should result to true.



Use Regular Expression to match for only letters. It's also good to have knowledge about, if you ever need to do something more complicated, like make sure it's a certain count of numbers.

function checkInp()
{
    var x=document.forms["myForm"]["age"].value;
    var regex=/^[a-zA-Z]+$/;
    if (!x.match(regex))
    {
        alert("Must input numbers");
        return false;
    }
}
Even better would be to deny anything but numbers:

function checkInp()
{
    var x=document.forms["myForm"]["age"].value;
    var regex=/^[0-9]+$/;
    if (x.match(regex))
    {
        alert("Must input numbers");
        return false;
    }
}
*/

/* 23March17, contextmenu Added */
function Attach_events(){
        var menu = $("div#contextmenu");

        var t;  var title_id_no;
    $(".sub_div_Count_Nos").each(function(){
        $(this).mouseenter(function(event){
                // #1  -- get id_no attr, of the item, on which-Dial_No, mouseenter's\hovers.
            title_id_no = this.getAttribute("id_no");
            console.log( title_id_no, this.id );
                // #2  -- reset menu
            t = setTimeout(function(){
                menu.css({ left: event.pageX-150, top: event.pageY+10, display: "" });  //display becomes none on every fadeOut(); So, made "" on taking pos.
                console.log("Left: " + event.pageX + " Top: " + event.pageY);
            }, 1300);
        })
        .mouseout(function(){ console.log("mouseout", t);  clearTimeout(t); });

    });

    $("div#main_container_div").on("click", function(){  //mouseleave works, but on-menu-hover, it fadeOut, as menu is outside #main_container_div. mouseout does notwork, use mouseleave here.
        menu.fadeOut("fast");
        qs("div#saved_on_google_drive").innerText = "save on google drive";
    });

    // the below idea of g-drive closed on 13May17
    qs("div#saved_on_google_drive").onclick = function(){
        // #1  -- addClass
        $("#title_"+title_id_no).addClass("saved_only_on_google_drive");

        // #2  -- save to lStorage--Dial
        var Category_from_ul = "Category__" + $("#ul_CategoryNames_1 li.selected").text(); 
        var Category_ar_retrieved = JSON.parse( localStorage.getItem(Category_from_ul) );
        var arr = Category_ar_retrieved;
        var dial = arr[title_id_no];
            console.log( arr, dial);
        // #2.1  -- check for same dial, thru title-&-url compare
        if ( $("#title_"+title_id_no).html() == dial[1] &&
             qs("#href_"+title_id_no).href   == dial[2]      ){ 

            // modifiy\update dial
            dial[5] = "g_drive";
            console.log("same", dial);
        }
        else{ console.log("reload F5 & then do contextmenu, DOM_dial & lStorage_dial are diff."); }

        // #2.2  -- final save thru setItem
        localStorage.setItem(Category_from_ul, JSON.stringify( arr ));
        this.innerHTML = "save-d<br>on google drive";

    }
}//End of Attach_events()



document.addEventListener('DOMContentLoaded', function () {
    //$("#CategoryNames_div_on_left_side").empty();
    setTimeout(Load_All_Categories_Into_ul_CategoryNames, 200);
    //temporarily fading--out the below, will find a solution later, 29April16
    setTimeout(function(){ $("#Delete_Dial_Confirmation_msg").delay(1000).fadeOut() }, 300);
    setTimeout(Load_Settings__on_Ext_page_load, 200);
    //Edit_Dial();
    //setTimeout(Attach_events, 1000); this was working fine, but now, done from func 'Load_All_Categories_Into_ul_CategoryNames'
}); 
