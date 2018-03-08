exports.run = function(client, message, args) {
	message.channel.send('These are the current commands that I have available\n```!8ball [question]: ask the magic 8 ball a question\n!anime [search]: searches MyAnimeList for anime\n!cat: responds with a random cat picture\n!crypto [symbol]: responds with the current price in USD of the coin\n!dog: responds with a random dog picture\n!dota commands: list of Dota 2 commands in the server\n!github: Github information\n!img [query]: search imgur for a random album with your search query\n!numberfact [number]: gives a fact about the number provided\n!pokemon [name]: gives information about the selected Pokemon\n!sc2 commands: list of Starcraft II commands in the server\n!servers: responds with any server information we have for games\n!shouldi [question]: get a yes or no answer to your question\n!ud [word]: urban dictionary definition of word\n!weather [zipcode]: gives snapshot of weather for zipcode\n!wolfram [search]: search wolfram alpha for your question\n!yt [search]: search youtube and get first result```');
};