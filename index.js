const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json') // Config is a JSON Object
const command = require('./command')
const mongo = require('./mongo')
const welcome = require('./welcome')
const messageCounter = require('./message-counter')

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

	messageCounter(client)

	welcome(client)




	// Note that the 3rd parameter to the command function is a callback function
	// This is where the logic for a particular command is coded
	command(client, 'ping', message => {
		message.channel.send('pong')
	})

	command(client, 'servers', message => {
		client.guilds.cache.forEach(guild =>
			message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`))

		/* guild.name = server name, guild.memberCount = channel*/
	})

	command(client, ['cc', 'clearchannel'], message => {
		if (message.member.hasPermission('ADMINISTRATOR')) {
			message.channel.messages.fetch().then(results => {
				message.channel.bulkDelete(results)
			})
		}
	})

	command(client, 'status', message => {
		const content = message.content.replace('!status ', '')

		client.user.setPresence({
			activity: {
				name: content,
				type: 0
			}
		})
	})


})




client.login(config.token) //Accessing the token property of the config JSON Object
