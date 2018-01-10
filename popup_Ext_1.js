//Started as Ext. to popup.js , on 22Dec16

/*  the below pen specifically, made for the below functionality.
$(selector).each(function... Usage (thru SpeedDial_Sac example)
http://codepen.io/sahni4you/pen/VmOWxJ?editors=1011     */
document.getElementById("btn_CopyTo_category").addEventListener("click", function(){
    $("div#copyTo_Another_Category").slideToggle();
});
/*
var these_divs = $("div.search_res_divs_found");
for (var i=0; i<these_divs.length; i++) {
    these_divs[i]
}

<input type="checkbox" class="for__copyTo_Cat" style="
    vertical-align: -2px;
">

$("div.search_res_divs_found").

*/


            /*  How To Create a Filter/Search List
                http://www.w3schools.com/howto/howto_js_filter_lists.asp   */
//Code for filter thru input, from w3schools Modified
    var input_ta__for_ul = document.getElementById('filter_ta__for_ul');  //Global var
function filter_li() {
                        //variables used
                var search_txt, li, li_txt, i, cnt = 0;  //filter is nothing, search_txt, just ta_ka_txt -- #ta.val()
                        
    search_txt = input_ta__for_ul.value.toLowerCase();
    li = $("#ul_CategoryNames_clone li");               //get li  (each)

    // Loop through all li items, and look for search_txt in each li_txt. hide which don't match the search_txt
    for (i = 0; i < li.length; i++) {
        li_txt = li[i].innerText.toLowerCase();         //this is  each li_txt

        if (li_txt.indexOf(search_txt) > -1) {          //if found
            li[i].style.display = ""; 
            cnt++;
        } 
        else {
            li[i].style.display = "none";               //hide the li
        }
    }//End of  for--loop

    $("span#no_of_li_found").text(cnt);

}//End of  func filter_li()

input_ta__for_ul.onkeyup = filter_li;






                        //button
document.getElementById("searchfilter_li").onclick = function(){
    $("div#filter_input_container").toggle(200);
    $("#filter_input__for_ul_0").focus();
}

/*  works ok but closed, need diff. functionality   
                       //button
document.getElementById("searchfilter_li").onblur = function(){
    $("textarea#filter_ta__for_ul1").hide("clip");
}*/

            /*  How To Create a Filter/Search List
                http://www.w3schools.com/howto/howto_js_filter_lists.asp   */
//Code for filter thru input, from w3schools Modified
    var input__for_ul = document.getElementById("filter_input__for_ul_0");  //Global var
function filter_li_0() {
                        //variables used
                var search_txt, li, li_txt, i, cnt = 0;  //filter is nothing, search_txt, just ta_ka_txt -- #ta.val()
                        
    search_txt = input__for_ul.value.toLowerCase();
    li = $("#ul_CategoryNames li");               //get li  (each)

    // Loop through all li items, and look for search_txt in each li_txt. hide which don't match the search_txt
    for (i = 0; i < li.length; i++) {
        li_txt = li[i].innerText.toLowerCase();         //this is  each li_txt

        if (li_txt.indexOf(search_txt) > -1) {          //if found
            li[i].style.display = ""; 
            cnt++;
        } 
        else {
            li[i].style.display = "none";               //hide the li
        }
    }//End of  for--loop

    $("span#no_of_li_found0").text(cnt);

}//End of  func filter_li()

input__for_ul.onkeyup = filter_li_0;






/* ----------------- */
var img_data = "nothing captured";
function img_Capture() {

    //setTimeout(Capture_and_msg, 1000);

    chrome.tabs.captureVisibleTab(null, { format : "png", quality : 100 }, function(img_coded_in_alphabets___data) {
            var img_data = "nothing captured";
        img_data = img_coded_in_alphabets___data;
        console.log( img_data );

            var image = new Image(); 
            image.src = img_data;
            //image.onload = function() { 
                var canvas = document.createElement("canvas");
                canvas.width = image.width-22;
                canvas.height = image.height;
                var context = canvas.getContext("2d");
                context.drawImage(image, 0, 0);             //http://www.w3schools.com/html/html5_canvas.asp  http://www.w3schools.com/tags/canvas_drawimage.asp
                                                    //http://www.w3schools.com/canvas/canvas_coordinates.asp
                img_data = canvas.toDataURL();   //}

        //chrome.tabs.executeScript({ code: "document.querySelector('#ta_img').value=" + img_coded_in_alphabets___data });
        //chrome.tabs.executeScript({ code: "console.log(" + img_data + ")" });


        //setTimeout(function(){
                var imgName = $("textarea#img_Name").val();

                var obj = { greeting: "s_shot_from_popup", s_shot_data: img_data, imgName: imgName };  
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, obj );   //message should be a JSON-ifiable object, as per chrome-webpage  https://developer.chrome.com/extensions/runtime#method-sendMessage
            });
        //}, 2000);

        chrome.tabs.executeScript({ code: "$('#imgCapture_container_div43, #img_marque').css({ visibility: 'visible' })" });

    });


}//End of func  function img_Capture()



            //checkbox
