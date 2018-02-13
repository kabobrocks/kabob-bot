exports.run = function(client, message, args) {
	var argresult = args.join(' ');
	client.user.setGame(argresult);
};