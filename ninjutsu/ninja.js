const ninjutsu_map = require('./ninjutsu_map')

// Updates player's mudra chain
function cast_mudra(player, mudra) {
	//console.log(`${player.name} casting ${mudra}`) // Remove side effect
	let count = player.mudras.length

	// Cap mudras count at 4 for memory guard
	// Cannot cap at 3 because we need the 4th to make sure the map search is invalidated
	if (count === 4) {
		return
	}
	player.mudras = player.mudras.concat(mudra.charAt(0))

}

// Returns resolved ninjutsu for unit test
function cast_ninjutsu(player) {

	// No mudras during cast
	if (player.mudras === '') {
		player.ninjutsu = undefined
	} else {
		player.ninjutsu = ninjutsu_map.get(player.mudras)

		if (!player.ninjutsu) {
			player.ninjutsu = 'Bunny'
		}
	}

	// No mudras -> undefined -> Prompt user to cast mudras
	// Invalid mudras -> undefined -> Resolves to Bunny 
	// Valid mudras -> Ninjutsu



	// Cache value of resolved ninjutsu
	const result_ninjutsu = player.ninjutsu

	// Reset Jutsu
	player.mudras = ""
	player.ninjutsu = undefined
	//console.log(`ninjutsu:${result_ninjutsu}`)

	return result_ninjutsu


}

module.exports = {
	cast_mudra,
	cast_ninjutsu
}