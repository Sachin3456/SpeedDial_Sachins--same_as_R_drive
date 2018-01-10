/* This Dynamic link was fully working, but closed
function dumpBookmarks() {
 var anchor = $('<a>');
    anchor.attr('href', "http://www.google.co.in");
    anchor.text("Google dynamic");
    /*
     * When clicking on a bookmark in the extension, a new tab is fired with
     * the bookmark url.
     */
 /*    anchor.click(function() {
      chrome.tabs.create({url: "http://www.snapfiles.com"});
    });

    $('#bookmarks').append(anchor);

 }
*/

/*
  $(document).ready(function () {       //This is a try. Change this or better close it.

  }); // End of main--ready--fn
*/

function qs(x) { return document.querySelector(x);  }
function qsa(x){ return document.querySelectorAll(x);  }
function gid(x){ return document.getElementById(x);  }

var Settings_some_to_decide_not_used = [];  //Global
var options__fol_Name_arr = []; //Global

// Imp!! Note: these var are available on console.
// their value after calculation\use-in-a-func can be seen, 
// from Inspect--popup console.
// these are available in autocomplete list. just type Ca.... & console autocomplete will show this var Name & current value.
var my_title = "var my_title - Start_value nothing by Sac";      //Global var 
var my_url = "";      //Global var 
    // the below var is only used in func onPopup() & in-it multi-search
var Category_url = "";  //Global var  

var textarea_1 = document.getElementById("textarea_1");  //Global -- used in textarea_1.oninput Event
var textarea_2 = document.getElementById("textarea_2");  //Global

var tab_title = "var tab title nothing Sac";    //Global check whether used or should be deleted.

//var obj, obj_1, obj_2;

var res_arr_found = [];   // Global  -- This was already existing, but for Editing-in-popup, put here as Global
//This was\is being used in  func onPopup() -- in multi--Cat--search func

var url_found__or__search_res_arr = [];   // Global  -- created on 19May17 for new Method

var id, windowId, tab_index;   //Global     //function onPopup() ke liye

//var Settings = { "Initial_Date": "6 April 16" };

/* The below taken from this extension,  try currentWindow: true & loop to get all tabs
Tabsets - Chrome Web Store
https://chrome.google.com/webstore/detail/tabsets/ifohmndbcefggppiblfofpbkmdfmeing
chrome.tabs.query({ currentWindow: true },function(tabs) {
    for (var tabIx = 0; tabIx < tabs.length; tabIx++) {
                var tab = tabs[tabIx];
                tablist.push({
                    title: tab.title,
                    url: tab.url
                });
});
*/

/* lly, see this extension for Chrome bookmarks
FreshStart - Cross Browser Session Manager - Chrome Web Store
https://chrome.google.com/webstore/detail/freshstart-cross-browser/nmidkjogcjnnlfimjcedenagjfacpobb
*/

function onPopup() {
                    //https://developer.chrome.com/extensions/tabs#method-query
                    //https://developer.chrome.com/extensions/tabs#type-Tab
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (arr_of_tabs) {
        // Since there can only be one active tab in one active window, 
        //  the array has only one element
        my_title = arr_of_tabs[0].title;
        my_url = arr_of_tabs[0].url;
        id = arr_of_tabs[0].id;  windowId = arr_of_tabs[0].windowId; tab_index = arr_of_tabs[0].index;
          //$("#result").html(my_title + "<br>" + my_url + "<br>" + id + "<br>windowId -- " + windowId + "<br>" + tab_index);
        $("#result_1").html("Tab-id --> " + id + " , windowId -- " + windowId + " , tab_index -- " + tab_index + " (" + (tab_index+1) + "th)");
        $("#textarea_1").val(my_title); 
        $("#textarea_1__character_count_1").html( my_title.length );                           //var textarea_1_txt =
        if ( my_url.indexOf("file://")!==-1 ) {  // file-url
            qs("#textarea_2").value = decodeURI(my_url);
        }
        else { qs("#textarea_2").value = my_url;  }
        font_size_for_textarea_1();

        chrome.bookmarks.search(my_url, function (bmk){
            $('#No_of_bMarks').html( bmk.length );
        });

    }); // End of func -- chrome.tabs.query

            /* console.log( $("#textarea_1").val().length );  This gives the no. of characters, on 'Inspect popup'   http://www.jquerytutorials.net/jquery-textarea.html -- string.length has been used (Simply)*/
    function font_size_for_textarea_1(){
        /*   10Sep16
            Instead of console.log, the next line-- is more Good for console
            $("#textarea_1").after( $("<div></div>").html( my_title.length ).css({ font: "bold 24px Calibri" }) );
            

                Imp !!!!!!!!!
                10Sep16 -- by above 2 Closed lines, I have checked-&-Confirmed that 
               "my_title.length"--or--"var my_title" is Available in this function, without any prob
               OR any setTimeout func
        */
        /*  The below 3-lines are Old Code -- Closed on 10Sep16
            if (my_title.length < 50) { $("#textarea_1").css({"font-size": "20px", "max-height": "28px"})}
            if (my_title.length < 35) { $("#textarea_1").css({"font-size": "24px", "max-height": "33px"})}
            if (my_title.length < 30) { $("#textarea_1").css({"font-size": "26px", "max-height": "36px"})}
        */
        var len = my_title.length; 

        if (len < 37) {  //earlier it was 30
            $("#textarea_1").css({ "font-size": "26px" }); 
            //if ( $("#textarea_1").attr("rows") == 2 ) { $("#textarea_1").attr("rows", "1") }
            console.log( "cond1 -- len<37 -- true" );
        }
        else if (len < 50) {  //earlier it was 43
            $("#textarea_1").css({ "font-size": "23px" }); 
            //if ( $("#textarea_1").attr("rows") == 2 ) { $("#textarea_1").attr("rows", "1") }
            console.log( "cond2 -- len<50 -- true" );
        }
        /*   this condition closed
            else if (len < 53) { 
                $("#textarea_1").css({ "font-size": "20px" }); 
                //if ( $("#textarea_1").attr("rows") == 2 ) { $("#textarea_1").attr("rows", "1") }
                console.log( "cond3 -- len<53 -- true" );
            }        
        */
        else if (len <= 58) {  //earlier it was 63 
            $("#textarea_1").css({ "font-size": "20px" }); 
            //if ( $("#textarea_1").attr("rows") == 2 ) { $("#textarea_1").attr("rows", "1") }
            console.log( "cond4 -- len<=60 -- true" );
        }
        else if (len > 58) {  //earlier it was 63
            $("#textarea_1").css({ "font-size": "20px" });
            //onPop, 'rows=1' will automatically-be, as set in popup.html, still if given
            if ( $("#textarea_1").attr("rows") == 1 ) { $("#textarea_1").attr("rows", "2") }
            console.log( "cond5 -- len>60 -- true" );
        }
            /*if (len > 64) { 
                //textarea_1.setAttribute( "rows", "2" );
                textarea_1.style.cssText = "height: 2.8em";
                $("#textarea_1__character_count_2").html( " (2)" );
                var ta_1_ki_height = $("#textarea_1").height()-6;  //-6 is approximation, with -6 the position shifted shows-up ok.
                //Math.floor(x)  Rounds a number downward to its nearest integer:
                //Math.floor has been used, in case, height is an odd number.
                ta_1_ki_height = Math.floor( ta_1_ki_height/2 );  //JavaScript floor() Method  http://www.w3schools.com/jsref/jsref_floor.asp
                $("#two_textarea_s, #div_chkbox_png_or_jpg__reset_btn").css({ top: "+="+ta_1_ki_height });  

                //console.log( $("#two_textarea_s).css("top") );
            }
*/

    }  //End of  func font_size_for_textarea_1()



function Already_exists__will_be_Duplicate(){
    //pending make it like this --->> "func indexOf_item_0() , for SpeedDial Sac"

    //function Already_exists( my_url, array_Name) {}  this will output, as return, what 'var msg' is giving-out.


    var CategoryName = "HTML Dom NodeList";
    var CategoryName_Full = "Category__" + CategoryName;

    var Category__arr_retrieved = JSON.parse( localStorage.getItem( CategoryName_Full ) );
            console.log( my_url +"\n", Category__arr_retrieved );
    var msg = "";  var msg_txt = "";

    for (var i=1; i<Category__arr_retrieved.length ;i++){    //starts with 1 not 0, as needed not search 1st item, which is fixed, kept by me.

        var t = Category__arr_retrieved[i].indexOf( my_url );   
                                              
        if (t==-1){  //msg = " -- Not found"; console.log("t is -1", t, i); 
        }
        else      {  msg += i + ", "; console.log("else", t, i);     }           //t in this case will always be 2, i.e., 3rd item in the array. t is not reqd. Therefore, not taken.
    }                                           //End of for--loop    
        
        if (msg == "") { msg_txt = msg + " &nbsp;&nbsp;&nbsp;&nbsp; x-x-x-x-x";   }
            //pending -- keep a x--round shaped img in this case & tick-right in else case. 
        else {
            msg_txt = "already exists, @No.:-- " + msg;
            $('#div_4').css({"background-color": "yellow"})
        }
        
        $('#div_4_1').html( msg_txt );   //pending -- Add a span to #div_4, for CategoryName. Adjust the result in 1 line.
        //Note: Imp!! #div_4_2 is now not a span, I have changed div_4 in popup.html, on 16Sep16, multi--search works ok on that, but this Single--Category search, will have to see, for changes.
        $('#div_4_2').html( CategoryName );

        
        //chrome.browserAction.setBadgeText({text: '5' }); works but should work without popup.

}  //End of func Already_exists__will_be_Duplicate()    

//setTimeout(Already_exists__will_be_Duplicate, 800);




/*    var Categories_to_search_arr = ["w3Schools_Imp_test1", "HTML Dom NodeList", 
    "Array Methods", "jQuery Methods", "Codepen", "Sitepoint", "chrome ext. API related",
    "CSS Effects + Pure Css elements", "HTML tags & their common attributes"];    */
    //console.log( Categories_to_search_arr, Categories_to_search_arr[0], Categories_to_search_arr.length );
    var Categories_to_search_arr = [];

    function get_ls(){
        var Cat_GroupNames_arr = JSON.parse( localStorage.getItem("Cat_GroupNames_Active_arr") );
                        console.log( Cat_GroupNames_arr, Cat_GroupNames_arr.length );
        Categories_to_search_arr = Cat_GroupNames_arr[1];
    }
    //setTimeout(get_ls, 100);
    get_ls();

    function location_href_rules() {  //Note:  location.href = myurl
                                    //Added a new-rule, just-to-start-rules for search
        var Cat_name_to_Add_in_search_arr = "teluguone.com";

        //first-check, whether this name, exists in Cat_arr
                    var CategoryNames_arr = JSON.parse( localStorage.getItem("CategoryNames_arr") );
        if ( CategoryNames_arr.indexOf( "teluguone.com" ) === -1 ) { return }

        //check in 'Categories_to_search_arr', if already Added. Cancelling duplicates.
        if ( Categories_to_search_arr.indexOf( "teluguone.com" ) !== -1 ) { return }

        //console.debug("passed func location_href_rules", "my_url: " +my_url);
        if ( my_url.includes("www.teluguone.com") ) {
            Categories_to_search_arr.push("teluguone.com");
                                    console.debug(Categories_to_search_arr, my_url);
        }
                                    //console.debug(Categories_to_search_arr, my_url);
    }//End of func location_href_rules();
    setTimeout(location_href_rules, 50);  //when did 50ms, then got myurl, otherwise I was getting myurl -- nothing\empty

