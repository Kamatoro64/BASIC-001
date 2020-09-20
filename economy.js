const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')

/* 
Cache coin data in memory to prevent unnecessary database calls
Everytime we return the no. of coins to the user we have to update the cache. getCoins, addCoins 
*/
const coinsCache = new Map()

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
				new: true, //Return the UPDATED document, instead of the original one
				setDefaultsOnInsert: true
			})

			console.log('RESULT:', result)

			coinsCache.set(`${guildId}-${userId}`, result.coins)

			// Were are returning the coins property of the document stored in the result variable
			return result.coins

		} finally {
			mongoose.connection.close()
		}
	})
}

module.exports.getCoins = async (guildId, userId) => {

	// Check coins cache for coins using key =  guildId-userId
	const cachedValue = coinsCache.get(`${guildId}-${userId}`)

	if (cachedValue !== undefined) {
		console.log(`getCoins method found cached value and bypassing Database search`)
		return cachedValue
	}
	console.log(`Cache value not found, database search required`)

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
				}).save()
			}

			coinsCache.set(`${guildId}-${userId}`, coins)

			return coins // Return no. of coins
		} finally {
			mongoose.connection.close()
		}
	})
}