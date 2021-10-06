import { forwardRef } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../providers/ContextProvider'
import { motion } from 'framer-motion'

const Container = styled(motion.div)`
    height: ${({ isPhone, adjustHeightForNavbar, numberOfPages }) => (adjustHeightForNavbar ? (isPhone ? `calc(${numberOfPages * 100}vh - 3.5rem)` : `calc(${numberOfPages * 100}vh - 2.5rem)"`) : `${numberOfPages * 100}vh`)};
    width: 100vw;
    position: relative;
    left: 0;
    overflow: hidden;
`

const FullscreenContainer = forwardRef(({ children, adjustHeightForNavbar = false, style = {}, numberOfPages = 1, variants, animate, initial, exit }, ref) => {
    const { globalState } = useGlobalContext()
    const { isPhone } = globalState

    return (
        <Container ref={ref} numberOfPages={numberOfPages} style={style} isPhone={isPhone} adjustHeightForNavbar={adjustHeightForNavbar} className="fullscreen-container" variants={variants} animate={animate} initial={initial} exit={exit}>
            {children}
        </Container>
    )
})

export default FullscreenContainer