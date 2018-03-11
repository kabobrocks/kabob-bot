exports.run = function(client, message, args) {
	var request =  require('request');

	request({
		url: "https://nekos.life/api/lizard",
		json: true
	}, function (error, response, body) {
		message.channel.sendFile(body['url']);
	})
};