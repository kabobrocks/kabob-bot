# kabob-bot
Kabob Bot is a Discord bot that I am currently developing for use on my Discord server. Features are added at request of people in my server or whatever else I come up with. 
It is written using NodeJS and uses the DiscordJS module

## Required Technologies
* NodeJS

## Setup
1. Clone the repo
2. Follow the instructions in [this guide](https://twentysix26.github.io/Red-Docs/red_guide_bot_accounts/) to set up this bot's code on your server.
3. Go to the folder in terminal and run "npm install" to install dependencies
4. Create a settings.json file in the root folder. Here is an example with dummy keys:
>{
<br>"token":"Your Discord Bot Token Goes Here",
<br>"pubgapi":"Your API Key From Pubgtracker Goes Here",
<br>"blizzardapi":"Your Blizzard API Key Goes Here",
<br>"generalchannel":"Your Discord General ChannelID Goes Here",
<br>"wolframapi":"Your Wolfram API Key Goes Here",
<br>"imgurapi":"Your Imgur API Key Goes Here",
<br>"openweatherapi":"Your OpenWeatherAPI Key Goes Here",
<br>"dotaArray": {
<br>          "Player Name Goes Here" : "DotaID Goes Here"
<br>	},
<br>	"blizzardArray" : {
<br>             "Player Name Goes Here"  : {"id":"BattleNet ID Goes Here", "username":"BattleNet UserID Goes Here"}
<br>	}
<br>}
  * Add as many players as you want to the dotaArray and blizzardArray
5. In terminal, go to the root folder of the project and type in "npm start" to start the bot
  * If you see "I'm Online I'm Online" in console, then your bot is online and connected to your server

## Commands
These are currently the commands supported by Kabob Bot (in order to be recognized by the bot, use an ! before the command at the beginning of the message):  
* 8ball [question]: Have the Magic 8 Ball answer your question  
* anime [search]: Searches MyAnimeList for your query and responds with the top result  
* cat: Responds with a random picture of a cat
* commands: Lists all commands for Kabob Bot
* crypto [symbol]: Responds with the current price in USD of the coin  
* dog: Responds with a random picture of a dog  
* dota  
  * commands: lists all of the Dota commands for the bot
  * leaderboard: lists ranks of all Dota players on the server
  * lastgame [username]: gives information on the registered player's last match
  * match [match_id]: gets URL for requested game
  * players: returns a list of all registered members
  * pros [username]: lists all professional players that the user has played with or against
  * rank [username]: gives rank of the specified member
  * top3 [username]: gives details on the specified member's top 3 heroes
* github: provides Github information about the bot
* img [query]: searches imgur for a random album with the search query
* numberfact [number]: gives a fact about the number provided. Also works with 'random'
* pokemon [name]: gives information about the specified Pokemon
* sc2
  * achievements [username]: gives the achievement score for the player
  * commands: lists all of the sc2 commands for the bot
  * players: lists all registered sc2 players for the server
  * race [username]: responds with the most played race of the user
* servers: lists all of the IP addresses for servers of other games that we play
* shouldi [question]: responds with a yes or no gif to your question
* ud [word]: responds with the Urban Dictionary definition of your query
* weather [zipcode]: gives a snapshot of the weather for the given zipcode
* wolfram [search]: searches Wolfram Alpha for your search and responds with the top result
* yt [search]: searches Youtube for your search and returns the first result
