import styled from 'styled-components'
import { useGlobalContext } from '../../providers/ContextProvider'

const Container = styled.div`
    height: ${({isPhone, adjustHeightForNavbar}) => (adjustHeightForNavbar ? (isPhone ? "calc(100vh - 3.5rem)" : "calc(100vh - 2.5rem)") : "100vh")};
    width: 100vw;
    position: relative;
    left: 0;
    overflow: hidden;
`

export default function FullscreenContainer({children, adjustHeightForNavbar = false, style = {}}){
    const { globalState } = useGlobalContext()
    const { isPhone } = globalState

    return (
        <Container style={style} isPhone={isPhone} adjustHeightForNavbar={adjustHeightForNavbar} className="fullscreen-container">
            {children}
        </Container>
    )
}