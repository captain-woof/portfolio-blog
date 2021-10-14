import Head from 'next/head'
import { useTheme } from 'styled-components'
import { useGlobalContext } from '../../providers/ContextProvider'

export default function SeoBlogPost({ image, title, description, imageAlt, keywords, slug }) {
    const theme = useTheme()
    const { globalState: { origin } } = useGlobalContext()

    return (
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Sohail Saha (captain-woof)" />
            <meta name="robots" content="index, follow" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={`${origin}/blog/posts/${slug}`} />
            <meta property="og:site_name" content="Sohail Saha's Portfolio & Blog" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content={imageAlt} />
            <meta name="twitter:site" content="@realCaptainWoof" />
            <meta name="twitter:creator" content="@realCaptainWoof" />
            <meta name="theme-color" content={theme.backgroundColor} />
        </Head>
    )
}