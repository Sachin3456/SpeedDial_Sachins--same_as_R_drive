/* links that helped in making & can help further:
3Dec16 ko pasted this closed--text.

HTML5 Local Storage
http://tutorials.jenkov.com/html5/local-storage.html

From the above Article, copied below:

Attaching a Storage Event Listener

Attaching an event listener to a local storage object is done like this:

function onStorageEvent(storageEvent){

    alert("storage event");
}

window.addEventListener('storage', onStorageEvent, false);
The function onStorageEvent() is the event handler function.

The addEventListener() function call attaches the event handler function to storage events.

The storageEvent event object passed to the event handler function looks like this:

StorageEvent {
    key;          // name of the property set, changed etc.
    oldValue;     // old value of property before change
    newValue;     // new value of property after change
    url;          // url of page that made the change
    storageArea;  // localStorage or sessionStorage,
                  // depending on where the change happened.
}
You can access this storage event object from inside the event handler function.

*/

function Append_ta_to_body() {
    var ta = document.createElement("textarea");
    ta.id = "textarea_appended_for_lStorage_Backup";    //ta.className = "Sac_div";
    ta.rows = "32";
    ta.cols = "160";

    /*   The below works ok, but this inline css Added thru 'options.css'---file. for Chrome--console open this.

    ta.style.cssText = [ "position: relative; left: 30px;",
			   "border: 2px solid red; box-shadow: 0 0 5px Orange;",
                            "font: 16px Calibri; z-index: 20;",
                            "padding: 3px 10px; background-color: rgba(255, 255, 0, 0.1);",
			    "width: auto; height: auto; resize: auto;" ].join("");
    */
	                           //position: absolute; top: 300px; hsla(0,0%,95%,0.4);
                                //var txt = document.createTextNode("This is div_1.");
                                //myDIV.appendChild(txt);
                                //ta.innerHTML = "This is div_1.";
    //document.body.appendChild(ta);
    document.getElementById("div17").appendChild(ta);
    console.log("textarea for lStorage Backup added--appended to options-page, Success!!");
}


/* Imp-Note:                (5Dec16)
JSON.parse(JSON_str);       JSON_str = is like an array or obj, in quotes. ex., '["some", "tum"]', '{key1: "tin"}'
this parser, converts only JSON_strings into objects(obj). It can be an array or {}, in quotes.
But, this must be supplied a string, as input.
But, a simple string such as "downloaded on 25Nov16 ko", will not be converted, as it is a string
& not a JSON_string. If it is a simple--string, func JSON.parse(JSON_str)  need not be used.
This logic, caused an error, in options.html --> Save backup thru ta.
As, I was using all arrays or true or false, it was going ok, but a simple string I never used.
-->> the error, I got in SpeedDial-- Save backup, thru options.html
was because of this.
So, the keys need to be checked first, if they are a simple string, JSON.parse() should not be used.

See, chrome console Snippets, for a good info Snippet.

Some examples, tried on Chrome console, to resolve this error.
JSON.parse( "false" );      //Returns false
JSON.parse( "samosa" );     //Returns an error, means does-not work.
JSON.parse( ["samosa"] );   //Returns error,      ,,    ,,
JSON.parse( '["samosa"]' )  //Returns  ["samosa"]

JSON.stringify(arr-or-obj)
lStorage can save strings--only. So, an array or {}, needs to be converted into string, 
so that, it can be saved in lStorage. JSON.stringify(arr-or-obj) is used to convert
the 2 objects(array & obj{}) into string.
*/


