import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { useThemeChangeAnim } from '../../lib/motion'
import MarginWrapper from '../Containers/MarginWrapper'
import Image from 'next/image'
import Socials from '../socials'
import { useGlobalContext } from '../../providers/ContextProvider'

const AuthorBox = styled(motion.div)`
    box-shadow: ${({ theme }) => `0px 0px 4px ${theme.shadow}`};
    font-family: 'Poppins';
    border-radius: 6px;
    margin-top: 2rem;
`

const AuthorHeading = styled(motion.div)`
    font-size: 2.2rem;
    font-weight: 500;
    ${({ theme: { isPhone } }) => (isPhone && css`text-align: center;`)}
`

const AuthorContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 0;
`

const AuthorImageWrapper = styled.div`
    height: 6rem;
    width: 6rem;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: ${({ theme }) => `0px 0px 4px ${theme.shadow}`};
`

const AuthorBio = styled(motion.div)`
    font-size: 1rem;
    line-height: 1.8;

    & > p {
        margin: 0;
        padding: 0;
    }

    & > * + p {
        margin-top: 1rem;
    }
`

export default function Author() {
    const { backgroundElevatedColorVariants, backgroundElevatedColorAnimation, textEmphasisAnimation, textEmphasisVariants } = useThemeChangeAnim()
    const { globalState: { isPhone } } = useGlobalContext()

    return (
        <AuthorBox animated={backgroundElevatedColorAnimation} variants={backgroundElevatedColorVariants}>
            <MarginWrapper style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '0 1rem',
                alignItems: 'center',
                flexDirection: (isPhone ? 'column' : 'row')
            }}>

                <AuthorImageWrapper>
                    <Image layout='intrinsic' src='/images/me.jpg' height={800} width={800} placeholder='blur' blurDataURL='/images/me-blur.jpg'/>
                </AuthorImageWrapper>

                <AuthorContentContainer>
                    <AuthorHeading animate={textEmphasisAnimation} variants={textEmphasisVariants}>
                        About me
                    </AuthorHeading>
                    <AuthorBio animate={textEmphasisAnimation} variants={textEmphasisVariants}>
                        <p>Hey there! I am Sohail, and I am a Frontend web developer, specializing in the React.js ecosystem. I love learning, and creating content to help the community.</p>
                        <p><i>Have something interesting to say? Hit me up!</i></p>
                    </AuthorBio>
                    <Socials colored style={{
                        marginTop: '0.5rem',
                        alignSelf: (isPhone ? 'center' : null)
                    }} />
                </AuthorContentContainer>
            </MarginWrapper>
        </AuthorBox>
    )
}