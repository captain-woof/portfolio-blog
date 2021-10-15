import styled, { css } from 'styled-components'
import { useGlobalContext } from '../../../../providers/ContextProvider'

const TwoColumnsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    gap: 0 1rem;
    justify-content: center;

    ${({ isPhone, reversed }) => (isPhone && css`
        width: 100%;
        justify-content: none;
        gap: 1rem 0;
        ${reversed ? css`flex-direction: column-reverse;` : css`flex-direction: column;`}
    `)}
`

const FirstColumnWrapper = styled.div`
    width: 65%;
    ${({ isPhone }) => (isPhone && css`
        width: 100%;
    `)}
`

const SecondColumnWrapper = styled.div`
    width: 35%;
    ${({ isPhone }) => (isPhone && css`
        width: 100%;
    `)}
`

export const FirstColumn = ({ children }) => {
    const { globalState: { isPhone } } = useGlobalContext()
    return (
        <FirstColumnWrapper isPhone={isPhone}>{children}</FirstColumnWrapper>
    )
}

export const SecondColumn = ({ children }) => {
    const { globalState: { isPhone } } = useGlobalContext()
    return (
        <SecondColumnWrapper isPhone={isPhone}>{children}</SecondColumnWrapper>
    )
}

export const TwoColumns = ({ children, reversed=true }) => {
    const { globalState: { isPhone } } = useGlobalContext()

    return (
        <TwoColumnsWrapper isPhone={isPhone} reversed={reversed}>
            {children}
        </TwoColumnsWrapper>
    )
}