$("input#take_scr__thru_tabsExecute").one("click", function(){ 
    
    //for executing once_only(), session_Storage key--check is used. 
    //if (sessionStorage.tabs_executeScript_once_only_popup_se===undefined){
        //sessionStorage.tabs_executeScript_once_only_popup_se = "yes, func ran once";
        qs("input#Q_and_take_scr__thru_tabsExecute").disabled = true;
        execute_Script_once_only(); 
    //}

    /* the below setTimeout was working ok, but closed, will be executed from tabs_query...js
    setTimeout(function(){
            var obj = { greeting: "check_for__once_div" };  
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, obj, function(response){
                    console.log(response.div_present);  //Returns 1
                } );   //message should be a JSON-ifiable object, as per chrome-webpage  https://developer.chrome.com/extensions/runtime#method-sendMessage
        });
    }, 1000);*/

    //this closed on 19Feb17 & by it Capture--thru--popup.html also closed. Now, background.js will take the capture, when msg passed from 'tabs_executeScript wali content_script' to background.js
    //setTimeout(img_Capture, 500);
});
function execute_Script_once_only() {

    chrome.tabs.executeScript({ file: 'tabs_executeScript.js' }, function(){ 
        //send_imgName__to_content_script();  even this callback did not work, So, closed it & put Timeout on it. See, below line.
        setTimeout(send_imgName__to_content_script, 400);
    });

    //setTimeout(send_imgName__to_content_script, 400);  // 200 I had kept for around 1-2 months. because of that imgName sometimes, didn't use to come. 400 solved the prob.

    function send_imgName__to_content_script(){

        var imgName = qs("textarea#img_Name").value;

            var obj = { greeting: "imgName_from_popup", imgName: imgName };  
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, obj );   //message should be a JSON-ifiable object, as per chrome-webpage  https://developer.chrome.com/extensions/runtime#method-sendMessage
        });
    }

    //var del_var = "imageABC";    

    //The below works, but 'tabs_execute.js' works, So, used the above line Instead.
    //chrome.tabs.executeScript({ code: 'document.body.style.backgroundColor="red"' });
    //chrome.tabs.executeScript({ code: "document.querySelector('#myta').value=" + del_var });  //'samosa'

    //chrome.tabs.insertCSS({file: 'mycssfile.css' });
} //End of func test_executeScript()




qs("input#append_ytb_address").onclick = function(){
    var val = qs("textarea#img_Name").value.split(".")[0];
    var val_to_append = qs("textarea#textarea_2").value.split("watch?v=")[1];
    if (val_to_append.includes("&list")) { val_to_append = val_to_append.split("&list")[0]; }
    qs("textarea#img_Name").value = val + " - ytb " + val_to_append + ".png";
}

qs("input#only_ytb_address").onclick = Append_only_ytb_address;
function Append_only_ytb_address(){
    var ta_value = qs("textarea#textarea_2").value;

    var val_to_append = ta_value.split("watch?v=")[1];
    
    if (val_to_append.includes("&")) { 
        var start  = ta_value.indexOf("?v="); 
        var end  =   ta_value.indexOf("&");
        val_to_append = ta_value.slice(start+3,end);
    }
    qs("textarea#img_Name").value = "ytb " + val_to_append + ".png";
}


            //checkbox -- html & js -- newly Added on 1oct17
$("input#Q_and_take_scr__thru_tabsExecute").one("click", function(){ 
    Append_only_ytb_address();
    qs("input#take_scr__thru_tabsExecute").disabled = true;
    execute_Script_once_only();
}); 



qs("div#open_downloads_folder").onclick = function(){
    chrome.downloads.showDefaultFolder();
}

qs("div#close_popup").onclick = function(){
    window.close();
} 

qs("div#open_chrome_downloads").onclick = function(){
    chrome.tabs.create({ url: "chrome://settings/search#download" });
}