function Already_exists__will_be_Duplicate_multi(){
    //pending make it like this --->> "func indexOf_item_0() , for SpeedDial Sac"

    //function Already_exists( my_url, array_Name) {}  this will output, as return, what 'var msg' is giving-out.
    console.log( "'Categories_to_search_arr':   (len: " + Categories_to_search_arr.length + ")\n" +
        "(this arr shows, the No. of Categories to search for 'url' of the Tab, on which popup.html is opened\popped-up)\n",
        Categories_to_search_arr );

    var res_arr = [];    var res_arr__not_found1 = [];  var res_arr__found1 = [];

for(var ii=0; ii<Categories_to_search_arr.length ;ii++){

    var CategoryName = Categories_to_search_arr[ii];
            //Imp!! Breakpoint  console.log( ii, CategoryName );
    var CategoryName_Full = "Category__" + CategoryName;

    var Category__arr_retrieved = JSON.parse( localStorage.getItem( CategoryName_Full ) );
            //Imp!! Breakpoint console.log( my_url +"\n", Category__arr_retrieved );
            //Use together with the above breakpoint

    var found_at_pos = "";   var t = -1;      /* delete this  var msg_txt = "";  after 3-4 days, written here on 3 Jan16 */
    var found_at_pos_arr = [];
    var full_dial_arr = [];

    for (var i=1; i<Category__arr_retrieved.length ;i++){    //starts with 1 not 0, as needed not search 1st item, which is fixed, kept by me.

        //this was working ok, till 29Nov16, from today onwards, reversed
        //Also, indexOf was not reqd. as, after Adding [2], the item is fixed. Just, string==equality, needs to be checked.
        //var t = Category__arr_retrieved[i][2].indexOf( my_url );     //[2] is also Added, today on 29Nov16

        //on 9March17, w3s ke liye filter Add karna tha, as it changed from http to https. but changed for--all.
        //from Now-on, http or https, will be truncated, before compare-all.  just the web-address will be. starting with www or simply codepen.io
        if ( my_url.indexOf("file://")!==-1 ) {  // file-url
            my_url = decodeURI(my_url);
        }
        else if ( my_url.indexOf("://")!==-1){ 
            var ind = my_url.indexOf("://");
            my_url = my_url.substr( ind+3 );  
        }
            /*  delete this in a few days
            var ind = my_url.indexOf("://");
            if (ind!==-1){ my_url = my_url.substr( ind+3 );  }*/

            // Category_url is now a Global--var.
        Category_url = Category__arr_retrieved[i][2]; //Note: .trim() knowingly, not added because, when Add_Dial()\bMark, All textarea.val().trim() You can check func Add_Dial();

        if ( Category_url.indexOf("file://")!==-1 ) {
            // Do nothing, as Now, this is done at the very beginning of this popup.js, in func onPopup(), in chrome.tabs.query....
            //console.log(my_url, Category_url);
        } // file-url 
        else{
            var indx = Category_url.indexOf("://");
            if (indx!==-1){ Category_url = Category_url.substr( indx+3 );  }
            //console.log(my_url, Category_url);
        }


        //new--rule, only for Category--"Codepen" & other 2 Categories
        //Note--Imp!! -- don't 'www.codepen.io' -- as codepen location shows https://codepen.io -- www.--is not there.
        if (my_url.includes("codepen.io") || my_url.includes("www.imdb.com/media/") || my_url.includes("jsbin.com") ) {
        //if (CategoryName == "Codepen" || CategoryName == "IMDB --2" || CategoryName == "IMDB Sel Tabs (sets)") {
            //my_url = my_url.split("?")[0];  //Note: Even-if  "?" is not there in my_url, split gives array of length--1, the str, here my_url itself.
            
            Category_url = Category_url.split("?")[0];
            t = my_url.indexOf( Category_url );   //my_url is searched-for  "Category_url"  -- it is seen whether Category_url is a subset of my_url
        }
        else if ( my_url.includes("youtube.com") ){    //this rule is for youtube playLists, which have a long Address, like
            // https://www.youtube.com/watch?v=uni0gUepfrU&list=PL6QWETLD1PclJnAS3YlvZANJwO2YN3lJe&index=25

            Category_url = Category_url.split("&list")[0];
            t = my_url.indexOf( Category_url );   //my_url is searched-for  "Category_url"  -- it is seen whether Category_url is a subset of my_url   
        }
        else {
                                                    //var t = my_url.indexOf( Category__arr_retrieved[i][2] );   //.indexOf Closed on 3 Jan17
            t = "not_found";  //if found, t will be changed by next-line, otherwise will remain "not_found", on each-round-of-loop
                //  //Note: .trim() knowingly, not added to 'Category__arr_retrieved[i][2]' because, when Add_Dial()\bMark, All textarea.val().trim() You can check func Add_Dial()
            if (my_url===Category_url) { t = "found"; } 
        }
                                                    //if (t==-1){}    //msg = " -- Not found"; console.log("t is -1", t, i); 
        if (t > -1 || t==="found") {     //if found
            found_at_pos += i + ", "; 
            found_at_pos_arr.push(i);
            full_dial_arr.push( Category__arr_retrieved[i] );
            console.log(t, i, CategoryName, my_url, Category_url, Category__arr_retrieved[i][2].trim() );  //t in this case will always be 2, i.e., 3rd item in the array. t is not reqd. Therefore, not taken.
        } 

    }  //End of inner for--loop    

    //Check for a url -- this did not work, 8April17 -- delete in some days
    //if ( my_url.includes("mavrick") ) { console.log(t, i, CategoryName, my_url, Category_url, Category__arr_retrieved[i][2].trim() );  }

    res_arr.push( found_at_pos + " --__-- " + CategoryName );    //The 'res_arr' will be shown with dynamic el, in #div_4

    if (found_at_pos != ""){
        // the url found in these categories, at dial_nos 
        url_found__or__search_res_arr.push( { Cat_name: CategoryName, dial_no: found_at_pos_arr, full_dials: full_dial_arr } );
    }
    //console.table( search_res_arr )

    if (found_at_pos===""){ res_arr__not_found1.push(CategoryName); }
    //Try  var myobj = {pos: , Cat_name: }  & push myobj in below arr. Then get items like arr[0].pos & arr[0].Cat_name -- this way no need to split()
    //See, this Chrome Snippet F12 -- 'Array & obj -- res of search -- SpeedDial_Sac'
    else { res_arr__found1.push(found_at_pos + " --__-- " + CategoryName); }

}  //End of outer for--loop  

    /*console.log( "res_arr.length: "+res_arr.length +"\n", "res_arr: \n" +res_arr, 
        "\n"+"res_arr__not_found1: " + res_arr__not_found1,
        "\n"+"res_arr__found1: " + res_arr__found1 );  */

    //The 'res_arr' will be shown with dynamic el, in #div_4
                            //var res_txt = "";  this variable Closed on 16Sep16, was not being used, can be deleted later
    
    //res_arr broken into 2 arrays, below, which will be processed to show the result of search
    //var res_arr_found = [];  //This var\arr, made Global on 26Oct16
    var res_arr_not_found = []; 
    res_arr.forEach(function(item,index) {
        //console.log( item , index );
        
        var item_split = item.split("--__--");
        var t0 = item_split[0].trim();
        var t1 = item_split[1].trim();
        if (t0.length===0){ res_arr_not_found.push( item )  }
        else              { res_arr_found.push( item )      }
    });
    //console.log( res_arr_found.length, res_arr_not_found.length )
    console.log( res_arr_found, res_arr_not_found )

    res_arr_found.forEach(function(item,index) {
        var item_split = item.split("--__--");
        var t0 = item_split[0].trim();
        var t1 = item_split[1].trim();

        /* Closed on 17Jan17
            var No_of_comma_s = t0.split(",");
            console.log( "'"+t0+"' \n", "'"+No_of_comma_s[0]+"'", "'"+No_of_comma_s[1]+"'", "'"+No_of_comma_s[2]+"'" );
            if ( No_of_comma_s.length>1 ) {  //this happens, when an url is present, more than 1 times, in a Category
                console.log("url more than 1 times, in :" + t1, No_of_comma_s.length-1 + " times." );
            }     */

        var li = $("<li>").text( t0 ).addClass("count");
        var span = $("<span>").text( t1 ).addClass("CategoryName_found");
        var div = $("<div>").append( li ).append( span ).addClass("search_res_divs_found")
                        // this onclick Added on 11May17
                        // Imp!! -- See, Load_Settings__on_Ext_page_load() mein scrollTo__dial_no();  which gets fired from the below onclick--event
                    .click(function(){
                        var Cat_name = this.children[1].innerText.trim();
                        var dial_no = this.children[0].innerText;
                            var m = dial_no.indexOf(",");
                        dial_no = dial_no.slice(0, m);

                        console.log(Cat_name, dial_no);

                                        //Save li.selected to lStorage, So, that it can be loaded on Main_Speed_Dial--page Reload & F5, thru func 'Load_Settings__on_Ext_page_load()'
                                        //the below code for lStorage, taken as it is, from  'func Load_All_Categories_Into_ul_CategoryNames()' -- 'Main_SpeedDial_page.js'
                        var obj_MSDial_Settings = JSON.parse(localStorage.getItem("obj_Main_Speed_Dial_Settings"));
                        obj_MSDial_Settings["last__li_selected_text-Name"] = Cat_name; //$(this).text();

                            var Cat_arr = JSON.parse( localStorage.getItem("CategoryNames_arr") );
                            //console.log( Cat_arr.indexOf(Cat_name) );
                        var li_id = "li" + Cat_arr.indexOf(Cat_name);
                        obj_MSDial_Settings["last__li_selected_id"] = li_id;    //$(this).attr("id")
                        obj_MSDial_Settings.scrollTo_dial_no = dial_no;  //this gets Saved as 'String'  say, '68'
                        localStorage.setItem("obj_Main_Speed_Dial_Settings", JSON.stringify( obj_MSDial_Settings ) );
                        
                        setTimeout(function(){
                            //console.log(dial_no);
                            chrome.tabs.create({url: "Main_SpeedDial_page.html"});
                        }, 100);
                    });
        $('#div_4_1').append( div );


        //Added for pic--show in popup, 26July16

            var Cat_ar_retrieved = JSON.parse( localStorage.getItem( "Category__"+t1 ) );
                        //info --> st.slice(start, end) is used. start is start-pos & end is end-pos
            var t0_cnt = t0.slice(0, t0.indexOf(",")  );  // only the first No. is reqd.   
                //if (No_of_comma_ss !== 1) { t0_cnt = t0.slice(0, t0.indexOf(",") ) }
                //else { t0_cnt = t0.substr(0, t0.length-1);  }//comma at end removed.  
/*
        // the below was for img--show, for search--results, which I closed on 17May17,
        // moving it to func Add_scr_images__to_search_results();
        // near the end of popup.js  Now-on, img are not processed thru res_arr_found, but thru Edit_arr

            var img_src = "images/" + Cat_ar_retrieved[t0_cnt][3];
                console.log( res_arr_found.length, t0, t1, t0_cnt, Cat_ar_retrieved, Cat_ar_retrieved[t0_cnt][3] );
                
                // index === 0 means 1st loop
        if (index === 0) {   //index is from forEach main func , index = 0 means, i=0 in for--loop or if the url is found in only 1 Category.
            //$("#div_pic_show").append( $("<img />").attr({"src": img_src, "class": "pic_show_1"}) );  //.css({"width": 100, "height": 60}) );
            $("#div_pic_show img.pic_show_1").attr({"src": img_src});
        } //End of if
            // index === 1 means 2nd loop
        if (index === 1) {  //if url is found in 2nd Category also.
             this img-width-calculation does not work, as, may-be "#div_pic_show" was not yet drawn in popup.html. Doing, this after drawn,using setTimeout will\may work.
            var img_width_2 = $(".pic_show_2").width() +7;  //7 is 7px (should have-been 5px for margin given in css, 2 is extra-given)
            var new_width =  106 +img_width_2;  //106px is in css   
            $("#div_pic_show").append( $("<img />").attr({"src": img_src, "class": "pic_show_2"}) )
                        .css({ width: "195px" });  //{ width: "195px" } was working ok, changed to jquery-Calculated-width on 7Nov16
        }
            // index === 1 means 2nd loop
        if (index === 2) {  //if url is found in 3rd Category also.
            $("#div_pic_show").append( $("<img />").attr({"src": img_src, "class": "pic_show_2"}) )
                        .css({ width: "275px" }); 
        }
        if (index === 3) {  //if url is found in 4th Category also.
            $("#div_pic_show").append( $("<img />").attr({"src": img_src, "class": "pic_show_2"}) )
                        .css({ width: "350px" }); 
        }
        if (index === 4) {  //if url is found in 5th Category also.
            $("#div_pic_show").append( $("<img />").attr({"src": img_src, "class": "pic_show_2"}) )
                        .css({ width: "425px" }); 
        }
*/

        //textarea Added -- Saved text in lStorage arr
        if (index === 0) {
            var ls_title = Cat_ar_retrieved[t0_cnt][1];

            if ( my_title !== ls_title ){  //page-title & arr-Saved-title are diff. , then append textarea with 'title from lStorage'
                                //$("#textarea_1").after( $("<textarea id='textarea_3'></textarea>").val( Cat_ar_retrieved[t0_cnt][1] ) );
                $("#div__title_from_lStorage_arr").html( ls_title ).show();

                /* Closed on 10Oct16, delete from here later
                    5--el--with 'position: absolute' -- changed in html+css--positioning, so that,
                    this js--shift should--not be reqd.,  So, Closed.

                    //Added on 10Sep16 -- for this div Added, shift date & Save--btn--to--lStorage, which have absolute placing
                    //these 2 will be shifted down, --> to the amount --> of #div__title_from_lStorage_arr ki height + the height--increased of textarea_1, in case it takes up 2 rows.
                    var Added_div_ki_height = $("#div__title_from_lStorage_arr").outerHeight();

                    //in the below line 5--el--with 'position: absolute' , have been shifted down  ,-->>because of div--#div__title_from_lStorage_arr Added in popup.
                    $("#two_textarea_s, #div_chkbox_png_or_jpg__reset_btn, #Show_SpeedDial_page_btn_container, #container_No_of_bMarks, #result")
                    .css({ top: "+="+Added_div_ki_height }); //Made space for btn9, as textarea Added,  by shifting div that contains date--textarea.
                */

                //Added on 9Sep16
                if ( ls_title.length < 56 ) {  //60 words
                    $("#div__title_from_lStorage_arr")
                        .css({ font: "19px Calibri", width: "91%" });       //"margin-left": "-8px"
                }                
                else if ( ls_title.length < 66 ) {  //between 55 & 65
                    $("#div__title_from_lStorage_arr")
                        .css({ font: "18px Calibri", width: "94%" });       //"margin-left": "-8px"
                }
                else if ( ls_title.length < 86 ) {  //between 65 & 85
                    $("#div__title_from_lStorage_arr")
                        .css({ width: "95%" });     
                }

            }
        }//End of if (index === 0)
    });  //End of  res_arr_found.forEach
        //result of  res_arr_found.forEach  appended below, because it could be done, only when forEach--loop is over\done.
        if (res_arr_found.length !== 0) {
            //$('#div_4_1').append( $("#div_pic_show") );  now, from 16May17, "#div_pic_show" is kept after '#div_4_1' , in popup.html , so no need to append it. earlier, "#div_pic_show" was kept outside '#div_4'
            //$("#div_pic_show").show();           //.css({ display: "block" });
            //$('#div_4_1').append( res_arr_found.length + " dials." );
        }

    if (res_arr_found.length == 0) {
        res_arr_not_found__loop_run__how_to_show();
    }

    //res_arr_not_found.forEach(function(item,index) { 
    //This loop has been kept inside the func below, earlier, it was like res_arr_found.forEach loop above.
    function res_arr_not_found__loop_run__how_to_show() {
        var obj_Settings = JSON.parse(localStorage.getItem("obj_Settings"));
        var chkbox_checked = obj_Settings["show__Categories_not_found__in_popup"];

                        //var the_chkbox = document.getElementById("show__Categories_not_found__in_popup");
        if (chkbox_checked == true) { res_arr_not_found__loop_run(); }
        else { 
            var span_txt = $("<span id='span__2'></span>").html( res_arr_not_found.length );
            //Note: the below does not work, Use the html & append, both to get results.
                //$("#div_4_2").html( "url not found in " + span_txt + " Categories.")
            $("#div_4_2").html( "url not found in " ).append( span_txt ).append( " Categories." )
                         .css({ clear: "both" });
        } //End of else
    

        function res_arr_not_found__loop_run() {
            res_arr_not_found.forEach(function(item,index) {
                var item_split = item.split("--__--");
                var t0 = item_split[0].trim();
                var t1 = item_split[1].trim();

                var span = $("<span>").text( t1 ).addClass("CategoryName_not_found");
                var div = $("<div>").append( span ).addClass("search_res_divs_not_found");
                $('#div_4_2').append( div );  
            });    
        } //End of  func res_arr_not_found__loop_run();

    } //End of  func res_arr_not_found__loop_run__how_to_show();
    

    //chrome.browserAction.setBadgeText({text: '5' }); works but should work without popup.

}  //End of func Already_exists__will_be_Duplicate_multi()    
    setTimeout(function(){
        Already_exists__will_be_Duplicate_multi(); 
        Add_scr_images__to_search_results();
    }, 300);  //100 was working ok till 21March17, no errors. I just increased to 400, as the popup is now a-little-slow-sluggish when opens.

}  //End of onPopup()


