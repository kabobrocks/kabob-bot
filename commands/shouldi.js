exports.run = function(client, message, args) {
	var request =  require('request');

	request({
		url: "https://yesno.wtf/api/",
		json: true
	}, function (error, response, body) {
		message.channel.sendFile(body['image']);
	})
};