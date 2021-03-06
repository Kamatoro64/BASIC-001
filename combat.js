const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')


// CONSTANTS
const MAX_HEALTH = 100


/* 
Cache health data in memory to prevent unnecessary database calls
Everytime we return the health to the user we have to update the cache. getHealth, addHealth, setHealth 
*/
const healthCache = new Map()

module.exports = (client) => {
	// Placeholder for now
}


module.exports.getMaxHealth = () => {
	return MAX_HEALTH
}

module.exports.addHealth = async (guildId, userId, health) => {

	// This function should health (updated)
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
					health
				}
			}, {
				upsert: true, // If no match (no entry to update), insert
				new: true, //Return the UPDATED document, instead of the original one
				setDefaultsOnInsert: true
			})

			console.log('RESULT:', result)

			healthCache.set(`${guildId}-${userId}`, result.health)

			// Were are returning the health property of the document stored in the result variable
			return result.health

		} finally {
			mongoose.connection.close()
		}
	})
}

module.exports.getHealth = async (guildId, userId) => {

	// Check health cache for health using key =  guildId-userId
	const cachedValue = healthCache.get(`${guildId}-${userId}`)

	if (cachedValue !== undefined) {
		console.log(`getHealth method found cached value and bypassing Database search`)
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

			let health = 100 //default

			if (result) {
				// If user profile exists, retrieve health
				health = result.health
			} else {
				// If user profile doesn't exist, create a new document in the profiles collection
				console.log('Inserting a document')
				await new profileSchema({
					guildId,
					userId
				}).save()
			}

			healthCache.set(`${guildId}-${userId}`, health)

			return health // Return health
		} finally {
			mongoose.connection.close()
		}
	})
}

module.exports.setHealth = async (guildId, userId, health) => {

	// This function should health (updated)
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
				health
			}, {
				upsert: true, // If no match (no entry to update), insert
				new: true //Return the UPDATED document, instead of the original one
			})

			console.log('RESULT:', result)

			healthCache.set(`${guildId}-${userId}`, result.health)

			// Were are returning the health property of the document stored in the result variable
			return result.health

		} finally {
			mongoose.connection.close()
		}
	})
}

