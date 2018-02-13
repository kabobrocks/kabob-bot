exports.run = function(client, message, args) {
	var request =  require('request');

	request({
		url: "https://coinbin.org/" + args[0],
		json: true
	}, function (error, response, body) {
		if (body['coin'] == null) {
			message.channel.send('Could not find the cryptocurrency symbol provided');
		} else {
			message.channel.send(`The current price (USD) of ${body['coin']['name']} is $${body['coin']['usd']}`);
		}
	})
};