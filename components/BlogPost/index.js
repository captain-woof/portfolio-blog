import MinFullscreenContainer from '../Containers/MinFullscreenContainer'
import MarginWrapper from '../Containers/MarginWrapper'
import { FirstColumn, SecondColumn, TwoColumns } from '../Containers/Blog/twoColumns'
import PostContent from './postContent'
import PostHeader from './postHeader'
import { useGlobalContext } from '../../providers/ContextProvider'
import Suggestion from './suggestion'
import Author from './author'
import Comments from './comments'
import { useRouter } from 'next/router'
import Fallback from './fallback'

export default function BlogPost({ blogPostData, suggestedPosts }) {
    const { globalState: { isPhone } } = useGlobalContext()

    // Fallback
    const router = useRouter()
    if (router.isFallback) {
        return <Fallback />
    }

    return (
        <MinFullscreenContainer>
            <MarginWrapper style={{
                alignItems: 'center',
                display: 'flex',
                fontFamily: 'Poppins',
                flexDirection: 'column',
                padding: (isPhone ? '1.5rem 2rem' : '1.5rem 1.5rem')
            }}>
                <PostHeader blogPostData={blogPostData} />
                <TwoColumns reversed={false}>
                    <FirstColumn>
                        <PostContent blogPostData={blogPostData} />
                        <Author />
                        <Comments />
                    </FirstColumn>
                    <SecondColumn>
                        <Suggestion suggestedPosts={suggestedPosts} />
                    </SecondColumn>
                </TwoColumns>
            </MarginWrapper>
        </MinFullscreenContainer>
    )
}