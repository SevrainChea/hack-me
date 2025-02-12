class Desk {
	id: string

	x: number

	y: number

	constructor(x: number, y: number) {
		if (x < 0 || y < 0 || x > 7 || y > 7) {
			throw new Error('Invalide coordinates for desk position')
		}

		this.id = String(Date.now())
		this.x = x
		this.y = y
	}
}

export default Desk
