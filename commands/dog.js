exports.run = function(client, message, args) {
	var request =  require('request');

	request({
		url: "https://dog.ceo/api/breeds/image/random",
		json: true
	}, function (error, response, body) {
		message.channel.send(body['message']);
	})
};