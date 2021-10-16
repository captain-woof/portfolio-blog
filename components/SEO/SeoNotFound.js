import Head from 'next/head'
import { useTheme } from 'styled-components'
import { useGlobalContext } from '../../providers/ContextProvider'

export default function SeoNotFound() {
    const theme = useTheme()
    const { globalState: { origin } } = useGlobalContext()
    return (
        <Head>
            <title>Not found (404)</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="title" content="Not found!" />
            <meta name="description" content="The page you are looking for does not exist. Redirecting..." />
            <meta name="keywords" content="Sohail Saha, captain woof, captainwoof, captain_woof, reactjs, reactjs developer, frontend developer, developer portfolio" />
            <meta name="author" content="Sohail Saha (captain-woof)" />
            <meta name="robots" content="index, follow" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Not found!" />
            <meta property="og:description" content="The page you are looking for does not exist. Redirecting..." />
            <meta property="og:url" content={origin} />
            <meta property="og:site_name" content="Not found!" />
            <meta name="twitter:title" content="Not found!" />
            <meta name="twitter:description" content="The page you are looking for does not exist. Redirecting..." />
            <meta name="twitter:site" content="@realCaptainWoof" />
            <meta name="twitter:creator" content="@realCaptainWoof" />
            <meta name="theme-color" content={theme.backgroundColor} />
        </Head>
    )
}