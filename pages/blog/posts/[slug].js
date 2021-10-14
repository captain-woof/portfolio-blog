import { fetchBlogPost, fetchBlogPostsSlugs } from "../../../lib/contentful"
import BlogPost from '../../../components/BlogPost'
import SeoBlogPost from '../../../components/SEO/SeoBlogPost'

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
    const { title, description, heroImage, keywords, slug } = blogPostData
    return (
        <>
            <SeoBlogPost title={title} description={description} image={heroImage.src} imageAlt={heroImage.alt} keywords={keywords.join(', ')} slug={slug} />
            <BlogPost blogPostData={blogPostData} />
        </>
    )
}