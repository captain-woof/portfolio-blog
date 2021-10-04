import styled from 'styled-components'
import { useGlobalContext } from '../../providers/ContextProvider'

const Container = styled.div`
    top: ${({ isPhone }) => (isPhone ? "3.5rem" : "2.5rem")};
    position: absolute;
`

const ChildrenContainer = styled.div`
  position: relative;
`

export default function AdjustForNavbarContainer({ children }) {
    const { globalState } = useGlobalContext()
    const { isPhone } = globalState

    return (
        <Container isPhone={isPhone}>
            <ChildrenContainer>
                {children}
            </ChildrenContainer>
        </Container>
    )
}