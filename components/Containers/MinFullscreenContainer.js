import { forwardRef } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../providers/ContextProvider'
import { motion } from 'framer-motion'

const Container = styled(motion.div)`
    min-height: ${({ isPhone, adjustHeightForNavbar }) => (adjustHeightForNavbar ? (isPhone ? `calc(100vh - 3.5rem)` : `calc(100vh - 2.5rem)"`) : `100vh`)};
    width: 100vw;
    position: relative;
`

const MinFullscreenContainer = forwardRef(({ children, adjustHeightForNavbar = false, style = {}, variants, animate, initial, exit, onPanStart, whileTap, id }, ref) => {
    const { globalState: {isPhone} } = useGlobalContext()

    return (
        <Container id={id} onPanStart={onPanStart} ref={ref} style={style} isPhone={isPhone} adjustHeightForNavbar={adjustHeightForNavbar} className="fullscreen-container" variants={variants} animate={animate} initial={initial} exit={exit} whileTap={whileTap}>
            {children}
        </Container>
    )
})

export default MinFullscreenContainer