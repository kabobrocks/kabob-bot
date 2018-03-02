exports.run = function(client, message, args) {
	const openweatherapi = require('../settings.json').openweatherapi;
	var request =  require('request');

	request({
		url: "http://api.openweathermap.org/data/2.5/weather?zip=" + args[0] + "&units=imperial&appid=" + openweatherapi,
		json: true
	}, function (error, response, body) {
		if (body['cod'] == 200) {
			message.channel.send({embed: {
				color: 3447003,
				title: `Current Weather for ${body['name']}`,
				image: {
					url: `http://openweathermap.org/img/w/${body['weather'][0]['icon']}.png`
				},
				fields: [
					{
						name: `Short Description`,
						value: `${body['weather'][0]['description']}`
					},
					{
						name: `Temperature (F)`,
						value: `${body['main']['temp']}`
					},
					{
						name: `Wind Speed (MPH)`,
						value: `${body['wind']['speed']}`
					}
				],
				timestamp: new Date(),
				footer: {
					icon_url: client.user.avatarURL,
					text: "©Kabobrocks"
				}
			}
			});
		} else if (body['cod'] == 404) {
			message.channel.send("Unable to locate city using given zip code");
		} else {
			message.channel.send("API experiencing problems");
		}
	})
};