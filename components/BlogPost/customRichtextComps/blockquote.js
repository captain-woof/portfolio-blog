import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useThemeChangeAnim } from '../../../lib/motion'
import { useGlobalContext } from '../../../providers/ContextProvider'

const BlockquoteContainer = styled(motion.div)`
    padding: 1rem 1.5rem;
    width: 90%;
    background-color: ${({ day, theme }) => (day ? theme.colors.whiteLight : "#2e2e2e")};
    position: relative;
    margin: 1.5rem 0;
`

const ApostropheStart = styled.img`
    position: absolute;
    height: 2.5rem;
    left: -1.6rem;
    top: -1rem;
`

const ApostropheEnd = styled.img`
    position: absolute;
    height: 2.5rem;
    right: -1.3rem;
    bottom: -1rem;
    transform: rotateZ(180deg);
`

export default function Blockquote({ children }) {
    const { textEmphasisVariants: variants, textEmphasisAnimation: animate } = useThemeChangeAnim()
    const { globalState: { themeName } } = useGlobalContext()

    return (
        <BlockquoteContainer animate={animate} variants={variants} day={themeName === "LIGHT_THEME"}>
            <ApostropheStart src={themeName === 'LIGHT_THEME' ? '/icons/quote.svg' : '/icons/quote-night.svg'} />
            {children}
            <ApostropheEnd src={themeName === 'LIGHT_THEME' ? '/icons/quote.svg' : '/icons/quote-night.svg'} />
        </BlockquoteContainer>
    )
}