import { useEffect } from 'react'
import MinFullscreenContainer from '../..//components/Containers/MinFullscreenContainer'
import HomepagePosts from '../../components/Containers/Blog/homepagePosts'
import { fetchAllTags, fetchPostsSummary } from '../../lib/contentful'
import { useGlobalContext } from '../../providers/ContextProvider'

export const getStaticProps = async () => {
    const firstPostsSummaryPromise = fetchPostsSummary(0)
    const tagsPromise = fetchAllTags()
    const [firstPostsSummary, tags] = await Promise.all([firstPostsSummaryPromise, tagsPromise])

    return {
        props: {
            firstPostsSummary,
            tags
        }
    }
}


export default function Index({ firstPostsSummary, tags }) {
    // Setting page markers
    const { globalDispatch } = useGlobalContext()
    useEffect(() => {
        globalDispatch({
            type: "SET_MARKERS", payload: {
                markers: [
                    { name: "Categories", link: "#categories" },
                    { name: "Latest Posts", link: "#latest-posts" }
                ]
            }
        })
    }, [])

    return (
        <MinFullscreenContainer>
            <HomepagePosts firstPostsSummary={firstPostsSummary} tags={tags} />
        </MinFullscreenContainer>
    )
}