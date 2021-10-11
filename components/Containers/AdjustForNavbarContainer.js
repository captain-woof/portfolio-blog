import styled from 'styled-components'
import { useThemeChangeAnim } from '../../lib/motion'
import { useGlobalContext } from '../../providers/ContextProvider'
import { motion } from 'framer-motion'

const Container = styled(motion.div)`
    top: ${({ isPhone, adjustPositionForNavbar }) => (adjustPositionForNavbar ? (isPhone ? "3.5rem" : "2.5rem") : "0")};
    position: absolute;
`

const ChildrenContainer = styled.div`
  position: relative;
`

export default function AdjustForNavbarContainer({ children, adjustPositionForNavbar = false }) {
    const { globalState: {isPhone} } = useGlobalContext()

    // For background color animation on theme change
    const { backgroundColorVariants, backgroundColorAnimation } = useThemeChangeAnim()

    return (
        <Container isPhone={isPhone} animate={backgroundColorAnimation} variants={backgroundColorVariants} initial="initial" adjustPositionForNavbar={adjustPositionForNavbar}>
            {children}
        </Container>
    )
}