function Add_lStorage_data_to_appended_ta() {

    var res1 = "No. of items in SpeedDial Sac -- localStorage :  " + localStorage.length + "   (0 to " + (localStorage.length-1) + ")\n";
    res1 += getDate_Sac() + " -->>  " + getTime_Sac();   //Date().substr(0, 24);

    console.log( res1 );
    res1 += "\n" + "\n";
    var res = ""; //for for--loop output

    var Names_of_All_keys = [];  var No_of_arrays = [];   var No_of_obj = [];  
                                 var No_of_strings = [];      var No_of_boolean = [];

    for (var i=0;i<localStorage.length;i++) {
                                //var kName = localStorage.key(i).toString();
                                //console.log( kName + "\n" + localStorage.kName );

        var lS_item = localStorage.key(i);

        Names_of_All_keys.push( lS_item );

        //Note: All key(i) are strings, as only strings can be stored in lStorage, not objects(array).
        var str = localStorage.getItem( lS_item );  //equal_to= localStorage.getItem( localStorage.key(i) );
        
        if (str.startsWith("[") ) {
            var arr = JSON.parse(str);  
            res += "localStorage.key(" + i + ")" + "\n" + "arr.length = " + arr.length + "\n";
            res +=  "'" + lS_item + "'\n"   + str + "\n\n";
            No_of_arrays.push( lS_item );
        }
        else if (str.startsWith("{") ) {
            var arr = JSON.parse(str); 
            res += "localStorage.key(" + i + ")" + "\n" + "typeof = obj;" + "\n";
            res +=  "'" + lS_item + "'\n" + str + "\n\n";
            No_of_obj.push( lS_item );
        }
        else { //when string or boolean 
                    //str === "false" || "true" -- was working on chrome console, but not here, Jaadu stopped it. Doing the other lengthy way.
            if (str === "false" || str === "true") {  //Note: false & true, here are strings, not boolean, as lStorage saves boolean as string
                res += "localStorage.key(" + i + ")" + "\n" + "typeof = boolean;" + "\n";
                res +=  "'" + lS_item + "'\n" + str + "\n\n";
                No_of_boolean.push( lS_item );
                                //console.debug( i + " boolean = " + str );
            }
            else {  //strings--only
                res += "localStorage.key(" + i + ")" + "\n" + "typeof = string;" + "\n";
                res +=  "'" + lS_item + "'\n" + str + "\n\n";
                No_of_strings.push( lS_item );
                                //console.debug( i + " string = " + str );
            }//End of inner--else
        }//End of outer--else

                    //console.log( res ); 
    }//End of for--loop


    //Categorize--Count of lStorage.keys, based on typeof
    var res2 = "No_of_arrays = " + No_of_arrays.length + "\n";
    res2 += "No_of_obj = " + No_of_obj.length + "\n";
    res2 += "No_of_boolean = " + No_of_boolean.length + "\n";
    res2 += "No_of_strings = " + No_of_strings.length + "\n" + "--->> respectively:  ";
    res2 += No_of_arrays.length + " + " + No_of_obj.length + " + " + No_of_boolean.length + " + " + No_of_strings.length + " = ";
    res2 += No_of_arrays.length + No_of_obj.length + No_of_boolean.length + No_of_strings.length + "\n\n";

    res2 += "localStorage.key()__Nos, which are Arrays: pending!! Sac \n";
    res2 += "localStorage.key()__Nos, which are objects: \n";
    res2 += "localStorage.key()__Nos, which are boolean: \n";
    res2 += "localStorage.key()__Nos, which are strings: \n\n\n";
/*  Being worked upon
    //Another idea is to use .replace func for ,  in Arr--string
    var new_arr_str = "";
            //No_of_strings.forEach(function(item,index){ No_of_strings[index]=item+"\n" });
    No_of_strings.forEach(function(item,index){ new_arr_str += item+"\n" });
            console.debug(No_of_strings, No_of_strings.length);
    var resm = "No_of_keys, with strings =  (" + No_of_strings.length + ")\n" + new_arr_str;
            //console.debug(resm, typeof resm);
*/
    document.getElementById("textarea_appended_for_lStorage_Backup").value = res1 + res2 + res;

    //document.getElementById("textarea_appended_for_lStorage_Backup").value = resm; 

}   //End of Add_lStorage_data_to_appended_ta()

function scroll_into_view() {
    /*  HTML DOM offsetTop Property
        http://www.w3schools.com/jsref/prop_element_offsettop.asp

        ScrollTop_8Dec15.html
        file:///E:/Webpages/Java%20Lessons%20+%20CSS,%20created%205Oct15/ScrollTop_8Dec15.html
    */
    var ta = document.getElementById("textarea_appended_for_lStorage_Backup");
    var ta_pos =  ta.offsetTop;   //- 150;
    $('body').animate({scrollTop: ta_pos}, 800);
}

function Done_msg_shown() {
    $("#div17").append( $("<span id='div17_Done_msg'>Done!!</span>") );
    $("#Save_Backup_lStorage_thru_ta").attr("disabled", "true");
}

$("#Save_Backup_lStorage_thru_ta").one("click", function(){
    Done_msg_shown();
    Append_ta_to_body();
    Add_lStorage_data_to_appended_ta();
    //scroll_into_view();
});





    /* both functions below are taken from:
       file:///R:/Jscript_Lessons_+_CSS__created_5Oct15/Date_&_Time_24Nov15.html    
                                                                                    */
    //same func as in popup.js
function getDate_Sac() {
    var d = new Date();
    var joined_date_str = d.getDate() + " " + getMonth_Sac() + " " + d.getFullYear().toString().substr(2);
    //console.log( joined_date_str );

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


function getTime_Sac() {
    var dt = new Date();
    dt = dt.toLocaleTimeString();
    return dt
}