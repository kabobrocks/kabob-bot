exports.run = function(client, message, args) {
	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};

	try {
		var returntime;
		var timemeasure;

		msg = message.content.split(' ');

		timemeasure = msg[1].substring((msg[1].length - 1), (msg[1].length));
		returntime = msg[1].substring(0, (msg[1].length - 1));

		switch (timemeasure) {
			case 's':
				returntime = returntime * 1000;
				break;
			case 'm':
				returntime = returntime * 1000 * 60;
				break;
			case 'h':
				returntime = returntime * 1000 * 60 * 60;
				break;
			case 'd':
				returntime = returntime * 1000 * 60 * 60 * 24;
				break;
			default:
				returntime = returntime * 1000;
				break;
		}

		client.setTimeout(function() {
			msg.shift();
			msg.shift();

			//create the message
			var content = msg.join();
			content = content.replaceAll(',', ' ');
			message.reply(content);
		}, returntime);
	} catch (e) {
		message.channel.send("An error has occured, please make sure the command has a time and a message");
	}
};