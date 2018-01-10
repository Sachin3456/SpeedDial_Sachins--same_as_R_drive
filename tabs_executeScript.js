//jquery - How to use Javascript to check and load CSS if not loaded? - Stack Overflow
//http://stackoverflow.com/questions/4724606/how-to-use-javascript-to-check-and-load-css-if-not-loaded
//document.styleSheets collection,  could also be used, detail in the Article above.

//Insert css for this .js
//var cssfile_href = "chrome-extension://dlhdagnphjdpfeiopoafankjhiibijod/css/tabs_executeScript.css";
//if (!$("link[href='"+cssfile_href+"'] ").length){ add_cssfile(); Add_el_and_msgListener(); }

function qs(x){  return document.querySelector(x);     }
function qsa(x){ return document.querySelectorAll(x);  }
function gid(x){ return document.getElementById(x);    }

// Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = Date.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };



	var div_exists = "no";
	div_exists = $("div#run_once_sac").length; 
if (div_exists==0){

	add_cssfile(); 
	Add_html_txt();
}
else { console.log("div#run_once_sac already exists. no func will be run.") } //this console-msg, shows-up on webpage-console, not popup
//Add_el_and_msgListener();
//Add_html_txt__thru__template_html_file();

/*  the below tried & worked, successfully. But closed, for better Usage, in this .js
	var template_path = chrome.extension.getURL("template_html_for_content_script.html");
		var html_txt, parsed_html_txt;  //Global var
	$.get(template_path, function(data){
		console.log(data, "-------\n", $.parseHTML(data) );
		html_txt = data;
		parsed_html_txt = $.parseHTML(data);
	});

	setTimeout(function(){
		console.log( html_txt, typeof html_txt, "-------\n", 
			parsed_html_txt, typeof parsed_html_txt, "-------\n", parsed_html_txt[0], typeof parsed_html_txt[0] );
		$("body").append( html_txt );
	}, 50);  */

function add_cssfile(){
	var cssfile_path = chrome.extension.getURL("css/tabs_executeScript.css");
	var cssfile = $("<link />").attr({ rel: "stylesheet", href: cssfile_path, 
							   id: "SpeedDial_Sac__tabs_executeScript_css", type: "text/css" });

	var jQueryUI_cssfile_path = chrome.extension.getURL("lib/jquery-ui.css");
	var jQueryUI_cssfile = $("<link />").attr({ rel: "stylesheet", href: jQueryUI_cssfile_path, 
							   id: "jQueryUI_cssfile__SpeedDial_Sac__tabs_executeScript_se", type: "text/css" });
	/*  this was working ok, but used the inject stylesheet Method, thru manifest.json
		this was using, web-accessible resources, which also, i have closed in manifest.json
		this is done, as it is a fix--lib & should not be edited.
		if injected this way, it can be edited thru, chrome--console, as this ext.--folder is network--mapped

	var tooltip_sac_cssfile_path = chrome.extension.getURL("css/sac_tooltip__for_tabsExecute_Codepen_ZJRBQN.css");
	var tooltip_sac_cssfile = $("<link />").attr({ rel: "stylesheet", href: tooltip_sac_cssfile_path, 
							   id: "sac_tooltip__scr_tabs_executeScript_se", type: "text/css" });*/

	$("head").append( jQueryUI_cssfile ).append( cssfile );   //.append(tooltip_sac_cssfile)
}

/*  
	the above appended css--file, is a 'web_accessible resource'. this needs to be stated in manifest.json

		the line-below copy--pasted from manifest.json
	"web_accessible_resources": [ "css/tabs_executeScript.css" ],    

	Note: this line of web_access... is Imp!, otherwise throws\shows error on the page(F12 console mein) :-

	Denying load of 'css-file-path'. 
	Resources must be listed in the web_accessible_resources manifest key 
	in order to be loaded by pages outside the extension.
	*/

//------------------------------------------------------------------------------

	/* Imp!! -- template method for html taken from stackoverflow

		the below 2 links bmarked in SpeedDial_Sac, + full-page scr also in notes. Cat--chrome api mein

		google chrome - Inject HTML into a page from a content script - Stack Overflow
		http://stackoverflow.com/questions/16334054/inject-html-into-a-page-from-a-content-script 

		javascript - Adding complex HTML using a Chrome content script - Stack Overflow
		http://stackoverflow.com/questions/15873904/adding-complex-html-using-a-chrome-content-script

	*/

	function Add_html_txt(){   	//__thru__template_html_file
		var template_file_path = chrome.extension.getURL("template_html_for_content_script.html");
								//var html_txt, parsed_html_txt;  //Global var
		$.get(template_file_path, function(data){
						//console.log(data, "-------\n", $.parseHTML(data) );
						//html_txt = data;
						//parsed_html_txt = $.parseHTML(data);
			//document.body.appendChild(data);  //this does not work, saying, data is not of nodetype. whereas, jQuery works.
			$("body").append(data);		//data here is all template.html
			Add_el_and_msgListener();
			setTimeout(show_ttip_after_screenshoter_div43_Added, 3000);
		});
	}
	//Add_html_txt();


