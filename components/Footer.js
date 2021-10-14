import styled, { css, useTheme } from 'styled-components'
import { useGlobalContext } from '../providers/ContextProvider'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { easeInOutCustomBezier } from '../lib/motion'
import MarginWrapper from './Containers/MarginWrapper'
import Socials from './socials'

const FooterContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.blackDark};
    position: relative;
    font-family: 'Poppins';
    color: ${({ theme }) => theme.colors.white};
`

const CreditsContainer = styled.div`
    position: relative;
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
    flex-direction: column;
    ${({ theme: { isPhone } }) => (isPhone && css`
       
    `)}
`

const CreditsLineOne = styled.div`
    font-size: 1.8rem;
    font-weight: 200;

    ${({ theme: { isPhone } }) => (isPhone && css`
        text-align: center;
        font-size: 1rem;
    `)}
`

const CreditsLineTwo = styled.div`
    font-size: 3.5rem;
    font-weight: 400;
    margin-top: -1.5rem;
    margin-left: 3.5rem;

    ${({ theme: { isPhone } }) => (isPhone && css`
        text-align: center;
        font-size: 1.2rem;
        margin: 0;
    `)}
`

const VerticalDivider = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    width: 0.1rem;
    position: relative;
`

const SocialsContainer = styled.div`
    position: relative;
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
    flex-direction: column;
`

const SocialsHeading = styled.div`
    font-size: 1.8rem;
    font-weight: 200;
    text-align: end;
    ${({ theme: { isPhone } }) => (isPhone && css`
        text-align: center;
        font-size: 1.2rem;
    `)}
`

export default function Footer() {
    const { globalState: { isPhone } } = useGlobalContext()

    return (
        <FooterContainer isPhone={isPhone}>
            <MarginWrapper style={{
                width: '100%',
                display: 'flex',
                flexDirection: (isPhone ? 'column' : 'row'),
                flexWrap: 'wrap'
            }}>
                <CreditsContainer>
                    <CreditsLineOne>designed & developed by</CreditsLineOne>
                    <CreditsLineTwo>Sohail Saha</CreditsLineTwo>
                </CreditsContainer>

                {!isPhone && <VerticalDivider />}

                <SocialsContainer>
                    {!isPhone && <SocialsHeading>say hello</SocialsHeading>}
                    <Socials style={{
                        justifyContent: (isPhone ? 'center' : 'flex-end'),
                        paddingBottom: (isPhone ? '0.5rem' : '0')
                    }} />
                </SocialsContainer>
            </MarginWrapper>
        </FooterContainer>
    )
}