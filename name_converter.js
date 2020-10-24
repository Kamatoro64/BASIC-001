function isVowel(char) {
	if (/[aeiou]/.test(char)) {
		return true
	} else {
		return false
	}
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertName(name) {
	if (isVowel(name.slice(-1))) {
		let ar = name.split('').reverse()

		let consonanteIndex = ar.findIndex(x => !isVowel(x))

		if (consonanteIndex === -1) {
			// No consonants
			return capitalizeFirstLetter(name)
		}

		return capitalizeFirstLetter(ar.slice(0, consonanteIndex + 1).reverse().join('').repeat(2))
	} else {
		const newName1 = name + name.slice(-1) + 'y'
		let newName2 = undefined
		if (isVowel(name.charAt(name.length - 2)) && !isVowel(name.charAt(name.length - 3))) {
			newName2 = name.slice(-3).repeat(2)
		}

		if (!newName2) {
			return capitalizeFirstLetter(newName1)
		}
		return capitalizeFirstLetter(newName1) + " or " + capitalizeFirstLetter(newName2)

	}

}

const names = ['Jean', 'Lyra', 'James', 'John', 'Lisa']

names.forEach(name => {
	const newName = convertName(name)
	console.log(`${capitalizeFirstLetter(name)} -> ${newName}`)
})
