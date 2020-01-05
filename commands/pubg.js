// This command does not work and is not advertised to work. Currenty, PUBGTracker API is down to the public. It remains so I can check it 
// every once and a while to see if it is live. Once it goes live, more functionality will be added and the hardcoding of MuskratLove's info will be gone

exports.run = function(client, message, args) {

	//Get our API Token
	//Note to me, this new api key is for fortnite
	const pubgapi = require('../settings.json').pubgapi;
	var request =  require('request');

	request({
		url: "https://public-api.tracker.gg/apex/v1/standard/profile/5/_Cyynnix_",
		headers: {
			"TRN-Api-Key": "6c51ff64-f326-426e-bed3-0d77abe5928c"
		},
		json: true
	}, function (error, response, body) {
		console.log(body.data);
		//message.channel.send(body.error);
	})
};