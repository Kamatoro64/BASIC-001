module.exports = {
	commands: ['addbalance', 'addbal'],
	minArgs: 2,
	maxArgs: 2,
	expectedArgs: "<The target's @> <coin amount>",
	permissionError: 'You must be an administrator to use this command.',
	permissions: 'ADMINISTRATOR',
	callback: (message, arguments) => {
		/*
			Notice this section only contains logic on how the callback function
			handles the message and arguments (include input sanitisation).

			Once this it done it calls a function from economy.js that handles
			the database logic. This means if we need to add coins to a user via
			a different method (not by calling a bot command), we can easily call
			the same function from economy.js

			This separation is extremely important
		*/
		const mention = messsage.mentions.users.first()

		if (!mention) {
			message.reply('Please tag a user to add coins to.')
			return
		}

		// Check if coins argument is a number
		const coins = arguments[1]
		if (isNaN(coins)) {
			message.reply('Please provide a valid number of coins')
			return
		}

		const guildId = message.guild.id
		const userId = mention.id

	}

}