const getFavoritePokemons = () => {
	const favorites: number[] = JSON.parse(
		localStorage.getItem("favorites") || "[]",
	)
	return favorites
}

const toggleFavorites = (id: number) => {
	console.log("toogleFavorite Llamado")

	let favorites: number[] = getFavoritePokemons()

	if (favorites.includes(id)) {
		favorites = favorites.filter(pokeId => pokeId !== id)
	} else {
		favorites.push(id)
	}
	localStorage.setItem("favorites", JSON.stringify(favorites))
}

const existInFavorites = (id: number): boolean => {
	if (typeof window === "undefined") return false
	const favorites: number[] = getFavoritePokemons()
	return favorites.includes(id)
}

export default { toggleFavorites, existInFavorites, getFavoritePokemons }
