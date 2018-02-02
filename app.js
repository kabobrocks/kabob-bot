const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./settings.json').token;
const pubgapi = require('./settings.json').pubgapi;
const blizzardapi = require('./settings.json').blizzardapi;
const heroes = require('./heroes.json');
const dotaRanks = require('./dotaranks.json');

client.on('ready',() => {
	console.log('I\'m Online\nI\'m Online');
});


var prefix = "!";
var request =  require('request');

var dotaArray = {'cel' : '91900156',
				 'diego': '138509132',
				 'ferris': '101718397',
				 'gnarledwolf': '417772917',
				 'kabobrocks' : '89104101',
				 'kisses' : '947240',
				 'muskratlove' : '33170675',
				 'muskratproblem' : '39535136',
				 'teamsneak' : '18007541'};

var blizzardArray = {'kabobrocks'  : {'id':'3127195', 'username':'Kabobrocks'},
					 'muskratlove' : {'id':'2353905', 'username':'MuskratLord'},
					 'mykin'	   : {'id':'2660449', 'username':'Mykin'},
					 'spiv'		   : {'id': '704322', 'username':'Nuindil'}
};
client.on('message', message => {

	//Don't do anything unless it starts with our prefix
	if (!message.content.startsWith(prefix)) return;

	//grab the arguments if we need them
	var args = message.content.split(' ').slice(1);
	var command = message.content.split(' ')[0];
	command = command.substr(1);
	var argresult = args.join(' ');
	var argsearch = args.join('%20');

	//don't let bots interact with eachother
	if (message.author.bot) return;

	//Some commands
	switch(command) {
		case 'anime':
			request({
				url: "https://initiate.host/search/" + argsearch,
				json: true
			}, function (error, response, body) {
				console.log(argsearch);
				message.channel.send(body['result'][0]['url']);
			})
		break;
		case 'cat':
			request({
				url: "http://random.cat/meow.php",
				json: true
			}, function (error, response, body) {
				message.channel.send(body);
			})
			break;
		case 'crypto':
			request({
				url: "https://coinbin.org/" + args[0],
				json: true
			}, function (error, response, body) {
				if (body['coin'] == null) {
					message.channel.send('Could not find the cryptocurrency symbol provided');
				} else {
					message.channel.send(`The current price (USD) of ${body['coin']['name']} is $${body['coin']['usd']}`);
				}
			})
			break;
		case 'dog':
			request({
				url: "https://dog.ceo/api/breeds/image/random",
				json: true
			}, function (error, response, body) {
				message.channel.send(body['message']);
			})
			break;
		case 'dota':
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
								console.log(heroes[top3[i]['hero_id']]['localized_name']);
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
			break;
		case 'numberfact':
			if (!isNaN(args[0]) || args[0] == 'random') {
				request({
					url: "http://numbersapi.com/" + args[0],
				}, function (error, response, body) {
					message.channel.send(body);
				})
			} else {
				message.channel.send("That's not a number. Please use a number.");
			}
			break;
		case 'pubg':
			request({
				url: "https://api.pubgtracker.com/v2/profile/pc/MuskratLove",
				headers: {
					"TRN-Api-Key": "c8c1b9a7-bb64-4e58-aede-053fff8402f7"
				},
				json: true
			}, function (error, response, body) {
				console.log(body);
				message.channel.send(body.error);
			})
			break;
		case 'pokemon':
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
					    author: {
					      name: client.user.username,
					      icon_url: client.user.avatarURL
					    },
					    title: `${body['species']['name']}`,
					    description: `Information about ${body['species']['name']}`,
						   image: {
							 url: body['sprites']['front_default']
						   },
					    fields: [{
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
			break;
		case 'sc2':
			var complete = false;
			if (args[1]) {
				var player = args[1].toLowerCase();
			}
			switch(args[0]) {
				case 'commands':
					complete = true;
					message.channel.send("These are my current Starcraft II commands:\n```achievements [username]: gives amount of achievements for the registered player\nplayers: lists all registered members\nrace [username]: lists players' primary race```")
				break;
				case 'players':
					complete = true;
					message.channel.send("These are the currently registered Starcraft II players:```\n" + Object.keys(blizzardArray) + "```");
				break;
			}
			if (blizzardArray[player]) {
				switch(args[0]) {
					case 'achievements':
						request({
							url: "https://us.api.battle.net/sc2/profile/" + blizzardArray[player]['id'] + "/1/" + blizzardArray[player]['username'] + "/?locale=en_US&apikey=" + blizzardapi,
							json: true
						}, function (error, response, body) {
							message.channel.send(args[1] + " has earned " + body['achievements']['points']['totalPoints'] + " achievement points in Starcraft II");
						})
						break;
					case 'race':
						request({
							url: "https://us.api.battle.net/sc2/profile/" + blizzardArray[player]['id'] + "/1/" + blizzardArray[player]['username'] + "/?locale=en_US&apikey=" + blizzardapi,
							json: true
						}, function (error, response, body) {
							message.channel.send("The primary race for " + args[1] + " is: " + body['career']['primaryRace']);
						})
						break;
					default:
						message.channel.send("Not a valid sc2 command");
					break;
				}
			} else {
				if (!complete) {
					if (args[1]) {
						message.channel.send("That user is not registered in my system for tracking Starcraft II. Please ask an admin to add them.");
					} else {
						message.channel.send("Not a valid sc2 command");
					}
				}
			}
			break;
		case 'setgame':
			client.user.setGame(argresult);
			break;
		case 'setstatus':
			client.user.setStatus(argresult);
			break;
		case 'servers':
		case 'server':
			message.channel.send('Factorio: 199.36.220.142:34197');
			break;
		case 'ud':
			request({
				url:"https://api.urbandictionary.com/v0/define?term=" + argresult,
				json: true
			}, function (error, response, body){
				if (body['list'].length === 0) {
					message.channel.send("No definition found");
				} else {
					if (body['list'][0]['definition'].length < 2000) {
						message.channel.send("**" + argresult + "**" + ": " + body['list'][0]['definition']);
					} else if (body['list'][0]['definition'].length < 2000) {
						message.channel.send("**" + argresult + "**" + ": " + body['list'][1]['definition']);
					} else {
						message.channel.send("Top 2 definitions are too long to post in discord. Link: " + body['list'][0]['permalink']);
					}
				}
			})
			break;
		case 'commands':
			message.channel.send('These are the current commands that I have available\n```!anime [search]: searches MyAnimeList for anime\n!cat: responds with a random cat picture\n!crypto [symbol]: responds with the current price in USD of the coin\n!dog: responds with a random dog picture\n!dota commands: list of Dota 2 commands in the server\n!numberfact [number]: gives a fact about the number provided\n!pokemon [name]: gives information about the selected Pokemon\n!sc2 commands: list of Starcraft II commands in the server\n!servers: responds with any server information we have for games\n!ud [word]: urban dictionary definition of word```');
			break;
		default:
			break;
	}
});

client.on('guildMemberAdd', member => {
	client.channels.get('345698398684577793').send(`${member.user.username} has joined the server. Welcome!`);
});

client.on('guildMemberRemove', member => {
  client.channels.get('345698398684577793').send(`${member.user.username} has left the server.`);
});


client.on('channelCreate', channel => {
	console.log(`A ${channel.type} channel by the name of ${channel.name} and was created at ${channel.createdAt} with the ID of ${channel.id}`);
	if (channel.type === 'text') {
		channel.sendMessage('Channel successfully created.');
		client.channels.get('345698398684577793').send(`A new ${channel.type} channel, ${channel.name} has been created. Go check it out`);
	}
});

client.login(token);
