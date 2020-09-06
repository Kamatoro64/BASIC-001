const economy = require('../../economy')

module.exports = {
	commands: ['balance', 'bal'],
	maxArgs: 1,
	expectedArgs: "<Target user's @>",
	callback: async (message) => {
		const target = message.mentions.users.first() || message.author // Defaults tp message.author 
		const targetId = target.id

		const guildId = message.guild.id //Check the guild (server) in which the message was sent
		const userId = target.id

		const coins = await economy.getCoins(guildId, userId) //Hence callback has to be asynchronous
		message.reply(`That user has ${coins} coins`)
	}

}