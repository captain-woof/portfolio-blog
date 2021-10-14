import styled from 'styled-components'
import Img from 'next/image'
import { motion } from 'framer-motion'
import { useThemeChangeAnim } from '../../../lib/motion'

const ImageWrapper = styled.div`
    margin: 1.2rem 0;
    text-align: center;
`

const Caption = styled(motion.div)`
    font-size: 0.85rem;
    width: 100%;
    text-align: center;
    margin-top: 0.25rem;
`

export default function Image({ src, caption, height, width }) {
    const { textSubtitlesAnimation: animate, textSubtitlesVariants: variants } = useThemeChangeAnim()

    return (
        <ImageWrapper>
            <Img src={src} height={height} width={width} layout='responsive' alt={caption} />
            <Caption animate={animate} variants={variants}>{caption}</Caption>
        </ImageWrapper>
    )
}