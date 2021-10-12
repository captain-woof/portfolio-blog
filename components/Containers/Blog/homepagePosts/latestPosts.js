import PostsSummaryContainer from "../../PostsSummaryContainer";
import styled, {css} from 'styled-components'
import { motion } from "framer-motion";
import { useGlobalContext } from "../../../../providers/ContextProvider";
import { useThemeChangeAnim } from "../../../../lib/motion";

const LatestPostsContainer = styled.div`
    font-family: 'Poppins';
`

const Heading = styled(motion.div)`
    font-size: 2.2rem;
    margin-bottom: 0.8rem;
    font-weight: 600;
`

export default function LatestPosts({ firstPostsSummary, id }) {
    const { globalState: {isPhone} } = useGlobalContext()
    const {textSubtitlesAnimation, textSubtitlesVariants} = useThemeChangeAnim()

    return (
        <LatestPostsContainer>
            <Heading animate={textSubtitlesAnimation} initial='initial' variants={textSubtitlesVariants} id={id}>
                Latest posts
            </Heading>
            <PostsSummaryContainer firstPostsSummary={firstPostsSummary} />
        </LatestPostsContainer>
    )
}