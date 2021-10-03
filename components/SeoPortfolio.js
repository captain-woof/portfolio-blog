import Head from 'next/head'
import MyCard from '../public/images/my-card.png'

export default function SeoPortfolio() {
    <Head>
        <title>Sohail Saha&apos;s Portfolio</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Sohail Saha's Portfolio" />
        <meta name="description" content="Hi. I am Sohail Saha, a frontend developer. I work with React.js. This is my portfolio. Looking to hire a frontend developer? Contact me." />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sohail Saha's Portfolio" />
        <meta property="og:description" content="Hi. I am Sohail Saha, a frontend developer. I work with React.js. This is my portfolio. Looking to hire a frontend developer? Contact me." />
        <meta property="og:image" content={MyCard} />
        <meta property="og:url" content="https://sohail-saha.in" />
        <meta property="og:site_name" content="Sohail Saha's Portfolio & Blog" />
        <meta name="twitter:title" content="Sohail Saha's Portfolio" />
        <meta name="twitter:description" content="Hi. I am Sohail Saha, a frontend developer. I work with React.js. This is my portfolio. Looking to hire a frontend developer? Contact me." />
        <meta name="twitter:image" content={MyCard} />
        <meta name="twitter:image:alt" content="Sohail Saha - sohail.saha.666@gmail.com" />
        <meta name="twitter:site" content="@realCaptainWoof" />
        <meta name="twitter:creator" content="@realCaptainWoof" />
    </Head>
}