import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { easeInOutCustomBezier } from '../../lib/motion'
import { useGlobalContext } from '../../providers/ContextProvider'

const BackdropContainer = styled(motion.div)`
    height: 100vh;
    width: 100vw;
    background-color: ${({ themeName, theme }) => (themeName === 'LIGHT_THEME' ? theme.colors.grey : theme.colors.black)};
    z-index: 8;
    position: absolute;
    top: 0;
    left: 0;
`

const backdropTransition = {
    ease: easeInOutCustomBezier,
    duration: 1.2
}

const backdropVariants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 0.7,
        when: 'beforeChildren',
        transition: backdropTransition
    },
    exit: {
        opacity: 0,
        when: 'afterChildren',
        transition: backdropTransition
    }
}

export default function Backdrop({ children, style, animate }) {
    const { globalState } = useGlobalContext()
    const { themeName } = globalState

    return (
        <AnimatePresence type='crossfade'>
            <BackdropContainer themeName={themeName} className="backdrop" key='backdrop' style={style} variants={backdropVariants} animate={animate || 'animate'} exit='exit' initial='initial'>
                {children}
            </BackdropContainer>
        </AnimatePresence>
    )
}