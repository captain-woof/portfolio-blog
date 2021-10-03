import Head from 'next/head'
import BlogImage from '../public/images/blog-image.png'

export default function SeoBlog() {
    <Head>
        <title>Sohail Saha&apos;s Blog</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Sohail Saha's Blog" />
        <meta name="description" content="Sohail Saha's blog. Read articles on Web development, technologies, do's and don'ts, advices, and so on." />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="blog" />
        <meta property="og:title" content="Sohail Saha's Blog" />
        <meta property="og:description" content="Sohail Saha's blog. Read articles on Web development, technologies, do's and don'ts, advices, and so on." />
        <meta property="og:image" content={BlogImage} />
        <meta property="og:url" content="https://sohail-saha.in/blog" />
        <meta property="og:site_name" content="Sohail Saha's Portfolio & Blog" />
        <meta name="twitter:title" content="Sohail Saha's Blog" />
        <meta name="twitter:description" content="Sohail Saha's blog. Read articles on Web development, technologies, do's and don'ts, advices, and so on." />
        <meta name="twitter:image" content={BlogImage} />
        <meta name="twitter:image:alt" content="Sohail Saha - sohail.saha.666@gmail.com" />
        <meta name="twitter:site" content="@realCaptainWoof" />
        <meta name="twitter:creator" content="@realCaptainWoof" />
    </Head>
}