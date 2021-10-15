import { useGlobalContext } from "../providers/ContextProvider"
import styled, { useTheme } from 'styled-components'
import Link from 'next/link'
import { useCallback } from "react"
import { easeInOutCubicBezier, easeInOutCustomBezier, useThemeChangeAnim } from "../lib/motion"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

const NavbarWrapper = styled.div`
    height: ${({ isPhone }) => (isPhone ? "3.5rem" : "4rem")};
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    font-family: 'Alata';
    z-index: 99;
`

const NavbarOuterContainer = styled(motion.div)`    
    height: 100%;
    width: 100%;
    box-shadow: ${({ theme }) => (`0px 1px 4px ${theme.shadow}`)};
`

const NavbarInnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    margin: ${({ isPhone }) => (isPhone ? "0 0.8rem" : "0 2rem")};
`

const SiteLogo = styled.img`
    height: ${({ isPhone }) => (isPhone ? "2rem" : "2.4rem")};
    margin-top: ${({isPhone}) => (isPhone ? '0.2rem' : null)};
`

const ButtonsContainer = styled.div`
    font-size: ${({ isPhone }) => (isPhone ? "0.9rem" : "1rem")};
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
    cursor: pointer;
`

const ThemeSwitcherIcon = styled(motion.img)`
    height: 1.5rem;
    margin-right: 1rem;
`

const Button = styled(motion.div)`
    padding: ${({ isPhone }) => (isPhone ? "0rem 0.6rem" : "0rem 1.5rem")};
    height: 100%;
    a {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
`

const getButtonWhileHoverVariants = (backgroundColorOnHover) => ({
    whileHover: {
        backgroundColor: backgroundColorOnHover,
        transition: {
            ease: easeInOutCustomBezier,
            duration: 0.9
        },
    }
})

// Variants for theme switch button
const switchThemeButtonTransition = {
    type: 'spring',
    stiffness: 50,
}

const switchThemeButtonVariants = {
    initial: {
        rotateZ: '0deg',
    },
    onHoverStart: {
        rotateZ: '180deg',
        transition: switchThemeButtonTransition
    },
    onHoverEnd: {
        rotateZ: '0deg',
        transition: switchThemeButtonTransition
    },
    onClick: {
        rotateZ: '720deg',
        transition: switchThemeButtonTransition
    }
}

const navbarVariantsShowHide = {
    show: {
        y: '0rem',
        transition: {
            duration: 0.8,
            ease: easeInOutCubicBezier
        }
    },
    hide: {
        y: '-4rem',
        transition: {
            duration: 0.8,
            ease: easeInOutCubicBezier
        }
    }
}

export default function Navbar() {
    const { globalState, globalDispatch } = useGlobalContext()
    const { isPhone } = globalState

    // Icon paths for theme switch
    const moonIconPath = "/icons/moon.svg"
    const sunIconPath = "/icons/sun.svg"

    // Animation for switch theme button
    const switchThemeAnim = useAnimation()

    // Handles theme switcher click
    const handleThemeSwtichClick = useCallback(() => {
        globalDispatch({ type: "SWITCH_THEME" })
        switchThemeAnim.start("onClick")
    }, [])

    // Changes colors according to the theme
    const { textAndBgColorVariants, textAndBgColorAnimation: navbarAnimation } = useThemeChangeAnim()

    // Animation for show/hide triggered on scroll type change
    useEffect(() => {
        navbarAnimation.stop()
        switch (globalState.scrollDirection) {
            case 'up':
                navbarAnimation.start('show')
                break
            case 'down':
                navbarAnimation.start('hide')
                break
        }
    }, [globalState.scrollDirection])

    // Theme from styled components
    const theme = useTheme()

    // Text anim and variants for menu button texts
    const { textEmphasisAnimation, textEmphasisVariants } = useThemeChangeAnim()
    const { globalState: { origin, themeName } } = useGlobalContext()

    return (
        <NavbarWrapper onMouseOver={() => { navbarAnimation.start('show') }} onMouseOut={() => { navbarAnimation.start('hide') }}>
            <NavbarOuterContainer className="navbar-outer-container" isPhone={isPhone} variants={{ ...textAndBgColorVariants, ...navbarVariantsShowHide }} animate={navbarAnimation} initial="initial">
                <NavbarInnerContainer className="navbar-inner-container" isPhone={isPhone}>
                    <Link href={`${origin}/`}><a>
                        <SiteLogo src={themeName === 'LIGHT_THEME' ? '/logos/site_logo.svg' : '/logos/site_logo-night.svg'} alt='Site logo' isPhone={isPhone} className="site-logo" />
                    </a></Link>
                    <ButtonsContainer className="navbar-buttons-container" isPhone={isPhone}>
                        <ThemeSwitcherIcon isPhone={isPhone} src={globalState.themeName === "DARK_THEME" ? moonIconPath : sunIconPath} onClick={handleThemeSwtichClick} animate={switchThemeAnim} variants={switchThemeButtonVariants} initial="initial" onHoverStart={() => { switchThemeAnim.start("onHoverStart") }} onHoverEnd={() => { switchThemeAnim.start("onHoverEnd") }} />
                        {[
                            {
                                link: `${origin}/blog`,
                                text: 'Blog',
                                variants: {
                                    ...textEmphasisVariants,
                                    ...getButtonWhileHoverVariants(theme.colors.red)
                                }
                            },
                            {
                                link: "https://drive.google.com/file/d/1se1QKQBUf4yjxSTzRHSfc4OBpB-W4dK2/view?usp=sharing",
                                text: 'Resume',
                                variants: {
                                    ...textEmphasisVariants,
                                    ...getButtonWhileHoverVariants(theme.colors.yellow)
                                }
                            },
                            {
                                link: `${origin}/#contact`,
                                text: 'Contact',
                                variants: {
                                    ...textEmphasisVariants,
                                    ...getButtonWhileHoverVariants(theme.colors.green)
                                }
                            }
                        ].map((buttonData, index) => (
                            <Button isPhone={isPhone} animate={textEmphasisAnimation} key={index} variants={buttonData.variants} whileHover='whileHover' initial='initial'>
                                <Link href={buttonData.link}>
                                    <a >
                                        {buttonData.text}
                                    </a>
                                </Link>
                            </Button>
                        ))}
                    </ButtonsContainer>
                </NavbarInnerContainer >
            </NavbarOuterContainer >
        </NavbarWrapper>
    )
}