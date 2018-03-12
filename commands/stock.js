exports.run = function(client, message, args) {
	var request =  require('request');

	request({
		url: "https://api.iextrading.com/1.0/stock/"+ args[0] + "/quote",
		json: true
	}, function (error, response, body) {
		var toReturn = '';
		if (body == 'Unknown symbol') {
			toReturn = "Could not find info on the NYSE for that stock symbol";
		} else {
			toReturn += "***Company:*** " + body['companyName'] + "\n";
			toReturn += "***Latest Price:*** " + body['latestPrice'] + "\n";
			toReturn += "***Change:*** " + body['change'] + "\n";
		}

		message.channel.send(toReturn);
	})
};