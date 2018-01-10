//Started as Ext_No3. to popup.js , on 22Dec16

    var ta_img_Name = document.getElementById("img_Name");  //Global
ta_img_Name.oninput = function () {

    var len = this.value.length; 

    if (len > 59) {  
        this.style.cssText = "font-family: Calibri"; 
    } 

} //End of func ta_img_Name.oninput


$("#Empty_Notes").click(function() {      
    $("#Notes").val("");
});
document.getElementById("Empty_ta_img_Name").onclick = function() {      
    document.getElementById("img_Name").value = "later.png";
};

/*  tags Closed forever, on 27Aug16

$("#Empty_tags").click(function() {      
    $("#tags").val("");
});
*/



document.getElementById("img_Name").onmouseup = function(){ this.select() }
//only  this.select()  gives inline-script error
    
document.getElementById("Edit_in_popup__imgName").onmouseup = function(){ this.select() }   


/*  this I did later, using css transition, only. See, popup.css
$("img.pic_show_1").mouseover(function(){
    $(this).height(130);
});
$("img.pic_show_1").mouseout(function(){
    $(this).height(50);
});*/



                        //button
document.getElementById("to__ta_2").onclick = function() {      
    document.getElementById("img_Name").value = $("textarea#Edit_in_popup__imgName").val();
};
document.getElementById("to__ta_1").onclick = function() {      
    document.getElementById("textarea_1").value = $("textarea#Edit_in_popup__textarea_1").val();
};
document.getElementById("to__ta_3").onclick = function() {      
    document.getElementById("Notes").value = $("textarea#Edit_in_popup__Notes").val();
};
document.getElementById("to__ta_123").onclick = function() {      
    document.getElementById("textarea_1").value = $("textarea#Edit_in_popup__textarea_1").val();
    document.getElementById("img_Name").value = $("textarea#Edit_in_popup__imgName").val();
    document.getElementById("Notes").value = $("textarea#Edit_in_popup__Notes").val();
};