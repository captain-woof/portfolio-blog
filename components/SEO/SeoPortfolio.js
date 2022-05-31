import Head from 'next/head'
import Script from 'next/script'
import { useTheme } from 'styled-components'
import { useGlobalContext } from '../../providers/ContextProvider'

export default function SeoPortfolio() {
    const theme = useTheme()
    const { globalState: { origin } } = useGlobalContext()
    return (
        <>
            <Head>
                <title>Sohail Saha&apos;s Portfolio</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content="Sohail Saha's Portfolio" />
                <meta name="description" content="I am Sohail, a Web3 developer. I work on the frontend and on the blockchain." />
                <meta name="keywords" content="Sohail Saha, captain woof, web developer, web developer freelancer, reactjs developer, frontend developer, developer portfolio" />
                <meta name="author" content="Sohail Saha (captain-woof)" />
                <meta name="robots" content="index, follow" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Sohail Saha's Portfolio" />
                <meta property="og:description" content="I am Sohail, a Web3 developer. I work on the frontend and on the blockchain." />
                <meta property="og:image" content="https://drive.google.com/uc?export=download&id=1uFQgCX6HP7ftV0BR8cgJUIm3xZFSI2pe" />
                <meta property="og:url" content={origin} />
                <meta property="og:site_name" content="Sohail Saha's Portfolio & Blog" />
                <meta name="twitter:title" content="Sohail Saha's Portfolio" />
                <meta name="twitter:description" content="I am Sohail, a Web3 developer. I work on the frontend and on the blockchain." />
                <meta name="twitter:image" content={`${origin}/images/my-card.png`} />
                <meta name="twitter:image:alt" content="Sohail Saha - sohail.saha.666@gmail.com" />
                <meta name="twitter:site" content="@realCaptainWoof" />
                <meta name="twitter:creator" content="@realCaptainWoof" />
                <meta name="theme-color" content={theme.backgroundColor} />
            </Head>
            <Script id='structured-data-seo' type="application/ld+json" dangerouslySetInnerHTML={{
                __html: `
                    {
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Sohail Saha",
                        "alternateName": "Captain Woof",
                        "nationality": "Indian",
                        "jobTitle": "Frontend Developer",
                        "description": "I am Sohail, a Web3 developer. I work on the frontend and on the blockchain.",
                        "email": "sohail.saha.666@gmail.com",
                        "image": "https://drive.google.com/uc?export=download&id=1uFQgCX6HP7ftV0BR8cgJUIm3xZFSI2pe",
                        "birthDate": "1999-10-05",
                        "gender": "male",                        
                        "url": "${origin}/",
                        "sameAs" : [ 
                            "https://www.linkedin.com/in/sohail-saha/",
                            "https://github.com/captain-woof",
                            "https://www.instagram.com/sohail_saha_/",
                            "https://twitter.com/realCaptainWoof",
                            "https://www.youtube.com/channel/UC5ielVkZiGlyqYoWaDVI3eg"
                        ]
                      }
                `
            }} />
        </>
    )
}