var starterButtons = ["Happy","Sad","Angry","Laughing","Crying","LOL","BRB","Hi","Bye"];
var gifLoad =[];
var urlLoad = [];
var imageClick = false;


$(document).ready(function(){

	for(var i = 0; i < starterButtons.length; i++){
		//thing about doing this by adding attributes and setting a button to a variable

		//builds inital buttons for user
		$(".starterButtonDiv").append("<button class = \"btn btn-primary sorterButton \" " + "data-name =\""+starterButtons[i]+"\">" + starterButtons[i] + "</button>");
	}

	//adds button when user types it in, has data name value of user input
	$(".inputWell").on("click", "submit", function(event){
		event.preventDefault()



	});


	//takes user button push and makes API call 
	$(".starterButtonDiv").on("click", ".sorterButton", function(){
		var dataName = $(this).data("name").trim();
		console.log(dataName)
		var rating = "pg";
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + dataName +"&api_key=dc6zaTOxFJmzC";
		//clear out old gifs and images
		$(".gifWell").empty();
		gifLoad =[];
		urlLoad = [];
		imageClick = false;
			
		$.ajax({url : queryURL, method : "GET" }).done(function(response){
			for(var i = 0; i < 11; i++){
				console.log(response.data);
				console.log(i);
				gifLoad.push(response.data[i].images.downsized.url);
				urlLoad.push(response.data[i].images.downsized_still.url);
				$(".gifWell").append("<div class = \"gif\" data-number=\""+ i + "\">"+"<p> rating: "+response.data[i].rating+"</p>"+"<img src=\"" + response.data[i].images.downsized_still.url+"\"" +">");
			}
		});
	});

	//when user clicks on image, it will start to play gif
	$(".gifWell").on("click", ".gif", function(){
		var thisBtn = $(this).data("number");
		console.log(thisBtn);
		if(imageClick === false ){
			$(this).children().attr("src", gifLoad[thisBtn]);
			imageClick = true;

		}else {
			$(this).children().attr("src", urlLoad[thisBtn]);
			imageClick = false;


		}
	});






});