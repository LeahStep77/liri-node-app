var input = process.argv;
var choice = input[2];

if (choice = "my-tweets"){

	var Twitter = require('twitter');
	var keys = require("./keys.js");
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
			}
		}
	});
}
