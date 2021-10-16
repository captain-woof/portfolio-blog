import Tags from "../../../Misc/Tags";
import BlogSearchBar from "../../../searchBars/blogSearchBar";
import MarginWrapper from "../../MarginWrapper";
import { useRouter } from "next/router";

export default function RightColumn({ tags }) {
    // Fallback
    const router = useRouter()
    if (router.isFallback) {
        return <></>
    }

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