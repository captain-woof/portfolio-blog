import styled, { css } from 'styled-components'
import { useGlobalContext } from '../../providers/ContextProvider'

const MarginWrapperStyle = styled.div`
    padding: 1.5rem 1.5rem;

    ${({isPhone}) => (isPhone && css`
        padding: 1rem 1rem;
    `)}
`

export default function MarginWrapper({ children, style }) {
    const { globalState: { isPhone } } = useGlobalContext()

    return (
        <MarginWrapperStyle isPhone={isPhone} style={style}>
            {children}
        </MarginWrapperStyle>
    )
}