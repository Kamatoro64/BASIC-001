const mongo = require('./mongo')
const command = require('./command')
const welcomeSchema = require('./schemas/welcome-schema')

module.exports = (client) => {
	//!setwelcome <message>


	// Create a cache object
	//const cache = { //guildId: [channelId, text]}

	const cache = new Map()
	// key => ServerID 
	// value => {channelId:x, text:y}



	command(client, 'setwelcome', async message => {
		const { member, channel, content, guild } = message

		if (!member.hasPermission('ADMINISTRATOR')) {
			channel.send('You do not have permission to run this command.')
			return
		}

		let text = content

		const split = text.split(' ')

		if (split.length < 2) {
			channel.send(`Please provide a welcome message`)
			return
		}

		split.shift()

		text = split.join(' ')



		await mongo().then(async (mongoose) => {
			try {
				await welcomeSchema.findOneAndUpdate({
					_id: guild.id // Used for update
				}, {
					_id: guild.id, // Used for insert if no existing entry with PK found
					channelId: channel.id,
					text
				}, {
					upsert: true //Update + Insert. Update, if x exist, insert
				})

				// Cache it! After insert
				//cache[guild.id] = [channel.id, text]
				cache.set(guild.id, { channelId: channel.id, text: text })

				/* Pure insert but does not handle case where entry with primary key alredy exist
				await new welcomeSchema({
					_id: guild.id,
					channelId: channel.id,
					text // No need to do text:text if the same
				}).save()
				*/
			} finally {
				mongoose.connection.close()
			}
		})


	})

	const onJoin = async member => {
		console.log(cache)
		const { guild } = member

		let data = cache.get(guild.id)

		if (!data) {

			console.log('FETCHING FROM DATABASE')

			await mongo().then(async mongoose => {
				try {
					const result = await welcomeSchema.findOne({ _id: guild.id })

					// Add result to cache (Map)
					cache.set(guild.id, { channelId: result.channelId, text: result.text })

				} finally {
					mongoose.connection.close()
				}
			})
		}

		// At this point we should have the welcome message cached. Retrieve the Object via the key and use destructuring assignment to get the channelID, text
		const { channelId, text } = cache.get(guild.id)

		// Get the channel object via the channelId
		const channel = guild.channels.cache.get(channelId)

		// Send the welcome message to the channel. This is the channel where the welcome message was set via the !setwelcome command
		channel.send(text)

	}

	// Instead of waiting for user to join to test the onJoin behaviour, create a command to trigger it, on Join expects a member so we're sending the member of the current message as an argument

	command(client, 'simjoin', message => {
		onJoin(message.member)
	})

	// This is the actual trigger that watches for a member join
	client.on('guildMembeAdd', member => {
		onJoin(member)
	})


}