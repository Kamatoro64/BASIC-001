const combat = require("../../combat")

module.exports = {
	commands: ['pet'],
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<The target's @>",
	callback: async (message, arguments) => {

		// CONSTANTS
		const PET_HEAL_POTENCY = 5
		const MAX_HEALTH = combat.getMaxHealth()

		// Case: Caster Dead
		const casterCurrentHealth = await combat.getHealth(message.guild.id, message.author.id)

		if (casterCurrentHealth === 0) {
			message.channel.send(`Unable to cast commands when dead`)
			return
		}

		// Target Check
		const mention = message.mentions.users.first()

		if (!mention) {
			message.reply('Please tag a user to pet.')
			return
		}

		// Target Identifier
		const guildId = message.guild.id
		const userId = mention.id

		// Case: Target == Caster
		if (userId === message.author.id) {
			message.channel.send(`<@${message.author.id}> Why are you petting yourself? Is everything okay?`)
			return
		}

		// Get target's current health
		let targetHealth = await combat.getHealth(guildId, userId)


		// Case: Target dead
		if (targetHealth === 0) {
			message.channel.send(`Target is dead`)
			return
		}

		// Compute target health after heal. 
		let newHealth = targetHealth + PET_HEAL_POTENCY

		if (newHealth >= MAX_HEALTH) { // Case: Overheal
			newHealth = await combat.setHealth(guildId, userId, MAX_HEALTH) // Todo: Extra Database call if 100. Separate = and >
		}

		message.channel.send(`<@${message.author.id}> gently pets <@${userId}>. Target HP is now ${newHealth} (+${newHealth - targetHealth})`)
	}

}