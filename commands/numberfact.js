exports.run = function(client, message, args) {
	var request =  require('request');

	if (!isNaN(args[0]) || args[0] == 'random') {
		request({
			url: "http://numbersapi.com/" + args[0],
		}, function (error, response, body) {
			message.channel.send(body);
		})
	} else {
		message.channel.send("That's not a number. Please use a number.");
	}
};