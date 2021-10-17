import styled, { css } from 'styled-components'

const GridStyle = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1.5rem 0;

    ${({ theme: { isPhone } }) => (isPhone && css`
        gap: 2rem 0;
    `)}
`

export default function Grid({ children }) {
    return (
        <GridStyle>
            {children}
        </GridStyle>
    )
}