function Add_el_and_msgListener(){
/*	var div = document.createElement("div"); div.id = "imgCapture_container_div43";

	div.innerHTML = "'#imgCapture_container_div43' Added thru tabsE" +

		"<br><textarea id='ta_img'></textarea><br>" +
		"<div id='resizable_info'>" +
			"<table>" +
				"<tr id='row1'><td>top</td><td>left</td><td>width</td><td>height</td><td>ratio</td></tr>" +
				"<tr id='row2'><td id='top'></td><td id='left'></td><td id='div_width'></td><td id='div_height'></td><td id='Aspect_ratio'></td></tr>" +
			"</table>" +
		"</div>" +

		"<div id='imglink_container'>" +
			"<button id='take_scr'>take scr</button>" +
			"<a id='save__scr_img' href='imgName_not_changed_check.png'>save scr</a><br>" + 
			"<div id='zoom_txt'>" +
				"<button id='youtube_pos'>youtube pos</button>" +
				"<button id='hide_show_toggle_marque' class='ONclass'>toggle m</button>" +
				"<button id='hide_show_toggle_ytp-progress-bar'>toggle prog-bar</button>" +
				"<span id='zoomtxt'></span>" +
			"</div>" +
			"<div id='imgCaptured'><img id='imgCaptured_1'></div>" +
			"<div id='imgSaved-click_animated'></div>" +
			"<button id='try_Capture'>chrome.captueVisibleT</button>" +
		"</div>" +

		"<div id='close_div'>x</div>";
*/	
	/* 
		google chrome - Inject HTML into a page from a content script - Stack Overflow
		http://stackoverflow.com/questions/16334054/inject-html-into-a-page-from-a-content-script  */

	/*
		function show__img_marque__pos__in__inputs(){  //this is fixed, as per div#img_marque--css, but as I keep changing it, I kept it thru JS.
													//if it remains fixed for a long-time, close this func & add thru template.html
	}*/
	
	$("#imgCapture_container_div43").draggable().css({ position: "fixed" });    //draggable makes position: relative | in .css-file, I have kept fixed, so again fixed.

	$("div#show_big_larger_img").draggable().css({ position: "fixed" });    //draggable makes position: relative | in .css-file, I have kept fixed, so again fixed.

	$("div#img_marque")
				//Note: Math.round --> rounds-off as the normal-way of rounding-off. 10.5 to 11 | 10.4 to 10 | 10.6 to 10
				//Math.floor --> rounds-off downward to its nearest integer. So, 10.3, 10.5, 10.7 all-to 10
				//.toFixed(1) --> always gives 1 decimal, even its 0. & does rounding-off the normal Math.round way. 10.54 to 10.5 | 10.56 to 10.6
		.draggable({ drag: function(event, ui) {
						var t = Math.round(ui.position.top);
	            $("tr#row2 td#top").text(t);
	            qs("input#marque_top").value=t;
	            qs("input#marque_top_1").value=t;
	            		var l = Math.round(ui.position.left);
    	        $("tr#row2 td#left").text(l);
    	        qs("input#marque_left").value=l;
    	        qs("input#marque_left_1").value=l;
        	}
    	})
    	.resizable({ resize: function(event, ui){
    					var t = Math.round(ui.position.top);
	            $("tr#row2 td#top").text(t);
	            qs("input#marque_top").value=t;
	            qs("input#marque_top_1").value=t;
	            	//s_shot.top = ui.position.top;
	            		var l = Math.round(ui.position.left);
    	        $("tr#row2 td#left").text(l);
    	        qs("input#marque_left").value=l;
    	        qs("input#marque_left_1").value=l;
    	        	//s_shot.left = ui.position.left
    	        		var w = Math.round(ui.size.width);
                $("tr#row2 td#div_width").text(w);
                qs("input#marque_width").value=w;
                	//s_shot.width = ui.size.width;
                		var h = Math.round(ui.size.height);
                $("tr#row2 td#div_height").text(h);
                qs("input#marque_height").value=h;
                	//s_shot.height = ui.size.height;
                $("tr#row2 td#Aspect_ratio").text( (ui.size.width/ui.size.height).toFixed(2) );
        	},
        handles: "n, e, s, w, se, sw, nw"     //http://api.jqueryui.com/resizable/#option-handles
        /*animate: true    //http://jqueryui.com/resizable/#animate*/
    	})
    	.css({ position: "fixed" });  //draggable makes position: relative | in .css-file, I have kept fixed, so again fixed.
		//.appendTo("body");

					//var t = localStorage.key(0);  //this works, but it gets the lStorage of this domain, not extension's lStorage

					//$("#ta_img").val( t + " -- some text." );  
	$("span#zoomtxt").text( qs("html").style.zoom );  //shorthand of querySelector -- see start of this .js

	$("div#close_div").click(function(){ 
		//$("#imgCapture_container_div43, #img_marque").css({ visibility: "hidden" }); 
		$("#imgCapture_container_div43").toggle();
		$("div#img_marque").hide();  //not used toggle(), as it is sometimes already hide(), thru toggle--marque--btn.
	});
	$("button#left_side_btn").click(function(){ 
		$("#imgCapture_container_div43, #img_marque").toggle();
	});

			//var s_shot = { top: 200, left: 400, width: 700, height: 300 };  //some random initial values kept, just to initialize var
	qs("button#take_scr").onclick = function(){ 
			var marque = $("div#img_marque");
			var divtop=marque.css("top");	divtop= divtop.slice(0, divtop.length-2);
			var divleft=marque.css("left");	divleft= divleft.slice(0, divleft.length-2);
			var divwidth=marque.width();    
			var divheight=marque.height();
		
		//marque 'display: css_status'  before_scr   | this will have to be restored back after scr. It may be none or block.
		//if not restored, the-btn  'toggle marque' does\may-not work properly.
		var M = marque.css("display");
		$("div#imgCapture_container_div43, div#img_marque").hide();
		//$("div#imgCapture_container_div43, div#img_marque").css({ visibility: "hidden" });
		//$("div#ytp-progress-bar").css({ visibility: "hidden" });

		setTimeout(function(){

			chrome.runtime.sendMessage("take_scr", function(response) { 

	  			//console.log(response.s_shot, response.s_shot_data);

	  			var img_data = response.s_shot_data;
	  			var image = new Image(); 
	            image.src = img_data;
	                var canvas = document.createElement("canvas");
	                canvas.width = divwidth;
	                canvas.height = divheight;
	                var context = canvas.getContext("2d");
	                context.drawImage(image, -divleft, -divtop);             //http://www.w3schools.com/html/html5_canvas.asp  http://www.w3schools.com/tags/canvas_drawimage.asp
	                                                    //http://www.w3schools.com/canvas/canvas_coordinates.asp
	                img_data = canvas.toDataURL();

	            //console.log(s_shot.top, s_shot.left, s_shot.width, s_shot.height);

	  			qs("a#save__scr_img").href = img_data;   //response.s_shot_data
	  			qs("img#imgCaptured_1").src = img_data;
	  		});
		}, 200);

		setTimeout(function(){
  			//$("div#imgCapture_container_div43, div#img_marque").css({ visibility: "visible" }); 
  			$("div#imgCapture_container_div43").show();
  			//marque 'display: css_status'  restored back.
  			marque.css({ display: M });
  			//$("div#ytp-progress-bar").css({ visibility: "visible" }); 

 		}, 1300);	//was 800 on 14March17, scr captures div#43 itself also, so increased to 1000.
 					// on 11July17, increased to 1300, as when too many tabs & Chrome becomes slow, then it creates scr including #div43


		// the below added on 30April17, when on 'take scr' btn--click & then pic added to 'main #div43' was showing the el after pic--problematic. Actually, the height of this 'main #div43' was not increasing & hence the el after pic were, not being covered by this 'main #div43'.
		// So, made the inline-height ""  of  'main #div43'  The inline-height of 'main #div43' automatically comes-up, when 'main #div43' moved by handle. jQueryui gives--it an height.
 		//qs("div#imgCapture_container_div43").style.height= "";


 		/*  this idea of increasing width, on scr--take was good, still I closed, & now width--in--css is '360px', right from when #div_43 is Added to page.

 		// 'div43' ki width css mein maine kept 334px, but when img-scr is taken, by--1.7--ratio, it becomes 340x200. So, 'div43' ki width had to be increased, otherwise, img goes\shows outside 'div43'. 
 		// i could have done 350px right in the beginning in css, but thin is preferred .....
 		qs("div#imgCapture_container_div43").style.width= "360px";
 			var imgCaptured_ki_width = qs("img#imgCaptured_1").width;
 		if ( imgCaptured_ki_width > 351 ) {
 			qs("div#imgCapture_container_div43").style.width= "360px";  //imgCaptured_ki_width+15
 		}
 		*/
  		
	}//End of  qs("button#take_scr").onclick

	qs("#ta_img").onchange = function(){
		qs("a#save__scr_img").download = this.value;
	}

	qs("button#hide_show_toggle_marque").onclick = function(){
				var marque = $("div#img_marque");
		marque.toggle();
		$(this).toggleClass("ONclass");
		$(this).toggleClass("col_gray");  //i later made-it brown-type

		//to show-up marque-pos on toggle, a little-bit bolder
		if ( marque.css("display")!=="none" ){   //means 'block'
			marque.css({ "box-shadow": "0 0 5px gold", border: "4px solid red" });
			setTimeout(function(){
				marque.css({ "box-shadow": "", border: "" });
			}, 1500);
		}
	}

		//toggle prog-bar & btns--around
	$("button#hide_show_toggle_ytp-progress-bar").click(function(){
		$("div.ytp-progress-bar").toggle();	
		//if ( qs("button.ytp-cards-button").style.display!="none" ) { 
			$("button.ytp-cards-button").hide();  
			$("button.ytp-chrome-top-buttons").hide();  
		//}
		//$("button.ytp-watch-later-button, button.ytp-share-button").toggle();  // the 2 buttons are present in the 'div.ytp-chrome-top-buttons', but display: none; on that div does not work, So, did btns individually. It seems from css, that display: none; is already on that div. Some script is being used.
		$("button.ytp-play-button.ytp-button, button.ytp-mute-button.ytp-button, a.ytp-next-button.ytp-button").vistoggle();
		$("button.ytp-subtitles-button, button.ytp-size-button.ytp-button, button.ytp-fullscreen-button.ytp-button").vistoggle();
	});





	var marque = qs("div#img_marque");  //Global var, for below funcs only.

	// new_ytb_css #1
	qs("button#ytb_corner").onclick = function(){
										//$("#player-api").offset().top;
		//$("#img_marque").offset( $("#player-api").offset() );
		//new_changed_css ke liye
		$("div#img_marque").offset( $("#player-container").offset() );

		var marquetop = Math.round( marque.style.top.slice(0,-2) ) + 1;
		var marqueleft = Math.round( marque.style.left.slice(0,-2) ) + 3;

		$("tr#row2 td#top").text( marquetop );
    	$("tr#row2 td#left").text( marqueleft );
    	qs("input#marque_top").value = marquetop;
        qs("input#marque_left").value = marqueleft;
        qs("input#marque_top_1").value = marquetop;
        qs("input#marque_left_1").value = marqueleft;
	};

	// new_ytb_css #8   -- rectified\changed the old--one, on 2 oct17
	qs("button#youtube_pos").onclick = function(){
					var marque = $("div#img_marque");			//$("#player-api").offset().top;

		$("div#img_marque").offset( $("div#movie_player").offset() );
		//at zoom 100%, $("div#player-api").width() is 854 & height is 480.
		//till 24Feb17,  at zoom 100%, this was working, which I closed for all zoom & sizes, even this will fill on 25" Dell monitor display.
		//$("div#img_marque").width(852).height(478);
		var w = $("div#movie_player").width();	var h = $("div#movie_player").height();

		//if (){}  PENDING!!
		//$("#player.ytd-watch").removeClass("zoom_1_point_1").addClass("zoom_1_point_2");
		marque.width(w);	marque.height(h);
							/*  jQuery offset() Method
								http://www.w3schools.com/jquery/css_offset.asp

								See, example -- Set the offset coordinates for an element using the offset coordinates of another element
							*/
		var divtop=marque.css("top");	divtop= divtop.slice(0, -2);   //cutting 30 from 30px
		var divleft=marque.css("left");	divleft= divleft.slice(0, -2);
		var divwidth=marque.width();    
		var divheight=marque.height();

		$("tr#row2 td#top").text( Math.round(divtop) );
    	$("tr#row2 td#left").text( Math.round(divleft) );
        $("tr#row2 td#div_width").text( Math.round(divwidth) );
        $("tr#row2 td#div_height").text( Math.round(divheight) );
        qs("input#marque_top").value = Math.round(divtop);
        qs("input#marque_left").value = Math.round(divleft);
        qs("input#marque_width").value = Math.round(divwidth);
        qs("input#marque_height").value = Math.round(divheight);
        qs("input#marque_top_1").value = Math.round(divtop);
        qs("input#marque_left_1").value = Math.round(divleft);
        $("tr#row2 td#Aspect_ratio").text( (divwidth/divheight).toFixed(2) );
	}//End of qs("button#youtube_pos").onclick


		// new_ytb_css #2
	qs("button#img_marque_size_576_1024").onclick = function(){
		marque.style.width= "1024px";
		marque.style.height= "576px";

		// update table & inputs
		qs("tr#row2 td#div_width").innerText = "1024";
    	qs("tr#row2 td#div_height").innerText = "576";
    	qs("input#marque_width").value = 1024;
        qs("input#marque_height").value = 576;
        qs("tr#row2 td#Aspect_ratio").innerText = "1.78"; //As the value is fixed, no need to calculate (1024/576).toFixed(2) ;
	}

	// new_ytb_css #3
	qs("button#img_marque_size_854_480").onclick = function(){
		marque.style.width= "854px";
		marque.style.height= "480px";

		// update table & inputs
		qs("tr#row2 td#div_width").innerText = "854";
    	qs("tr#row2 td#div_height").innerText = "480";
    	qs("input#marque_width").value = 854;
        qs("input#marque_height").value = 480;
        qs("tr#row2 td#Aspect_ratio").innerText = "1.78"; //As the value is fixed, no need to calculate (854/480).toFixed(2) ;
	}

	// new_ytb_css #9
	qs("button#img_marque_size_939_528").onclick = function(){
		marque.style.width= "939px";
		marque.style.height= "528px";

		// update table & inputs
		qs("tr#row2 td#div_width").innerText = "939";
    	qs("tr#row2 td#div_height").innerText = "528";
    	qs("input#marque_width").value = 939;
        qs("input#marque_height").value = 528;
        qs("tr#row2 td#Aspect_ratio").innerText = "1.78"; //As the value is fixed, no need to calculate .toFixed(2) ;
	}	

	// new_ytb_css #4   -- (Added on 1 Oct17)
	qs("button#img_marque_size_1280_720").onclick = function(){
		marque.style.width= "1280px";
		marque.style.height= "720px";

		// update table & inputs
		qs("tr#row2 td#div_width").innerText = "1280";
    	qs("tr#row2 td#div_height").innerText = "720";
    	qs("input#marque_width").value = 1280;
        qs("input#marque_height").value = 720;
        qs("tr#row2 td#Aspect_ratio").innerText = (1280/720).toFixed(2) ;
	}

	// new_ytb_css #5   -- (Added on 2 Oct17)
	// Note:  this right-align will also work, on Dell 25", where m_player is 1280x720, or any width, provided, page--zoom is 100%
	// but this will not work with z1.1 & z1.2 classes on Dell 25", because, I have kept 854*1.1=939 & 854*1.2=1025  fixed for Laptop. there, I have multiplied with  calculated  'gid("movie_player").clientWidth;' , instead used fixed 854. this can be changed very easily, if reqd.
	// As, I hardly, work on big monitor, So, kept classes 1.1 & 1.2 fixed for myLaptop.
	qs("button#marque_right_aligned_at_100per_zoom").onclick = function(){ //button
		// 1024+33= 1057;   left: 33px is left aligned, in this scenario, only "#img_marque" zoom @1.2 , not the full--page\html

			var zoom = qs("html").style.zoom;  // this is page--zoom

		if (zoom!="100%"){
			$(".tooltip_el .config_id_zoomtxt__JS").html( "current page zoom: " + zoom + 
					"<br>-------------------------<br> make page zoom to <br>100% first")
				.fadeIn(50).delay(6000).fadeOut(200);
			return;
		}			
		
			var m_player = $("#player.ytd-watch");
			var current_movie_player_width = gid("movie_player").clientWidth;  //854;  // this remains fixed on my Laptop -- 1366x768 , only be diff. on Dell. 25", where this is 1280
			var m_player__visual_width;
			var current_marque_width = ( marque.style.width ).slice(0,-2);
	

			// if m_player is not any of 1.1 and 1.2 -- both   (means is normal zoomed with 854x480 normal dimensions)
		if ( !m_player.hasClass("zoom_1_point_1") && !m_player.hasClass("zoom_1_point_2") 
				&& zoom=="100%" ){
		
			// Imp!!--Note:
			// the below var was working ok, but the fact that m_player width remains always 854
			// was discovered.  whether you zoom the whole page to 1.1, 1.2 or 1.5  OR  just zoom 
			// only m_player--element  with 1.1 or 1.2
			// gid("movie_player").clientWidth;  always Returns 854

			// Actually, what happens is:  when you zoom the page or m_player,
			// the visual width & height increase, but the javascript\el's--Actual--remains--the--same.
			// So, when zoom_1.1 , the visual becomes  854*1.1 = 939
			// at zoom_1.2 , the visual becomes  854*1.2 = 1024.8
			// So, the conclusion is:  you will have to see the class--Added or zoom--done--by--js
			// & then what visual height comes in, is the real width & height.

			// Imp!! -- So, see, both m_player--el zoom + page--zoom, to get the real--visual size of m_player.
			//var current_movie_player_width = gid("movie_player").clientWidth;  //Returns like 854 , no 'px' text.

			var diff_of_width = current_movie_player_width - Number(current_marque_width);

			//var new_left = Number( marque.style.left.slice(0,-2) ) + diff_of_width;
			var new_left = Math.round( $("#player-container").offset().left ) + diff_of_width;
			console.log(current_movie_player_width, current_marque_width, diff_of_width,
				new_left );
			//var new_left = 1057 - current_marque_width;  //right--align is calculated thru full_width_@_120per, current_width & left. only current_width is sufficient.
			marque.style.left = new_left+"px";

			qs("input#marque_left").value = new_left;
			qs("input#marque_left_1").value = new_left;
		}

		//--------- for zoom_1.1 also
		else if ( m_player.hasClass("zoom_1_point_1") && zoom=="100%" ){
			
			m_player__visual_width = 939; //current_movie_player_width * 1.1;  // this is always 939.4 on 1366x768 -- myLaptop

			var diff_of_width = m_player__visual_width - Number(current_marque_width);

			//var new_left = Number( marque.style.left.slice(0,-2) ) + diff_of_width;
			var new_left = Math.round( $("#player-container").offset().left ) + diff_of_width;
				
				console.log(current_movie_player_width, current_marque_width, diff_of_width,
					new_left );

			marque.style.left = new_left+"px";

			qs("input#marque_left").value = new_left;
			qs("input#marque_left_1").value = new_left;

		}

		else if ( m_player.hasClass("zoom_1_point_2") && zoom=="100%" ){

			m_player__visual_width = 1025;  //current_movie_player_width * 1.2;  // this is always 1024.8 on 1366x768 -- myLaptop

			var diff_of_width = m_player__visual_width - Number(current_marque_width);

			//var new_left = Number( marque.style.left.slice(0,-2) ) + diff_of_width;
			var new_left = Math.round( $("#player-container").offset().left ) + diff_of_width;
				
				console.log(current_movie_player_width, current_marque_width, diff_of_width,
					new_left );

			marque.style.left = new_left+"px";

			qs("input#marque_left").value = new_left;
			qs("input#marque_left_1").value = new_left;
		}

	}//End of  qs("button#marque_right_aligned_at_100per_zoom").onclick


	// new_ytb_css #6   -- (Added on 2 Oct17)
	qs("button#marque_left_aligned_at_100per_zoom").onclick = function(){ //button

		// Math.floor(70.8) == 70  ,,  Math.floor(70.3) == 70    So, round-off to back--number & Add 1
		var new_left = Math.round( $("#player-container").offset().left );  //typeof is number
		marque.style.left = new_left+"px";

		qs("input#marque_left").value = new_left;
		qs("input#marque_left_1").value = new_left;
	}

	// new_ytb_css #7   -- (Added on 2 Oct17)
	// Note: this will work at 100% zoom, even on Dell 25", where size is 1280x720
	qs("button#marque_center_aligned_at_100per_zoom").onclick = function(){ //button
		
		var current_movie_player_width = gid("movie_player").clientWidth;  //Returns like 854 , no 'px' text.
		var current_marque_width = ( marque.style.width ).slice(0,-2);
		var diff_of_width = current_movie_player_width - Number(current_marque_width);
		var half__diff_of_width = Math.round( diff_of_width/2 );

		var new_left = $("#player-container").offset().left + half__diff_of_width;

		marque.style.left = new_left+"px";

		qs("input#marque_left").value = new_left;
		qs("input#marque_left_1").value = new_left;
	}





	$("button#copy_img-path_to_clipboard").click(function(){
		/*  backSlash in a var, textarea & div -- setting & getting, 13Feb17
			http://codepen.io/sahni4you/pen/oBJJPv		*/
		var fixed_path = "R:\\Chrome_Extensions__Making__started_14Jan15\\SpeedDial_Sachins\\images\\";
		var ta = qs("textarea#copy_img-path_to_clipb");
		ta.style.visibility = "visible";
		ta.value = fixed_path + qs("textarea#ta_img").value;
		ta.select();
		document.execCommand('copy'); // or 'cut'
		ta.style.visibility = "hidden";
	});
					//http://stackoverflow.com/questions/5212651/blur-vs-onblur
	qs("button#copy_imgName_to_clipb").onclick=function(){ 
		qs("#ta_img").select(); document.execCommand("copy");
		setTimeout(function(){ qs("#ta_img").blur(); }, 200);

		this.innerText="Copied";  this.style.fontWeight="bold";
		setTimeout(function(){ 
					var ta = qs("#copy_imgName_to_clipb");
			ta.innerText="copy imgName";   ta.style.fontWeight="";
		}, 2500);		
	}

	//save first--sshot to sessionStorage
	qs("button#save_img1").onclick = function(){
    	sessionStorage.img_sshot_1 = qs("img#imgCaptured_1").src;
    	qs("button#get_img1").style.visibility = "visible";  //the button will be shown, once the img is saved to lStorage. 
    													//this will also inform\tell that no s_shot saved in session Storage.
	}
	//get first-sshot to sessionStorage
	qs("button#get_img1").onclick = function(){
				var img_data = sessionStorage.img_sshot_1;
    	qs("img#imgCaptured_1").src = img_data;
    	qs("a#save__scr_img").href = img_data;
    	qs("span#which_img_loaded").innerText = "1";
    	this.className = "btn_clicked";
    	$("button#get_img2, #get_img3").removeClass("btn_clicked");
	}	

	//save second--sshot to sessionStorage
	qs("button#save_img2").onclick = function(){
    	sessionStorage.img_sshot_2 = qs("img#imgCaptured_1").src;
    	qs("button#get_img2").style.visibility = "visible";  //the button will be shown, once the img is saved to lStorage. 
    													//this will also inform\tell that no s_shot saved in session Storage.
	}
	//get second-sshot to sessionStorage
	qs("button#get_img2").onclick = function(){
				var img_data = sessionStorage.img_sshot_2;		
    	qs("img#imgCaptured_1").src = sessionStorage.img_sshot_2;
    	qs("a#save__scr_img").href = img_data;
    	qs("span#which_img_loaded").innerText = "2";
    	this.className = "btn_clicked";
    	$("button#get_img1, #get_img3").removeClass("btn_clicked");
	}	

	//save second--sshot to sessionStorage
	qs("button#save_img3").onclick = function(){
    	sessionStorage.img_sshot_3 = qs("img#imgCaptured_1").src;
    	qs("button#get_img3").style.visibility = "visible";  //the button will be shown, once the img is saved to lStorage. 
    													//this will also inform\tell that no s_shot saved in session Storage.
	}
	//get second-sshot to sessionStorage
	qs("button#get_img3").onclick = function(){
				var img_data = sessionStorage.img_sshot_3;		
    	qs("img#imgCaptured_1").src = sessionStorage.img_sshot_3;
    	qs("a#save__scr_img").href = img_data;
    	qs("span#which_img_loaded").innerText = "3";
    	this.className = "btn_clicked";
    	$("button#get_img1, #get_img2").removeClass("btn_clicked");
	}		

	$("input#marque_width").change(function(){
    	$("div#img_marque").width( this.value );
    	var width = this.value;
    	var height = $("div#img_marque").height();
    	$("tr#row2 td#Aspect_ratio").text( (width/height).toFixed(2) );
	});
	$("input#marque_height").change(function(){
    	$("div#img_marque").height( this.value );
    	var width = $("div#img_marque").width();
    	var height = this.value;
    	$("tr#row2 td#Aspect_ratio").text( (width/height).toFixed(2) );
	});
	qs("input#marque_top").onchange= function(){
    	qs("div#img_marque").style.top = this.value+"px";
    	qs("input#marque_top_1").value = this.value;
	}
	qs("input#marque_left").onchange = function(){
    	qs("div#img_marque").style.left = this.value+"px";
    	qs("input#marque_left_1").value = this.value;
	}


	// ----------------------------------------------------------
		//Note--Imp: this copied from  qs("input#marque_left_1").onchange -- after left became successful, around after 2-3 months
	qs("input#marque_top_1").onchange= function(){
		// this input's value should also change with top_1
		qs("input#marque_top").value = this.value;

		var current_top = qs("div#img_marque").style.top;  
						   current_top = Math.round( current_top.slice(0,-2) );  //sometimes\many-times, this is in decimals, so Math.round
		var diff_of_top = this.value - current_top;

    	$("div#img_marque").css("top", this.value+"px" );

    				//var width = Math.round( $("div#img_marque").width() );	//Note: don't use .jQuery.width()  it is giving in decimals, whereas, PureJS gives exact(not decimals). If free-time, check again.
    	var height = ( qs("div#img_marque").style.height ).slice(0,-2);
    				height = Math.round(height);
    	var new_height = height - diff_of_top;	//if you go by input increment, this always remains 1, (as set in input increment--attribute)
		    		//$("div#img_marque").width( new_width );  //( "-="+diff_of_left );	// '-='+this.value  works, but not the formula, equivalent of this has been used in PureJS. may-be that $.width() gives in decimals, was causing the prob.
    	qs("div#img_marque").style.height= new_height+"px";
    	qs("input#marque_height").value = new_height;

    	//updating ratio
    	var width = ( qs("div#img_marque").style.width ).slice(0,-2);  // inline-height is always there, for 'div#img_marque'
    	$("tr#row2 td#Aspect_ratio").text( (width/new_height).toFixed(2) );
	}//End of 

		/*var onfocus_width = 0;
	qs("input#marque_left_1").onfocus = function(){
		onfocus_width = Math.round( $("div#img_marque").width() );
		console.log( "onfocus_width: " + onfocus_width );
	}*/
	qs("input#marque_left_1").onchange= throttle(function(){
		// this input's value should also change with left_1
		qs("input#marque_left").value = this.value;

		var current_left = qs("div#img_marque").style.left;  
						   current_left = Math.round( current_left.slice(0,-2) );  //sometimes\many-times, this is in decimals, so Math.round
		var diff_of_left = this.value - current_left;

    	$("div#img_marque").css("left", this.value+"px" );
    	    	
    				//var width = Math.round( $("div#img_marque").width() );	//Note: don't use .jQuery.width()  it is giving in decimals, whereas, PureJS gives exact(not decimals). If free-time, check again.
    	var width = ( qs("div#img_marque").style.width ).slice(0,-2);
    				width = Math.round(width);
    	var new_width = width - diff_of_left;	//if you go by input increment, this always remains 1, (as set in input increment--attribute)
		    		//$("div#img_marque").width( new_width );  //( "-="+diff_of_left );	// '-='+this.value  works, but not the formula, equivalent of this has been used in PureJS. may-be that $.width() gives in decimals, was causing the prob.
    	qs("div#img_marque").style.width= new_width+"px";
    	qs("input#marque_width").value = new_width;

    	//updating ratio
    	var height = ( qs("div#img_marque").style.height ).slice(0,-2);  // inline-height is always there, for 'div#img_marque'
    	$("tr#row2 td#Aspect_ratio").text( (new_width/height).toFixed(2) );
    	
    	//Imp!! checkpoint, for this .onchange
    	//console.log( this.value, current_left, diff_of_left, new_width, qs("div#img_marque").style.width );
   	
	}, 100);
	// ----------------------------------------------------------	



	qs("button#zoom_10per").onclick = function(){
			var marque = $("div#img_marque");
			var initial_width = marque.width();
			var initial_height = marque.height();
							//$("div#img_marque").width( "+=10%" );
							//$("div#img_marque").height( "+=10%" );

			var w_after_calc = Math.round( initial_width + initial_width*10/100 );
			var h_after_calc = Math.round( initial_height + initial_height*10/100 );
		qs("input#marque_width").value=  w_after_calc;
		qs("input#marque_height").value= h_after_calc;
		marque.width(w_after_calc);
		marque.height(h_after_calc);
	}

	qs("button#pos_and_input_at_zoom_120per").onclick = function(){
		document.body.scrollTop = 54; //this was 48, till 9May17
		qs("div#masthead-positioner").style.position = "absolute";

		qs("input#marque_left").value = 0;		//its always 0, @120% zoom, thats-why not claculated.
		qs("input#marque_left_1").value = 0;
		qs("input#marque_width").value = 1026;
		qs("input#marque_height").value= 576;	//Note: 1024\576 = 1.7777
				var div = $("div#img_marque");
		div.width(1026);	div.height(576);	//div.css({ "top": "32" });
		setTimeout(function(){
			$("#img_marque").offset( $("#player-api").offset() );
		}, 200);

		//once the offset is set, top--pos calculated & put in inputs
		setTimeout(function(){ 
				var pos_top = Number( div.css("top").slice(0,-2) ) + 4;
				pos_top = Math.round(pos_top);
			qs("input#marque_top").value= pos_top; 
			qs("input#marque_top_1").value= pos_top; 
			div.css({ top: pos_top });  //this is done, only because Math.round has changed the top--pos
		}, 400);

		$("tr#row2 td#Aspect_ratio").text( (1026/576).toFixed(2) );

			var zoom = qs("html").style.zoom;
		if ( zoom != "120%"){ //show config_id_zoomtxt__JS tooltip msg
			$(".tooltip_el .config_id_zoomtxt__JS").html( "current page zoom: " + zoom + "<br>-------------------------<br> make page zoom to <br>120% first")
				.fadeIn(50).delay(6000).fadeOut(200);
		}

	}//End of func 120per

	qs("div#zoom_120per_info").onclick = function(){
		$("table#marque_position tr#row5").toggle();

	}


		//Copied\based  from\on  qs("button#hide_show_toggle_marque").onclick
	qs("button#focus_marque").onclick = function(){
			var marque = $("div#img_marque");

			marque.toggleClass("focused");  // "focused" is an empty Class, its not in css

		//to show-up marque-pos on toggle, a little-bit bolder
		if ( marque.css("display") !== "none" ){   //means 'block'

			if ( marque.hasClass("focused") ){			
				marque.css({ "box-shadow": "0 0 4px gold", border: "2px solid red" });
				$("span.marque_focused").show();
			}
			else{
				marque.css({ "box-shadow": "", border: "" });
				$("span.marque_focused").hide();
			}

			/*setTimeout(function(){
				marque.css({ "box-shadow": "", border: "" });
			}, 2500);*/
		}

	}//End of func

	qs("span#img_hover").onmouseenter = function(){
		qs("img#imgCaptured_1_clone").src = qs("img#imgCaptured_1").src;
		$("div#show_big_larger_img").show();
	}
	qs("span#img_hover").onmouseleave = function(){
		setTimeout(function(){
			$("div#show_big_larger_img").fadeOut(200);
		}, 1500);
	}

	qs("button#player_api__zoom_1_point_2").onclick = function(){
				var zoom = qs("html").style.zoom;

		if ( zoom != "100%"){ //show config_id_zoomtxt__JS tooltip msg
			var html_txt = "current page zoom: " + zoom + 
				"<br>-------------------------<br> make page zoom to <br>100% first<br>" +
				"& then again press this btn.";

			$(".tooltip_el .config_id_zoomtxt__JS").html( html_txt)
				.fadeIn(50).delay(9000).fadeOut(200);

			return;  //don't do any further
		}


		document.body.scrollTop = 54;
		// the below input is Added by Ext. Styler, for youtube.com
		qs("input#scroll_to_pos").value= 54;
		//$("#img_marque").offset( $("#player-api").offset() );

				var div = $("div#img_marque");
		div.width(1024);	div.height(576);	//div.css({ "top": "32" });
		div.css({ top: "6px", left: "33px" });

		//once the offset is set, top--pos calculated & put in inputs. At zoom 1.2, it comes "6px" always, when scrollTop is 54.
		// but still i have calculated.  if you change anything, this code will still work.
		/*setTimeout(function(){ 
				var pos_top = div.css("top").slice(0,-2);
				if (pos_top.indexOf(".") > -1){ //means "." present
					pos_top = Math.round(pos_top)+1;
					div.css({ top: pos_top+"px" });  //this is done, only because Math.round has changed the top--pos
				}
				
			qs("input#marque_top").value= pos_top; 
			qs("input#marque_top_1").value= pos_top; 
		}, 400);*/

		// left on .offset() -- not calculated like top, just noticed its always 33px & kept here.
		qs("input#marque_width").value = 1024;
		qs("input#marque_height").value= 576;	//Note: 1024\576 = 1.7777
		qs("input#marque_left").value = 33;
		qs("input#marque_left_1").value = 33;
		qs("input#marque_top").value= 6; 
		qs("input#marque_top_1").value= 6; 
		$("tr#row2 td#Aspect_ratio").text( "1.77" );  //(1024/576).toFixed(2) -- As this is fixed here, i have straightly--kept 1.77

		//qs("#player-api").style.zoom= "120%";
		//qs("#player-api").style.left= "-27px";  //"-561px"
		qs("#placeholder-player").style.zoom= "120%";
		qs("#placeholder-player").style.left= "-27px";
		qs("#player-api").style.zoom= "120%";
		// this div is added by Styler ext. itself
		qs("div#container_sac").style.top="670px";

		// #2 '#watch7-sidebar-contents' made to slidedown, as happens in Theater mode 
		// + this sidebar also zoom=1.2 (120%)
		var sidebar_vids = qs("div#watch7-sidebar-contents");
		sidebar_vids.style.position= "absolute";
		sidebar_vids.style.zoom= "1.2";
		sidebar_vids.style.top= "383px";  //"510px" is ok @zoom=1
	}//End of func zoom_1.2

	qs("button#player_api__zoom_normal_to_1").onclick = function(){
		// just reset inline--styles to ""
		qs("#placeholder-player").style.zoom= "";
		qs("#placeholder-player").style.left= "";
		qs("#player-api").style.zoom= "";

		// this div is added by Styler ext. itself , for youtube.com
		qs("div#container_sac").style.top="";	//drops to 540px, as set in Styler's css				
	}

	gid("marque_align_right").onclick = function(){ //button
		// 1024+33= 1057;   left: 33px is left aligned, in this scenario, only "#img_marque" zoom @1.2 , not the full--page\html
		var current_marque_width = ( qs("div#img_marque").style.width ).slice(0,-2);
		var new_left = 1057 - current_marque_width;  //right--align is calculated thru full_width_@_120per, current_width & left. only current_width is sufficient.
		qs("div#img_marque").style.left = new_left+"px";

		qs("input#marque_left").value = new_left;
		qs("input#marque_left_1").value = new_left;

	}

	gid("marque_align_left").onclick = function(){ //button
		qs("div#img_marque").style.left = "33px";

		qs("input#marque_left").value = 33;
		qs("input#marque_left_1").value = 33;
	}

	gid("marque_align_top").onclick = function(){ //button
		qs("div#img_marque").style.top = "6px";

		qs("input#marque_top").value = 6;
		qs("input#marque_top_1").value = 6;
	}

	gid("marque_align_center").onclick = function(){ //button
		// full-width is fixed 1024,  because this $("#player-api").zoom= 1.2;
		var current_marque_width = ( qs("div#img_marque").style.width ).slice(0,-2);

		var new_left = (1024 - current_marque_width)/2;  new_left= Math.round(new_left) +33;
		
		qs("div#img_marque").style.left = new_left+"px";

		qs("input#marque_left").value = new_left;
		qs("input#marque_left_1").value = new_left;
		//console.log( new_left, current_marque_width);

		this.title = "aligns to center at any-height \n" +
					(new_left-33) + " +" + (new_left-33) + " +" + current_marque_width + " = 1024"; //Note: this comes 1025 because of .5px round-off. If Math.floor is used, it comes 1023, so I let-it Math.round 1025

	}

	gid("remove_annotations").onclick = function(){ //button
		var annotation_elements = qsa("div.annotation-shape, .annotation.annotation-type-text");
		for (var i = 0; i < annotation_elements.length; i++) {
			annotation_elements[i].style.visibility= "hidden";
		}
	}


	// this makes 1.7 + left also is made left--aligned. only at zoom 120per 
	qs("button#marque_size_1_7").onclick = function(){
		var marque = $("div#img_marque");
		marque.width(980);	//576*1.7 = 979.19 ~ 980
		var player_left = $("#player-api").offset().left;  //Note: qs("#player-api").style.left  is ...
		console.log( player_left );
		marque.css({ left: player_left+"px" }); //left: 0 could also have done, check

		// + change the input values , top & height remain the same, the other--2 change
		qs("input#marque_width").value = 980;
		qs("tr#row2 td#Aspect_ratio").innerText= "1.7";
	}

	// this does not Adjust left, so any-height, any-zoom, will be made 1.7 thru width--change, height will remain the same.
	qs("button#marque_size_1_7__any_height").onclick = function(){
		var marque = $("div#img_marque");
		var m_height = marque.height();	
		var new_width = Math.round(m_height*1.7);
		marque.width( new_width );
		qs("input#marque_width").value = new_width;
		qs("tr#row2 td#Aspect_ratio").innerText= "1.7";
	}

	// Note: currently this marque--center is only for 120% & 1.7
	// Make for 1.5 or any--width.  Here, the $("div#img_marque").width() is fixed 980px.   $(".player-api").width() remains fixed 1025
	qs("button#marque_center").onclick = function(){
		// At zoom 120% or 1.2 , player--width 	
		// $(".player-api").width()*1.2;	Returns 1024.8 ~ 1025
		// with-respect-to  $(".player-api").height()*1.2; -- 576, width for 1.7 ratio should be 980 (576*1.7= 979.2)

		// So, 1025-980 = 45  & to center 45/2= 22.5px should be on both left-&-right side.
		qs("div#img_marque").style.left = "22px";

		qs("input#marque_left").value = 22;
		qs("input#marque_left_1").value = 22;
	}

	// here the $("div#img_marque").width() is calculated, whereas, $(".player-api").width() remains fixed 1025
	qs("button#marque_center_any").onclick = function(){
		// At zoom 120% or 1.2 , player--width 	
		// $(".player-api").width()*1.2;	Returns 1024.8 ~ 1025
		var current_marque_width = qs("div#img_marque").style.width.slice(0,-2);
		// with-respect-to  $(".player-api").height()*1.2; -- 576, width for 1.7 ratio should be 980 (576*1.7= 979.2)

		var new_left = (1025 - current_marque_width)/2;  new_left= Math.round(new_left);
		// So, 1025-980 = 45  & to center 45/2= 22.5px should be on both left-&-right side.
		qs("div#img_marque").style.left = new_left+"px";

		qs("input#marque_left").value = new_left;
		qs("input#marque_left_1").value = new_left;
		//console.log( new_left, current_marque_width);

		this.title = new_left + " +" + new_left + " +" + current_marque_width + " = 1025";
	}

	/*  Closed this on 2Oct17
	qs("button#marque_right_aligned").onclick = function(){
		var current_marque_width = $("div#img_marque").width();
		var new_left = Math.round(1026 - current_marque_width);  //right--align is calculated thru full_width_@_120per, current_width & left
		qs("div#img_marque").style.left = new_left+"px";

		qs("input#marque_left").value = new_left;
		qs("input#marque_left_1").value = new_left;
	}*/

	qs("button#full_window_length").onclick = function(){
		qs("input#marque_top").value = 0;
		qs("input#marque_left").value = 0;
		qs("input#marque_width").value = 600;
		qs("input#marque_height").value= 705;
		qs("input#marque_top_1").value = 0;
		qs("input#marque_left_1").value = 0;
		$("tr#row2 td#Aspect_ratio").text( (600/705).toFixed(2) );
				var div = $("div#img_marque");
		div.width(600);	div.height(705);
		div.css({ top: "0px", left: "0px" });
	}

	qs("div#togglefold_height").onclick = function(){
		$("div#imgCapture_container_div43").toggleClass("bar_height");

		//if (div.height() > 100) { div.height(70);  }
		//else { div.height("");  }
	}

	qs("span#zoomtxt").onclick = function(){
		this.innerText = qs("html").style.zoom;
		this.style.border = "2px solid blue";
		setTimeout(function(){ qs("span#zoomtxt").style.border = ""; }, 1300);
	}

	qs("a#save__scr_img").onclick = function(){
		/*$("div#imgSaved-click_animated").show();
		$("div#imgSaved-click_animated").animate({ width: "100px" }, 800, function(){
    		$(this).hide().width(0);
		});*/
		var span = qs("span#Saved_msg");
		span.style.visibility = "visible";  span.style.left = "45px";

		//$("span#Saved_msg").show().delay(2000).fadeOut(100);

		setTimeout(function(){ span.style.visibility= "hidden"; span.style.left = "0";   }, 2000);
	}

	//Notes -- Added on 6July17
		function get_ytb_11_Address(){
			var ta_value = location.search;   //Returns like "?v=nc5NfmjgpI8"  //qs("textarea#textarea_2").value;

		    var val_to_append = ta_value.split("?v=")[1];
		    
		    if ( val_to_append.includes("&") ) { 
		        var start  = ta_value.indexOf("?v="); 
		        var end  =   ta_value.indexOf("&");
		        val_to_append = ta_value.slice(start+3,end);
		    }
		    //qs("textarea#img_Name").value = "ytb " + val_to_append + ".png";
	    	return val_to_append;  //Returns 11--character--long strring
		}//End of func get_ytb_11_Address()

	function Save_Notes_in_lStorage(){
		if (localStorage.youtube_Notes_arr_sac===undefined){}
		else{
			var youtube_Notes_arr_sac = JSON.parse(localStorage.youtube_Notes_arr_sac);
			var keyName = get_ytb_11_Address();
			var new_arr = []; 
			new_arr.push( Date().substr(4, 17) );
			new_arr.push( qs("textarea#scr_related_Notes").value );
			youtube_Notes_arr_sac[keyName] = new_arr;
			localStorage.youtube_Notes_arr_sac = JSON.stringify( youtube_Notes_arr_sac );
		}
	}//End of func Notes_in_lStorage()

	function get_Notes_from_lStorage_into_ta(){
		var youtube_Notes_arr_sac = JSON.parse(localStorage.youtube_Notes_arr_sac);
		var keyName = get_ytb_11_Address();
		if (youtube_Notes_arr_sac[keyName]===undefined){ }
		else{
			qs("textarea#scr_related_Notes").value = youtube_Notes_arr_sac[keyName][1];
		}
	}
	setTimeout(get_Notes_from_lStorage_into_ta, 1500);

	qs("textarea#scr_related_Notes").onchange= function(){
		Save_Notes_in_lStorage();
		$("span#ta_Saved_in_lS_msg").fadeIn("fast").delay(2500).fadeOut("fast");
	}

	//------ Notes ka Code ends Here


	//this tried, but no success!, may-be 'captureVisibleTab' is not available in content scripts. once-confirm, can be closed\removed, the html also, which is set 'display: none;' 
	$("button#try_Capture").click(function(){ 
		chrome.tabs.captureVisibleTab(null, { format : "png", quality : 100 }, function(img_coded_in_alphabets___data) {
            	var img_data = "nothing captured";
        	img_data = img_coded_in_alphabets___data;
	        	console.log( img_data );
	    });
	});	




	chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
								//alert(msg.greeting);
		if (msg.greeting=="imgName_from_popup"){ 
			$("#ta_img").val( msg.imgName ); 
			$("#save__scr_img").attr({ download: msg.imgName });
		}

		/*  sendresponse was working here, but closed, on the same-day, when-done, 19Feb17
		if (msg.greeting=="check_for__once_div"){ 

			//var len = "no-exist";
			var len = $("div#run_once_sac").length; 
			sendResponse({ div_present: len });
		}		*/

			/*	this block closed on 19Feb17, was being used for scr from popup.html					
				if (msg.greeting=="s_shot_from_popup") {   //more msg will be sent to this content script, from background.js , therefore, if condition given here.
					console.log( msg.imgName, msg.s_shot_data );
										//$("#save__scr_img").text(msg.imgName);
					$("#save__scr_img").attr({ href: msg.s_shot_data, download: msg.imgName });
					$("#ta_img").val( msg.imgName );
			}	*/
		//the below responds, with sendMessage, with tabId format, not thru callback function(response), which I am currently using. Still not closed this.
		if (msg.s_shot=="taking scr") {
			console.log("got s_shot from bg-page", msg.s_shot_data);
		}

	});

}//End of func Add_el_and_msgListener()



