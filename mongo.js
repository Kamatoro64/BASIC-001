// Import this file if we need to connect to the database
// An asynchronous function that connects to a mongodb database specified in config.json that 
// returns the mongoose object

const mongoose = require('mongoose')
const { mongoPath } = require('./config.json')


module.exports = async () => {
	await mongoose.connect(mongoPath, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false //https://mongoosejs.com/docs/deprecations.html#findandmodify
	})
	return mongoose
}