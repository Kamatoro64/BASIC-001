const ninjutsu_map = new Map();

function populate_map(keys, value) {
	keys.forEach(key => {
		ninjutsu_map.set(key, value)
	});
}

populate_map(['T', 'C', 'J'], 'Fuma Shuriken')
populate_map(['TC', 'JC'], 'Raiton')
populate_map(['CT', 'JT'], 'Katon')
populate_map(['TJ', 'CJ'], 'Hyoton')

populate_map(['CJT', 'JCT'], 'Huton')
populate_map(['TJC', 'JTC'], 'Doton')
populate_map(['TCJ', 'CTJ'], 'Suiton')
populate_map([''], undefined)

module.exports = ninjutsu_map