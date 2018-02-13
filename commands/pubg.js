// This command does not work and is not advertised to work. Currenty, PUBGTracker API is down to the public. It remains so I can check it 
// every once and a while to see if it is live. Once it goes live, more functionality will be added and the hardcoding of MuskratLove's info will be gone

exports.run = function(client, message, args) {

	//Get our API Token
	const pubgapi = require('../settings.json').pubgapi;
	var request =  require('request');

	request({
		url: "https://api.pubgtracker.com/v2/profile/pc/MuskratLove",
		headers: {
			"TRN-Api-Key": pubgapi
		},
		json: true
	}, function (error, response, body) {
		console.log(body);
		//message.channel.send(body.error);
	})
};