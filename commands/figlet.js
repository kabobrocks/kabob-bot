exports.run = function(client, message, args) {
	var request =  require('request');
	var argresult = args.join('+');

	request({
		url: "https://uploadbeta.com/api/figlet/?cached&msg=" + argresult,
		json: true
	}, function (error, response, body) {
		message.channel.send("```" + body + "```");
	})
};