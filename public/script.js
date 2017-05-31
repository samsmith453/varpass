var numberOfSpaces = 99;
var spacesDisplayPercentage = 100/200 * 100;

var bankWaitingTime = "2 weeks";
var bankDisplayPercentage = 75;

var queueLength = "4 hours";
var queueDisplayPercentage = 60;

$(document).ready(function(){

	var path = window.location.pathname;
	if(path == "/details"){ // if this is coming from the 'details' menu route, scroll to details
		$('html, body').animate({
			scrollTop: ($('#detailsSection').offset().top-10)
		},100);
	}

	var query = window.location.search;
	var code = getQueryStringValue(query, "c");
	if(code){
		dealWithCookies(code);
	}

	$(".infoCircle").hover(function(){
		var num = $(this).attr("id");
		$("#c" + num + " .circleLabel").toggleClass("hovered");
	}, function(){
		var num = $(this).attr("id");
		$("#c" + num + " .circleLabel").toggleClass("hovered");
	});

	$(".outerCircle").click(function(){
		var id = $(this).attr("id");
		$("#modalUnderlay").css({"display": "block"});
		$("body").css({"overflow-y": "hidden"});

		fillModal(id);

	});

	$(".circleLabel").click(function(){
		var id = $(this).text();
		$("#modalUnderlay").css({"display": "block"});
		$("body").css({"overflow-y": "hidden"});

		fillModal(id);
	})

	$("#close").click(function(){
		$("#modalUnderlay").click();
	})

	$("#modalUnderlay").click(function(e){
		if(e.target == this){
			$(this).css({"display": "none"});
			$("body").css({"overflow-y": "auto"});
		}
	});

	var scrollTrigger = false;
	$(document).scroll(function(){
		if($(document).scrollTop() > 350  && $(document).scrollTop() < 500){
			if(scrollTrigger){
				animateCharts();
				scrollTrigger = false;
			}

		} else if($(document).scrollTop() < 350 || $(document).scrollTop() > 500){
			scrollTrigger = true;
		}
	});

	// spaces left chart


	$("#spacesChart").easyPieChart({
		barColor: "black", //DeepSkyBlue instead???
		trackColor: "rgba(88, 88, 88, 0.3)",
		scaleColor: false,
		scaleLength: 5,
		animate: {duration: 1000, enabled: true},
		lineWidth: 4,
		size: 120
	});

	$('#spacesChart').data('easyPieChart').update(spacesDisplayPercentage);
	$("#spacesNum").text(numberOfSpaces);


	//end spaces left chart


	//start bank waiting chart

	$("#bankChart").easyPieChart({
		barColor: "red",
		trackColor: "rgba(88, 88, 88, 0.3)",
		scaleColor: false,
		scaleLength: 5,
		animate: {duration: 1000, enabled: true},
		lineWidth: 4,
		size: 120
	});

	$('#bankChart').data('easyPieChart').update(bankDisplayPercentage);
	$("#bankNum").text(bankWaitingTime);


	//end bank waiting chart


	//start of bank waiting chart


	$("#queueChart").easyPieChart({
		barColor: "green",
		trackColor: "rgba(88, 88, 88, 0.3)",
		scaleColor: false,
		scaleLength: 5,
		animate: {duration: 1000, enabled: true},
		lineWidth: 4,
		size: 120
	});

	$('#queueChart').data('easyPieChart').update(queueDisplayPercentage);
	$("#queueLength").text(queueLength);


	$("a").click(function(){

		if($(this).text()[2] == "M"){ //Home
			$('html, body').animate({
    			scrollTop: ($('#section1').offset().top-10)
			},500);
		}

		else if($(this).text()[2] == "T"){ //how we can help
			$('html, body').animate({
    			scrollTop: ($('#detailsSection').offset().top-10)
			},500);
		}


	});

	$(".hexagon").hover(function(){
		$(this).toggleClass("image");
	},
	function(){
		$(this).toggleClass("image");
	},)

});

function animateCharts(){
	$('#spacesChart').data('easyPieChart').update(0);
	$('#spacesChart').data('easyPieChart').update(spacesDisplayPercentage);

	$('#bankChart').data('easyPieChart').update(0);
	$('#bankChart').data('easyPieChart').update(bankDisplayPercentage);

	$('#queueChart').data('easyPieChart').update(0);
	$('#queueChart').data('easyPieChart').update(queueDisplayPercentage);
}

function fillModal(id){

	$("#modalBox > .modalHeader").text(modalFill[id].h3);
	$("#modalText").html(modalFill[id].body);
	$("#modalBox i").addClass(modalFill[id].icon);

}

function getQueryStringValue (str, key) {
	return decodeURIComponent(str.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function dealWithCookies(code){
	//if there is a code cookie already then do nothing
	//don't overwrite the first cookie
	var cookies = document.cookies;
	var current = getCookie("code");
	if(current){
		// do nothing - cookie already exists
	}
	else {
		// make new cookie with new code
		document.cookie = "code="+code+"; expires=30 Dec 2099 12:00:00 UTC; path=/";
	}
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
