import NextLink from "next/link"
import Image from "next/image"
import { Link, Spacer, Text, useTheme } from "@nextui-org/react"

export const NavBar = () => {
	const { theme } = useTheme()
	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "start",
				padding: "0 20px",
				backgroundColor: theme?.colors.gray900.value,
			}}
		>
			<Image
				src={
					"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
				}
				alt="icono de la app"
				width={70}
				height={70}
			/>
			<NextLink href={"/"} passHref>
				<Link>
					<Text color="white" h2>
						P
					</Text>
					<Text color="white" h3>
						okémon
					</Text>
				</Link>
			</NextLink>
			<Spacer css={{ flex: 1 }} />
			<NextLink href={"/favoritos "} passHref>
				<Link>
					<Text color="white">Favoritos</Text>
				</Link>
			</NextLink>
		</div>
	)
}
