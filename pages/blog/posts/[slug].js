import { fetchBlogPost, fetchBlogPostsSlugs, fetchPostsSummary } from "../../../lib/contentful"
import BlogPost from '../../../components/BlogPost'
import SeoBlogPost from '../../../components/SEO/SeoBlogPost'
import { useGlobalContext } from "../../../providers/ContextProvider"
import { useEffect } from "react"
import { findHeadings } from "../../../utils/wordfu"
import { useRouter } from 'next/router'
import Fallback from "../../../components/BlogPost/fallback"

export const getStaticPaths = async () => {
    const blogPostsSlugs = await fetchBlogPostsSlugs()
    return {
        paths: blogPostsSlugs.map((slug) => ({ params: { slug } })),
        fallback: true
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const blogPostData = await fetchBlogPost(slug)
    const suggestedPosts = await fetchPostsSummary({ pageNo: 0, tagSlug: blogPostData.tags[0].slug, maxPostsPerPage: 4, skipSlug: slug })
    return {
        props: { blogPostData, suggestedPosts },
        revalidate: 10
    }
}

export default function BlogPostPage({ blogPostData, suggestedPosts }) {
    const { title, description, heroImage, keywords, slug, postRichText } = blogPostData

    // Fallback
    const router = useRouter()
    if (router.isFallback) {
        return <Fallback />
    }

    // Setting page markers
    const { globalDispatch, globalState: { origin } } = useGlobalContext()
    useEffect(() => {
        (async () => {
            let headingsData = await findHeadings(postRichText.content)
            globalDispatch({
                type: "SET_MARKERS", payload: {
                    markers: headingsData.map((headingData) => ({
                        name: headingData.text,
                        link: `#${headingData.slug}`
                    }))
                }
            })
        })()
    }, [])

    // Setting share data
    useEffect(() => {
        globalDispatch({
            type: "SET_SHARE", payload: {
                share: {
                    title: title,
                    description: description,
                    url: `${origin}/blog/posts/${slug}`,
                    image: heroImage.src
                }
            }
        })
    }, [])

    return (
        <>
            <SeoBlogPost title={title} description={description} image={heroImage.src} imageAlt={heroImage.alt} keywords={keywords.join(', ')} slug={slug} />
            <BlogPost blogPostData={blogPostData} suggestedPosts={suggestedPosts} />
        </>
    )
}