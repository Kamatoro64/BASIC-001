module.exports = {
	commands: ['add', 'addition'], //string or array (aliases)
	expectedArgs: '<num1> <num2>', // Usage
	permissionError: 'You need admin permissions to run this command',
	minArgs: 2,
	maxArgs: 2,
	callback: (message, arguments, text) => {
		// The text argument is the string after the message content, without additional spaces and the ${prefix}${alias}

		// The + sign is used to convert the string into a number
		const num1 = +arguments[0]
		const num2 = +arguments[1]
		message.reply(`The sum is ${num1 + num2}`)
	},
	permissions: ['ADMINISTRATOR'],
	requiredRoles: []
	//requiredRoles: ['Math']
}