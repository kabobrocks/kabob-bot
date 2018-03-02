exports.run = function(client, message, args) {
	var request =  require('request');

	request({
		url: "http://pokeapi.co/api/v2/pokemon/" + args[0].toLowerCase(),
		json: true
	}, function (error, response, body) {
		if (body['detail'] != null) {
			message.channel.send("Could not find the selected Pokemon. Please make sure spelling is correct.")
		} else {
			var typeString = '';
			for (i = (body['types'].length - 1); i >= 0; i--) {
				typeString += body['types'][i]['type']['name'] + "/";
			}
			typeString = typeString.slice(0, -1);
			message.channel.send({embed: {
				color: 3447003,
				image: {
					url: body['sprites']['front_default']
				},
				fields: [
					{
						name: `Pokedex Number`,
						value: `${body['id']}`
					},
					{
						name: `Types`,
						value: `${typeString}`
					},
					{
						name: `Base Stats`,
						value: "Speed: " + body['stats'][0]['base_stat'] + "\nSpecial Defense: " + body['stats'][1]['base_stat'] + "\nSpecial Attack: " + body['stats'][2]['base_stat'] + "\nDefense: " + body['stats'][3]['base_stat'] + "\nAttack: " + body['stats'][4]['base_stat'] + "\nHP: " + body['stats'][5]['base_stat']
					}
				],
				timestamp: new Date(),
				footer: {
					icon_url: client.user.avatarURL,
					text: "©Kabobrocks"
				}
			}
			});
		}
	})
};