import { useEffect } from 'react'
import MinFullscreenContainer from '../..//components/Containers/MinFullscreenContainer'
import HomepagePosts from '../../components/Containers/Blog/homepagePosts'
import { fetchAllTags, fetchFeaturedPosts, fetchPostsSummary } from '../../lib/contentful'
import { useGlobalContext } from '../../providers/ContextProvider'
import SeoBlog from '../../components/SEO/SeoBlog'
import { TwoColumns, FirstColumn, SecondColumn } from '../../components/Containers/Blog/twoColumns'
import MarginWrapper from '../../components/Containers/MarginWrapper'
import HomepageRightColumn from '../../components/Containers/Blog/homepageRightColumn'
import FeaturedPosts from '../../components/Containers/Blog/featuredPosts'
import { SlideshowProvider } from '../../components/Containers/Blog/featuredPosts/context'

export const getStaticProps = async () => {
    const firstPostsSummaryPromise = fetchPostsSummary(0)
    const tagsPromise = fetchAllTags()
    const featuredPostsPromise = fetchFeaturedPosts()
    const [firstPostsSummary, tags, featuredPosts] = await Promise.all([firstPostsSummaryPromise, tagsPromise, featuredPostsPromise])

    return {
        props: {
            firstPostsSummary,
            tags,
            featuredPosts
        },
        revalidate: 60, // 1 minute
    }
}

export default function Index({ firstPostsSummary, tags, featuredPosts }) {
    // Setting page markers
    const { globalDispatch } = useGlobalContext()
    useEffect(() => {
        globalDispatch({
            type: "SET_MARKERS", payload: {
                markers: [
                    { name: "Featured Posts", link: "#featured-posts" },
                    { name: "Categories", link: "#categories" },
                    { name: "Latest Posts", link: "#latest-posts" }
                ]
            }
        })
    }, [])

    return (
        <MinFullscreenContainer>
            <SeoBlog />
            <SlideshowProvider featuredPosts={featuredPosts}>
                <FeaturedPosts />
            </SlideshowProvider>
            <MarginWrapper>
                <TwoColumns>
                    <FirstColumn>
                        <HomepagePosts firstPostsSummary={firstPostsSummary} tags={tags} />
                    </FirstColumn>
                    <SecondColumn>
                        <HomepageRightColumn tags={tags} />
                    </SecondColumn>
                </TwoColumns>
            </MarginWrapper>
        </MinFullscreenContainer>
    )
}