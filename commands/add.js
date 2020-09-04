module.exports = {
	commands: ['add', 'addition'], //string or array (aliases)
	expectedArgs: '<num1> <num2>', // Usage
	permissionError: 'You need admin permissions to run this command',
	minArgs: 2,
	maxArgs: 2,
	callback: (message, arguments, text) => {
		// example - !ticket <long text>

	},
	permissions: ['ADMINISTRATOR'],
	requiredRoles: ['Math']
}