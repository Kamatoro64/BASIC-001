const { prefix } = require('../config.json')

const validatePermissions = (permissions) => {
	const validPermissions = [
		'ADD_REACTIONS',
		'ADMINISTRATOR',
		'ATTACH_FILES',
		'BAN_MEMBERS',
		'CHANGE_NICKNAME',
		'CONNECT',
		'CREATE_INSTANT_INVITE',
		'DEAFEN_MEMBERS',
		'EMBED_LINKS',
		'KICK_MEMBERS',
		'MANAGE_CHANNELS',
		'MANAGE_EMOJIS',
		'MANAGE_GUILD',
		'MANAGE_MESSAGES',
		'MANAGE_NICKNAMES',
		'MANAGE_ROLES',
		'MANAGE_WEBHOOKS',
		'MENTION_EVERYONE',
		'MOVE_MEMBERS',
		'MUTE_MEMBERS',
		'PRIORITY_SPEAKER',
		'READ_MESSAGE_HISTORY',
		'SEND_MESSAGES',
		'SEND_TTS_MESSAGES',
		'SPEAK',
		'STREAM',
		'USE_EXTERNAL_EMOJIS',
		'USE_VAD',
		'VIEW_AUDIT_LOG',
		'VIEW_CHANNEL',
		'VIEW_GUILD_INSIGHTS'
	]

	for (const permission of permissions) {
		if (!validPermissions.includes(permission)) {
			throw new Error(`Unknown permission node "${permission}"`)
		}
	}
}

module.exports = (client, commandOptions) => {
	/* 
	Destructuring the commandOptions and setting defaults
	
	Assigning defaults here makes it so that we don't need to specify commandOptions 
	properties if we don't need them for a command
	*/

	let {
		commands,
		expectedArgs = '',
		permissionError = 'You do not have permission to run this command.',
		minArgs = 0,
		maxArgs = null,
		permissions = [],
		requiredRoles = [],
		callback
	} = commandOptions

	// Convert commands into an array if a single string was set for comamands (no aliases)
	if (typeof commands === 'string') {
		commands = [commands]
	}

	// Log to console when the command is "registered"
	console.log(`Registering command "${commands[0]}"`)

	if (permissions.length) { // Check if exists, works for string or array
		if (typeof permissions === 'string') {
			permissions = [permissions]
		}

		// Check that each permission in the permissions array is a valid discord permission
		validatePermissions(permissions)
	}
	// Listen for messages
	client.on('message', message => {
		const { member, content, guild } = message

		for (const alias of commands) {
			// Case insensitive command handler
			if (content.split(' ')[0].toLowerCase() === `${prefix}${alias}`.toLowerCase()) {

				// Ensure user has required permisisons
				for (const permission of permissions) {
					if (!member.hasPermission(permission)) {
						message.reply(permissionError)
						return // Do not continue executing function!
					}
				}


				// Ensure user has required roles
				for (const requiredRole of requiredRoles) {
					const role = guild.roles.cache.find(role => role.name === requiredRole)

					if (!role || !member.roles.cache.has(role.id)) {
						message.reply(`You must have the "${requiredRole}" role to use this command.`)
						return // Again, Do not continue executing function if role check fails
					}
				}

				// Split message into an array of strings
				// Split using a regular expression, allowing users from using more than 1 space
				const arguments = content.split(/[ ]+/)

				// remove first element of array (the command)
				arguments.shift()
				// Check arguments
				if (arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
					// We use the alias that the user used to not cause confusion
					message.reply(`Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`)
					return
				}
				// Handle the custom command
				callback(message, arguments, arguments.join(' '))

				return // Return on first valid alias 

			}
		}
	})
}


