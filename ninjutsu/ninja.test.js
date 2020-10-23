const Player = require('./player.js')
const { cast_mudra, cast_ninjutsu } = require('./ninja')

test('No mudras: undefined (not Bunny)', () => {
	const player = new Player('Vale')
	expect(cast_ninjutsu(player)).toBe(undefined)
})

// Fuma Shuriken
test('Fuma Shuriken: Ten or Chi or Jin', () => {
	const player = new Player('Vale')
	cast_mudra(player, 'Ten')
	expect(player.mudras).toBe('T')
	expect(cast_ninjutsu(player)).toBe('Fuma Shuriken')
	cast_mudra(player, 'Chi')
	expect(player.mudras).toBe('C')
	expect(cast_ninjutsu(player)).toBe('Fuma Shuriken')
	cast_mudra(player, 'Jin')
	expect(player.mudras).toBe('J')
	expect(cast_ninjutsu(player)).toBe('Fuma Shuriken')
})


// Raiton
test('Raiton: Ten -> Chi or Jin -> Chi', () => {

	const player = new Player('Vale')

	cast_mudra(player, 'Ten')
	cast_mudra(player, 'Chi')
	expect(player.mudras).toBe('TC')
	expect(cast_ninjutsu(player)).toBe('Raiton')

	cast_mudra(player, 'Jin')
	cast_mudra(player, 'Chi')
	expect(player.mudras).toBe('JC')
	expect(cast_ninjutsu(player)).toBe('Raiton')
})

// Hyoton
test('Hyoton: Ten -> Jin or Chi -> Jin', () => {

	const player = new Player('Vale')

	cast_mudra(player, 'Ten')
	cast_mudra(player, 'Jin')
	expect(player.mudras).toBe('TJ')
	expect(cast_ninjutsu(player)).toBe('Hyoton')

	cast_mudra(player, 'Chi')
	cast_mudra(player, 'Jin')
	expect(player.mudras).toBe('CJ')
	expect(cast_ninjutsu(player)).toBe('Hyoton')
})

// Katon
test('Katon: Chi -> Ten or Jin -> Ten', () => {

	const player = new Player('Vale')

	cast_mudra(player, 'Chi')
	cast_mudra(player, 'Ten')
	expect(player.mudras).toBe('CT')
	expect(cast_ninjutsu(player)).toBe('Katon')

	cast_mudra(player, 'Jin')
	cast_mudra(player, 'Ten')
	expect(player.mudras).toBe('JT')
	expect(cast_ninjutsu(player)).toBe('Katon')
})

// Suiton
test('Suiton: Ten -> Chi -> Jin or Chi -> Ten -> Jin', () => {
	const player = new Player('Vale')
	cast_mudra(player, 'Ten')
	cast_mudra(player, 'Chi')
	cast_mudra(player, 'Jin')
	expect(player.mudras).toBe('TCJ')
	expect(cast_ninjutsu(player)).toBe('Suiton')
	cast_mudra(player, 'Chi')
	cast_mudra(player, 'Ten')
	cast_mudra(player, 'Jin')
	expect(player.mudras).toBe('CTJ')
	expect(cast_ninjutsu(player)).toBe('Suiton')
})

// Doton
test('Doton: Ten -> Jin -> Chi or Jin -> Ten -> Chi', () => {
	const player = new Player('Vale')
	cast_mudra(player, 'Ten')
	cast_mudra(player, 'Jin')
	cast_mudra(player, 'Chi')
	expect(player.mudras).toBe('TJC')
	expect(cast_ninjutsu(player)).toBe('Doton')
	cast_mudra(player, 'Jin')
	cast_mudra(player, 'Ten')
	cast_mudra(player, 'Chi')
	expect(player.mudras).toBe('JTC')
	expect(cast_ninjutsu(player)).toBe('Doton')
})

//  Huton
test('Huton: Chi -> Jin -> Ten or Jin -> Chi -> Ten', () => {
	const player = new Player('Vale')
	cast_mudra(player, 'Chi')
	cast_mudra(player, 'Jin')
	cast_mudra(player, 'Ten')
	expect(player.mudras).toBe('CJT')
	expect(cast_ninjutsu(player)).toBe('Huton')
	cast_mudra(player, 'Jin')
	cast_mudra(player, 'Chi')
	cast_mudra(player, 'Ten')
	expect(player.mudras).toBe('JCT')
	expect(cast_ninjutsu(player)).toBe('Huton')
})

test('Mudras = 2: Invalid combination', () => {
	const player = new Player('Vale')
	cast_mudra(player, 'Chi')
	cast_mudra(player, 'Chi')
	expect(player.mudras).toBe('CC')
	expect(cast_ninjutsu(player)).toBe('Bunny')
})

test('Mudras = 3: Invalid combination: ', () => {
	const player = new Player('Vale')
	cast_mudra(player, 'Chi')
	cast_mudra(player, 'Jin')
	cast_mudra(player, 'Jin')
	expect(player.mudras).toBe('CJJ')
	expect(cast_ninjutsu(player)).toBe('Bunny')
})


test('Mudras > 3: Always results in Bunny. 5th not stored since 4th always invalidates the chain', () => {
	const player = new Player('Vale')
	cast_mudra(player, 'Chi')
	cast_mudra(player, 'Jin')
	cast_mudra(player, 'Ten')
	cast_mudra(player, 'Chi')
	expect(player.mudras).toBe('CJTC')
	expect(cast_ninjutsu(player)).toBe('Bunny')

	cast_mudra(player, 'Chi')
	cast_mudra(player, 'Jin')
	cast_mudra(player, 'Jin')
	cast_mudra(player, 'Chi')
	expect(player.mudras).toBe('CJJC')
	expect(cast_ninjutsu(player)).toBe('Bunny')

	cast_mudra(player, 'Chi')
	cast_mudra(player, 'Jin')
	cast_mudra(player, 'Jin')
	cast_mudra(player, 'Chi')
	cast_mudra(player, 'Ten') // Ignored
	expect(player.mudras).toBe('CJJC')
	expect(cast_ninjutsu(player)).toBe('Bunny')
})





