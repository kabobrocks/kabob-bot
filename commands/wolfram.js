exports.run = function(client, message, args) {
	var request =  require('request');
	const wolframapi = require('../settings.json').wolframapi;

	//Wolfram API uses + symbols inbetween words
	var argsearch = args.join('+');

	request({
		url: `https://api.wolframalpha.com/v2/query?input=${argsearch}&format=image,plaintext&output=JSON&appid=` + wolframapi,
		json: true
	}, function (error, response, body) {
		if (body['queryresult']['success'] != false) {
			if (body['queryresult']['pods'][1]['subpods'][0]['img']['src'] != null) {
				message.channel.send(body['queryresult']['pods'][1]['subpods'][0]['img']['src']);
			} else {
				message.channel.send(body['queryresult']['pods'][1]['subpods'][0]['plaintext']);
			}
		} else {
			message.channel.send('I could not find an answer to that. Sorry.');
		}
	})
};