$("#btn_Recent_bMarks, #btn_Show_SpeedDial_page").click(function() {      //#btn_Show_SpeedDial_page
    chrome.tabs.create({url: "Main_SpeedDial_page.html"});
});
/* The above func covers this-closed one also.
$("#btn_Show_SpeedDial_page").click(function() {
    chrome.tabs.create({url: "Main_SpeedDial_page.html"});
});
*/
function Any(){
    $('#what_does_not_work').append( my_title );  //$("#div_4").text() also was working, but seTimeout on Global var my_title worked. 3April16
  
}

        /* http://www.w3schools.com/jsref/coll_select_options.asp 
           http://codepen.io/sahni4you/pen/QNQPee  */
function Load_All_Categories_Into_ul_CategoryNames() {
    var Category_ar_retrieved = JSON.parse( localStorage.getItem("CategoryNames_arr") );

    Category_ar_retrieved.forEach(function(item,index) {

        var span = $("<span><img src='/icons/li_ke_liye_18x18_mspaint_made.png'></span>")
                    .attr({ class: "li_span", id: "sp"+index })
                    .click(function(event){
                        event.stopPropagation();
                        console.log(this.nodeName, this.tagName, this.id, this.className);
                        //console.log( $(this).parent().siblings() ); //, $(this).parent().nodeName );
                        //.siblings().removeClass("selected")

                        if ($("li.selected").length>1){  //with this if-condition, if span is clicked again, it does nothing. Does not even check-up things.
                            $(this).parent().siblings(".selected").removeClass("selected");
                            $("#ul_CategoryNames span.show_span").removeClass("show_span");
                            $(this).addClass("show_span");
                        

                            //In addition to li & span, other things updated
                            $("#selected_li_count").html( $("li.selected").length );
                            li_s_selected__ka_text();
                        }
                    });
        var li = $("<li />").html( item ).attr("id", "li"+index).addClass("myListClass")
            .append( span )
            .click(function(e) {      //Remember (e) -- is very Imp! & forgotten often
                //the below-line closed on 2Oct16 + blue class shifted just above the selected class
                //today Rule of which class's background-color will be applied seen very properly & confirmed.
                //the class that is written last(\below other) is applied first.
                //like in this case, class="myListClass selected li_Class_lightskyblue_bg" was found in li
                //in chrome--> Inspect el,  'selected' is shown @top, then 'li_Class_lightskyblue_bg' & then 'myListClass'
                //& in popup.css, they appear in just the opp.--order, line218, 211 & 204 resp.
                
                //$(this).attr("class", "myListClass");  //remove special green--blue classes added, just the basic 'myListClass'

                /*  the below cloded--code, was working from beginning till 31Dec16. Now_on, I have changed it a little, + added a span to li.
                if (e.ctrlKey || e.metaKey) {
                    $(this).toggleClass("selected");
                } else {
                    $(this).addClass("selected").siblings().removeClass("selected");
                }  //End of if  */

                        //31Dec16 ko below Method Added
                if ( $(this).hasClass("selected")===false ){
                    
                    $(this).addClass("selected");  //.siblings().removeClass("selected");
                        /*  Note: the below line worked ok. But, I closed it & put this.id & selector method.
                            $(this).children("span").addClass("show_span"); */
                    var li_id = this.id;
                    $("#"+li_id+" span").addClass("show_span");
                    //+ Adjusted  func Load_Settings() --mein-> func addClass_selected__to_Saved_li() , for span appended.
                    //Now, with '.selected', the above func, also adds '.show_span'

                    $("#selected_li_count").html( $("li.selected").length );
                    //below func Added on 1Aug16
                    li_s_selected__ka_text();
                }
                            //$("#Names_of_Categories_selected_in_ul").text( $("#ul_CategoryNames li.selected").text() );
            }); //End of li.click func


        $("ul#ul_CategoryNames").append( li );

        var li2 = $("<li />").html( item ).attr("id", "SD_li"+index).addClass("myListClass")
                .click(function(){
                    $(this).addClass("selected").siblings().removeClass("selected");
                                        //Save li.selected to lStorage, So, that it can be loaded on Main_Speed_Dial--page Reload & F5, thru func 'Load_Settings__on_Ext_page_load()'
                                        //the below code for lStorage, taken as it is, from  'func Load_All_Categories_Into_ul_CategoryNames()' -- 'Main_SpeedDial_page.js'
                    var obj_MSDial_Settings = JSON.parse(localStorage.getItem("obj_Main_Speed_Dial_Settings"));
                    obj_MSDial_Settings["last__li_selected_text-Name"] = $(this).text();
                    var li_id = (this.id).substr(3);
                    obj_MSDial_Settings["last__li_selected_id"] = li_id;    //$(this).attr("id")
                    localStorage.setItem("obj_Main_Speed_Dial_Settings", JSON.stringify( obj_MSDial_Settings ) );
                    console.log($(this).text(), li_id );

                    setTimeout(function(){
                        chrome.tabs.create({url: "Main_SpeedDial_page.html"});
                    }, 100);
                });
        $("ul#ul_CategoryNames_clone").append( li2 );

    }); //End of  forEach--loop

                    //ui_list_placeholder is a Class, see in CSS
    //$( "#ul_CategoryNames" ).sortable({placeholder: "ui_list_placeholder"});     
}   //End of func Load_All_Categories_Into_ul_CategoryNames()


function li_s_selected__ka_text(){

    $("#ul_2__Selected_Cat_List").empty();

    var len = $("li.selected").length;

    //if ( len>1 ) {      //li are shown if more 2 or more, as 1 is always selected in ul. So, 1 is not shown.

        for (var i=0;i<len;i++) {

            var selected_li_ki_id = $("li.selected")[i].id;
            var selected_li_ka_text = $("li.selected")[i].textContent;
            var No_span_txt = selected_li_ki_id.substr(2) + ". ";

            //the below line adds Nos. & Names, was working ok till 10Oct16, when changed with ul--and--li system
            //$("#Names_of_Categories_selected_in_ul").append( (i+1) + ".) " + li_selected_text + "<br>");

            var li = $("<li />").text( selected_li_ka_text );         //.appendTo( "#ul_2__Selected_Cat_List" );
            var No_span = $("<span />").text(No_span_txt).attr({ "class": "No_span" });
            var span = $("<span />").text("x").attr({ "class": "close", "id": selected_li_ki_id })
                .click(function(){
                    /* this should have worked, but they have stopped\changed the code.
                    var selector = "ul#ul_CategoryNames "+"li#"+selected_li_ki_id;
                        console.log(selector);*/
                    var selector = "ul#ul_CategoryNames "+"li#"+ this.id;  //$(this).attr("id") this replaced with this.id
                        console.log(selector);
                    $(selector).removeClass("selected");
                    $(selector+" span").removeClass("show_span");
                    $(this).parent().remove();
                    $("div#selected_li_count").text( $("li.selected").length );

                    //check the remaining li.selected
                    if ($("li.selected").length === 0) {  //this happens when clicked on 2nd-last remaining li\span
                        //console.log("no li selected, you must select 1 for bMarking");
                        $("div#msg").fadeIn();
                    }
                });
            li.prepend(No_span).append(span).appendTo( "#ul_2__Selected_Cat_List" );
        }

        $("div#msg span").click(function(){ $("div#msg").fadeOut() });

    //} //End of if

        /*    How To Create a To Do List            '10Oct16'
        http://www.w3schools.com/howto/howto_js_todolist.asp
        thru above webpage, 'Close'x  btn is appended to li
        */

} //End of  function li_s_selected__ka_text()



    //4April16  Retrieve all inputs from popup.html & Save to a fixed Category_arr, which
    // already exists. This func is a start, will be modified later.
    // "Category__w3Schools_Imp_test1" -- This arr+Category I have created, using Add-checkbox
    // from SppedDial_main_page
