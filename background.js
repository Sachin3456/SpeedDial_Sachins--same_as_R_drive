// Taken from Ext. ---  "Open bookmarks Manager" button wali.
// Run this on first run to setup default bookmarks and explain how to set up keyboard shortcuts
 
if (localStorage["firstRun"] === undefined) {
    
    chrome.tabs.create({ url: "options.html" });
    localStorage["firstRun"] = false;
}


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	//alert(msg);
	//console.log(msg);	//this is shown in Extensions page -- Errors, not the webpage visited.
	//if (msg=="take_scr") //{ alert("got msg from tabs_es"); 
		//sendResponse({ s_shot: "taking scr" });
	//}
	//else { alert("its hell") }

	if (msg=="take_scr") { 

		chrome.tabs.captureVisibleTab(null, { format : "png", quality : 100 }, function(img_coded_in_alphabets___data) {
            	var img_data = "nothing captured";
        	img_data = img_coded_in_alphabets___data;
	        			//console.log( img_data );
	        var image = new Image(); 
            image.src = img_data;
            //image.onload = function() { 
                var canvas = document.createElement("canvas");
                canvas.width = image.width-22;
                canvas.height = image.height;
                var context = canvas.getContext("2d");
                context.drawImage(image, 0, 0);             //http://www.w3schools.com/html/html5_canvas.asp  http://www.w3schools.com/tags/canvas_drawimage.asp
                                                    //http://www.w3schools.com/canvas/canvas_coordinates.asp
                img_data = canvas.toDataURL();


			sendResponse({ s_shot: "sending scr", s_shot_data: img_data });
		});
	
	}
	return true;    //this is very Imp!! -- because of this sendResponse works. Otherwise, chrome.tabs.query--senMessage Method used below, needs to be used.
	/*  If you want to asynchronously use sendResponse, 
		add return true; to the onMessage event handler.
	See, Notes on this page below MessagePassing examples.
	Message Passing - Google Chrome
	https://developer.chrome.com/extensions/messaging#simple   */

	/*
	if (msg=="take_scr") {
		chrome.tabs.captureVisibleTab(null, { format : "png", quality : 100 }, function(img_coded_in_alphabets___data) {
            var img_data = "nothing captured";
        img_data = img_coded_in_alphabets___data;
        console.log( img_data );

				var obj = { s_shot: "taking scr", s_shot_data: img_data };
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            	chrome.tabs.sendMessage(tabs[0].id, obj );   //message should be a JSON-ifiable object, as per chrome-webpage  https://developer.chrome.com/extensions/runtime#method-sendMessage
    		});
		});
	}//End of if
	*/
});

