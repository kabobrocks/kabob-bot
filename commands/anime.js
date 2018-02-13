exports.run = function(client, message, args) {
	var request =  require('request');
	//Put our args in a state where I can put them in a URL
	var argsearch = args.join('%20');

	request({
		url: "https://initiate.host/search/" + argsearch,
		json: true
	}, function (error, response, body) {
		message.channel.send(body['result'][0]['url']);
	})
};