exports.run = function(client, message, args) {
	var botChoice = Math.floor((Math.random() * 3) + 1);
	var playerChoice = args[0].toLowerCase();

	var result = 'Something went wrong. Try again!';

	switch(playerChoice) {
		case 'rock':
			if (botChoice == 1) {
				result = `We tie! :neutral_face: We both picked 🥌`;
			} else if (botChoice == 2) {
				result = `I win! :smiley: My :scroll: covered your 🥌`;
			} else {
				result = 'You win! :sob: Your 🥌 destroyed my :scissors:';
			}
			break;
		case 'paper':
			if (botChoice == 1) {
				result = `You win! :sob: Your :scroll: covered my 🥌`;
			} else if (botChoice == 2) {
				result = `We tie! :neutral_face: We both picked :scroll:`;
			} else {
				result = 'I win! :smiley: My :scissors: cut your :scroll:';
			}
			break;
		case 'scissors':
			if (botChoice == 1) {
				result = `I win! :smiley: My 🥌 destroyed your :scissors:`;
			} else if (botChoice == 2) {
				result = `You win! :sob: Your :scissors: cut my :scroll:`;
			} else {
				result = 'We tie! :neutral_face: We both picked :scissors:';
			}
			break;
		default:
			result = 'No cheating! You need to choose rock, paper, or scissors';
			break;
	}

	message.channel.send(result);
};