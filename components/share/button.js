import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { easeOutQuintBezier, useThemeChangeAnim } from '../../lib/motion'
import { useGlobalContext } from '../../providers/ContextProvider'

const ButtonContainer = styled(motion.div)`
    position: fixed;
    bottom: 7rem;
    right: 2.8rem;
    height: 3.2rem;
    width: 3.2rem;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: ${({ theme }) => `0px 0px 4px ${theme.shadow}`};
    &:hover {
        cursor: pointer;
    }
    ${({theme: {isPhone}}) => (isPhone && css`
        bottom: 5.8rem;
        right: 1.3rem;
        height: 3rem;
        width: 3rem;
    `)};
    z-index: 10;
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
            <Icon alt='Share buttons' src={themeName === 'LIGHT_THEME' ? "/icons/share.svg" : "/icons/share-night.svg"}/>
        </ButtonContainer>
    )
}