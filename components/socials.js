import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { easeOutQuintBezier } from '../lib/motion'

const SocialsContainer = styled.div`
    display: flex;
    gap: 0 0.5rem;
    flex-wrap: nowrap;

    ${({theme: {isPhone}}) => (isPhone && css`
        gap: 0 0.6rem;
    `)}
`

const SocialIconWrapper = styled.div`
    ${({ theme: { isPhone, colors }, colored, color }) => (css`
        border-radius: 50%;
        background-color: ${colors.blackLight};
        height: 3rem;
        width: 3rem;
        position: relative;
        align-self: flex-end;

        ${colored && css`
            background-color: ${color};
        `}

        ${isPhone && css`
            height: 2.2rem;
            width: 2.2rem;
        `}
    `)}
`

const SocialIcon = styled(motion.img)`
    ${({ theme: { isPhone } }) => (css`
        padding: 0.75rem;
        height: 100%;

        ${isPhone && css`
            padding: 0.5rem;
        `}
    `)}
`

const iconVariants = {
    whileHover: {
        scale: 1.2,
        transition: {
            duration: 1,
            ease: easeOutQuintBezier
        }
    }
}

export default function Socials({ colored = false, style }) {
    // colored flavor shows colored icons

    // For social links
    const socialsData = [
        { name: 'Twitter', link: 'https://twitter.com/realCaptainWoof', color: '#1DA1F2', icon: '/icons/twitter.svg' },
        { name: 'LinkedIn', link: 'https://www.linkedin.com/in/sohail-saha/', color: '#2867B2', icon: '/icons/linkedin.svg' },
        { name: 'Github', link: 'https://github.com/captain-woof', color: '#000000', icon: '/icons/github.svg' },
        { name: 'Instagram', link: 'https://www.instagram.com/sohail_saha_/', color: '#bc2a8d', icon: '/icons/instagram.svg' }
    ]

    return (
        <SocialsContainer style={style}>
            {socialsData.map((socialData, index) => (
                <a href={socialData.link} target='_blank' key={index}>
                    <SocialIconWrapper color={socialData.color} colored={colored}>
                        <SocialIcon alt={socialData.name} src={socialData.icon} variants={iconVariants} whileHover='whileHover' />
                    </SocialIconWrapper>
                </a>
            ))}
        </SocialsContainer>
    )
}