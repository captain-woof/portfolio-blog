import Script from 'next/script'

export default function SitelinksSearchbox() {
    return (
        <Script type="application/ld+json" id="sitelinks-searchbox" dangerouslySetInnerHTML={{
            __html: `
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "url": '${process.env.NEXT_PUBLIC_VERCEL_URL}/',
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": '${process.env.NEXT_PUBLIC_VERCEL_URL}/blog/search?q={search_term_string}'
                    },
                    "query-input": "required name=search_term_string"
                }
            }
            `
        }} />
    )
}