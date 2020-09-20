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

		// Guild ID
		const guildId = message.guild.id

		// Caster Identifier
		const casterId = message.member.id

		// Case: Caster Dead
		const casterCurrentHealth = await combat.getHealth(guildId, casterId)

		if (casterCurrentHealth === 0) {
			message.channel.send(`Unable to cast commands when dead`)
			return
		}

		// Target exists?
		const mention = message.mentions.users.first()

		if (!mention) {
			message.reply('Please tag a user to pet.')
			return
		}

		// Target Identifier
		const targetId = mention.id

		// Case: Target == Caster
		if (targetId === casterId) {
			message.channel.send(`<@${casterId}> Why are you petting yourself? Is everything okay?`)
			return
		}

		// Get target's current health
		let targetHealth = await combat.getHealth(guildId, targetId)


		// Case: Target dead
		if (targetHealth === 0) {
			message.channel.send(`Target is dead`)
			return
		}

		// Compute target health after heal. 
		let newHealth = targetHealth + PET_HEAL_POTENCY

		if (targetHealth === MAX_HEALTH) { // Case: Overheal
			console.log(`Target already at Max health. setHealth() not required`)
			newHealth = MAX_HEALTH
		} else if (newHealth > MAX_HEALTH) {
			console.log(`Case overheal. Set health to 100`)
			newHealth = await combat.setHealth(guildId, targetId, MAX_HEALTH) // Set newHealth to 100 if overheal
		}

		message.channel.send(`<@${casterId}> gently pets <@${targetId}>. Target HP is now ${newHealth} (+${newHealth - targetHealth})`)
	}

}