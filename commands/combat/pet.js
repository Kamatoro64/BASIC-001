const combat = require("../../combat")

module.exports = {
	commands: ['pet'],
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<The target's @>",
	callback: async (message, arguments) => {

		// This has to be duplicated for each command, move it elsewhere
		const casterCurrentHealth = await combat.getHealth(message.guild.id, message.author.id)

		if (casterCurrentHealth === 0) {
			message.reply(`Unable to cast commands when dead`)
			return
		}

		// Specify amount to heal for each pet
		const PET_HEAL_POTENCY = 5

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

		// Get target's current health
		let targetHealth = await combat.getHealth(guildId, userId)

		// Use the MAX_HEALTH constant from combat.js (In case modify it in the future)
		const MAX_HEALTH = combat.getMaxHealth()

		if (targetHealth === MAX_HEALTH) {
			message.channel.send(`<@${message.author.id}> gently pets <@${userId}>. Target health is ${targetHealth}`)
		} else
			if ((targetHealth + PET_HEAL_POTENCY) >= MAX_HEALTH) {
				const newHealth = await combat.setHealth(guildId, userId, MAX_HEALTH) // Expect 100
				message.channel.send(`<@${message.author.id}> gently pets <@${userId}>. Target HP is now ${newHealth} (+${newHealth - targetHealth})`)
			} else {
				const newHealth = await combat.addHealth(guildId, userId, PET_HEAL_POTENCY)
				message.channel.send(`<@${message.author.id}> gently pets <@${userId}>. Target HP is now ${newHealth} (+${newHealth - targetHealth})`)
			}


	}

}