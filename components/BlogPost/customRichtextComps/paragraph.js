import { motion } from 'framer-motion'
import { useThemeChangeAnim } from '../../../lib/motion'
import styled, { css } from 'styled-components'

const ParagraphWrapper = styled(motion.p)`
    ${({ theme }) => css`
        line-height: 2.2;
        letter-spacing: 0.015rem;

        & a {
            text-decoration: underline;
            font-style: italic;
            color: ${theme.colors.blue};
        }

        & a:hover {
            color: ${theme.colors.blueDark};
        }
    `}
`

export default function Paragraph({ children }) {
    const { textEmphasisVariants: variants, textEmphasisAnimation: animate } = useThemeChangeAnim()

    return (
        <ParagraphWrapper variants={variants} animate={animate}>{children}</ParagraphWrapper>
    )
}