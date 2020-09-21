const combat = require("../../combat")

module.exports = {
	commands: ['slap'],
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<The target's @>",
	callback: async (message, arguments) => {

		// CONSTANTS
		const SLAP_POTENCY = 40
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
			message.reply('Please tag a user to slap.')
			return
		}

		// Target Identifier
		const targetId = mention.id

		// Case: Target == Caster
		if (targetId === casterId) {
			message.channel.send(`Warning! Low IQ behaviour detected! Stop trying to slap yourself`)
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
		let newHealth = targetHealth - SLAP_POTENCY

		if (newHealth <= 0) {
			console.log(`Case target death. Set health to 0`)
			newHealth = await combat.setHealth(guildId, targetId, 0) // Set newHealth to 0 if target dies
		} else {
			console.log(`Case target wounded. Use addHealth to add - SLAP_POTENCY to target health`)
			newHealth = await combat.addHealth(guildId, targetId, -SLAP_POTENCY)
		}

		message.channel.send(`<@${casterId}> slaps <@${targetId}> ${!newHealth ? 'to death' : ''}! Target HP is now ${newHealth} (${newHealth - targetHealth})`)
	}

}