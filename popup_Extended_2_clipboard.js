//Started as Ext_No2. to popup.js , on 22Dec16
// qs, qsa, gid -- exist in popup.js  So, can be used in this js

// What this  'popup_Extended_2_clipboard.js'  file does ? 
// this js--file is only for  'div#Clipboard_div_container' in popup.html
// It just prepends text to '#textarea_1'  &  saves that prepend--text to lStorage
// only this small--&--easy functionality is done thru this small .js--file



    // the below func appends a lStorage str to textarea_1
gid("prepend__txt_to_ta__1").onclick = function(){  //button
        var txt_msg;
    var lStorage_str = localStorage["str__copyPaste_to_ta_1"];
    
    if (textarea_1.value.substring(0, lStorage_str.length-3) == lStorage_str.substring(0, lStorage_str.length-3) ) {
        txt_msg = "not again";
    }
    else{
        textarea_1.value = lStorage_str + textarea_1.value; 
        txt_msg = "appended";
    }
    
            //temporarily -- increase textarea_1.height
            //$("#textarea_1").height(60).css({ "font-size": "20px" });

            // $.position has been used, as tooltip--div is absolutely--positioned, not relative to doc\page.
    var textarea_1__position = $("#textarea_1").position().top;
    //var tooltip_offset_top = textarea_1__offset+20;  this not working, offset instead of 8+20, keeps increasing 28 + 20 + 20 ....

    $("div#tooltip_for_textarea_1").text( txt_msg )
        //.offset({ top: tooltip_offset_top })  this did not worked, as expected ??
        .css({ top: textarea_1__position+30+"px" })
        .slideDown("fast").delay(3500).fadeOut("fast");
    //console.log( textarea_1__offset );
}
gid("prepend__txt_to_ta__1").onmouseenter = function(){  //button
        // the below var ka text\value, copied from popup.html -- the title of qs("button#btn_Clipboard_1")
	var title_from_html = "\n-------------\nprepend to title \nin textarea_1";  //this.title; cannot be used, as it keeps appending to the new--title, again & again....
			console.log( title_from_html );
	this.title= localStorage["str__copyPaste_to_ta_1"] + title_from_html;
			//console.log( qs("textarea#copy_paste_Edit").value + title_from_html );     // don't use ta.value, as it is display: none; So, value comes--out ""  Use val directly from lStorage.
}


    // the below func appends a lStorage str to textarea_1
gid("prepend__txt_to_ta__2").onclick = function(){  //button
        var txt_msg;
    var lStorage_str = localStorage["str1__copyPaste_to_ta_1"];
    
    if (textarea_1.value.substring(0, lStorage_str.length-3) == lStorage_str.substring(0, lStorage_str.length-3) ) {
        txt_msg = "not again";
    }
    else{
        textarea_1.value = lStorage_str + textarea_1.value; 
        txt_msg = "appended";
    }
    
            //temporarily -- increase textarea_1.height
            //$("#textarea_1").height(60).css({ "font-size": "20px" });

            // $.position has been used, as tooltip--div is absolutely--positioned, not relative to doc\page.
    var textarea_1__position = $("#textarea_1").position().top;
    //var tooltip_offset_top = textarea_1__offset+20;  this not working, offset instead of 8+20, keeps increasing 28 + 20 + 20 ....

    $("div#tooltip_for_textarea_1").text( txt_msg )
        //.offset({ top: tooltip_offset_top })  this did not worked, as expected ??
        .css({ top: textarea_1__position+30+"px" })
        .slideDown("fast").delay(3500).fadeOut("fast");
    //console.log( textarea_1__offset );
}
gid("prepend__txt_to_ta__2").onmouseenter = function(){  //button
        // the below var ka text\value, copied from popup.html -- the title of qs("button#btn_Clipboard_1")
    var title_from_html = "\n-------------\nprepend to title \nin textarea_1";  //this.title; cannot be used, as it keeps appending to the new--title, again & again....
            console.log( title_from_html );
    this.title= localStorage["str1__copyPaste_to_ta_1"] + title_from_html;
            //console.log( qs("textarea#copy_paste_Edit").value + title_from_html );     // don't use ta.value, as it is display: none; So, value comes--out ""  Use val directly from lStorage.
}



            //Imp-Note: this here(!this.checked) is jQuery, not JS. I have checked, by disabling jQuery lib.
//this func retrieves strings from lStorage & shows in ta's            
qs("input#chkbox_Clipboard").onchange= function(){
    if (this.checked) { 
        $("#copy_paste_ta_container").slideDown("fast"); 
        qs("textarea#copy_paste_Edit").value=   localStorage["str__copyPaste_to_ta_1"];
        qs("textarea#copy_paste_Edit_1").value= localStorage["str1__copyPaste_to_ta_1"];
        qs("textarea#copy_paste_Edit_2").value= localStorage["str2__copyPaste_to_ta_1"];
    }
    else { $("#copy_paste_ta_container").slideUp(); }
}
                        
gid("Save_to_lS").onclick = function(){  //button
    localStorage["str__copyPaste_to_ta_1"] = qs("textarea#copy_paste_Edit").value;
    localStorage["str1__copyPaste_to_ta_1"] = qs("textarea#copy_paste_Edit_1").value;
    localStorage["str2__copyPaste_to_ta_1"] = qs("textarea#copy_paste_Edit_2").value;
    $("#Saved_msg1").fadeIn(100).delay(2000).fadeOut("fast");
}//End of func
                        
gid("hide_ta_div").onclick = function(){  //button
    $("#copy_paste_ta_container").slideUp();
    gid("chkbox_Clipboard").checked = false;
}