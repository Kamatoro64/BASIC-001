const mongoose = require('mongoose')

const reqString = {
	type: String,
	required: true
}

const profileSchema = mongoose.Schema({
	guildId: reqString,
	userId: reqString,
	coins: {
		type: Number,
		default: 0,
		required: true
	},
	health: {
		type: Number,
		default: 100,
		required: true
	}
})

module.exports = mongoose.model('profiles', profileSchema) // Name of collection, name of schema