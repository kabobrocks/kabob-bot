exports.run = function(client, message, args) {

	//Get our API Token
	var request =  require('request');
	const Discord = require('discord.js');

	var command = args[0]
	args.shift()
	if (args[0]) {
		var query = args.join('%20');
	}
	switch(command) {
		case 'commands':
			message.channel.send("These are my current Monster Hunter commands:\n```monster [monster name]: lists available information about the monster```")
		break;
		case 'monster':
			if (query == null || query == "") {
				message.channel.send("Please provide a monster name to look up");
			} else {
				request({
					url: `https://mhw-db.com/monsters?q={"name":"` + query + `"}`,
					json: true
				}, function (error, response, body) {
					if (body.length == 0) {
						message.channel.send("I could not find a monster with that name. Please check and try again")
					} else {
						var result = body[0];

						let locationString = ""
						let rewardString = ""
						let weaknessString = ""
						let resistanceString = ""

						for (i=0; i < result["locations"].length; i++) {
							locationString += result["locations"][i]["name"] + ", ";
						}
						locationString = locationString.slice(0,-2);
						if (locationString.length == 0) {
							locationString = "None"
						}

						for (i=0; i < result["resistances"].length; i++) {
							resistanceString += result["resistances"][i]["element"] + ", ";
						}
						resistanceString = resistanceString.slice(0,-2);
						if (resistanceString.length == 0) {
							resistanceString = "None"
						}

						for (i=0; i < result["weaknesses"].length; i++) {
							weaknessString += result["weaknesses"][i]["element"] + ", ";
						}
						weaknessString = weaknessString.slice(0,-2);
						if (weaknessString.length == 0) {
							weaknessString = "None"
						}

						for (i=0; i < result["rewards"].length; i++) {
							rewardString += result["rewards"][i]["item"]["name"] + ", ";
						}
						rewardString = rewardString.slice(0,-2);
						if (rewardString.length == 0) {
							rewardString = "None"
						}

						const exampleEmbed = new Discord.RichEmbed()
							.setColor('#0099ff')
							.setTitle(result["name"])
							.setAuthor('Monster Hunter World DB', 'https://i.pinimg.com/564x/18/1d/50/181d50210e6aeaadb617e8333ee133dc.jpg', 'https://docs.mhw-db.com/')
							.setDescription(result["description"])
							.addField('Locations', locationString)
							.addField('Rewards', rewardString)
							.addField('Weaknesses', weaknessString, true)
							.addField('Resistances', resistanceString, true)
							.setTimestamp()
							.setFooter("©Kabobrocks", client.user.avatarURL);
						message.channel.send(exampleEmbed)
					}
				})
			}
		break;
	}
};