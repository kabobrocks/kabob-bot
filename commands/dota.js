exports.run = function(client, message, args) {
	//External Data
	const heroes = require('../heroes.json');
	const dotaRanks = require('../dotaranks.json');
	
	var request =  require('request');
	var argresult = args.join(' ');

	var dotaArray = {'cel' : '91900156',
					 'cyni' : '10300373',
					 'diego': '138509132',
					 'ferris': '101718397',
					 'gnarledwolf': '417772917',
					 'kabobrocks' : '89104101',
					 'kisses' : '947240',
					 'muskratlove' : '33170675',
					 'brett' : '39535136',
					 'richie' : '34741291',
					 'teamsneak' : '18007541'
	};

	var complete = false;
	if (args[1]) {
		var player = args[1].toLowerCase();
	}
	switch(args[0]) {
		case 'commands':
			complete = true;
			message.channel.send("These are my current dota commands:\n```leaderboard: lists ranks of all Dota players in server\nlastgame [username]: gives info on registered players' last match\nplayers: lists all registered members\npros [username]: lists all professional players that the user has played with or against\nrank [username]: gives rank of registered members\ntop3 [username]: gives details on users' top 3 heroes```")
		break;
		case 'leaderboard':
			complete = true; 
			var playerRanks = [];
			var count = 0;
			var toOutput = '';
			var playerArray = Object.keys(dotaArray);
			for (i = 0; i < playerArray.length; i++) {
				request({
					url: "https://api.opendota.com/api/players/" + dotaArray[playerArray[i]],
					json: true
				}, function (error, response, body){
					if (body.rank_tier !== null) {
						playerRanks.push(body.profile.personaname + " : **" + dotaRanks[body.rank_tier] + "**");
					} else {
						playerRanks.push(body.profile.personaname + " : **N/A**");
					}
					if (playerRanks.length == playerArray.length) {
						for(i = 0; i < playerRanks.length; i++) {
							toOutput += playerRanks[i] + "\n";
						}
						message.channel.send({embed: {
						    color: 3447003,
						    author: {
						      name: client.user.username,
						      icon_url: client.user.avatarURL
						    },
						    title: `Kabobrocks Server Ranks`,
						    description: `Ranks of all of the Dota players in the server`,
						    fields: [{
								name: `List`,
								value: `${toOutput}`
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
					count++;
					
				})
			}
		break;
		case 'players':
			complete = true;
			message.channel.send("These are the currently registered Dota players:```\n" + Object.keys(dotaArray) + "```");
		break;
	}

	if (dotaArray[player]) {
		switch(args[0]) {
			case 'lastgame':
				request({
					url: "https://api.opendota.com/api/players/" + dotaArray[player] + "/recentMatches",
					json: true
				}, function (error, response, body) {
					var matchResult = '';
					var smiley = '';
					if (body[0]['player_slot'] < 100 && body[0]['radiant_win'] == true) {
						matchResult = 'won';
						smiley = ":smiley:";
					} else if (body[0]['player_slot'] >= 100 && body[0]['radiant_win'] != true) {
						matchResult = 'won';
						smiley = ":smiley:";
					} else {
						matchResult = 'lost';
						smiley = ":sob:";
					}
					message.channel.send(player + " went " + body[0]['kills'] + "/" + body[0]['deaths'] + "/" + body[0]['assists'] + " and " + matchResult + " on " + heroes[body[0]['hero_id']]['localized_name'] + "! " + smiley + "\nhttps://www.dotabuff.com/matches/" + body[0]['match_id']);
				})
			break;
			case 'pros':
				request({
					url: "https://api.opendota.com/api/players/" + dotaArray[player] + "/pros",
					json: true
				}, function(error, response, body){
					var toSend = '';
					if (body.length > 0) {
						for (i = 0; i < body.length; i++) {
							if (body[i]['team_name'] != "") {
								if (body[i]['team_name'] == null) {
									body[i]['team_name'] = "Professional Celebrity";
								}
								if (body[i]['name'] == "") {
									body[i]['name'] = body[i]['personaname'];
								}
								toSend += body[i]['name'] + ": " + body[i]['team_name'] + "\n";
							}
						}
						message.channel.send({embed: {
						    color: 3447003,
						    author: {
						      name: client.user.username,
						      icon_url: client.user.avatarURL
						    },
						    title: `${player}'s Professional Players`,
						    description: `The professional players that ${player} has played with or against`,
						    fields: [{
								name: `Name and Team`,
								value: `${toSend}`
						      }
						    ],
						    timestamp: new Date(),
						    footer: {
						      icon_url: client.user.avatarURL,
						      text: "©Kabobrocks"
						    }
						  }
						});
					} else {
						message.channel.send("The requested user has not played with or against any professional players");
					}
				})
			break;
			case 'rank':
				request({
					url: "https://api.opendota.com/api/players/" + dotaArray[player],
					json: true
				}, function (error, response, body) {
					if (body.rank_tier !== null) {
						message.channel.send(dotaRanks[body.rank_tier]);
					} else {
						message.channel.send("The requested user has not calibrated");
					}
				})
			break;
			case 'top3':
				request({
					url: "https://api.opendota.com/api/players/" + dotaArray[player] + "/heroes",
					json: true
				}, function (error, response, body) {
					var top3 = body.slice(0,3);
					var toSend = '';
					for (i = 0; i < top3.length; i++) {
						toSend += heroes[top3[i]['hero_id']]['localized_name'] + "\n";
					}
					message.channel.send({embed: {
				    color: 3447003,
				    author: {
				      name: client.user.username,
				      icon_url: client.user.avatarURL
				    },
				    title: `${player}'s Top 3 Heroes`,
				    description: "Top 3 Heroes based on number of wins",
				    fields: [{
						name: `${heroes[top3[0]['hero_id']]['localized_name']}`,
						value: `Wins: ${top3[0]['win']}\nTotal Games: ${top3[0]['games']}\nWin Percentage: ${((top3[0]['win']/top3[0]['games']) * 100).toFixed(2)}%`
				      },
				      {
						name: `${heroes[top3[1]['hero_id']]['localized_name']}`,
						value: `Wins: ${top3[1]['win']}\nTotal Games: ${top3[1]['games']}\nWin Percentage: ${((top3[1]['win']/top3[1]['games']) * 100).toFixed(2)}%`
				      },
				      {
						name: `${heroes[top3[2]['hero_id']]['localized_name']}`,
						value: `Wins: ${top3[2]['win']}\nTotal Games: ${top3[2]['games']}\nWin Percentage: ${((top3[2]['win']/top3[2]['games']) * 100).toFixed(2)}%`
				      }
				    ],
				    timestamp: new Date(),
				    footer: {
				      icon_url: client.user.avatarURL,
				      text: "©Kabobrocks"
				    }
				  }
				});
				})
			break;
			default:
				message.channel.send("Not a valid Dota command");
			break;
		}
	} else {
		if (!complete) {
			if (args[1]) {
				message.channel.send("That user is not registered in my system for tracking Dota. Please ask an admin to add them.");
			} else {
				message.channel.send("Not a valid Dota command");
			}
		}
	}
};