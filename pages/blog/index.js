import { useEffect } from 'react'
import MinFullscreenContainer from '../..//components/Containers/MinFullscreenContainer'
import HomepagePosts from '../../components/Containers/Blog/homepagePosts'
import { fetchAllTags, fetchPostsSummary } from '../../lib/contentful'
import { useGlobalContext } from '../../providers/ContextProvider'
import SeoBlog from '../../components/SEO/SeoBlog'
import { TwoColumns, FirstColumn, SecondColumn } from '../../components/Containers/Blog/twoColumns'
import MarginWrapper from '../../components/Containers/MarginWrapper'
import HomepageRightColumn from '../../components/Containers/Blog/homepageRightColumn'

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
            <SeoBlog />
            <MarginWrapper>
                <TwoColumns>
                    <FirstColumn>
                        <HomepagePosts firstPostsSummary={firstPostsSummary} tags={tags} />
                    </FirstColumn>
                    <SecondColumn>
                        <HomepageRightColumn tags={tags}/>
                    </SecondColumn>
                </TwoColumns>
            </MarginWrapper>
        </MinFullscreenContainer>
    )
}