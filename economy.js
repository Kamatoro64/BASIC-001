const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')



module.exports = (client) => {
	// Placeholder for now
}

module.exports.getCoins = async (guildId, userId) => {
	return await mongo().then(async mongoose => {
		try {
			console.log(`Running findOne()`)

			const result = await profileSchema.findOne({
				guildId,
				userId
			})

			console.log('RESULT: ', result)

			let coins = 0

			if (result) {
				// If user profile exists, retrieve coin count
				coins = result.coins
			} else {
				// If user profile doesn't exist, create a new document in the profiles collection
				console.log('Inserting a document')
				await new profileSchema({
					guildId,
					userId,
					coins // Set to 0 above
				}).save()
			}

			return coins // Return no. of coins
		} finally {
			mongoose.connection.close()
		}
	})
}