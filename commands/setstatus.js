exports.run = function(client, message, args) {
	var argresult = args.join(' ');
	client.user.setStatus(argresult);
};