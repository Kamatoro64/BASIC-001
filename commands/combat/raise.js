const combat = require("../../combat")

module.exports = {
	commands: ['raise'],
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<The target's @>",
	requiredRoles: ['Healer'],
	callback: async (message, arguments) => {

		// CONSTANTS
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
			message.reply('Please tag a user to raise.')
			return
		}

		// Target Identifier
		const targetId = mention.id

		// Case: Target == Caster
		if (targetId === casterId) {
			message.channel.send(`Error. Unable to cast raise on self`)
			return
		}

		// Get target's current health
		let targetHealth = await combat.getHealth(guildId, targetId)


		// Case: Target not dead
		if (targetHealth !== 0) {
			message.channel.send(`Target is not dead!`)
			return
		}

		// At this point the target is dead. Set health to 100
		await combat.setHealth(guildId, targetId, MAX_HEALTH)

		message.channel.send(`<@${casterId}> casts raise on <@${targetId}>! Target HP restored to ${MAX_HEALTH}`)
	}

}