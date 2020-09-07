const mongoose = require('mongoose')

const messageCountSchema = mongoose.Schema({
	// The user ID
	_id: {
		type: String,
		required: true
	},

	messageCount: {
		type: Number,
		required: true
	}

	// How many messages they have sent

})

module.exports = mongoose.model('message-counts', messageCountSchema)
// mongoose.model takes in 2 arguments, the name of the collection and the schema