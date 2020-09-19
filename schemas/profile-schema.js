const mongoose = require('mongoose')

const reqString = {
	type: String,
	required: true
}

const reqNum = {
	type: Number,
	required: true
}

const profileSchema = mongoose.Schema({
	guildId: reqString,
	userId: reqString,
	coins: reqNum,
	health: reqNum
})

module.exports = mongoose.model('profiles', profileSchema) // Name of collection, name of schema