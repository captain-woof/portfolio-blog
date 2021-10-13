import styled, { css, useTheme } from 'styled-components'
import { useGlobalContext } from '../providers/ContextProvider'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { easeInOutCustomBezier } from '../lib/motion'

const FooterContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.blackDark};
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: content-box;
    font-family: 'Alata';
    color: ${({ theme }) => theme.colors.white};
`

const FooterLinksContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 0 20rem;
    padding: 2rem;

    ${({ isPhone }) => (isPhone && css`
        flex-direction: column;
        gap: 1rem 0;
        padding: 1.5rem;
        justify-content: space-between;
    `)}
`

const FooterLinks = styled.div`
    position: relative;
`

const FooterTitle = styled.div`
    font-size: 2rem;
    position: relative;
    user-select: none;

    ${({ isPhone }) => (isPhone && css`
        font-size: 1.8rem;
    `)}
`

const FooterLinksList = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    position: relative;
`

const FooterLinksListItem = styled(motion.div)`
    position: relative;
`

const FooterCreditsContainer = styled.div`
    position: relative;
    text-align: center;
    font-size: 0.9rem;
    font-weight: normal;
    padding-bottom: 1rem;
`

const getFooterLinkItemVariants = (theme) => ({
    whileHover: {
        color: theme.colors.yellow,
        x: 6,
        transition: {
            duration: 0.6,
            ease: easeInOutCustomBezier
        }
    }
})

export default function Footer() {
    const { globalState } = useGlobalContext()
    const { isPhone, markers } = globalState
    const theme = useTheme()

    // For markers
    const markerData = {
        name: "In this page",
        external: false,
        data: markers
    }

    // For Explore section
    const exploreData = {
        name: "Explore",
        external: false,
        data: [
            { name: 'Home', link: '/' },
            { name: 'Blog', link: '/blog' },
            { name: 'Portfolio', link: '/' },
            { name: 'Resume', link: 'https://drive.google.com/file/d/1se1QKQBUf4yjxSTzRHSfc4OBpB-W4dK2/view?usp=sharing' },
            { name: 'Donate', link: '/donate' },
            { name: 'Contact', link: '/#contact' }
        ]
    }

    // For social links
    const socialData = {
        name: "Follow me",
        external: true,
        data: [
            { name: 'Twitter', link: 'https://twitter.com/realCaptainWoof' },
            { name: 'LinkedIn', link: 'https://www.linkedin.com/in/sohail-saha/' },
            { name: 'Github', link: 'https://github.com/captain-woof' },
            { name: 'Instagram', link: 'https://www.instagram.com/sohail_saha_/' }
        ]
    }

    return (
        <FooterContainer isPhone={isPhone}>
            <FooterLinksContainer isPhone={isPhone}>
                {[markerData, exploreData, socialData].map((footerLinksSection, index) => (
                    <FooterLinks key={index}>
                        <FooterTitle isPhone={isPhone}>{footerLinksSection.name}</FooterTitle>
                        <FooterLinksList>
                            {footerLinksSection.data.map(({ name, link }, index) => (
                                <Link href={link} key={index}><a target={footerLinksSection.external ? '_blank' : null}>
                                    <FooterLinksListItem whileHover='whileHover' variants={getFooterLinkItemVariants(theme)}>{name}</FooterLinksListItem>
                                </a></Link>
                            ))}
                        </FooterLinksList>
                    </FooterLinks>
                ))}
            </FooterLinksContainer>

            <FooterCreditsContainer>
                This site is owned and run by <b>Sohail Saha</b>.
            </FooterCreditsContainer>
        </FooterContainer>
    )
}