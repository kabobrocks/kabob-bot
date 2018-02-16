exports.run = function(client, message, args) {
	var request =  require('request');
	var argresult = args.join(' ');

	request({
		url: "https://8ball.delegator.com/magic/JSON/" + argresult,
		json: true
	}, function (error, response, body) {
		message.channel.send(body['magic']['answer']);
	})
};