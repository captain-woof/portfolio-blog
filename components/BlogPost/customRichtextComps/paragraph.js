import { motion } from 'framer-motion'
import { useThemeChangeAnim } from '../../../lib/motion'
import styled from 'styled-components'

const ParagraphWrapper = styled(motion.p)`
    a {
        text-decoration: underline;
        font-style: italic;
    }
`

export default function Paragraph({children}){
    const {textEmphasisVariants: variants, textEmphasisAnimation: animate} = useThemeChangeAnim()

    return (
        <ParagraphWrapper variants={variants} animate={animate}>{children}</ParagraphWrapper>
    )
}