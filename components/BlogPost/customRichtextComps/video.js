import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useThemeChangeAnim } from '../../../lib/motion'

const VideoWrapper = styled.div`
    margin: 1.2rem 0;
    text-align: center;
`

const VideoStyled = styled.video`
    width: 100%;
`

const Caption = styled(motion.div)`
    font-size: 0.85rem;
    width: 100%;
    text-align: center;
    margin-top: 0.25rem;
`

export default function Video({ src, contentType, caption }) {
    const { textSubtitlesAnimation: animate, textSubtitlesVariants: variants } = useThemeChangeAnim()
    return (
        <VideoWrapper>
            <VideoStyled muted controls preload="none">
                <source src={src} type={contentType} />
                Your browser does not support playing videos.
            </VideoStyled>
            <Caption animate={animate} variants={variants}>{caption}</Caption>
        </VideoWrapper>
    )
}