function Add_Dial() {

    var len = $("li.selected").length;

    if (len === 0) { 
        $("div#msg").fadeIn();
        return; skip(); 
    }
    //console.log("return check,  close this check later, temporary");

    //var Categories_from_ul_arr = $(".selected");

    $("div#result").show();
    $("div#close_result").click(function(){ $("div#result").fadeOut(); });

        // for All-categories .selected, run loop
    for (var i=0;i<len;i++) {

        var li_selected = $("li.selected")[i].textContent;  //Category -- this var is needed for div#result

        var Category_from_ul = "Category__" + $("li.selected")[i].textContent;  //$(".selected")[i].innerHTML; closed & used textContent instead    // prefix -- "Category__" , which I have applied, knowingly, as per this Ext.--plan

        /* innerHTML, textContent, innerText
           http://codepen.io/sahni4you/pen/eZLYxv    */

        // The below line was closed, because I used textContent instead of innerHTML
        //if (Category_from_ul.indexOf("&amp;") >1) { Category_from_ul = Category_from_ul.replace("&amp;", "&");  }

                //console.log( Category_from_ul );

        var Category_ar_retrieved = JSON.parse( localStorage.getItem(Category_from_ul) );

                //console.log( Category_ar_retrieved.length );

        //skip();

        var title = $("#textarea_1").val().trim();
        //on 9March17, w3s ke liye filter Add karna tha, as it changed from http to https. but changed for--all.
        //from Now-on, no http or https, just the web-address
                    /* Idea did not work,   var ta_value = $("#textarea_2").val().trim();
                    var t = ta_value.indexOf("://");
                    ta_value = ta_value.substr( t+3 );*/
        // Imp!! Note: I have taken\used , $("#textarea_2").val() & not my_url. my_url Global_var ccould also be used, but what if textarea I edit\want-to-edit before Add_dial();
        var url = $("#textarea_2").val().trim();  // my_url decodeURI for file:///---urls, Read the below Closed.
        /*  this closed as Now, this is done at the very beginning of this popup.js, in func onPopup(), in chrome.tabs.query....
            // 27March17
            if ( url.startsWith("file://") ){  // is a file-url i.e., a file saved on local-my-HD
                url = decodeURI(url);   // %20 for spaces will be removed. http://codepen.io/sahni4you/pen/peOJwL
        }   */
        var Date_m = $("#date_today").val().trim();
        var tags = "";      //$("#tags").val();  tags Closed forever on 27Aug16
        var img_Name = $("#img_Name").val().trim();
        var Notes = $("#Notes").val().trim();
                        //console.log( Category_from_Select.toString() );
        $("#result__1").append( i+1 + ".) " + li_selected + "<br>");

        var Single_Dial_arr = [];
                    //one_Dial_arr.push(title);
        Single_Dial_arr[0] = Category_ar_retrieved[Category_ar_retrieved.length-1][0]+1;  //count of the item in arr
        Single_Dial_arr[1] = title;
        Single_Dial_arr[2] = url;
        Single_Dial_arr[3] = img_Name;
        Single_Dial_arr[4] = Notes;
        Single_Dial_arr[5] = tags;
        Single_Dial_arr[6] = Date_m;
        Category_ar_retrieved.push(Single_Dial_arr);

        localStorage.setItem(Category_from_ul, JSON.stringify(Category_ar_retrieved));

    }   //End of if


    function show_img_on_Dial_Added(){
        var imgName = $("textarea#img_Name").val();
        //var img = $("<img />").attr({ src: "images/" +imgName }).css({ height: "70px", "max-width": "180px" });
        //$("div#div_4_1").hide();  //hide has been done to give slideDown\fadeIn() effect, otherwise, img shows out-of-a-sudden, jhatka.
        //$("div#div_4_1").append( img ).css({ margin: "0 10px 1px 4px" });
        document.getElementById("show_img_on_Add_Dial").src = "images/" +imgName;
        $("div#div_4_0").slideDown();
    }
    show_img_on_Dial_Added();

}   //End of Add_Dial()


    var bMark_Added = 0;    //Global
    
$("#btn9").click(function() {      //#btn_Show_SpeedDial_page

    var len = $("li.selected").length;

    if (len === 0) { 
        $("div#msg").fadeIn();
        return; skip(); 
    }

    $("#btn9_mein_span").show();  //the function countDown() , hides it after run.  countdown() is in this func itself.

    $(".span_btn8").css({ outline: "" });

    $(this).attr("disabled", "true");
    Add_Dial();
    bMark_Added += 1;
    $("#Add_bMark_btns #count_of_bMarked").html( bMark_Added );

    //setTimeout(function(){  }, 300)

    var cnt = 8;
    var tm = setInterval(countDown, 1000);

    function countDown(){
        $('#btn9_mein_span').html(cnt);
                        //console.log(cnt);
        cnt--;
        if(cnt < -1) { 
            clearInterval(tm); 
            $('#btn9_mein_span').fadeOut(1000).empty(); //empty() has been given, because 0 is left after run, that should disappear.
        }
    }

    //$("#btn9").fadeOut("fast");
    //$("#btn9").html("Done bMark").css({ font: "bold 20px Calibri", width: "180px" }).fadeIn("fast");

    $(this).animate({ width: '135px' }, 200, function(){ $(this).html( "<b>Done bMarked</b>" ).css({ color: "rgb(0,0,210)" }) })
           .animate({ width: "183px", fontSize: "23px", left: '-=15px'  }, 500)
                    //.animate({fontWeight: 'bold' }, 1000)
            .delay(8000)    //fontWeight: 'normal',
            .animate({ width: "130px", fontSize: "16px", left: '0px' }, 600, function(){ 
                                                $(this).html( $("<span class='span_btn8'>Add bMark</span>") );
                                                $(this).removeAttr("disabled")
                                             })
            //.delay(100)
            .animate({ width: "120px" }, 100);


    //$(this).addClass("btn9").html( "Done bMarked" );  //this works ok, tested
    //$(this).html( "Done bMarked" );

    /*
    //------ the below as a set was working ok, but I have a better option, implementing that here
    $(this).animate({ width: '103%' }, 100, function(){ $(this).html( "<b>Done bMarked</b>" ) })
           .animate({ width: '127%', fontSize: "+=3px" }, 800)
                    //.animate({fontWeight: 'bold' }, 1000)
            .delay(9000)    //fontWeight: 'normal',
            .animate({ width: "117%", fontSize: "15px" }, 900, function(){ 
                                                $(this).html( $("<span class='span_btn8'>Add bMark</span>") );
                                                $(this).removeAttr("disabled")
                                             })
            .animate({ width: "100%" }, 200);
    //----- set completes here            

*/
    /*setTimeout(function(){ 
        $("#btn9").removeAttr("disabled");
        //$("#btn9").removeClass();   //this works ok, tested
        $("#btn9").html( $("<span class='span_btn8'>Add bMark</span>") ); 
    }, 7500);*/
});



function Load_Settings() {

    /*  Closed this on 27Nov16 & kept permanent in popup.css
    var color = $("body").css("background-color");  //will get from what's set in popup.css
    $("#Select_and_two_textarea").css({ "background-color": color });  //this I did, as I keep changing body--background-color, & this will automatically get changed.
*/
    //The below done in func onPopup() -- the first func of this popup.js -- just after you get it
    // from chrome func  chrome.tabs.query , using the var 'mytitle'
    //$("#textarea_1__character_count").html( textarea_1.value.length );

  if ( localStorage["obj_Settings"] ) {

  obj_Settings = JSON.parse(localStorage.getItem("obj_Settings"));

                                            //$("#date_today").val( obj_Settings.date );
    var chkbox = document.getElementById("Save_textarea_1__or__not");
    if ( obj_Settings["chkbox-id___Save_textarea_1__or__not"]  == true ){    
    
        chkbox.checked = true;
        $("#textarea_1").val( obj_Settings["title_of_webpage"] );    
    }
    $("#date_today").val( getDate_Sac() );
                                            //$("#tags").val( obj_Settings.tags );  //tags Closed forever on 27Aug16
    $("#img_Name").val( obj_Settings.img_Name );
    $("#Notes").val( obj_Settings.Notes );

        //(31Dec16)  Now, with '.selected', the below func, also adds '.show_span' , for span's Added in li's
    function addClass_selected__to_Saved_li(){

        var No_of_li_sel = obj_Settings["No_of_li_saved__with_class_selected"];
        //1--li with class--'.selected' is must, on popup--load\show. So, 1st seleted, without any ifs
        var sel = obj_Settings.li_selected_on_popup_1st;
        $("#"+sel).addClass("selected");
        $("#"+sel+" span").addClass("show_span");

        /* This is the old if Method I was using, before, 17Nov16. It was working good with 2--li--select tak. Today, I have changed this a little-bit & increased it to 4--li(s)--select
        var sel_2 = obj_Settings.li_selected_on_popup_2nd;
        if ( sel_2 !== "") { $("#"+sel_2).addClass("selected"); }*/

        if (No_of_li_sel >= 2) { 
            var sel_2 = obj_Settings.li_selected_on_popup_2nd; 
            $("#"+sel_2).addClass("selected"); 
            $("#"+sel_2+" span").addClass("show_span");
        }
        if (No_of_li_sel >= 3) { 
            var sel_3 = obj_Settings.li_selected_on_popup_3rd;
            $("#"+sel_3).addClass("selected"); 
            $("#"+sel_3+" span").addClass("show_span");
        }
        if (No_of_li_sel == 4) { 
            var sel_4 = obj_Settings["li_selected_on_popup_4th"];
            $("#"+sel_4).addClass("selected"); 
            $("#"+sel_4+" span").addClass("show_span");
        }


        //After selecting li(s), get the top-position of 1st li[0].selected & scroll to it, using '.scrollTop' func
        setTimeout(function(){                                  //Make a codepen on offsetTop -- pending
            var position_in_ul = $("#"+sel).position().top;     //https://api.jquery.com/category/offset/  &  https://api.jquery.com/position/ &  http://www.w3schools.com/jquery/css_offset.asp  &  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
                    console.log( position_in_ul, $("#"+sel).text() );
            document.getElementById("ul_CategoryNames").scrollTop = position_in_ul-60; //was-100, changed to -60, on 17Nov16
        }, 500); 

    } //End of func
    addClass_selected__to_Saved_li();

    //Added on 10July16
    /*
        var li_no = sel.substr(2);
        console.log(li_no);
        setTimeout(function(){
            if (li_no > 7  && li_no < 15) { document.getElementById("ul_CategoryNames").scrollTop = 110; console.log("110 scrolled") } 
            if (li_no > 14 && li_no < 22) { document.getElementById("ul_CategoryNames").scrollTop = 320; console.log("320 scrolled") } 
            if (li_no > 21 && li_no < 29) { document.getElementById("ul_CategoryNames").scrollTop = 500; console.log("500 scrolled") } 
            if (li_no > 28) { document.getElementById("ul_CategoryNames").scrollTop = 700; console.log("700 scrolled") } 
                             }, 1000);
    */
 

    li_s_selected__ka_text();

  } //End of if -- in the first--line of this--function Load_Settings()

    $("#selected_li_count").html( $("li.selected").length );

    //pending!! -- make this functionality, in options, because, on CategoryName change\Edit, this code will produce error.
    function color_some_li_s(){
        var Category_ar_retrieved = JSON.parse( localStorage.getItem("CategoryNames_arr") );
        var index_of_li = Category_ar_retrieved.indexOf("IMDB Sel Tabs (sets)");
                //console.log( index_of_li );
        var index_of_li_2 = Category_ar_retrieved.indexOf("Amazon purchases");
        var index_of_li_3 = Category_ar_retrieved.indexOf("youtube to see & download");
        $("#li"+index_of_li).addClass("li_Class_lightskyblue_bg");
        $("#li"+index_of_li_2).addClass("li_Class_pink_bg"); 
        $("#li"+index_of_li_3).addClass("li_Class_lightskyblue_bg");
    }
    color_some_li_s();

}  //End of  function Load_Settings()


      //var obj_Settings ={};  Note: there is no need to specify\announce this as a Global variable
$("#btn_Save_4_textarea_s").click(function() {  

        //obj_Settings["date"] = $("#date_today").val().trim();

        //obj_Settings["tags"] = $("#tags").val().trim();  //tags Closed forever on27Aug16

    var chkbox = document.getElementById("Save_textarea_1__or__not");
    if ( chkbox.checked ) {
        obj_Settings["chkbox-id___Save_textarea_1__or__not"] = true;    
    }
    else {
        obj_Settings["chkbox-id___Save_textarea_1__or__not"] = false;            
    }

    obj_Settings["title_of_webpage"] = $("#textarea_1").val().trim();    

    obj_Settings["img_Name"] = $("#img_Name").val().trim();

    obj_Settings["Notes"] = $("#Notes").val().trim();


    //li--with class .selected --> Saved to lStorage
    obj_Settings["li_selected_on_popup_1st"] = $("li.selected")[0].id;   //.textContent;    

    var No_of_li_sel = $("li.selected").length;

        if (No_of_li_sel == 2) { Save_2nd(); }
        else if (No_of_li_sel == 3) { Save_2nd(); Save_3rd(); }
        else if (No_of_li_sel == 4) { Save_2nd(); Save_3rd(); Save_4th(); }
        function Save_2nd(){
            obj_Settings["li_selected_on_popup_2nd"] = $("li.selected")[1].id;
                        //else{ obj_Settings["li_selected_on_popup_2nd"] = ""; }
        }
        function Save_3rd(){ obj_Settings["li_selected_on_popup_3rd"] = $("li.selected")[2].id;  }
        function Save_4th(){ obj_Settings["li_selected_on_popup_4th"] = $("li.selected")[3].id;  }        
    

    obj_Settings["No_of_li_saved__with_class_selected"] = No_of_li_sel;
    //li--with class .selected --> Saved to lStorage -- Ends here


    console.log( obj_Settings.img_Name + "\n" + obj_Settings.Notes  + "\n" + obj_Settings.li_selected_on_popup );

    localStorage.setItem("obj_Settings", JSON.stringify( obj_Settings ) );

    $("#Saved_msg").fadeIn(100).delay(1000).fadeOut("fast");
});