function show_ttip_after_screenshoter_div43_Added(){
	var zoom = qs("html").style.zoom;
		//if ( zoom != "120%"){ //show config_id_zoomtxt__JS tooltip msg
	$(".tooltip_el .config_id_zoomtxt__JS")
		.html( "current page zoom: " + zoom + "<br>-------------------------<br>just for info.")
		.fadeIn(50).delay(9000).fadeOut(200);
		//}
}





	//msgListener_once_only();
function msgListener_once_only(){
	//if ( !$("div#chk_msgListener").length ){
		//then add Listener
		

			//check of once thru a div Added
		//$("<div />").attr({ id: "chk_msgListener" }).text("once")
		//	.appendTo("body");

	//}//End of if

}//End of func


/*	jQuery vistoggle() plugin (toggle_visibility_sac ), 11Feb17, v1
	http://codepen.io/sahni4you/pen/VPVOap		*/
(function ( $ ) {
 
    var mycolor = "sienna";
 
    $.fn.greenify = function() {
        //this.css({ "color": mycolor, "font-weight": "bold" });
        //console.log( this.css("color"), this.prop("tagName"), this.text() );
        if ( this.css("color")=="rgb(0, 0, 255)" ){ this.css({ "color": "red" });  }
        else { this.css({ "color": "blue" });  }
        return this;
    };
  
    $.fn.vistoggle = function() {
        //this.css({ "color": mycolor, "font-weight": "bold" });
        //console.log( this.css("visibility"), this.prop("tagName"), this.text() );
        if ( this.css("visibility")=="visible" ){ this.css({ "visibility": "hidden" });  }
        else { this.css({ "visibility": "visible" });  }
        return this;
    };
 
}( jQuery ));