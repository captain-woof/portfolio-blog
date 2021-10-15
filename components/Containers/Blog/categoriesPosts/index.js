import MarginWrapper from '../../MarginWrapper'
import CategoriesLatestPosts from "./categoriesLatestPosts"

export default function CategoriesPosts({ firstPostsSummary, slugSearched, slugSearchedName }) {
    return (
        <MarginWrapper>
            <CategoriesLatestPosts firstPostsSummary={firstPostsSummary} id='categories-posts' slugSearched={slugSearched} slugSearchedName={slugSearchedName}/>
        </MarginWrapper>
    )
}