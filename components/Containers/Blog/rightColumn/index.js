import Tags from "../../../Misc/Tags";
import BlogSearchBar from "../../../searchBars/blogSearchBar";
import MarginWrapper from "../../MarginWrapper";

export default function RightColumn({ tags }) {
    return (
        <MarginWrapper style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem 0'
        }}>
            <BlogSearchBar />
            <Tags tags={tags} id='categories' />
        </MarginWrapper>
    )
}