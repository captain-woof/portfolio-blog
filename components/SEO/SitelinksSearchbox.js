import Script from 'next/script'

export default function SitelinksSearchbox({ path = '/' }) {
    return (
        <Script type="application/ld+json" id="sitelinks-searchbox" dangerouslySetInnerHTML={{
            __html: `
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "url": "${process.env.NEXT_PUBLIC_APP_ORIGIN}${path}",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "${process.env.NEXT_PUBLIC_APP_ORIGIN}/blog/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                }
            }
            `
        }} />
    )
}