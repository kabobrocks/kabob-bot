exports.run = function(client, message, args) {
	var request =  require('request');
	var argresult = args.join('+');
	var styleArray = ['apt', 'cow', 'dragon', 'dragon-and-cow', 'default', 'duck', 'elephant', 'ghostbusters', 'moofasa', 'moose', 'sheep', 'stegosaurus', 'turtle']

	switch(args[0]) {
		case 'commands':
			message.channel.send("These are the commands I have for cowsay:\n```styles: lists all styles for cowsay\n[style] [text]: prints result. If a non-valid style is chosen, defaults to normal cow```");
		break;
		case 'styles':
			message.channel.send(styleArray);
		break;
		default:
			if (styleArray.includes(args[0])) {
				var chosenStyle = args[0];
				args.shift();
				argresult = args.join('+');

				request({
					url: "https://helloacm.com/api/cowsay/?msg=" + argresult + "&f=" + chosenStyle,
					json: true
				}, function (error, response, body) {
					message.channel.send("```" + body + "```");
				})

			} else {
				request({
					url: "https://helloacm.com/api/cowsay/?msg=" + argresult,
					json: true
				}, function (error, response, body) {
					message.channel.send("```" + body + "```");
				})
			}
	}
};