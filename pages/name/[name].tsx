import { useEffect, useState } from "react"

import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react"

import confetti from "canvas-confetti"

import { pokeApi } from "../../api"
import { Layout } from "../../components/layout"
import { Pokemon } from "../../interfaces"
import { getPokemonInfo, localFavorites } from "../../utils"
import { PokemonListResponse } from "../../interfaces"

interface Props {
	pokemon: Pokemon
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
	console.log(pokemon)
	const [isInFavorites, setIsInFavorites] = useState<boolean>()
	const onToggleFavorite = () => {
		localFavorites.toggleFavorites(pokemon.id)
		setIsInFavorites(!isInFavorites)

		if (!isInFavorites) return

		confetti({
			zIndex: 999,
			particleCount: 100,
			spread: 160,
			angle: -100,
			origin: {
				x: 1,
				y: 0,
			},
		})
	}
	useEffect(() => {
		setIsInFavorites(localFavorites.existInFavorites(pokemon.id))
	}, [])
	return (
		<Layout title={pokemon.name}>
			<Grid.Container
				css={{
					marginTop: "5px",
				}}
				gap={2}
			>
				<Grid xs={12} sm={4}>
					<Card hoverable css={{ padding: "30px" }}>
						<Card.Body>
							<Card.Image
								src={
									pokemon.sprites.other?.dream_world
										.front_default || "/no-image.png"
								}
								alt={pokemon.name}
								width="100%"
								height={200}
							/>
						</Card.Body>
					</Card>
				</Grid>
				<Grid xs={12} sm={8}>
					<Card>
						<Card.Header
							css={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Text h1>{pokemon.name}</Text>
							<Button
								onClick={onToggleFavorite}
								color={"gradient"}
								ghost
							>
								{isInFavorites
									? "En Favoritos"
									: "Guadar en favoritos"}
							</Button>
						</Card.Header>
						<Card.Body>
							<Text size={30}>Sprites:</Text>
							<Container direction="row" display="flex" gap={0}>
								<Image
									src={pokemon.sprites.front_default}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.back_default}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.front_shiny}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.back_shiny}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
							</Container>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async ctx => {
	const { data } = await pokeApi.get<PokemonListResponse>(
		`/pokemon?limit=151`,
	)

	const pokemonNames: string[] = data.results.map(pokemon => pokemon.name)

	return {
		paths: pokemonNames.map(name => ({
			params: { name },
		})),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { name } = params as { name: string }
	const pokemon = await getPokemonInfo(name)
	return {
		props: {
			pokemon,
		},
	}
}

export default PokemonByNamePage
