import styled from 'styled-components'

const MarginWrapperStyle = styled.div`
    margin: 1.5rem 2rem;
`

export default function MarginWrapper({children}){
    return (
        <MarginWrapperStyle>
            {children}
        </MarginWrapperStyle>
    )
}