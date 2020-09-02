const { prefix } = require('./config.json')


module.exports = (client, aliases, callback) => { //Rememmber a function passed as a parameter to another function is a callback function. Used for Asynchronous programming

	if (typeof aliases === 'string') {
		aliases = [aliases]
	}

	client.on('message', message => {
		const { content } = message;

		aliases.forEach(alias => {
			const command = `${prefix}${alias}`

			if (content.startsWith(`${command} `) || content === command) {
				console.log(`Running the command ${command}`)
				callback(message)
			}
		});
	})
}