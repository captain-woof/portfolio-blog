import PostsSummaryContainer from "../../PostsSummaryContainer";
import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { useThemeChangeAnim } from "../../../../lib/motion";
import { useRouter } from 'next/router'
import Fallback from '../../../BlogPost/fallback'

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

export default function CategoriesLatestPosts({ firstPostsSummary, id, slugSearched, slugSearchedName }) {
    const { textSubtitlesAnimation, textSubtitlesVariants } = useThemeChangeAnim()

    // Fallback
    const router = useRouter()
    if (router.isFallback) {
        return <Fallback />
    }

    return (
        <LatestPostsContainer>
            <Heading animate={textSubtitlesAnimation} initial='initial' variants={textSubtitlesVariants} id={id}>
                Posts under <b>'{slugSearchedName}'</b>
            </Heading>
            <PostsSummaryContainer firstPostsSummary={firstPostsSummary} tag={slugSearched} />
        </LatestPostsContainer>
    )
}