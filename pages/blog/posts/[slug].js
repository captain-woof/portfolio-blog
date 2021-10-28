import { fetchBlogPost, fetchBlogPostsSlugs, fetchPostsSummary } from "../../../lib/contentful"
import BlogPost from '../../../components/BlogPost'
import SeoBlogPost from '../../../components/SEO/SeoBlogPost'
import { useGlobalContext } from "../../../providers/ContextProvider"
import { useEffect } from "react"
import { findHeadings } from "../../../utils/wordfu"
import { useRouter } from 'next/router'
import Fallback from "../../../components/BlogPost/fallback"
import SitelinksSearchbox from "../../../components/SEO/SitelinksSearchbox"

export const getStaticPaths = async () => {
    const blogPostsSlugs = await fetchBlogPostsSlugs()
    return {
        paths: blogPostsSlugs.map((slug) => ({ params: { slug } })),
        fallback: true
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const blogPostData = await fetchBlogPost(slug)

    // Check for 404
    if (!blogPostData.tags) {
        return {
            notFound: true
        }
    }
    const suggestedPosts = await fetchPostsSummary({ pageNo: 0, tagSlug: blogPostData.tags[0].slug, maxPostsPerPage: 4, skipSlug: slug })
    return {
        props: { blogPostData, suggestedPosts },
        revalidate: 10
    }
}

export default function BlogPostPage({ blogPostData, suggestedPosts }) {
    // Fallback
    const router = useRouter()
    if (router.isFallback) {
        return <Fallback />
    }

    const { title, description, heroImage, keywords, slug, postRichText, updatedOn, postedOn } = blogPostData

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
            <SitelinksSearchbox path={`/blog/posts/${slug}`} />
            <SeoBlogPost title={title} description={description} image={heroImage.src} imageAlt={heroImage.alt} keywords={keywords.join(', ')} slug={slug} updatedOn={updatedOn} postedOn={postedOn}/>
            <BlogPost blogPostData={blogPostData} suggestedPosts={suggestedPosts} />
        </>
    )
}