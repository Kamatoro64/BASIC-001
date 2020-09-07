const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json') // Config is a JSON Object
const mongo = require('./mongo')

client.on('ready', async () => {
	console.log('The client is ready')

	await mongo().then(mongoose => {
		try {
			console.log(`Connected to mongo!`)
		}
		finally {
			// always close the connection once we're done with them
			mongoose.connection.close()
		}
	})

	const baseFile = 'command-base.js'
	const commandBase = require(`./commands/${baseFile}`)

	const readCommands = dir => {
		// All files in the the directory specified by dir will be recursively found and processed
		const files = fs.readdirSync(path.join(__dirname, dir))
		for (const file of files) {
			const stat = fs.lstatSync(path.join(__dirname, dir, file))
			if (stat.isDirectory()) {
				readCommands(path.join(dir, file))
			} else if (file !== baseFile) {
				const option = require(path.join(__dirname, dir, file))
				commandBase(client, option)
			}
		}
	}

	readCommands('commands') // Directory called commands

})




client.login(config.token) //Accessing the token property of the config JSON Object
