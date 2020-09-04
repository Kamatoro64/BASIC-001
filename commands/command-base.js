const { prefix } = require('../config.json')

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


}