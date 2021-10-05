import styled from 'styled-components'
import { easeInOutCustomBezier, useThemeChangeAnim } from '../../../lib/motion'
import { useGlobalContext } from '../../../providers/ContextProvider'
import FullscreenContainer from '../FullscreenContainer'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

const FirstSectionContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;  
  width: ${({ isPhone }) => (isPhone ? "75%" : '390px')};
  margin-top: ${({ isPhone }) => (isPhone ? "35vh" : '15vh')};
  z-index: 3;
  position: absolute;
  user-select: none;
`

const Name = styled(motion.div)`
  font-size: 2.8rem;
  font-family: 'Montserrat Alternates';
  align-self: ${({ isPhone }) => (isPhone ? "center" : "flex-start")};
`

const Subtitle = styled(motion.div)`
  font-size: 1.2rem;
  font-family: 'Alata';
  color: ${({ theme }) => (theme.textColorSubtitle)};
  align-self: flex-end;
`

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;  
  width: ${({ isPhone }) => (isPhone ? "100%" : "60%")};
  z-index: 2;
  position: absolute;
  top: 0;
  max-width: ${({ isPhone }) => (isPhone ? "100%" : "250px")};
  height: 100%;
`

const BlueLeftBox = styled(motion.div)`
    position: absolute;
    height: ${({ isPhone }) => (isPhone ? "35vh" : "55vh")};
    width: ${({ isPhone }) => (isPhone ? "25vw" : "30vw")};
    max-width: 150px;
    background-color: ${({ theme }) => (theme.colors.blue)};
    bottom: 0;
    left: ${({ isPhone }) => (isPhone ? "12.5vw" : "0")};
`

const RedRightBox = styled(motion.div)`
    height: ${({ isPhone }) => (isPhone ? "10vh" : "50vh")};
    width: ${({ isPhone }) => (isPhone ? "40vw" : "25vw")};
    top: ${({ isPhone }) => (isPhone ? "56vh" : "0")};
    right: 0;
    max-width: 125px;
    position: absolute;
    background-color: ${({ theme }) => (theme.colors.red)};
    z-index: 1;
`

const boxTransition = {
    duration: 2,
    ease: easeInOutCustomBezier,
    delay: 1.5
}

export default function FirstSection() {
    const { globalState } = useGlobalContext()
    const { isPhone } = globalState

    const { textEmphasisAnimation: nameAnimation, textSubtitlesAnimation: subtitleAnimation, textEmphasisVariants: nameVariants, textSubtitlesVariants: subtitlesVariants } = useThemeChangeAnim()

    const blueBoxVariants = useMemo(() => ({
        initial: {
            y: (isPhone ? "35vh" : "55vh")
        },
        animate: {
            y: "0vh",
            transition: boxTransition
        }
    }), [isPhone])

    const redBoxVariants = useMemo(() => ({
        initial: {
            y: (isPhone ? "0vh" : "-50vh"),
            x: (isPhone ? "40vw" : "0vw")
        },
        animate: {
            y: "0vh",
            x: "0vw",
            transition: boxTransition
        }
    }), [isPhone])

    return (
        <FullscreenContainer>
            <FirstSectionContainer>
                <BoxContainer isPhone={isPhone}>
                    <RedRightBox variants={redBoxVariants} animate="animate" initial="initial" isPhone={isPhone} />
                    <BlueLeftBox variants={blueBoxVariants} animate="animate" initial="initial" isPhone={isPhone} />
                </BoxContainer>
                <TextContainer isPhone={isPhone}>
                    <Subtitle isPhone={isPhone} animate={subtitleAnimation} variants={subtitlesVariants} initial='initial'>
                        {isPhone ? "Front-end developer" : "Front-end developer."}
                    </Subtitle>
                    <Name isPhone={isPhone} animate={nameAnimation} variants={nameVariants} initial='initial'>
                        {isPhone
                            ? <span>Sohail Saha</span>
                            : <span>sohail<br />saha</span>
                        }
                    </Name>
                </TextContainer>
            </FirstSectionContainer>
        </FullscreenContainer>
    )
}