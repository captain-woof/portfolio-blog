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
    const suggestedPosts = await fetchPostsSummary(0, blogPostData.tags[0].slug, 4, slug)
    return {
        props: {blogPostData, suggestedPosts},
        revalidate: 10
    }
}

export default function BlogPostPage({blogPostData, suggestedPosts}) {
    const { title, description, heroImage, keywords, slug, postRichText } = blogPostData

    // Fallback
    const router = useRouter()
    if (router.isFallback) {
        return <Fallback />
    }

    // Setting page markers
    const { globalDispatch } = useGlobalContext()
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
    return (
        <>
            <SeoBlogPost title={title} description={description} image={heroImage.src} imageAlt={heroImage.alt} keywords={keywords.join(', ')} slug={slug} />
            <BlogPost blogPostData={blogPostData} suggestedPosts={suggestedPosts}/>
        </>
    )
}