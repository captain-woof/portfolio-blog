import { useGlobalContext } from "../providers/ContextProvider"
import styled, { useTheme, css } from 'styled-components'
import Link from 'next/link'
import { useCallback } from "react"
import { easeInOutCubicBezier, easeInOutCustomBezier, useThemeChangeAnim } from "../lib/motion"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useState, useMemo } from "react"

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
    margin-top: ${({ isPhone }) => (isPhone ? '0.2rem' : null)};
`

const ButtonsContainer = styled.div`
    font-size: ${({ isPhone }) => (isPhone ? "0.9rem" : "1rem")};
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
    cursor: pointer;

    @media (max-width: 520px){
        & > button {
            display: none;
        }
    }
`

const ThemeSwitcherIcon = styled(motion.img)`
    height: 1.5rem;
    margin-right: 1rem;

    @media (max-width: 520px){
        margin-right: 2rem;
    }
`

const MenuIcon = styled.img`
    height: 1.5rem;
    margin-right: 1rem;
    @media (min-width: 520px){
        display: none;
    }
`

const Menu = styled.div`
    ${({ theme }) => css`
        /* Menu drop down animation */
        @keyframes drop-down {
            0% {
                transform: translateY(-3rem);
                opacity: 0;
            }
            100% {
                transform: translateY(0rem);
                opacity: 1;
            }
        }

        animation: drop-down 0.6s ease-in-out both;
        background-color: ${theme.backgroundColorElevated};
        color: ${theme.textColorEmphasis};
        box-shadow: 0 0 6px ${theme.shadow};
        position: absolute;
        top: 3.5rem;
        right: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50vw;
        max-width: 200px;
        border-radius: 8px;

        @media (min-width: 520px){
            display: none;
        }
    `}
`

const Button = styled(motion.button)`
    padding: 0rem 1.5rem;
    height: 100%;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: inherit;
    font-family: inherit;

    & > a {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color: ${({ theme }) => theme.textColorEmphasis};
    }

    @media (max-width: 520px){
        & {
            padding: 1.5rem 2rem;
        }

        & > a {
            display: unset;
            flex-direction: unset;
            justify-content: unset;
            align-items: unset;
            font-size: 1rem;
        }
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

// Icon paths for theme switch
const moonIconPath = "/icons/moon.svg"
const sunIconPath = "/icons/sun.svg"
const menuIconPath = '/icons/menu.svg'
const menuNightIconPath = '/icons/menu-night.svg'

export default function Navbar() {
    const { globalState: { origin, isPhone, themeName, scrollDirection }, globalDispatch } = useGlobalContext()

    // Animation for switch theme button
    const switchThemeAnim = useAnimation()

    // Handles theme switcher click
    const handleThemeSwtichClick = useCallback(() => {
        globalDispatch({ type: "SWITCH_THEME" })
        switchThemeAnim.start("onClick")
    }, [])

    // Changes colors according to the theme
    const { textAndBgColorVariants, textAndBgColorAnimation: navbarAnimation } = useThemeChangeAnim()

    // State for menu (mobile)
    const [menuOpen, setMenuOpen] = useState(false)

    // Animation for show/hide triggered on scroll type change
    useEffect(() => {
        navbarAnimation.stop()
        switch (scrollDirection) {
            case 'up':
                navbarAnimation.start('show')
                break
            case 'down':
                navbarAnimation.start('hide')
                setMenuOpen(false)
                break
        }
    }, [scrollDirection])

    // Theme from styled components
    const theme = useTheme()

    // Text anim and variants for menu button texts
    const { textEmphasisAnimation, textEmphasisVariants } = useThemeChangeAnim()

    // Menu items data
    const menuItemsData = useMemo(() => ([
        {
            link: `${origin}/blog`,
            text: 'Blog',
            variants: {
                ...textEmphasisVariants,
                ...getButtonWhileHoverVariants(theme.colors.red)
            }
        },
        {
            link: "https://docs.google.com/document/d/1Ajxoq1DgqpZRshp4L92D_vx2Q6LT8yQm/edit?usp=sharing&ouid=103721458811510265380&rtpof=true&sd=true",
            text: 'Resume',
            variants: {
                ...textEmphasisVariants,
                ...getButtonWhileHoverVariants(theme.colors.yellow)
            }
        },
        {
            link: "https://tools.sohail-saha.in/",
            text: 'Tools',
            variants: {
                ...textEmphasisVariants,
                ...getButtonWhileHoverVariants(theme.colors.blue)
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
    ]), [])

    return (
        <NavbarWrapper onMouseLeave={() => { navbarAnimation.start('hide'); setMenuOpen(false) }} onMouseEnter={() => { navbarAnimation.start('show') }} >
            <NavbarOuterContainer className="navbar-outer-container" isPhone={isPhone} variants={{ ...textAndBgColorVariants, ...navbarVariantsShowHide }} animate={navbarAnimation} initial="initial">
                <NavbarInnerContainer className="navbar-inner-container" isPhone={isPhone}>
                    <Link href={`${origin}/`}><a>
                        <SiteLogo src={themeName === 'LIGHT_THEME' ? '/logos/site_logo.svg' : '/logos/site_logo-night.svg'} alt='Homepage button' isPhone={isPhone} className="site-logo" />
                    </a></Link>
                    <ButtonsContainer className="navbar-buttons-container" isPhone={isPhone}>
                        <ThemeSwitcherIcon alt='Switch Theme button' isPhone={isPhone} src={themeName === "DARK_THEME" ? moonIconPath : sunIconPath} onClick={handleThemeSwtichClick} animate={switchThemeAnim} variants={switchThemeButtonVariants} initial="initial" onHoverStart={() => { switchThemeAnim.start("onHoverStart") }} onHoverEnd={() => { switchThemeAnim.start("onHoverEnd") }} />
                        <MenuIcon isPhone={isPhone} src={themeName === "DARK_THEME" ? menuNightIconPath : menuIconPath} onClick={() => { setMenuOpen(prev => !prev) }} />
                        {menuOpen &&
                            <Menu>
                                {menuItemsData.map((menuItemData, index) => (
                                    <Button isPhone={isPhone} animate={textEmphasisAnimation} key={index} variants={menuItemData.variants} whileHover='whileHover' initial='initial'>
                                        <Link href={menuItemData.link}>
                                            <a >
                                                {menuItemData.text}
                                            </a>
                                        </Link>
                                    </Button>
                                ))}
                            </Menu>
                        }
                        {menuItemsData.map((menuItemData, index) => (
                            <Button isPhone={isPhone} animate={textEmphasisAnimation} key={index} variants={menuItemData.variants} whileHover='whileHover' initial='initial'>
                                <Link href={menuItemData.link}>
                                    <a >
                                        {menuItemData.text}
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