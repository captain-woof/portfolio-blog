import styled, { css } from 'styled-components'
import { useGlobalContext } from '../../../../providers/ContextProvider'

const TwoColumnsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 0 0.5rem;

    ${({ isPhone }) => (isPhone && css`
        flex-direction: column-reverse;
        gap: 0;
    `)}
`

const FirstColumnWrapper = styled.div`
    width: 70%;
    ${({ isPhone }) => (isPhone && css`
        width: 100%;
    `)}
`

const SecondColumnWrapper = styled.div`
    width: 30%;
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

export const TwoColumns = ({ children }) => {
    const { globalState: { isPhone } } = useGlobalContext()

    return (
        <TwoColumnsWrapper isPhone={isPhone}>
            {children}
        </TwoColumnsWrapper>
    )
}