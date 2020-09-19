const combat = require("../../combat")

module.exports = {
	commands: ['pet'],
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<The target's @>",
	callback: async (message, arguments) => {

		const casterCurrentHealth = await combat.getHealth(message.guild.id, message.author.id)

		if (casterCurrentHealth === 0) {
			message.reply(`Unable to cast commands when dead`)
			return
		}

		// Specify amount to heal for each pet
		const petHealAmount = 5

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

		const currentHealth = await combat.getHealth(guildId, userId)

		if (currentHealth === 100) {
			message.channel.send(`<@${message.author.id}> gently pets <@${userId}>.`)
		} else

			if ((currentHealth + petHealAmount) >= 100) {
				// If resulting health after pet exceed 100, set target health to 100
				const newHealth = await combat.setHealth(guildId, userId, 100)
				message.channel.send(`<@${message.author.id}> gently pets <@${userId}>. Target HP is now ${newHealth}`)
			} else {
				const newHealth = await combat.addHealth(guildId, userId, petHealAmount)
				message.channel.send(`<@${message.author.id}> gently pets <@${userId}>. Target HP is now ${newHealth}`)
			}


	}

}