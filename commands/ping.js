module.exports = {
	commands: 'ping',
	minArgs: 0,
	maxArgs: 0,
	callback: (message) => {
		message.reply('Pong!')
	}

}