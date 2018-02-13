exports.run = function(client, message, args) {
	var request =  require('request');
	var argresult = args.join(' ');

	request({
		url:"https://api.urbandictionary.com/v0/define?term=" + argresult,
		json: true
	}, function (error, response, body){
		if (body['list'].length === 0) {
			message.channel.send("No definition found");
		} else {
			if (body['list'][0]['definition'].length < 2000) {
				message.channel.send("**" + argresult + "**" + ": " + body['list'][0]['definition']);
			} else if (body['list'][0]['definition'].length < 2000) {
				message.channel.send("**" + argresult + "**" + ": " + body['list'][1]['definition']);
			} else {
				message.channel.send("Top 2 definitions are too long to post in discord. Link: " + body['list'][0]['permalink']);
			}
		}
	})
};