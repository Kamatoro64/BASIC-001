const mongoose = require('mongoose')

const reqString = {
	type: String,
	required: true
}

const welcomeSchema = mongoose.Schema({
	// Template

	// Primary key specified using _id
	_id: reqString,
	channelId: reqString,
	text: reqString

})

module.exports = mongoose.model('welcome-channels', welcomeSchema)