import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useThemeChangeAnim } from '../../../lib/motion'

const AudioWrapper = styled.div`
    margin: 1.2rem 0;
    text-align: center;
`

const Caption = styled(motion.div)`
    font-size: 0.85rem;
    width: 100%;
    text-align: center;
    margin-top: 0.25rem;
`

export default function Audio({ src, contentType, caption }) {
    const { textSubtitlesAnimation: animate, textSubtitlesVariants: variants } = useThemeChangeAnim()

    return (
        <AudioWrapper>
            <audio muted controls preload="none">
                <source src={src} type={contentType} />
                Your browser does not support playing audio files.
            </audio>
            <Caption animate={animate} variants={variants}>{caption}</Caption>
        </AudioWrapper>
    )
}