$("#Save_textarea_1__or__not").on('change', function () {

    if (document.getElementById("Save_textarea_1__or__not").checked == false) {
        $("#textarea_1").val( my_title );
        obj_Settings["chkbox-id___Save_textarea_1__or__not"] = false;
        localStorage.setItem("obj_Settings", JSON.stringify( obj_Settings ) );
    }
    if (document.getElementById("Save_textarea_1__or__not").checked == true) {
        
        obj_Settings = JSON.parse(localStorage.getItem("obj_Settings"));
        $("#textarea_1").val( obj_Settings["title_of_webpage"] );    
        obj_Settings["chkbox-id___Save_textarea_1__or__not"] = true;
        localStorage.setItem("obj_Settings", JSON.stringify( obj_Settings ) );
    }
});    


//30June16 Added 
// Based on
// R:\Jscript_Lessons_+_CSS__created_5Oct15\keyboard_shortcuts__ctrl--key__alphabets__ver1.html
// pending -- Ctrl key combination did not work, tried but does work here, works in example above.
//document.body.onkeypress = function(){ keyboard_shortcut(event) };
                                //$("body")  &  $(document.body)  -- both are same
$(document.body).one("keypress", //keyboard_shortcut(event) );
function keyboard_shortcut(e){   //Note: if you change e to event in this line, then event.charCode & event.ctrlKey will also have to be done.
    
    var t = String.fromCharCode(e.charCode);   console.log( t, typeof t );
    var n = e.ctrlKey.toString();       console.log(n);

    if (t == "`") { $("#btn9").click()  }    //$("#span_btn8") this also works, but #btn9 is button.

    //2nd keyboard-shortcut for popup.html
    //var m = String.fromCharCode(e.charCode);  console.log(m);
                                    //Ctrl+l        , true is Ctrl-key    
    //if (n == "true" && t == ".") { $("#btn_Show_SpeedDial_page").click()  }
    if (t == "~") { $("#btn_Show_SpeedDial_page").click()  } 

});  //End of  keyboard_shortcut(e)



    //var textarea_1 = document.getElementById("textarea_1");  //Global
// the above var is Global, but written in starting of this .js 
textarea_1.oninput = function () {

    /*  10Sep16
    function font_size_for_textarea_1() , in the 1st func onPopup() , of this .js--file
    sets textarea_1 ka --->> font-size & height,
    with almost the same Code, as used below in this func.

    Imp !!!!!!!!
    Keep both funcs -- func font_size_for_textarea_1()  &
                       this func both in --->> Sync <<---
    so that textarea_1 shows--up\gets--modified properly.
    */

    var len = $(this).val().length; 
    $("#textarea_1__character_count_1").html( len );  

        //20Sep16                   
        //Imp!! Note: textarea_1, now works on 'No. of rows'. 
        //css--height, has been removed, from popup.css & Javascript also.
        // Also, this means,  1.4em & 2.8em (using earlier. from start) has been removed.
        // Info:- if row attr is not given, the Default is 2 rows.

        if (len < 37) {  //30 was working ok
            $("#textarea_1").css({ "font-size": "26px" }); 
            if ( $("#textarea_1").attr("rows") == 2 ) { $("#textarea_1").attr("rows", "1") }
            console.log( "cond1 -- len<37 -- true" );
        }
        else if (len < 50) {    //43 was working ok
            $("#textarea_1").css({ "font-size": "23px" }); 
            if ( $("#textarea_1").attr("rows") == 2 ) { $("#textarea_1").attr("rows", "1") }
            console.log( "cond2 -- len<50 -- true -- 23px -- rows=1" );
        }
        /*   this condition closed, as font-size & rows, remain the same. Even if it is removed, result is same.        
        else if (len < 53) { 
            $("#textarea_1").css({ "font-size": "20px" }); 
            if ( $("#textarea_1").attr("rows") == 2 ) { $("#textarea_1").attr("rows", "1") }
            console.log( "cond3 -- len<53 -- true" );
        }*/        
        //Imp!! Note: with font: 26px Calibri; & body width: 510px textarea_1 fills up with 63 characters
        //64th becomes extra for 1--row.     textarea_1 ki width: 100%,  in popup.css
        else if (len <= 58) {   //<=63 was working ok., but changed so that 2nd row, comes-in before fill-up, of 1st row.
            $("#textarea_1").css({ "font-size": "20px" }); 
            if ( $("#textarea_1").attr("rows") == 2 ) { $("#textarea_1").attr("rows", "1") }
            console.log( "cond4 -- len<=58 -- true" );
        }
        else if (len > 58) {   //>63 was working ok. Note, the No. here should be what is in previous, else--if condition.
            $("#textarea_1").css({ "font-size": "20px" }); 
            if ( $("#textarea_1").attr("rows") == 1 ) { $("#textarea_1").attr("rows", "2") }
            console.log( "cond5 -- len>58 -- true" );
        }
/*            if (len > 64) { 
                //textarea_1.setAttribute( "rows", "2" );
                textarea_1.style.cssText = "height: 2.8em";  //textarea_1 is Global var
                $("#textarea_1__character_count_2").html( " (2)" );
                var ta_1_ki_height = $("#textarea_1").height()-6;  //-6 is approximation, with -6 the position shifted shows-up ok.
                //Math.floor(x)  Rounds a number downward to its nearest integer:
                //Math.floor has been used, in case, height is an odd number.
                ta_1_ki_height = Math.floor( ta_1_ki_height/2 );  //JavaScript floor() Method  http://www.w3schools.com/jsref/jsref_floor.asp
                //$("#two_textarea_s, #div_chkbox_png_or_jpg__reset_btn").css({ top: "+="+ta_1_ki_height });  
//console.log( $("#two_textarea_s).css("top") );
            }
*/


}  //End of  textarea_1.oninput




    var Edit_arr = [];  var Edit_arr_once_only_count = 1;  //Global variables
function get_Edit_arr() {
            //Create_Edit_arr__from_res_arr_found
            //This conversion is required once-only, in popup--operation.
            //res_arr_found is Global variable, see starting of this js

/*            Edit_arr = []; //Empty-ing Global Edit_arr, at start of this converting func. 
            //This is done, in case, this func is used more-than-once in popup.html, which is happenning. 
            //So, this empties Global Edit_arr, before items are pushed-in Edit-arr */

    if (Edit_arr_once_only_count == 1) {
            //Processing the array -- 'res_arr_found'
        res_arr_found.forEach(function(item,index) {
            var item_split = item.split("--__--");

            var t0 = item_split[0].trim();
            t0 = t0.slice(0, t0.lastIndexOf(",")  );   //slice(start, end)  //removed the last comma 
            t0 = t0.replace(/\s/g, "");  //This removes all (white)spaces in the string. So, "21, 30, 72" will be "21,30,72". On-split(",") there will not be any spaces, So, no trim() reqd.
                                        // RegExp \s Metacharacter      http://www.w3schools.com/jsref/jsref_regexp_whitespace.asp
            t0 = t0.split(",");  //on-split t0 will be an array

            Edit_arr.push( item_split[1].trim() );
            Edit_arr.push( t0 );
            
            //console.log( Edit_arr );
        });
        //console.log( res_arr_found, Edit_arr );
    } //End of if
    Edit_arr_once_only_count = 2; //So, that it does not calculate again & return only-once calculated arr again.

    return Edit_arr;

} //func get_Edit_arr();



    var Editing = 0;   
    var Case_title;  var Case_img;  var Case_both;  var Case_Notes; //Cases are for Saving--func
    //var Cat_arr_ret = "";  
    var old_un_Edited_title;  var old_un_Edited_imgName;  var old_un_Edited_Notes;  //these 2 var should-have worked inside the .onclick func, but Jaadu stopped it.
    //the below var holds return of Edit_arr processing, thru func Edit_Category_Dial()
    var Edit_res;
