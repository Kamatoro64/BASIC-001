const mongo = require('./mongo')
const messageCountSchema = require('./schemas/message-count-schema')

// Function that listens on message events. Note that we did not need to import the command function since we're not listening for a new bot command here.

module.exports = client => {
	client.on('message', async message => {
		const { author } = message
		const { id } = author

		// Create mongoose connection
		await mongo().then(async mongoose => {
			try {
				await messageCountSchema.findByIdAndUpdate({
					_id: id
				}, {
					$inc: {
						'messageCount': 1
					}
				}, {
					upsert: true
				}).exec()

			} finally {
				mongoose.connection.close()
			}
		})








	})

}