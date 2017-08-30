//console.log("hello");
//var input = process.argv;
//var choice = input[2];
// var outputChoice;
// var title = input[3];

var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var Request = require('request');

var getTweets = function () {
	
	var client = new Twitter(keys.twitterKeys);

	//get tweets
	var params = {screen_name: 'otherwisealiase'};
	client.get('statuses/user_timeline', params, function(error, tweets, response)
	{
		if (!error)
		{
	  		for (var i=0; i<tweets.length; i++)
	  		{
	  			console.log(tweets[i].text);
	  			console.log(tweets[i].created_at);
	  			console.log("**********");
			}
		}
	});
}


var getSpotify = function(songName){ 
	var spotify = new Spotify({
		id: 'removed', //how do i bring in keys from keys.js --- This does not work    id: keys.spotifyKeys.id  also tried -new Spotify (keys.spotifyKeys)
		secret: 'removed'
	});

	spotify.search({ type: 'track', query: songName}, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		//console.log(data.tracks.items); 
		var songs = data.tracks.items;
		for (var i=0; i<songs.length; i++){
			//console.log(songs[i]);
			console.log(songs[i].name);
			console.log(songs[i].album.name);
			console.log('**********');
			//can't get url or artist name
		}
	});
}

var getMovie = function (movieNmae){
	request('http://www.omdbapi.com/?apikey=' +keys.omdbKeys+  '&t='+movieNmae+ '&r=json', function (error, response, body) {
		if(!error && response.statusCode == 200) {
	  		var jsonData = JSON.parse(body);
		  	console.log(jsonData.Title)
		  	//console.log(body);
		  	// console.log(Title);
		  	// console.log(Year);
		  	// console.log(plot);
	  	}
		else {
			console.log('error:', error); // Print the error if one occurred 
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
		}
	  
	});
}


///////////////////////////////////////////////////////////
var pick = function(caseData, FunctionData) {
	switch(caseData){
		case 'my-tweets':
			getTweets()
			break;
		case 'spotify-song':
			getSpotify(FunctionData)
			break;
		case'movie-details':
			getMovie()
			break;
		default:
			console.log("What? Try again!");
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};
runThis(process.argv[2], process.argv[3]);