document.getElementById("Edit_Dial").onclick = function(){

    //if not bMarked in SpeedDial_Sac  ---------------------------------------------
    if (res_arr_found.length == 0) { 
        //Do nothing
        this.innerText = "not-bMarked";
        $(this).attr("disabled", true); 
        setTimeout( function(){ 
                $("#Edit_Dial").text("E");
                $("#Edit_Dial").removeAttr("disabled"); 
                //Editing += 1;  //remove\delete this line, in 2-3 days, 13Dec16 written here.
        }, 7000);
                        console.log("var Editing = " + Editing);
        return;    //Exit_func  --  Don't go further, beyond this line of code. 
    }
    //-------------------------------------------------------------------------------



    //it's bmarked in SpeedDial_Sac, for sure ----------------------------------------
    Editing += 1;
        console.log("crossed not-bMarked --&--  " + "var Editing = " + Editing);
    //this is Editing-part
    if (Editing == 1 || Editing == 3) {   //Editing = 1 or 3, will bring to this Editing-part of if
        
        //var Edit_res is Global. It is also used in the --> func Edit_Category_Dial__ke_return__se_Action();
        Edit_res = Edit_Category_Dial();  //return of this func in var Edit_res
                            //console.log( Edit_res );
                    //find-out, whether Editing can be done, for Already bMarked, in SpeedDial_Sac
                if ( Edit_res !== undefined ) {  //means func--return gives some Case -- means Some Editing can be done!
                            //Imp!! checkpoint
                            console.log( Edit_res + "  (--return of func Edit_Category_Dial(); )" );   //"undefined--No Case"
                    this.innerText = "Editing";
                    Edit_Category_Dial__ke_return__se_Action();
                            console.log("var Editing = " + Editing);
                    $(this).attr("disabled", true); 
                    setTimeout( function(){ $("#Edit_Dial").removeAttr("disabled"); }, 3000);  //button#Edit_Dial disabled for 6 sec, In-case, you accidentally, press it twice & Saving not done.
                }
                else { 
                    this.innerText = "No_case";  
                    Editing += 1;   //this will cancel going to Saving-part, on next-btn-click
                    console.log("var Editing = " + Editing); 
                }
    }
    //this is Saving-part
    else if (Editing == 2 || Editing == 4) { 
            //&
        if (this.innerText == "Editing") {  //this if--check is optional, Even without this if, operation will be same, As, "No_case" increases the var Editing, & hence not letting-go to Saving part.

            $(this).attr("disabled", true); 
            setTimeout( function(){ $("#Edit_Dial").removeAttr("disabled"); }, 4000);  //button#Edit_Dial disabled for 4 sec, In-case, you accidentally, press it twice & Saving not done.


                var ch = before_Saving__check_for_if_changed_or_still_unModified();
                        console.log(ch, "var Editing = " + Editing);
                if (ch=="un_modified") { 
                    Editing -= 1;   //So, next-time you click, 'Editing'--btn, var Editing, still_will_be 2 || 4.
                                    // & this will bring the click, back to Saving-part.
                    console.log("var Editing = " + Editing + " (-- made back_to 1 again)");
                    return;   //Don't go further, beyond this line of code.
                } 
                    console.log("after return");  //checkpoint, if returned or passed the ust-above return.
            
            //optional var, still, Good for debugging-only
            var Saved_success = Edit_Category_Dial__Done_Save();
                        console.log(Saved_success + "\n(--return of func Edit_Category_Dial__Done_Save(); )" );  

            //On-Save-Complete
            $("#Edit_info").slideUp();
            $("#Edit_in_popup__textarea_1").slideUp();
            $("div#read_only").slideUp();
            if ( $("textarea#Edit_in_popup__imgName").css("display") !== "none" ) { //=== "inline-block" works, still used none
                $("textarea#Edit_in_popup__imgName").slideUp();        
            } 
            $("textarea#Edit_in_popup__Notes").slideUp();

            this.innerText = "Done";
            console.log("var Editing = " + Editing);
            //On-Save-Complete -- ends here

        } //End of --> if (this.innerText == "Editing")

    } //End of else--if
    //-----------------------------------------------------------------------------------------


    document.getElementById("Cancel_Editing").onclick = function(){
        Editing += 1;
        $("#msg_All_same").clearQueue().fadeOut();  /*  .finish() | jQuery API Documentation
                                                        https://api.jquery.com/finish/   */
        $("div#Edit_info").slideUp();
        $("textarea#Edit_in_popup__textarea_1").slideUp();
        $("div#read_only").slideUp();
        $("textarea#Edit_in_popup__imgName").slideUp();
        $("textarea#Edit_in_popup__Notes").slideUp();
        $("#Edit_Dial").text("E");
        
    }    


    function before_Saving__check_for_if_changed_or_still_unModified(){
        var new_Edited_title = $("#Edit_in_popup__textarea_1").val();
        var new_Edited_imgName = $("#Edit_in_popup__imgName").val();
        var new_Edited_Notes = $("#Edit_in_popup__Notes").val();
        console.log(old_un_Edited_title, new_Edited_title, "\n", old_un_Edited_imgName, new_Edited_imgName, "\n",
            old_un_Edited_Notes, new_Edited_Notes);

        //modified or un_modified -- decision\Calc depends upon, which are visible. Only, visible-ones need to be compared.
        //which are visible, can be determined, on return of func Edit_Category_Dial();, which is available in var Edit_res.
        //but, Instead of using "Edit_res", I have used, display property of textarea's. This way, this func remains free of "return of func Edit_Category_Dial()".
        //which are visible, on 'Editing':
        var title_display = $("#Edit_in_popup__textarea_1").css("display");
        var img_display = $("#Edit_in_popup__imgName").css("display");
        var Notes_display = $("#Edit_in_popup__Notes").css("display");

        //Note-Imp!: there are 7 ifs below, only 1 applies at a time & that one, gives the return.
        //the sequence, in which the sets appear is Imp!. there are 3 sets.  ifs inside set2 & set3, can take any position.
        //but they must appear as, set1, then set2 & then set3.

        //All 3 display ==="inline-block";  set-1--(only 1 if)
        if (title_display==="inline-block" && img_display==="inline-block" && Notes_display==="inline-block"){
            if (old_un_Edited_title.trim() !== new_Edited_title.trim() ) { return "modified"; }//true means modified. So, no msg. & finish
            else if (old_un_Edited_imgName.trim() !== new_Edited_imgName.trim() ) { return "modified"; }
            else if (old_un_Edited_Notes.trim() === new_Edited_Notes.trim() ) { //means title, img are same & Notes also same
                $("#msg_All_same").slideDown("fast").delay(4000).slideUp();
                return "un_modified";
            }
            //else-(in a way) is only for last\3rd  'else if'. means if (Notes !== Notes), then else applies.
            else { return "modified"; } //this is also else case, just for info. I kept, it more-free, at-end of func.
        }


        //set-2--(3 ifs)  ---------------------------------------------------------------
        if (title_display==="none" && img_display==="none"){  //only Notes_display ==="inline-block";
            if (old_un_Edited_Notes.trim() === new_Edited_Notes.trim() ) {
                $("#msg_All_same").slideDown("fast").delay(4000).slideUp();
                return "un_modified";
            }
        }  

        if (title_display==="none" && Notes_display==="none"){  //only img_display ==="inline-block";
            if (old_un_Edited_imgName.trim() === new_Edited_imgName.trim() ) {
                $("#msg_All_same").slideDown("fast").delay(4000).slideUp();
                return "un_modified";
            }
        }   

        if (img_display==="none" && Notes_display==="none"){  //only title_display ==="inline-block";
            if (old_un_Edited_title.trim() === new_Edited_title.trim() ) {
                $("#msg_All_same").slideDown("fast").delay(4000).slideUp();
                return "un_modified";
            }
        } 
        //set-2--(3 ifs) --ends here-----------------------------------------------------        


        //2 displayed (means 1 is 'none')        //set-3--(3 ifs)  ----------------------------
        if (title_display==="none"){  //& img & Notes_display !=="none"
            if (old_un_Edited_imgName.trim() !== new_Edited_imgName.trim() ) { return "modified"; }
            else if (old_un_Edited_Notes.trim() === new_Edited_Notes.trim() ) { //means title, img are same & Notes also same
                $("#msg_All_same").slideDown("fast").delay(4000).slideUp();
                return "un_modified";
            }
            else { return "modified"; }
        }

        if (img_display==="none"){  //& title & Notes_display !=="none"
            if (old_un_Edited_title.trim() !== new_Edited_title.trim() ) { return "modified"; }
            else if (old_un_Edited_Notes.trim() === new_Edited_Notes.trim() ) { //means title, img are same & Notes also same
                $("#msg_All_same").slideDown("fast").delay(4000).slideUp();
                return "un_modified";
            }
            else { return "modified"; }
        }        

        if (Notes_display==="none"){  //& title & img_display !=="none"
            if (old_un_Edited_title.trim() !== new_Edited_title.trim() ) { return "modified"; }
            else if (old_un_Edited_imgName.trim() === new_Edited_imgName.trim() ) {
                $("#msg_All_same").slideDown("fast").delay(4000).slideUp();
                return "un_modified";
            }
            else { return "modified"; }
        }
        //set-3--(3 ifs) --ends here----------------------------------------------------

    }//End of   func before_Saving__check_for_if_changed_or_still_unModified();
    $("#btn_check").click(function(){
        var ret = before_Saving__check_for_if_changed_or_still_unModified();
        console.debug(ret);
    });
    


    function Edit_Category_Dial() {
        //first thing that needs to be detemined, is what case it is -- based on what Edit_arr contains.
        /*  this func does no Mota changes,
            1.) determines case, based on Edit_arr
            2.) if case applies, retrives Cat or Cat(s), from ls -- & if required, does some comparision-analysis on titles.
            3.) finally, gives\chooses a single-title, to give to textarea--that is show\slidedown() for Editing-title-text.

            In-short, just gives title to textarea, from ls.   (Saving after textarea-Editing, is done by Save-wala-separate func)
            */

        //2nd -- get Edit_arr, using its finc get_Edit_arr();
        var Edit_arr = get_Edit_arr();
            console.log("Edit_arr from func get_Edit_arr(): \n" + Edit_arr, Edit_arr.length );

        //3rd -- determine\find Case -- starting-with, check for CaseI
        //Case1, when only 1Category & 1Dial in it -- to be Edited. This can be a case when you bMarked & forgot something, then wanted to Edit
        //In this case, Edit_arr.length will be 2
        if (Edit_arr.length == 2 && Edit_arr[1].length == 1) {
            //console.log("CaseI -- only 1Category & 1Dial");

            //lStorage part
            var Cat_name = Edit_arr[0];    //$("li.selected").text();
            Cat_name = "Category__" + Cat_name;
                            //console.log( Cat_name );
            var Cat_arr_ret = JSON.parse( localStorage.getItem(Cat_name) );
                                //console.log( "Cat_arr_ret from lStorage, without any change: \n"+Cat_arr_ret, Cat_arr_ret.length );

            var full_Dial = Cat_arr_ret[ Edit_arr[1][0] ];
            var only_title = full_Dial[1];
            var only_imgName = full_Dial[3];
            var only_Notes = full_Dial[4];
                        console.log( Edit_arr.length, Edit_arr[1].length, full_Dial, only_title );

            if ( only_title.length > 56 ) { 
                $("#Edit_in_popup__textarea_1").attr({ rows: 2 });
            }
            $("#Edit_in_popup__textarea_1").val( only_title );

            /* for img_Name & Notes */
            $("#Edit_in_popup__imgName").val( only_imgName );
            if (only_Notes == "") { $("#Edit_in_popup__Notes").attr({ placeholder: "No Notes yet -- Notes entered, will be Saved (not read-only)", rows: 1 }); }
            else if (only_Notes.length < 55) { $("#Edit_in_popup__Notes").val( only_Notes ).attr({ rows: 1 }); }
            else { $("#Edit_in_popup__Notes").val( only_Notes ); }

            //slideDown\show of all to be Edited
            Case_title = "CaseI -- only 1Category & 1Dial";
            /*$("#Edit_info_1").html( Case_title );
            $("#Edit_info").slideDown();
            $("#Edit_in_popup__textarea_1").slideDown();
            $("#Edit_in_popup__imgName").slideDown();
            $("#Edit_in_popup__Notes").slideDown();  */
            
            //These are global var
            old_un_Edited_title = only_title;
            old_un_Edited_imgName = only_imgName;
            old_un_Edited_Notes = only_Notes;
            console.log(old_un_Edited_title, old_un_Edited_imgName);

            return Case_title + " -- No compare"; 
        } //End of if -- CaseI



        if (Edit_arr.length !== 2 || Edit_arr.length == 2 && Edit_arr[1] !== 1) { 

            var title_arr = [];   var img_arr = [];    var Notes_arr = [];    
            var Category_arr = [];  var Category_plus_title_arr = [];  var Category_plus_img_arr = [];
            var cnt = 0;  //for Category_plus_title_arr

            //this double--loop is to get title_arr, img_arr & Notes_arr -- 3 arrays
            for(var i=0; i<Edit_arr.length; i=i+2) {
                var Cat_name = Edit_arr[i];   var full_Cat_name = "Category__" + Cat_name; //console.log(Cat_name);
                var Cat_arr_ret = JSON.parse( localStorage.getItem(full_Cat_name) );
                Category_arr.push( Cat_name );

                var arrM = Edit_arr[i+1]; //console.log(arrM);
                    for(var m=0; m<arrM.length; m++) {

                        var full_Dial = Cat_arr_ret[ arrM[m] ];
                        var only_title = full_Dial[1];
                        var only_imgName = full_Dial[3]; 
                        var only_Notes = full_Dial[4]; 
                        title_arr.push( only_title );
                            Category_plus_title_arr.push( "<div class='titleName'><span class='sp_title'>" + only_title + "</span> (#"+arrM[m]+")<span class='sp_Cat_name'>" + Cat_name + "</span> <input type='radio' name='r1'>" + cnt + ".)</div>" );
                            Category_plus_img_arr.push( "<div class='imgName'><input type='radio' name='r2'>" + cnt + ".) <span class='sp_imgName'>" + only_imgName + "</span> (#"+arrM[m]+")<span class='sp_Cat_name'>" + Cat_name + "</span></div>" );
                            cnt++;
                        img_arr.push( only_imgName );
                        Notes_arr.push( only_Notes );
                        //console.log( Edit_arr.length, Edit_arr[1].length, full_Dial, only_title );

                        console.log( Cat_name, m, full_Dial ); //original_full_Dial here gives value-of modified_Dial
                        //console.log("process", Cat_name, arrM[m]);
                    }
            } //End of external-for-loop

            //title_arr loop-ed to compare All-titles, whether they are All-same or different. Even, if 1 is different & say, other 3 are same, it is considered not-same.
                var title_arr_res;
            for(var i=0; i<title_arr.length-1; i++) {
                if (title_arr[i] === title_arr[i+1]) { title_arr_res = "All_same";  console.log("title_arr_res:  title -- All_same"); }
                else { 
                    title_arr_res = "All_not_same"; console.log("title_arr_res:  title -- All_not_same");
                    console.log(title_arr, title_arr.length);
                    break;  //break loop if even a single-title is different.
                }
            }
            if (title_arr_res == "All_same" ) {
                /*console.log("CaseII -- All titles same --(only 1Category & 1Dial)not");
                $("#Edit_info_1").html( "CaseII -- All titles same --(only 1Category & 1Dial)not" );
                $("#Edit_info").slideDown();
                $("#Edit_in_popup__textarea_1").slideDown();  */

                if ( only_title.length > 56 ) { 
                    $("#Edit_in_popup__textarea_1").attr({ rows: 2 });
                } 
                $("#Edit_in_popup__textarea_1").val( title_arr[0] );

                Case_title = "CaseI -- All titles same";  //"CaseII -- All titles same";
                //return "CaseII";
            } //End of if (title_arr_res == "All_same" )



            //img_arr loop-ed to compare All-titles, whether they are All-same or different. Even, if 1 is different & say, other 3 are same, it is considered not-same.
                var img_arr_res;
            for(var i=0; i<img_arr.length-1; i++) {
                if (img_arr[i] === img_arr[i+1]) { img_arr_res = "All_same";  console.log("img_arr_res:  img -- All_same"); }
                else { 
                    img_arr_res = "All_not_same"; console.log("img_arr_res:  img -- All_not_same");
                    console.log(img_arr, img_arr.length);
                    break;  //break loop if even a single-title is different.
                }
            }
            if (img_arr_res == "All_same" ) {
                /*console.log("CaseIII -- All img same --(only 1Category & 1Dial)not");
                $("#Edit_info_1").html( "CaseIII -- All img-only same --(only 1Category & 1Dial)not" );
                //$("#Edit_info").slideDown();  this is already  .slideDown(), from CaseII
                $("#Edit_in_popup__imgName").slideDown();  */

                if ( img_arr[0].length > 56 ) { 
                    $("#Edit_in_popup__imgName").attr({ rows: 2 });
                }  
                $("#Edit_in_popup__imgName").val( img_arr[0] );

                Case_img = "CaseI -- All img same";   //"CaseIII -- All img-only same";
                //return "CaseIII";
            } //End of if (title_arr_res == "All_same" )



            //Notes_arr loop-ed to compare All-Notes, whether they are All-same or different. Even, if 1 is different & say, other 3 are same, it is considered not-same.
                var Notes_arr_res;
            for(var i=0; i<Notes_arr.length-1; i++) {
                if (Notes_arr[i] == Notes_arr[i+1]) { Notes_arr_res = "All_same";  console.log("Notes_arr_res:  Notes -- All_same"); }
                else { 
                    Notes_arr_res = "All_not_same"; console.log("Notes_arr_res:  Notes -- All_not_same");
                    console.log(Notes_arr, Notes_arr.length);
                    break;  //break loop if even a single-title is different.
                }
            }
            if (Notes_arr_res == "All_same" ) {
                //console.log("CaseV -- All Notes same --(only 1Category & 1Dial)not");
                /* $("#Edit_info_1").html( "CaseV -- All Notes same --(only 1Category & 1Dial)not" );
                $("#Edit_info").slideDown();
                $("#Edit_in_popup__textarea_1").slideDown();
                $("#Edit_in_popup__Notes").slideDown();  

                if ( only_Notes.length > 56 ) { 
                    $("#Edit_in_popup__Notes").attr({ rows: 2 });
                }    */

                if (Notes_arr[0] === "") { $("#Edit_in_popup__Notes").attr({ placeholder: "No Notes yet -- Notes entered, will be Saved (not read-only)", rows: 1 }); }
                else if (only_Notes.length < 55) { $("#Edit_in_popup__Notes").val( only_Notes ).attr({ rows: 1 }); }
                $("#Edit_in_popup__Notes").val( Notes_arr[0] ); 

                Case_Notes = "CaseI -- All Notes same";
                //return "CaseII";
            } //End of if (title_arr_res == "All_same" )




            if (Case_title == "CaseII -- All titles same" && Case_img === undefined) {  
                            //img_Name is read-only, here
                            //console.log("check1 -- " +title_arr_res); 
                        /*var All_img_names = "";
                for (var i = 0; i < img_arr.length; i++) {
                    All_img_names += img_arr[i] + "<br>";
                }*/
                
                var All_img_names = img_arr;
                        console.log("check2 -- " + "<br>" + All_img_names, Case_img);
                $("div#read_only").append("<br>" + All_img_names).slideDown();
                //$("#Edit_in_popup__imgName").val(only_imgName).attr({ disabled: true }).slideDown();
            }

                var title_arr_processed = [];   //this var created for below func
            function title_arr__for__read_only_div(){
                /*title_arr.forEach(function(item,i){
                    title_arr_processed.push( "<li>" + i + ".) " + item + "</li>" );
                    });

                    Category_arr.forEach(function(item,i){
                    title_arr_processed[i] = title_arr_processed[i] + "<span>" + item + "</span>";
                });*/

                $("div#read_only_2").html( Category_plus_title_arr ).append( $("#inp_chkbox_2_title") );  //title_arr_processed
                //return title_arr_processed;
            }//End of  func title_arr__for__read_only_div()

            /*function img_arr__for__read_only_div(){
                $("div#read_only").html( Category_plus_img_arr );
            }*/

            //These are global var
            old_un_Edited_title = title_arr[0];
            old_un_Edited_imgName = img_arr[0];
            old_un_Edited_Notes = Notes_arr[0];
            console.log(old_un_Edited_title, old_un_Edited_imgName);
            


                //Imp!--Note!--: Don't keep any code further, this if, as 'return' is there, which will stop code-execution further.
            if (title_arr_res === "All_same" && img_arr_res === "All_same" && Notes_arr_res === "All_same"){ //1+ 2+ 3
                Case_both = "CaseVII -- All titles, img & Notes --> same";
                /*$("#Edit_info_1").html( Case_both );

                $("#Edit_info").slideDown();
                $("#Edit_in_popup__textarea_1").slideDown();
                $("#Edit_in_popup__Notes").slideDown(); */

                return Case_both;
            }
            else if (title_arr_res === "All_same" && img_arr_res === "All_same"){ //1+ 2
                Case_both = "CaseVI -- All titles & img same (Notes-not)";
                //$("#Edit_info_1").html( Case_both );
                return Case_both;
            }
            else if (title_arr_res === "All_same" && Notes_arr_res === "All_same"){ //1+ 3
                Case_both = "CaseV -- All titles & Notes same (img-not)";
                    $("div#read_only_2").html( Category_plus_img_arr );
                    $("div#imgName_edit__CaseV").show();
                    //if ( $("#d").css("display") !=="none" )
                    //img_arr__for__read_only_div();
                return Case_both;
            }
            else if (img_arr_res === "All_same" && Notes_arr_res === "All_same"){ //2+ 3
                Case_both = "CaseIV -- All img & Notes same (title-not)";
                    //title_arr__for__read_only_div();  //this func adds read-only html
                return Case_both;
            }
            else if (title_arr_res === "All_same" ) { return "only -- title_arr_res: All_same"; } //1 only
            else if (img_arr_res === "All_same") { return "only -- img_arr_res: All_same"; } //2 only

            
        } //End of if -- CaseII        

    } //End of func Edit_Category_Dial()

    //the below func is just an Extension of func Edit_Category_Dial()
    function Edit_Category_Dial__ke_return__se_Action(){
        if (Edit_res === "CaseI -- only 1Category & 1Dial -- No compare" 
            || Edit_res === "CaseVII -- All titles, img & Notes --> same") {
            Action_slideDn_Common();  Action_slideDn_1_ta();  Action_slideDn_2_img();  Action_slideDn_3_Notes();
        }
        else if (Edit_res === "CaseVI -- All titles & img same (Notes-not)"){
            Action_slideDn_Common();  Action_slideDn_1_ta();  Action_slideDn_2_img();
        }
        else if (Edit_res === "CaseV -- All titles & Notes same (img-not)"){
            Action_slideDn_Common();  Action_slideDn_1_ta();  Action_slideDn_3_Notes();  Action_slideDn_4_readOnly();
        }
        else if (Edit_res === "CaseIV -- All img & Notes same (title-not)"){
            Action_slideDn_Common();  Action_slideDn_2_img();  Action_slideDn_3_Notes();  Action_slideDn_4_readOnly();
        }        
        else if (Edit_res === "only -- title_arr_res: All_same"){
            Action_slideDn_Common();  Action_slideDn_1_ta();
        }
        else if (Edit_res === "only -- img_arr_res: All_same"){
            Action_slideDn_Common();  Action_slideDn_2_img();
        }

        function Action_slideDn_Common(){
            $("#Edit_info_1").html( Edit_res );
            $("#Edit_info").slideDown();
        }
        function Action_slideDn_1_ta(){ $("#Edit_in_popup__textarea_1").slideDown(); }
        function Action_slideDn_2_img(){ $("#Edit_in_popup__imgName").slideDown(); }
        function Action_slideDn_3_Notes(){ $("#Edit_in_popup__Notes").slideDown(); }
        function Action_slideDn_4_readOnly(){ $("div#read_only").slideDown(); }
    }//End of func Edit_Category_Dial__ke_return__se_Action();


            //Saving back to lStorage Category
    function Edit_Category_Dial__Done_Save() {
            //console.log(Cat_arr_ret, Edit_arr);

        for(var i=0; i<Edit_arr.length; i=i+2) {
            var Cat_name = Edit_arr[i]; Cat_name = "Category__" + Cat_name; //console.log(Cat_name);
            var Cat_arr_ret = JSON.parse( localStorage.getItem(Cat_name) );

            var arrM = Edit_arr[i+1]; //console.log(arrM); arrM is\are the Dial_Nos, of the Category.
                for(var m=0; m<arrM.length; m++) {

                    var original_full_Dial = Cat_arr_ret[ arrM[m] ]; console.log("original_full_Dial: \n" + original_full_Dial);
                    var full_Dial_to_be_modified = Cat_arr_ret[ arrM[m] ];
                    //var only_title = full_Dial_to_be_modified[1];
                    //console.log( Edit_arr.length, Edit_arr[1].length, full_Dial_to_be_modified, only_title );

                        //Note: CaseVIII is for Saving--func only
                    if ( Edit_res === "CaseVIII -->> CaseV made-into CaseVII like + All_imgName--made_same" ){
                        full_Dial_to_be_modified[1] = $("#Edit_in_popup__textarea_1").val().trim();
                        full_Dial_to_be_modified[3] = $("#Edit_in_popup__imgName").val().trim();
                        full_Dial_to_be_modified[4] = $("#Edit_in_popup__Notes").val().trim(); 
                            update_All_img__NoCompare();
                    }
                    else if (   Edit_res === "CaseI -- only 1Category & 1Dial -- No compare" 
                        || Edit_res === "CaseVII -- All titles, img & Notes --> same"){
                        full_Dial_to_be_modified[1] = $("#Edit_in_popup__textarea_1").val().trim();
                        full_Dial_to_be_modified[3] = $("#Edit_in_popup__imgName").val().trim();
                        full_Dial_to_be_modified[4] = $("#Edit_in_popup__Notes").val().trim(); 
                            update_All_img__withCompare();
                    }
                    else if (Edit_res === "CaseVI -- All titles & img same (Notes-not)"){
                        full_Dial_to_be_modified[1] = $("#Edit_in_popup__textarea_1").val().trim();
                        full_Dial_to_be_modified[3] = $("#Edit_in_popup__imgName").val().trim();
                            update_All_img__withCompare();
                    }
                    else if (Edit_res === "CaseV -- All titles & Notes same (img-not)"){
                        full_Dial_to_be_modified[1] = $("#Edit_in_popup__textarea_1").val().trim();
                        full_Dial_to_be_modified[4] = $("#Edit_in_popup__Notes").val().trim(); 
                    }
                    else if (Edit_res === "CaseIV -- All img & Notes same (title-not)"){
                        full_Dial_to_be_modified[3] = $("#Edit_in_popup__imgName").val().trim();
                            update_All_img__withCompare();
                        full_Dial_to_be_modified[4] = $("#Edit_in_popup__Notes").val().trim(); 
                    }
                    else if (Edit_res === "only -- title_arr_res: All_same"){
                        full_Dial_to_be_modified[1] = $("#Edit_in_popup__textarea_1").val().trim();
                    }
                    else if (Edit_res === "only -- img_arr_res: All_same"){
                        full_Dial_to_be_modified[3] = $("#Edit_in_popup__imgName").val().trim();
                            update_All_img__withCompare();
                    }

                    function update_img(){
                        var only_imgName = $("#Edit_in_popup__imgName").val();
                            //+Changing popup small 50px img
                        $(".pic_show_1").attr({ src: "images/" +only_imgName });
                    }

                    function update_All_img__withCompare() {
                            var only_imgName = $("#Edit_in_popup__imgName").val().trim(); 
                            var existing_img = $("#div_pic_show img.pic_show_1")[0].src; //this need not trim(), as always precide  //$("#div_pic_show img").[0].src also would have worked
                                var t = existing_img.lastIndexOf("/");  existing_img = existing_img.substr(t+1);
                            if (only_imgName===existing_img) {}
                            else{       //!==
                                    var len = $("#div_pic_show img").length;
                                for(var i=0; i<len; i++){
                                    $("#div_pic_show img")[i].src = "images/" +only_imgName;
                                }//End of for--loop
                            }//End of if
                    }//End of func update_All_img()

                    function update_All_img__NoCompare() {
                            var only_imgName = $("#Edit_in_popup__imgName").val().trim(); 
                            //var existing_img = $("#div_pic_show img.pic_show_1")[0].src; //this need not trim(), as always precide  //$("#div_pic_show img").[0].src also would have worked
                                //var t = existing_img.lastIndexOf("/");  existing_img = existing_img.substr(t+1);
                            //if (only_imgName===existing_img) {}
                            //else{       //!==
                                    var len = $("#div_pic_show img").length;
                                for(var i=0; i<len; i++){
                                    $("#div_pic_show img")[i].src = "images/" +only_imgName;
                                }//End of for--loop
                            //}//End of if
                    }//End of func update_All_img()

                    /*full_Dial_to_be_modified[1] = new_Edited_title;
                        if (Case_title === "CaseI -- only 1Category & 1Dial" || Case_img === "CaseI -- only, All img same") {
                                    //for img_Name 
                            var only_imgName = $("#Edit_in_popup__imgName").val();
                            full_Dial_to_be_modified[3] = only_imgName;

                            //+Changing popup small 50px img
                            $(".pic_show_1").attr({ src: "images/" +only_imgName })
                        }
                        if (Case_title === "CaseI -- only 1Category & 1Dial" ){
                            var only_Notes = $("#Edit_in_popup__Notes").val(); 
                            full_Dial_to_be_modified[4] = only_Notes;
                        }*/
                    //here, the modification to "full_Dial_to_be_modified", completed. So, just gave it a new_Name --> modified_Dial. Its just for understanding Code, an optional step.
                    var modified_Dial = full_Dial_to_be_modified;
                    Cat_arr_ret[arrM[m]] = modified_Dial;
                        console.log( Cat_name, m, "\n", "modified_Dial: \n" + modified_Dial ); //original_full_Dial here gives value-of modified_Dial
                        //console.log("process", Cat_name, arrM[m]);
                }//End of  internal-for-loop
            //Imp!! final checkpoint                
            console.log( "New changed Cat_arr#(" + i/2 + " of " + ((Edit_arr.length/2)-1) + "):-- (" 
                + Cat_name + "): " + " --Dial#: " + Edit_arr[i+1] + " \n" , Cat_arr_ret );

            //Each Category Saved thru loop
            localStorage.setItem(Cat_name, JSON.stringify(Cat_arr_ret));
            
        } //End of external-for-loop

                    //if '#div__title_from_lStorage_arr' exists -- this will exist, when title changed at the time of bMark

            var new_Edited_title = $("#Edit_in_popup__textarea_1").val();                    
        if ( $("#div__title_from_lStorage_arr").css("display") !=="none" ) {   //.length >0 does not apply, as the div always is there, only its css changes.
            $("#div__title_from_lStorage_arr").html( new_Edited_title );   //.fadeOut("fast").slideDown(); does not show-up nice\ok, So, closed.
        }
        else {  //display: none;
            $("#div__title_from_lStorage_arr").html( new_Edited_title ).slideDown();
        }

        /*
            var Cat_name = Edit_arr[0];    //$("li.selected").text();
            Cat_name = "Category__" + Cat_name;
            console.log( Cat_name );

            var Cat_arr_ret = JSON.parse( localStorage.getItem(Cat_name) );
            
            var new_Edited_title = $("#Edit_in_popup__textarea_1").val();
                //if '#div__title_from_lStorage_arr' exists -- this will exist, when title changed at the time of bMark
            if ( $("#div__title_from_lStorage_arr").length >0 ) {
                $("#div__title_from_lStorage_arr").html( new_Edited_title );
            }
            
            var full_Dial = Cat_arr_ret[ Edit_arr[1][0] ];
            var only_title = full_Dial[1];
            //console.log( Edit_arr.length, Edit_arr[1].length, full_Dial, only_title );

            full_Dial[1] = new_Edited_title;
            var modified_Dial = full_Dial;
            console.log( modified_Dial );   
        */

        //Case thru which Saved, given in return, as a check will be shown on Console.
        return "Success--Saving!! \n" + Edit_res;
    } //End of func Edit_Category_Dial__Done_Save()

    

} //End of func ("#Edit_Dial").onclick    


    // the below onchange will be effective\available, when CaseV will be applicable
    // CaseV -- titles,Notes are same. img not.  
    // So, to makes these img same in all--dials, this chkbox--option is made available. 
    // If chkbox is checked, imgName next to the radio--selected is saved for all dials.
    // else imgName(s)  remain as it is,  & changes made to 'title & Notes' are Saved.
