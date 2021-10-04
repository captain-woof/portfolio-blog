import { useGlobalContext } from "../providers/ContextProvider"
import styled from 'styled-components'
import Link from 'next/link'
import { useCallback } from "react"

const NavbarOuterContainer = styled.div`    
    height: ${({isPhone}) => (isPhone ? "3.5rem" : "2.5rem")};
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    font-family: 'Alata';
    box-shadow: ${({ theme }) => (`0px 1px 4px ${theme.shadow}`)};
`

const NavbarInnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    margin: ${({isPhone}) => (isPhone ? "0 0.8rem" : "0 1rem")};
`

const TitleContainer = styled.div`
    font-size: ${({isPhone}) => (isPhone ? "1.2rem" : "0.75rem")};
`

const ButtonsContainer = styled.div`
    font-size: ${({isPhone}) => (isPhone ? "0.9rem" : "0.62rem")};
    display: flex;
    flex-direction: row;
    gap: ${({isPhone}) => (isPhone ? "0rem 0.4rem" : "0rem 1rem")};
    height: 100%;
    align-items: center;
    cursor: pointer;
`

const ThemeSwitcherIcon = styled.img`
    height:  ${({isPhone}) => (isPhone ? "1.2rem" : "1rem")};
    width: ${({isPhone}) => (isPhone ? "1.2rem" : "1rem")};
    transition: all 0.5s ease-in;
    :hover {
        transform: rotateZ(180deg);
    }
`

const Button = styled.div`
    padding: 0rem 0.2rem;
    height: 100%;
    :hover {
        background-color: ${({ theme }) => (theme.textColorEmphasis)};
        color: ${({ theme }) => (theme.backgroundColor)};
        transition: all 0.7s ease-in-out;
    }
    a {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
`

export default function Navbar() {
    const { globalState, globalDispatch } = useGlobalContext()
    const { isPhone } = globalState

    // Icon paths for theme switch
    const moonIconPath = "/icons/moon.svg"
    const sunIconPath = "/icons/sun.svg"

    // Handles theme switcher click
    const handleThemeSwtichClick = useCallback(() => {
        globalDispatch({type: "SWITCH_THEME"})
    }, [])

    return (
        <NavbarOuterContainer className="navbar-outer-container" isPhone={isPhone}>
            <NavbarInnerContainer className="navbar-inner-container" isPhone={isPhone}>
                <TitleContainer className="navbar-title-container" isPhone={isPhone}>
                    <Link href={globalState.baseUrl}><a>Sohail Saha</a></Link>
                </TitleContainer>
                <ButtonsContainer className="navbar-buttons-container" isPhone={isPhone}>
                    <ThemeSwitcherIcon isPhone={isPhone} src={globalState.themeName === "DARK_THEME" ? moonIconPath : sunIconPath} onClick={handleThemeSwtichClick}/>
                    <Button><Link href={`${globalState.baseUrl}/blog`}><a>Blog</a></Link></Button>
                    <Button><Link href="https://drive.google.com/file/d/1se1QKQBUf4yjxSTzRHSfc4OBpB-W4dK2/view?usp=sharing"><a>Resume</a></Link></Button>
                    <Button><Link href={`${globalState.baseUrl}/#contact`}><a>Contact</a></Link></Button>
                </ButtonsContainer>
            </NavbarInnerContainer >
        </NavbarOuterContainer >
    )
}