exports.run = function(client, message, args) {
	var request =  require('request');

	request({
		url: "http://random.cat/meow.php",
		json: true
	}, function (error, response, body) {
		message.channel.send(body);
	})
};