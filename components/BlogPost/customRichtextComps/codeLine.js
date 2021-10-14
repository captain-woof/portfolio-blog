import { useGlobalContext } from '../../../providers/ContextProvider'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { useThemeChangeAnim } from '../../../lib/motion'

const CodeLineSpan = styled(motion.code)`
    padding: 0.25rem 0.5rem;
    ${({themeName}) => {
        switch(themeName){
            case "LIGHT_THEME":
                return css`
                    background-color: #ffffcf;
                `
            case "DARK_THEME":
                return css`
                    background-color: #2d2d2d;
                `
        }
    }}
`

export default function CodeLine({ children }) {
    // For theme
    const { globalState: { themeName } } = useGlobalContext()
    const {textEmphasisAnimation: animate, textEmphasisVariants: variants} = useThemeChangeAnim()

    return (
        <CodeLineSpan themeName={themeName} animate={animate} variants={variants}>
            {children}
        </CodeLineSpan>
    )
}