const { prefix } = require('../config.json')

const validatePermissions = (permission) => {
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


	if (permissions.length) { // Check if exists, works for string or array
		if (typeof permissions === 'string') {
			permissions = [permissions]
		}

		// Check that each permission in the permissions array is a valid discord permission
		validatePermissions(permissions)


	}


}