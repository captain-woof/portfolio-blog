import Head from 'next/head'
import { useGlobalContext } from '../../providers/ContextProvider'
import { useTheme } from 'styled-components'

export default function SeoBlog() {
    const { globalState } = useGlobalContext()
    const theme = useTheme()

    return (
        <Head>
            <title>Sohail Saha&apos;s Blog</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="title" content="Sohail Saha's Blog" />
            <meta name="description" content="Sohail Saha's blog. Read articles on Web development, technologies, do's and don'ts, advices, and so on." />
            <meta name="robots" content="index, follow" />
            <meta property="og:type" content="blog" />
            <meta property="og:title" content="Sohail Saha's Blog" />
            <meta property="og:description" content="Sohail Saha's blog. Read articles on Web development, technologies, do's and don'ts, advices, and so on." />
            <meta property="og:image" content={`${globalState.baseUrl}/images/blog-image.png`} />
            <meta property="og:url" content="https://sohail-saha.in/blog" />
            <meta property="og:site_name" content="Sohail Saha's Portfolio & Blog" />
            <meta name="twitter:title" content="Sohail Saha's Blog" />
            <meta name="twitter:description" content="Sohail Saha's blog. Read articles on Web development, technologies, do's and don'ts, advices, and so on." />
            <meta name="twitter:image" content={`${globalState.baseUrl}/images/blog-image.png`} />
            <meta name="twitter:image:alt" content="Sohail Saha - sohail.saha.666@gmail.com" />
            <meta name="twitter:site" content="@realCaptainWoof" />
            <meta name="twitter:creator" content="@realCaptainWoof" />
            <meta name="theme-color" content={theme.backgroundColor} />
        </Head>
    )
}