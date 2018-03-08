exports.run = function(client, message, args) {

	//Get our API Token
	const imgurapi = require('../settings.json').imgurapi;
	var request =  require('request');

	request({
		url: "https://api.imgur.com/3/gallery/search?q_type=jpg&q=" + args[0].toLowerCase(),
		headers: {
			"Authorization" : "Client-ID " + imgurapi
		},
		json: true
	}, function (error, response, body) {
		if (body['data'].length > 0) {
			//Get a random number from the number of results
			randomNumber = Math.floor(Math.random() * Math.floor(body['data'].length));
			message.channel.send(body['data'][randomNumber]['link']);
		} else {
			message.channel.send("Sorry, could not find anything with that search query");
		}
	})
};