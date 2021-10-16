import { useEffect } from "react"
import SearchPosts from "../../components/Containers/Blog/searchPosts"
import { FirstColumn, SecondColumn, TwoColumns } from "../../components/Containers/Blog/twoColumns"
import MarginWrapper from "../../components/Containers/MarginWrapper"
import MinFullscreenContainer from "../../components/Containers/MinFullscreenContainer"
import SeoBlog from "../../components/SEO/SeoBlog"
import { fetchAllTags, fetchPostsSummary } from "../../lib/contentful"
import { useGlobalContext } from "../../providers/ContextProvider"
import RightColumn from '../../components/Containers/Blog/rightColumn'

// /blog/search?q=AAAAA
export const getServerSideProps = async ({ query: { q } }) => {
    // If 'q' not provided, return 404
    if (!q) {
        return {
            notFound: true
        }
    }

    const firstPostsSummaryPromise = fetchPostsSummary({ pageNo: 0, searchQuery: q })
    const tagsPromise = fetchAllTags()
    const [firstPostsSummary, tags] = await Promise.all([firstPostsSummaryPromise, tagsPromise])
    return {
        props: {
            q,
            firstPostsSummary,
            tags
        }
    }
}

export default function Search({ q, firstPostsSummary, tags }) {
    // Setting page markers
    const { globalDispatch, globalState: { isPhone } } = useGlobalContext()
    useEffect(() => {
        globalDispatch({
            type: "SET_MARKERS", payload: {
                markers: [
                    { name: "Categories", link: "#categories" },
                    { name: `Search results for '${q}'`, link: "#search-results" }
                ]
            }
        })
    }, [])

    return (
        <MinFullscreenContainer>
            <SeoBlog />
            <MarginWrapper style={{
                justifyContent: (isPhone ? null : 'center'),
                display: (isPhone ? null : 'flex'),
                marginTop: (isPhone ? '3rem' : '2rem')
            }}>
                <TwoColumns>
                    <FirstColumn>
                        <SearchPosts firstPostsSummary={firstPostsSummary} q={q} />
                    </FirstColumn>
                    <SecondColumn>
                        <RightColumn tags={tags} />
                    </SecondColumn>
                </TwoColumns>
            </MarginWrapper>
        </MinFullscreenContainer>
    )
}