import styled, { css } from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import FullscreenContainer from '../FullscreenContainer'
import { useGlobalContext } from '../../../providers/ContextProvider'
import { easeInOutCubicBezier, easeInOutCustomBezier, useThemeChangeAnim } from '../../../lib/motion'
import { useIntersectionRevealer } from 'react-intersection-revealer'
import { useEffect, useRef } from 'react'
import { forwardRef } from 'react'

//// FOR EMAIL, USED ONLY IN THIS PAGE
const EmailContainer = styled(motion.div)`
    font-size: 4.5rem;
    user-select: all;
    margin-bottom: 2rem;
    ${({ isPhone }) => (isPhone && css`
        font-size: 2.8rem;
    `)}
`

const EmailText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    ${({ isPhone }) => (isPhone && css`
        align-items: none;
    `)}
`

const EmailDomain = styled(motion.div)`
    font-size: 1.6rem;
    
    ${({ isPhone }) => (isPhone && css`
        align-self: flex-end;
    `)}
`

const Email = forwardRef((props, ref) => {
    const { globalState } = useGlobalContext()
const { isPhone } = globalState
    const { textEmphasisAnimation, textSubtitlesAnimation, textSubtitlesVariants, textEmphasisVariants } = useThemeChangeAnim()

    return (
        <EmailContainer isPhone={isPhone} ref={ref}>
            <EmailText isPhone={isPhone}>
                <motion.div variants={textEmphasisVariants} animate={textEmphasisAnimation}>sohail.saha.666</motion.div>
                <EmailDomain isPhone={isPhone} variants={textSubtitlesVariants} animate={textSubtitlesAnimation}>@gmail.com</EmailDomain>
            </EmailText>
        </EmailContainer>
    )
})

//// FOR SOCIAL BUTTON, USED ONLY IN THIS PAGE
const SocialButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem 1rem;
    height: 2.5rem;
    color: ${({ theme }) => theme.colors.white};

    ${({ isPhone }) => (isPhone && css`
        height: 2rem;
        margin-top: 1rem;
    `)}
`

const ButtonContainer = styled(motion.a)`
    display: flex;
    flex-direction: row;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background-color: ${({ color }) => color};
    height: 100%;
    gap: 0 0.5rem;

    ${({ isPhone }) => (isPhone && css`
        padding: 0.25rem 0.5rem;
    `)}
`

const SocialLogoWrapper = styled.div`
    height: 100%;
`

const SocialLogo = styled.img`
    height: 100%;
    padding: 0.2rem;
`

const Username = styled.div`
    flex-grow: 1;
    align-self: center;
    font-weight: 500;
`

const socialButtonVariants = {
    whileHover: {
        scale: 1.1,
        transition: {
            ease: easeInOutCustomBezier,
            duration: 1
        }
    }
}

const SocialButton = ({ logo, username, color, url }) => {
    const { globalState } = useGlobalContext()
const { isPhone } = globalState
    return (
        <ButtonContainer color={color} href={url} variants={socialButtonVariants} whileHover='whileHover' target="_blank" isPhone={isPhone}>
            <SocialLogoWrapper>
                <SocialLogo src={logo} />
            </SocialLogoWrapper>
            <Username>{username}</Username>
        </ButtonContainer>
    )
}

//// FOR CONTAINER
const ContactWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Montserrat Alternates';
    padding: 3rem;
    flex-direction: column;
`

const WannaTalkText = styled(motion.div)`
    font-size: 2.6rem;
    margin-bottom: 2rem;
    user-select: none;
    ${({ isPhone }) => (isPhone && css`
        font-size: 2rem;
    `)}
`

const EmailLogo = styled(motion.img)`
    position: absolute;
    height: 4.5rem;
    width: 4.5rem;
    top: 25%;
    left: 24%;
    transform: translate(-50%, -50%);

    ${({ isPhone }) => (isPhone && css`
        top: 23%;
        left: 41%;
        height: 4rem;
        width: 4rem;
    `)}
`

const emailLogoVariants = {
    initial: {
        y: -200,
        opacity: 0,
        rotateZ: '-75deg',
    },
    animate: {
        y: 0,
        opacity: 1,
        rotateZ: '-30deg',
        transition: {
            ease: easeInOutCubicBezier,
            duration: 1.5
        }
    },
    exit: {
        y: -200,
        opacity: 0,
        rotateZ: '-75deg',
        transition: {
            ease: easeInOutCubicBezier,
            duration: 1.5
        }
    }
}

export default function SectionFive() {
    const { globalState } = useGlobalContext()
    const { isPhone, themeName } = globalState

    // For theme animations
    const { textSubtitlesAnimation, textSubtitlesVariants } = useThemeChangeAnim()

    // Social buttons
    const socialAccs = [
        {
            logo: "/icons/linkedin.svg",
            username: "sohail-saha",
            color: "#0e76a8",
            url: "https://www.linkedin.com/in/sohail-saha/"
        },
        {
            logo: "/icons/twitter.svg",
            username: "realCaptainWoof",
            color: "#00acee",
            url: "https://twitter.com/realCaptainWoof"
        },
        {
            logo: "/icons/github.svg",
            username: "captain-woof",
            color: "#000000",
            url: "https://github.com/captain-woof"
        },
        {
            logo: "/icons/instagram.svg",
            username: "sohail_saha_",
            color: "#bc2a8d",
            url: "https://www.instagram.com/sohail_saha_/"
        }
    ]

    // For email logo animation
    const emailLogoAnim = useAnimation()
    const emailRef = useRef()
    const { inView } = useIntersectionRevealer(emailRef)

    useEffect(() => {
        if (inView) {
            emailLogoAnim.start('animate')
        } else {
            emailLogoAnim.start('exit')
        }
    }, [inView])

    return (
        <FullscreenContainer id="contact">
            <ContactWrapper>
                <WannaTalkText isPhone={isPhone} animate={textSubtitlesAnimation} variants={textSubtitlesVariants}>Wanna talk?</WannaTalkText>
                <Email ref={emailRef} />
                <EmailLogo alt='email logo' src={themeName === "LIGHT_THEME" ? '/icons/email.svg' : '/icons/email-night.svg'} isPhone={isPhone} variants={emailLogoVariants} animate={emailLogoAnim} initial='initial' exit='exit'/>
                <SocialButtonsContainer isPhone={isPhone}>
                    {socialAccs.map((socialData, index) => (
                        <SocialButton {...socialData} key={index} />
                    ))}
                </SocialButtonsContainer>
            </ContactWrapper>
        </FullscreenContainer>
    )
}