gid("inp_chkbox_1_imgName").onchange = function(){  //input
    if ( $("#read_only input[type='radio']:checked").length==0 ){
        qs("div#tooltip_for_CaseV").style.cssText= "top: -20px; left: 60px; right: initial; bottom: initial; ";  // right & bottom are already set in id--in--css, so to cancel it, initial has been done. there is no 'none' prop. available.
        $("div#tooltip_for_CaseV").html("first select a radio & then retry").fadeIn("fast").delay(3000).fadeOut();
        this.checked = false;
        return;  //no further going
    }
    //this.removeAttribute("disabled");

    if (this.checked) { 
            // #1
        $("#Edit_in_popup__imgName").slideDown();
        var imgName = $("#read_only input[type='radio']:checked").next().text();
        $("#Edit_in_popup__imgName").val( imgName );
        qs("div#tooltip_for_CaseV").style.cssText= "";
        $("div#tooltip_for_CaseV").html("this imgName will be written to all dials.").show();
        setTimeout(function(){ $("div#tooltip_for_CaseV").addClass("tooltip_for_CaseV__show");  }, 4000);  //.delay(15000).fadeOut()
        qs("div#imgName_edit__CaseV div#info__CaseV").style.cssText= "margin: 0 0 0 -23px; ";  //this done just for good reade-bility.

            // the below class makes the div--height 24px, which is the normal height with contents. 
            // The height--property is added so that transition for height--48px could be done.
        qs("div#Edit_info").className= "Edit_info_height_for_transition_effect_only"; //this class just adds  height: 24px;
        setTimeout(function(){ qs("div#Edit_info").style.height= "48px"; }, 100);
        
        // #2 -- Saving--Case changed from V to VIII
        setTimeout(function(){
            Edit_res = "CaseVIII -->> CaseV made-into CaseVII like + All_imgName--made_same";
            $("span#Edit_info_1").animate({ opacity: "0.5" });

            $("span#Edit_info_1").html( Edit_res );
            $("span#Edit_info_1").animate({ opacity: "1" });
        }, 1500);
    }
    else { 
        //qs("div#Edit_info").className= "";  // if this also done, transition corrupts
        qs("div#Edit_info").style.height= "";
        qs("div#tooltip_for_CaseV").innerHTML= "Now, chkbox not selected,<br>So, imgName field will not be affected-or-modified.";

        $("#Edit_in_popup__imgName").slideUp();
        //Saving--Case changed back to V  (from VIII, which occured when chkbox.checked)
        Edit_res = "CaseV -- All titles & Notes same (img-not)";
        $("span#Edit_info_1").html( Edit_res );
    }

}//End of func


    // 16May17 ko below func made
    // the images will be Added to "#div_pic_show" , thru this func
    // the below func fired from func onPopup(); -- which is the first func in this popup.js -- See, the end of onPopup(); 
