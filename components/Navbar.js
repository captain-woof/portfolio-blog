import { useGlobalContext } from "../providers/ContextProvider"
import styled from 'styled-components'
import Link from 'next/link'
import { useCallback } from "react"
import { useThemeChangeAnim } from "../lib/motion"
import { motion, useAnimation } from "framer-motion"

const NavbarOuterContainer = styled(motion.div)`    
    height: ${({ isPhone }) => (isPhone ? "3.5rem" : "2.5rem")};
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    font-family: 'Alata';
    box-shadow: ${({ theme }) => (`0px 1px 4px ${theme.shadow}`)};
    z-index: 99;
`

const NavbarInnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    margin: ${({ isPhone }) => (isPhone ? "0 0.8rem" : "0 1rem")};
`

const TitleContainer = styled.div`
    font-size: ${({ isPhone }) => (isPhone ? "1.2rem" : "0.75rem")};
`

const ButtonsContainer = styled.div`
    font-size: ${({ isPhone }) => (isPhone ? "0.9rem" : "0.62rem")};
    display: flex;
    flex-direction: row;
    gap: ${({ isPhone }) => (isPhone ? "0rem 0.4rem" : "0rem 1rem")};
    height: 100%;
    align-items: center;
    cursor: pointer;
`

const ThemeSwitcherIcon = styled(motion.img)`
    height:  ${({ isPhone }) => (isPhone ? "1.2rem" : "1rem")};
    width: ${({ isPhone }) => (isPhone ? "1.2rem" : "1rem")};
`

const Button = styled.div`
    padding: 0rem 0.2rem;
    height: 100%;
    a {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
`

// Variants for theme switch button
const transition = {
    type: 'spring',
    stiffness: 50,
}

const switchThemeButtonVariants = {
    initial: {
        rotateZ: '0deg',
    },
    onHoverStart: {
        rotateZ: '180deg',
        transition: transition
    },
    onHoverEnd: {
        rotateZ: '0deg',
        transition: transition
    },
    onClick: {
        rotateZ: '720deg',
        transition: transition
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
    const { textAndBgColorVariants, textAndBgColorAnimation } = useThemeChangeAnim()

    return (
        <NavbarOuterContainer className="navbar-outer-container" isPhone={isPhone} variants={textAndBgColorVariants} animate={textAndBgColorAnimation} initial="initial">
            <NavbarInnerContainer className="navbar-inner-container" isPhone={isPhone}>
                <TitleContainer className="navbar-title-container" isPhone={isPhone}>
                    <Link href={globalState.baseUrl}><a>Sohail Saha</a></Link>
                </TitleContainer>
                <ButtonsContainer className="navbar-buttons-container" isPhone={isPhone}>
                    <ThemeSwitcherIcon isPhone={isPhone} src={globalState.themeName === "DARK_THEME" ? moonIconPath : sunIconPath} onClick={handleThemeSwtichClick} animate={switchThemeAnim} variants={switchThemeButtonVariants} initial="initial" onHoverStart={() => {switchThemeAnim.start("onHoverStart")}} onHoverEnd={() => {switchThemeAnim.start("onHoverEnd")}}/>
                    <Button><Link href={`${globalState.baseUrl}/blog`}><a>Blog</a></Link></Button>
                    <Button><Link href="https://drive.google.com/file/d/1se1QKQBUf4yjxSTzRHSfc4OBpB-W4dK2/view?usp=sharing"><a>Resume</a></Link></Button>
                    <Button><Link href={`${globalState.baseUrl}/#contact`}><a>Contact</a></Link></Button>
                </ButtonsContainer>
            </NavbarInnerContainer >
        </NavbarOuterContainer >
    )
}