import { createClient } from 'contentful'

// Constants
const POSTS_PER_PAGE = 3

// Returns client for using with Content Delivery API
export const getContenfulClient = (options) => {
    const contentfulClient = createClient({
        accessToken: process.env.CONTENTFUL_CONTENT_DELIVERY_API_KEY,
        space: process.env.CONTENTFUL_SPACE_ID,
        ...options
    })

    return contentfulClient
}

// Fetches blog posts summary from Contentful, parses them.
export const fetchPostsSummary = async ({ pageNo, tagSlug, maxPostsPerPage = POSTS_PER_PAGE, skipSlug }) => {
    const contentfulClient = getContenfulClient()

    // Query statement
    const query = {
        limit: maxPostsPerPage,
        skip: pageNo * maxPostsPerPage,
        content_type: 'blogPost',
        order: ['-sys.updatedAt', '-sys.createdAt'],
        select: ['sys.updatedAt', 'fields.title', 'fields.slug', 'fields.tags', 'fields.description', 'fields.postedOn', 'fields.heroImage', 'fields.heroImageBlur'],
        include: 10
    }

    // If skipSlug exists, add it to query
    if (skipSlug) {
        query['fields.slug[ne]'] = skipSlug
    }

    // If tag exists in search param, add to query
    if (tagSlug) {
        let tag = await contentfulClient.getEntries({
            content_type: 'blogPostTag',
            select: ['sys.id'],
            'fields.slug': tagSlug
        })
        if (tag.total === 1) {
            query['fields.tags.sys.id'] = tag.items[0].sys.id
        } else {
            res.status(200).json({ total: 0, blogPosts: [] })
            return
        }
    }

    try {
        // Fetch from Contentful
        const blogPostsContentful = await contentfulClient.getEntries(query)

        // Parse data
        const blogPostsData = {
            total: blogPostsContentful.total,
            blogPosts: blogPostsContentful.items.map((blogPostData) => {
                const { title, slug, tags, description, postedOn, heroImage, heroImageBlur } = blogPostData.fields
                const { updatedAt: updatedOn } = blogPostData.sys

                return {
                    title,
                    slug,
                    tags: tags.map((tagData) => ({ name: tagData.fields.name, slug: tagData.fields.slug, color: tagData.fields.color.fields.hexCode })),
                    description,
                    postedOn,
                    updatedOn,
                    heroImage: {
                        alt: heroImage.fields.title,
                        src: `https:${heroImage.fields.file.url}`,
                        height: heroImage.fields.file.details.image.height,
                        width: heroImage.fields.file.details.image.width
                    },
                    heroImageBlur: {
                        alt: heroImageBlur.fields.title,
                        src: `https:${heroImageBlur.fields.file.url}`,
                        height: heroImageBlur.fields.file.details.image.height,
                        width: heroImageBlur.fields.file.details.image.width
                    }
                }
            })
        }

        //Return the parsed data
        return blogPostsData

    } catch (e) {
        return e.message
    }
}

// Fetches blog posts slugs from Contentful.
export const fetchBlogPostsSlugs = async () => {
    const contentfulClient = getContenfulClient()

    // Query statement
    const query = {
        content_type: 'blogPost',
        select: ['fields.slug']
    }

    try {
        // Fetch from Contentful
        const blogPostsContentful = await contentfulClient.getEntries(query)

        // Parse data
        const slugs = blogPostsContentful.items.map((slugData) => slugData.fields.slug)

        //Return the parsed data
        return slugs

    } catch (e) {
        return e.message
    }
}

// Fetches blog posts data from Contentful, parses them.
export const fetchBlogPost = async (slug) => {
    const contentfulClient = getContenfulClient()

    // Query statement
    const query = {
        content_type: 'blogPost',
        select: ['sys.updatedAt', 'fields.title', 'fields.slug', 'fields.tags', 'fields.keywords', 'fields.description', 'fields.postedOn', 'fields.heroImage', 'fields.heroImageBlur', 'fields.postRichText'],
        'fields.slug': slug,
        include: 10
    }

    try {
        // Fetch from Contentful
        const blogPostsContentful = await contentfulClient.getEntries(query)

        // Parse data
        const blogPost = blogPostsContentful.items[0]
        const { title, slug, tags, description, postedOn, heroImage, heroImageBlur, postRichText, keywords } = blogPost.fields
        const { updatedAt: updatedOn } = blogPost.sys

        //Return the parsed data
        return {
            title,
            slug,
            tags: tags.map((tagData) => ({ name: tagData.fields.name, slug: tagData.fields.slug, color: tagData.fields.color.fields.hexCode })),
            keywords,
            description,
            postedOn,
            updatedOn,
            heroImage: {
                alt: heroImage.fields.title,
                src: `https:${heroImage.fields.file.url}`,
                height: heroImage.fields.file.details.image.height,
                width: heroImage.fields.file.details.image.width
            },
            heroImageBlur: {
                alt: heroImageBlur.fields.title,
                src: `https:${heroImageBlur.fields.file.url}`,
                height: heroImageBlur.fields.file.details.image.height,
                width: heroImageBlur.fields.file.details.image.width
            },
            postRichText
        }

    } catch (e) {
        return e.message
    }
}

// Fetches all tags
export const fetchAllTags = async () => {
    try {
        const contentfulClient = getContenfulClient()
        let tagsDataContentful = await contentfulClient.getEntries({
            content_type: 'blogPostTag'
        })
        let tagsData = tagsDataContentful.items.map((tagData) => {
            let { name, slug, color } = tagData.fields
            return ({
                name,
                slug,
                color: color.fields.hexCode
            })
        })

        return tagsData
    } catch (e) {
        return e.message
    }
}

// Fetches all featured blog posts summary from Contentful, parses them.
export const fetchFeaturedPosts = async () => {
    const contentfulClient = getContenfulClient()

    // Query statement
    const query = {
        content_type: 'featuredBlogPost',
        order: ['-sys.updatedAt', '-sys.createdAt'],
        select: ['fields.blogPost'],
        include: 10
    }

    try {
        // Fetch from Contentful
        const featuredBlogPostsContentful = await contentfulClient.getEntries(query)
        const featuredBlogPostsData = featuredBlogPostsContentful.items.map((featuredBlogPostData) => (
            featuredBlogPostData.fields.blogPost
        ))

        // Parse data
        const featuredBlogPosts = featuredBlogPostsData.map((featuredBlogPost) => {
            const { updatedAt: updatedOn } = featuredBlogPost.sys
            const { title, slug, description, tags, postedOn } = featuredBlogPost.fields
            return {
                title,
                slug,
                tags: tags.map((tagData) => ({ name: tagData.fields.name, slug: tagData.fields.slug, color: tagData.fields.color.fields.hexCode })),
                description,
                postedOn,
                updatedOn
            }
        })

        //Return the parsed data
        return featuredBlogPosts

    } catch (e) {
        return e.message
    }
}