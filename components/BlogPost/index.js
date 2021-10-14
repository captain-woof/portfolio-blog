import MinFullscreenContainer from '../Containers/MinFullscreenContainer'
import MarginWrapper from '../Containers/MarginWrapper'
import { FirstColumn, SecondColumn, TwoColumns } from '../Containers/Blog/twoColumns'
import PostContent from './postContent'
import PostHeader from './postHeader'
import { useGlobalContext } from '../../providers/ContextProvider'

export default function BlogPost({ blogPostData }) {
    const { globalState: { isPhone } } = useGlobalContext()

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
                <TwoColumns>
                    <FirstColumn>
                        <PostContent blogPostData={blogPostData} />
                    </FirstColumn>
                    <SecondColumn>
                        EMPTY
                    </SecondColumn>
                </TwoColumns>
            </MarginWrapper>
        </MinFullscreenContainer>
    )
}