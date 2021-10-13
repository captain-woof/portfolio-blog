import PostsSummaryContainer from "../../PostsSummaryContainer";
import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { useThemeChangeAnim } from "../../../../lib/motion";

const LatestPostsContainer = styled.div`
    font-family: 'Poppins';
`

const Heading = styled(motion.div)`
    font-size: 3rem;
    margin-bottom: 0.8rem;
    font-weight: 600;

    ${({ theme: { isPhone } }) => (isPhone && css`
        font-size: 2.2rem;
    `)}
`

export default function LatestPosts({ firstPostsSummary, id }) {
    const { textSubtitlesAnimation, textSubtitlesVariants } = useThemeChangeAnim()

    return (
        <LatestPostsContainer>
            <Heading animate={textSubtitlesAnimation} initial='initial' variants={textSubtitlesVariants} id={id}>
                Latest posts
            </Heading>
            <PostsSummaryContainer firstPostsSummary={firstPostsSummary} />
        </LatestPostsContainer>
    )
}