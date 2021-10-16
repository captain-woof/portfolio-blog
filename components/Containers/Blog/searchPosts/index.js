import MarginWrapper from '../../MarginWrapper'
import SearchLatestPosts from "./searchLatestPosts"

export default function SearchPosts({ firstPostsSummary, q }) {
    return (
        <MarginWrapper>
            <SearchLatestPosts firstPostsSummary={firstPostsSummary} id='search-results' q={q}/>
        </MarginWrapper>
    )
}