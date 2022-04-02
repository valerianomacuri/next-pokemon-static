import { FC, Fragment, useEffect } from "react"
import Head from "next/head"

import { NavBar } from "../ui"
import { useRouter } from "next/router"

interface LayoutProps {
	title?: string
}

const origin = typeof window === "undefined" ? "" : window.location.origin

export const Layout: FC<LayoutProps> = ({ children, title }) => {
	return (
		<Fragment>
			<Head>
				<title>{title || "Pokemon App"}</title>
				<meta name="author" content="Fernando Herrera" />
				<meta
					name="description"
					content={`Información sobre el pokémon ${title}`}
				/>
				<meta name="keywords" content={`${title}, pokemon, pokedex`} />
				<meta
					property="og:title"
					content={`Información sobre ${title}`}
				/>
				<meta
					property="og:description"
					content={`Esta es la página sobre ${title}`}
				/>
				<meta
					property="og:image"
					content={`${origin}/img/banner.png`}
				/>
			</Head>
			<NavBar />
			<main
				style={{
					padding: "0px 20px",
				}}
			>
				{children}
			</main>
		</Fragment>
	)
}
