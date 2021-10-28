import Head from 'next/head'
import { useTheme } from 'styled-components'
import { useGlobalContext } from '../../providers/ContextProvider'
import Script from 'next/script'

export default function SeoBlog() {
    const theme = useTheme()
    const { globalState: { origin } } = useGlobalContext()

    return (
        <>
            <Head>
                <title>Sohail Saha&apos;s Blog</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="title" content="Sohail Saha's Blog" />
                <meta name="description" content="Sohail Saha's blog. Read articles on Web development, technologies, do's and don'ts, advices, and so on." />
                <meta name="keywords" content="blog, tech blog, frontend developer, frontend blog, reactjs, html, css, nextjs, styled-components, sohail saha, captain-woof" />
                <meta name="author" content="Sohail Saha (captain-woof)" />
                <meta name="robots" content="index, follow" />
                <meta property="og:type" content="blog" />
                <meta property="og:title" content="Sohail Saha's Blog" />
                <meta property="og:description" content="Sohail Saha's blog. Read articles on Web development, technologies, do's and don'ts, advices, and so on." />
                <meta property="og:image" content={`${origin}/images/blog-image.png`} />
                <meta property="og:url" content={`${origin}/blog`} />
                <meta property="og:site_name" content="Sohail Saha's Portfolio & Blog" />
                <meta name="twitter:title" content="Sohail Saha's Blog" />
                <meta name="twitter:description" content="Sohail Saha's blog. Read articles on Web development, technologies, do's and don'ts, advices, and so on." />
                <meta name="twitter:image" content={`${origin}/images/blog-image.png`} />
                <meta name="twitter:image:alt" content="Sohail Saha - sohail.saha.666@gmail.com" />
                <meta name="twitter:site" content="@realCaptainWoof" />
                <meta name="twitter:creator" content="@realCaptainWoof" />
                <meta name="theme-color" content={theme.backgroundColor} />
            </Head>
            <Script id='structured-data-seo' type="application/ld+json" dangerouslySetInnerHTML={{
                __html: `
                    {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Sohail's Blog",
                        "alternateName": "Captain Woof's Blog",
                        "description": "Sohail Saha's blog. Read articles on Web development, technologies, do's and don'ts, advices, and so on.",
                        "image": "${origin}/images/blog-image.png"
                      }
                `
            }} />
        </>
    )
}