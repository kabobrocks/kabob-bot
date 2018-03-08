exports.run = function(client, message, args) {

	//Get our API Token
	const googleapi = require('../settings.json').googleapi;
	var request =  require('request');
	var argsearch = args.join('%20');

	request({
		url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + argsearch + "&key=" + googleapi,
		json: true
	}, function (error, response, body) {
		message.channel.send("https://www.youtube.com/watch?v=" + body['items'][0]['id']['videoId']);
	})
};