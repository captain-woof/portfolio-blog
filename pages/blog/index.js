import { useEffect } from 'react'
import MinFullscreenContainer from '../../components/Containers/MinFullscreenContainer'
import HomepagePosts from '../../components/Containers/Blog/homepagePosts'
import { fetchAllTags, fetchFeaturedPosts, fetchPostsSummary } from '../../lib/contentful'
import { useGlobalContext } from '../../providers/ContextProvider'
import SeoBlog from '../../components/SEO/SeoBlog'
import { TwoColumns, FirstColumn, SecondColumn } from '../../components/Containers/Blog/twoColumns'
import MarginWrapper from '../../components/Containers/MarginWrapper'
import RightColumn from '../../components/Containers/Blog/rightColumn'
import FeaturedPosts from '../../components/Containers/Blog/featuredPosts'
import { SlideshowProvider } from '../../components/Containers/Blog/featuredPosts/context'
import SitelinksSearchbox from '../../components/SEO/SitelinksSearchbox'

export const getStaticProps = async () => {
    const firstPostsSummaryPromise = fetchPostsSummary({pageNo: 0})
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
    const { globalDispatch, globalState: { isPhone, origin } } = useGlobalContext()
    useEffect(() => {
        globalDispatch({
            type: "SET_MARKERS", payload: {
                markers: [
                    { name: "Featured Posts", link: "#featured-posts" },
                    { name: "Categories", link: "#categories" },
                    { name: "Latest Posts", link: "#latest-posts"}
                ]
            }
        }) 
    }, [])

    // Setting share data
    useEffect(() => {
        globalDispatch({
            type: "SET_SHARE", payload: {
                share: {
                    title: `Sohail Saha's blog`,
                    description: 'Read articles on web development, good practises, developer mindset, etc.',
                    url: `${origin}/blog`,
                    image: `${origin}/images/blog-image.png`
                }
            }
        })
    }, [])

    return (
        <MinFullscreenContainer>
            <SeoBlog />
            <SitelinksSearchbox path='/blog' />
            <SlideshowProvider featuredPosts={featuredPosts}>
                <FeaturedPosts />
            </SlideshowProvider>
            <MarginWrapper style={{
                justifyContent: (isPhone ? null : 'center'),
                display: (isPhone ? null : 'flex')
            }}>
                <TwoColumns>
                    <FirstColumn>
                        <HomepagePosts firstPostsSummary={firstPostsSummary} tags={tags} />
                    </FirstColumn>
                    <SecondColumn>
                        <RightColumn tags={tags} />
                    </SecondColumn>
                </TwoColumns>
            </MarginWrapper>
        </MinFullscreenContainer>
    )
}