import { useEffect } from 'react'
import MinFullscreenContainer from '../../../components/Containers/MinFullscreenContainer'
import { fetchAllTags, fetchPostsSummary } from '../../../lib/contentful'
import { useGlobalContext } from '../../../providers/ContextProvider'
import SeoBlog from '../../../components/SEO/SeoBlog'
import { TwoColumns, FirstColumn, SecondColumn } from '../../../components/Containers/Blog/twoColumns'
import MarginWrapper from '../../../components/Containers/MarginWrapper'
import HomepageRightColumn from '../../../components/Containers/Blog/homepageRightColumn'
import CategoriesPosts from '../../../components/Containers/Blog/categoriesPosts'

export const getStaticPaths = async () => {
    const tags = await fetchAllTags()
    const paths = tags.map((tagData) => ({
        params: {
            slug: tagData.slug,
        }
    }))
    return ({
        paths,
        fallback: true
    })
}

export const getStaticProps = async ({ params: { slug } }) => {
    const firstPostsSummaryPromise = fetchPostsSummary(0, slug)
    const tagsPromise = fetchAllTags()
    const [firstPostsSummary, tags] = await Promise.all([firstPostsSummaryPromise, tagsPromise])
    const slugSearchedName = (tags.filter((tagData) => {return tagData.slug === slug}))[0].name

    return {
        props: {
            firstPostsSummary,
            tags,
            slugSearched: slug,
            slugSearchedName
        },
        revalidate: 60, // 1 minute
    }
}

export default function Index({ firstPostsSummary, tags, slugSearched, slugSearchedName }) {
    // Setting page markers
    const { globalDispatch, globalState: { isPhone } } = useGlobalContext()
    useEffect(() => {
        globalDispatch({
            type: "SET_MARKERS", payload: {
                markers: [
                    { name: "Categories", link: "#categories" },
                    { name: `Posts under '${slugSearchedName}'`, link: "#categories-posts" }
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
                marginTop: (isPhone ? '3rem': '2rem')
            }}>
                <TwoColumns>
                    <FirstColumn>
                        <CategoriesPosts firstPostsSummary={firstPostsSummary} slugSearched={slugSearched} slugSearchedName={slugSearchedName}/>
                    </FirstColumn>
                    <SecondColumn>
                        <HomepageRightColumn tags={tags} />
                    </SecondColumn>
                </TwoColumns>
            </MarginWrapper>
        </MinFullscreenContainer>
    )
}