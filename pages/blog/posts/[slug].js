import { fetchBlogPost, fetchBlogPostsSlugs } from "../../../lib/contentful"
import BlogPost from '../../../components/BlogPost'

export const getStaticPaths = async () => {
    const blogPostsSlugs = await fetchBlogPostsSlugs()
    return {
        paths: blogPostsSlugs.map((slug) => ({ params: { slug } })),
        fallback: true
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const blogPostData = await fetchBlogPost(slug)
    return {
        props: blogPostData,
        revalidate: 10
    }
}

export default function BlogPostPage(blogPostData) {

    return (
        <>
            <BlogPost blogPostData={blogPostData} />
        </>
    )
}