function Add_scr_images__to_search_results(){
    if (res_arr_found.length !== 0) {   //res_arr_found is Global arr
        do_further();   // #1) get Edit_arr thru func get_Edit_arr();  Edit_arr is made out-of res_arr_found. I am using Edit_arr, in-place-of Edit_arr
                        // #2) append all dials--ki--img to "#div_pic_show".
    }
    //else {}  stop, no further processing. means if url is not found in lStorage, no need to process anything.

    function do_further(){
            // #1 -- get Edit_arr, using its finc get_Edit_arr();
        var Edit_arr = get_Edit_arr();
            console.log("Edit_arr from func get_Edit_arr(): \n" + Edit_arr, Edit_arr.length );
        $("#div_pic_show").show();  //.html("results are there.");           //.css({ display: "block" });

            // the below loop--formula has been taken from func Edit_Category_Dial__Done_Save();  just--for--info
            var img__cnt = 0;  var img_cnt_txt = "";
        for(var i=0; i<Edit_arr.length; i=i+2) {
            var Cat_name = Edit_arr[i]; Cat_name = "Category__" + Cat_name; //console.log(Cat_name);
            var Cat_arr_ret = JSON.parse( localStorage.getItem(Cat_name) );

            // separate divs for separate categories
            var pic_div = $("<div />").attr({ class: "separate_Cat_divs"}).appendTo("#div_pic_show");
            var img_cnt = 0;

            var arrM = Edit_arr[i+1]; //console.log(arrM); arrM is\are the Dial_Nos, of the Category.
                for(var m=0; m<arrM.length; m++) {
                    var imgName_from_Cat = Cat_arr_ret[ arrM[m] ][3];
                    var title_for_img = imgName_from_Cat + "\n\n -- dial_no#"+ arrM[m];  //&#013;&#010; also works
                    var img_src = "images/" + imgName_from_Cat;

                            console.log(Cat_name, arrM[m], img_src);
                    img_cnt++;  img__cnt++;
                    
                        // only the first img, of the first category is given class '.pic_show_1' & all other img are just appended with class "pic_show_2"
                    if (i==0 && m==0){ 
                        qs("#div_pic_show img.pic_show_1").src= img_src;
                        qs("#div_pic_show img.pic_show_1").title= title_for_img;
                        $("#div_pic_show div.separate_Cat_divs").append( $("#div_pic_show img.pic_show_1") );
                        console.log(m, i, Cat_name, arrM[m], img_src); 
                    }
                    else if (i==0 && m!=0) {
                        $("#div_pic_show div.separate_Cat_divs").eq(0)
                            .append( $("<img />").attr({src: img_src, class: "pic_show_2", title: title_for_img }) )
                            .width( '+=95' );
                    }
                    else{ 
                        $("#div_pic_show div.separate_Cat_divs").eq(i/2)
                            .append( $("<img />").attr({ src: img_src, class: "pic_show_2", title: title_for_img }) )
                            .width( '+=75' );  //.css({ width: "275px" }); 
                    }
                
                }//End of  internal for--loop
                img_cnt_txt += img_cnt + "+";
        }//End of  external for--loop

        img_cnt_txt = img_cnt_txt.slice(0,-1) + " = ";
        $('#div_4_1').append( img_cnt_txt + img__cnt + " img" );
    }//End of  func do_further();


}//End of func


//This func runs after popup has loaded & '#div_pic_show' has been created.
function div_pic_show__width_Adjuster() {
    //if ( $("#div_pic_show").css("display") !== "none" ) {

        var new_width;

    if ( $("#div_pic_show img").length == 5 ) {
            console.log( '$("#div_pic_show img").length = ' + $("#div_pic_show img").length );
        new_width = $("#div_pic_show img")[0].width + $("#div_pic_show img")[1].width + $("#div_pic_show img")[2].width + $("#div_pic_show img")[3].width + $("#div_pic_show img")[4].width + 35;  //7 is 7px (should have-been 5px for margin given in css, 2 is extra-given)
        $("#div_pic_show").width( new_width );
    } 
    else if ( $("#div_pic_show img").length == 4 ) {
            console.log( '$("#div_pic_show img").length = ' + $("#div_pic_show img").length );
        new_width = $("#div_pic_show img")[0].width + $("#div_pic_show img")[1].width + $("#div_pic_show img")[2].width + $("#div_pic_show img")[3].width + 28;  //7 is 7px (should have-been 5px for margin given in css, 2 is extra-given)
        $("#div_pic_show").width( new_width );
    }         
    else if ( $("#div_pic_show img").length == 3 ) {
            console.log( '$("#div_pic_show img").length = ' + $("#div_pic_show img").length );
        new_width = $("#div_pic_show img")[0].width + $("#div_pic_show img")[1].width + $("#div_pic_show img")[2].width + 21;  //7 is 7px (should have-been 5px for margin given in css, 2 is extra-given)
        $("#div_pic_show").width( new_width );
    }   
    else if ( $("#div_pic_show img").length == 2 ) {
            console.log( '$("#div_pic_show img").length = ' + $("#div_pic_show img").length );
        /* This was working, but the other, which is done is better
        var img_width_2 = $(".pic_show_2").width() +7;  //7 is 7px (should have-been 5px for margin given in css, 2 is extra-given)
        var new_width =  106 +img_width_2;  //106px is in css  */
        new_width = $("#div_pic_show img")[0].width + $("#div_pic_show img")[1].width + 14;  //7 is 7px (should have-been 5px for margin given in css, 2 is extra-given)
        $("#div_pic_show").width( new_width );
    }

    function src_of_All_img_same_finding() {
        var len = $("#div_pic_show img").length;
        var img_Compare = "All_img_same"; 
        for(var i=0; i<len-1; i++){
            if ( $("#div_pic_show img")[i].src == $("#div_pic_show img")[i+1].src ) {}
            else { img_Compare = "All_img_not_same"; break; /* break for--loop, no further processing reqd. */ }
        }//End of for--loop

        if ( img_Compare === "All_img_same" ) { 
            var width_before_appending = $("#div_pic_show").width();
            var new_width = width_before_appending + 31; //30px is $("#All_same__pic").width() @font: 14px Calibri -- This should be adjusted, if you change font, in popup.css
            $("#div_pic_show").width(new_width);
            $("#All_same__pic").show();

        }
    } //End of func src_of_All_img_same_finding()

    // the above func will only-be-run, when more-than 1 img.  If 1 img, src--compare is not reqd.
    if ( $("#div_pic_show img").length > 1) {
        src_of_All_img_same_finding();
    }

} //End of func div_pic_show__width_Adjuster()





document.addEventListener('DOMContentLoaded', function () {
    //dumpBookmarks();     was working but closed. See first\2nd backup for its working.

    // on 2oct17, I have chnaged the order, in which all funcs in 'DOMContentLoaded' are fired. + setTimeout--timing also.
    Load_All_Categories_Into_ul_CategoryNames();
    setTimeout(Load_Settings, 100);

    setTimeout(onPopup, 700);
    setTimeout(Any, 200);
    //Load_All_Categories_Into_Select();
  
    //setTimeout(div_pic_show__width_Adjuster, 1100);  //Added on 8Nov16
});



function getDate_Sac() {
    var d = new Date();
    var joined_date_str = d.getDate() + " " + getMonth_Sac() + " " + d.getFullYear().toString().substr(2);
    console.log( joined_date_str );

    function getMonth_Sac(){
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        var dd = new Date();
        var mon_in_alphabets = month[dd.getMonth()];
        return mon_in_alphabets
    }

    return joined_date_str
}  //End of func getDate_Sac()














