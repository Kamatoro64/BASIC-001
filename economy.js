const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')



module.exports = (client) => {
	// Placeholder for now
}
module.exports.addCoins = async (guildId, userId, coins) => {

	// This function should return no. of coins (updated)
	return await mongo().then(async (mongoose) => {
		try {
			console.log('Running findOneAndUpdate')
			const result = await profileSchema.findOneAndUpdate({
				// Find criteria
				guildId,
				userId
			}, {
				guildId,
				userId,
				$inc: {
					coins
				}
			}, {
				upsert: true, // If no match (no entry to update), insert
				new: true //Return the UPDATED document, instead of the original one
			})

			console.log('RESULT:', result)

			// Were are returning the coins property of the document stored in the result variable
			return result.coins

		} finally {
			mongoose.connection.close()
		}
	})
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