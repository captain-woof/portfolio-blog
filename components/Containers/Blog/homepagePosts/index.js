import MarginWrapper from '../../MarginWrapper'
import LatestPosts from "./latestPosts"

export default function HomepagePosts({ firstPostsSummary }) {
    return (
        <MarginWrapper>
            <LatestPosts firstPostsSummary={firstPostsSummary} id='latest-posts' />
        </MarginWrapper>
    )
}