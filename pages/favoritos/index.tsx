import { Card, Container, Grid, Image, Text } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { Layout } from "../../components/layout"
import { FavoritePokemons } from "../../components/pokemon"
import { NoFavorites } from "../../components/ui"
import localFavorites from "../../utils/localFavorites"

const FavoritesPage = () => {
	const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

	useEffect(() => {
		setFavoritePokemons(localFavorites.getFavoritePokemons())
	}, [])
	return (
		<Layout title="Pokémons - Favoritos">
			{favoritePokemons.length === 0 ? (
				<NoFavorites />
			) : (
				<FavoritePokemons pokemons={favoritePokemons} />
			)}
		</Layout>
	)
}

export default FavoritesPage
