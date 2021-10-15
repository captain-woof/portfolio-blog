import styled from 'styled-components'
import { motion } from 'framer-motion'
import { easeOutQuintBezier, useThemeChangeAnim } from '../../lib/motion'
import { useGlobalContext } from '../../providers/ContextProvider'

const ButtonContainer = styled(motion.div)`
    position: absolute;
    bottom: 2.4rem;
    right: 2.4rem;
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: ${({ theme }) => `0px 0px 4px ${theme.shadow}`};
    &:hover {
        cursor: pointer;
    }
`

const Icon = styled(motion.img)`
    padding: 1rem;
    height: 100%;
    user-select: none;
    pointer-events: none;
`

export default function Button({ setIsOpen }) {
    const { backgroundElevatedColorVariants: bgVariants, backgroundElevatedColorAnimation: bgAnimate } = useThemeChangeAnim({
        backgroundElevatedColorVariants: {
            whileTap: {
                scale: 0.7,
                transition: {
                    ease: easeOutQuintBezier,
                    duration: 0.4
                }
            }
        }
    })
    const { globalState: { themeName } } = useGlobalContext()

    return (
        <ButtonContainer animate={bgAnimate} variants={bgVariants} onClick={() => { setIsOpen(prev => !prev) }}
            whileTap='whileTap'>
            <Icon src={themeName === 'LIGHT_THEME' ? "/icons/book.svg" : "/icons/book-night.svg"}/>
        </ButtonContainer>
    )
}