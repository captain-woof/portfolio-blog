import { createClient } from 'contentful'

export const getContenfulClient = () => {
    const contentfulClient = createClient({
        accessToken: process.env.CONTENTFUL_CONTENT_DELIVERY_API_KEY,
        space: process.env.CONTENTFUL_SPACE_ID
    })

    return contentfulClient
}