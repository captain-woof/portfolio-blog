import Head from 'next/head'

export default function SeoBlogPost({image, title, description, slug, label, imageAlt}) {
    <Head>
        <title>{title}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={`https://sohail-saha.in/blog/${label}/${slug}`} />
        <meta property="og:site_name" content="Sohail Saha's Portfolio & Blog" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={BlogImage} />
        <meta name="twitter:image:alt" content={imageAlt} />
        <meta name="twitter:site" content="@realCaptainWoof" />
        <meta name="twitter:creator" content="@realCaptainWoof" />
    </Head>
}