var starterButtons = ["Clear List", "Happy","Sad","Angry","Laughing","Crying","LOL","BRB","Hi","Bye"];
var gifLoad =[];
var urlLoad = [];
var imageClick;


$(document).ready(function(){

	for(var i = 0; i < starterButtons.length; i++){
		//thing about doing this by adding attributes and setting a button to a variable
		if(starterButtons[i] === "Clear List"){
			$(".starterButtonDiv").append("<button class = \"btn btn-action clearButton \" " + "data-name =\""+starterButtons[i]+"\">" + starterButtons[i] + "</button>");
		} else{
		//builds inital buttons for user
			$(".starterButtonDiv").append("<button class = \"btn btn-primary sorterButton \" " + "data-name =\""+starterButtons[i]+"\">" + starterButtons[i] + "</button>");
		}
	}

	//adds button when user types it in, has data name value of user input
	$(".inputWell").on("click", "#submitButton", function(event){
		event.preventDefault();

		 var value = $("#btnInput").val().trim();
		 //stops users from entering blank values
		 if(value.length === 0){
		 	return;

		 } else {
			 value = value.charAt(0).toUpperCase() + value.slice(1);
			$(".starterButtonDiv").append("<button class = \"btn btn-primary sorterButton \" " + "data-name =\""+value+"\">" + value + "</button>")
			$("#btnInput").val("");
		}
	});


	//takes user button push and makes API call 
	$(".starterButtonDiv").on("click", ".sorterButton", function(){
		var dataName = $(this).data("name").trim();
		console.log(dataName)
		var rating = "pg";
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dataName +"&rating=y&api_key=dc6zaTOxFJmzC";
		//clear out old gifs and images
		$(".gifWell").empty();
		gifLoad =[];
		urlLoad = [];
		imageClick = false;
			
		$.ajax({url : queryURL, method : "GET" }).done(function(response){
			if(response.data.length === 0){
				//if user puts in a string that does not have any gifs associated with it
				$(".gifWell").append("Im sorry, we dont have any Gifs that cover this topic, please try a different topic")

			}else{
				for(var i = 0; i < 11; i++){
				console.log(response);
				// console.log(i);
				gifLoad.push(response.data[i].images.downsized.url);
				urlLoad.push(response.data[i].images.downsized_still.url);
				var rating = response.data[i].rating;
				var imageStill = response.data[i].images.downsized_still.url;
				$(".gifWell").append("<div class = \"gif\" data-number=\""+ i + "\" clickstatus = \"false\">"+"<p> rating: " + rating + "</p>" + "<img src=\"" + imageStill + "\"" +">");
			}

			}
		//if it fails, print out a nice message	
		}).fail(function(response){
				console.log("failed");
				$(".gifWell").append("failure to load, please try again");

			});
	});

	//when user clicks on image, it will start to play gif
	$(".gifWell").on("click", ".gif", function(){
		var thisBtn = $(this).data("number");
		console.log(thisBtn);
		imageClick = $(this).attr("clickstatus")
		console.log(imageClick)
		if(imageClick === "false" ){
			$(this).children("img").attr("src", gifLoad[thisBtn]);
			$(this).attr("clickStatus", "true");
			

		}else {
			$(this).children().attr("src", urlLoad[thisBtn]);
			$(this).attr("clickStatus", "false");


		}
	});
	//clears out buttons in case they dont like them
	$(".starterButtonDiv").on("click", ".clearButton", function(){
		$(".starterButtonDiv").empty();
		$(".starterButtonDiv").append("<button class = \"btn btn-action clearButton \" " + "data-name =\""+starterButtons[0]+"\">" + starterButtons[0] + "</button>");

	});





});