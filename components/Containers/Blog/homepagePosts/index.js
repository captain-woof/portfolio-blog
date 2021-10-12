import Tags from "./Tags";
import MarginWrapper from '../../MarginWrapper'
import LatestPosts from "./latestPosts";

export default function HomepagePosts({ tags, firstPostsSummary }) {
    return (
        <MarginWrapper>
            <Tags tags={tags} id='categories'/>            
            <LatestPosts firstPostsSummary={firstPostsSummary} id='latest-posts'/>
        </MarginWrapper>
    )
}