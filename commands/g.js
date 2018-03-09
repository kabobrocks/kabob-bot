exports.run = function(client, message, args) {

	//Get our API Token
	const googleapi = require('../settings.json').googleapi;
	const googlesearchid = require('../settings.json').googlesearchid;
	var request =  require('request');
	var argsearch = args.join('%20');

	request({
		url: "https://www.googleapis.com/customsearch/v1?key=" + googleapi + "&cx=" + googlesearchid + "&q=" + argsearch,
		json: true
	}, function (error, response, body) {
		message.channel.send(body['items'][0]['link']);
	})
};