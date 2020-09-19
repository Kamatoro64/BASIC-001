const combat = require("../../combat")

module.exports = {
	commands: ['pet'],
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<The target's @>",
	callback: async (message, arguments) => {
		/*
			Notice this section only contains logic on how the callback function
			handles the message and arguments (include input sanitisation).

			Once this it done it calls a function from economy.js that handles
			the database logic. This means if we need to add coins to a user via
			a different method (not by calling a bot command), we can easily call
			the same function from economy.js

			This separation is extremely important
		*/
		const mention = message.mentions.users.first()

		if (!mention) {
			message.reply('Please tag a user to pet.')
			return
		}

		const guildId = message.guild.id
		const userId = mention.id

		if (userId === message.author.id) {
			message.channel.send(`<@${message.author.id}> Why are you petting yourself? Is everything okay?`)
			return
		}

		const petHealAmount = 5
		// callback has to be asynchronous since we're using await

		const currentHealth = await combat.getHealth(guildId, userId)

		if (currentHealth === 100) {
			message.channel.send(`<@${message.author.id}> gently pets <@${userId}>.`)
		} else

			if ((currentHealth + petHealAmount) >= 100) {
				const newHealth = await combat.setHealth(guildId, userId, 100)
				message.channel.send(`<@${message.author.id}> gently pets <@${userId}>. Target HP is now ${newHealth}`)
			} else {
				const newHealth = await combat.addHealth(guildId, userId, petHealAmount)
				message.channel.send(`<@${message.author.id}> gently pets <@${userId}>. Target HP is now ${newHealth}`)
			}


	}

}