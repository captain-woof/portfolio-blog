import styled from 'styled-components'
import { easeOutQuintBezier, useThemeChangeAnim } from '../../../lib/motion'
import { useGlobalContext } from '../../../providers/ContextProvider'
import FullscreenContainer from '../FullscreenContainer'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

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
  width: ${({ isPhone }) => (isPhone ? "75%" : '64%')};
  margin-top: ${({ isPhone }) => (isPhone ? "35vh" : '15vh')};
  z-index: 3;
  position: absolute;
  user-select: none;
  max-width: 600px;
`

const NameContainer = styled(motion.div)`
  font-size: ${({isPhone}) => (isPhone ? "2.8rem" : "4.8rem")};
  font-family: 'Montserrat Alternates';
  align-self: ${({ isPhone }) => (isPhone ? "center" : "flex-start")};
  overflow: hidden;
  display: flex;
  flex-direction: row;
`

const SubtitleContainer = styled.div`
  font-size: ${({isPhone}) => (isPhone ? "1.2rem" : "1.8rem")};
  font-family: 'Alata';
  color: ${({ theme }) => (theme.textColorSubtitle)};
  align-self: flex-end;
  overflow: hidden;
`

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;  
  width: ${({ isPhone }) => (isPhone ? "100%" : "50%")};
  z-index: 2;
  position: absolute;
  top: 0;
  height: 100%;
  max-width: 500px;
`

const BlueLeftBox = styled(motion.div)`
    position: absolute;
    height: ${({ isPhone }) => (isPhone ? "35vh" : "55vh")};
    width: ${({ isPhone }) => (isPhone ? "25vw" : "30vw")};
    background-color: ${({ theme }) => (theme.colors.blue)};
    bottom: 0;
    left: ${({ isPhone }) => (isPhone ? "12.5vw" : "0")};
    max-width: 305px;
`

const RedRightBox = styled(motion.div)`
    height: ${({ isPhone }) => (isPhone ? "10vh" : "50vh")};
    width: ${({ isPhone }) => (isPhone ? "40vw" : "25vw")};
    top: ${({ isPhone }) => (isPhone ? "56vh" : "0")};
    right: 0;
    position: absolute;
    background-color: ${({ theme }) => (theme.colors.red)};
    z-index: 1;
    max-width: 256px;
`

const boxTransition = {
    duration: 3,
    ease: easeOutQuintBezier,
    delay: 0.7
}

const blueBoxVariants = {
    initial: {
        y: "55vh"
    },
    initialPhone: {
        y: "35vh"
    },
    animate: {
        y: "0vh",
        transition: boxTransition
    }
}

const redBoxVariants = {
    initial: {
        y: "-50vh",
        x: "0vw"
    },
    initialPhone: {
        y: "0vh",
        x: "40vw"
    },
    animate: {
        y: "0vh",
        x: "0vw",
        transition: boxTransition
    }
}

const textTransition = {
    duration: 0.9,
    ease: easeOutQuintBezier,
    staggerChildren: 0.12,
    when: 'beforeChildren'
}

export default function SectionOne() {
    const { globalState } = useGlobalContext()
const { isPhone } = globalState

    const { textEmphasisAnimation: nameAnimation, textSubtitlesAnimation: subtitleAnimation, textEmphasisVariants: nameVariants, textSubtitlesVariants: subtitlesVariants } = useThemeChangeAnim({
        textEmphasisVariants: {
            initial: {
                opacity: 0,
                y: 100
            },
            animate: {
                opacity: 1,
                y: 0,
                transition: textTransition
            }
        },
        textSubtitlesVariants: {
            initial: {
                x: -100,
                opacity: 0
            },
            animate: {
                x: 0,
                opacity: 1,
                transition: { ...textTransition, duration: 2 }
            }
        }
    })

    // Handles animation sequence
    // First text, then box
    const boxAnimation = useAnimation()
    useEffect(() => {
        (async () => {
            boxAnimation.stop()

            nameAnimation.set('initial')
            subtitleAnimation.set('initial')
            boxAnimation.set(isPhone ? "initialPhone" : "initial")

            await nameAnimation.start('animate')
            subtitleAnimation.start('animate')
            boxAnimation.start("animate")
        })()

    }, [isPhone])

    return (
        <FullscreenContainer>
            <FirstSectionContainer>
                <BoxContainer isPhone={isPhone}>
                    <RedRightBox variants={redBoxVariants} animate={boxAnimation} isPhone={isPhone} />
                    <BlueLeftBox variants={blueBoxVariants} animate={boxAnimation} isPhone={isPhone} />
                </BoxContainer>
                <TextContainer isPhone={isPhone}>
                    <SubtitleContainer isPhone={isPhone}>
                        <motion.div animate={subtitleAnimation} variants={subtitlesVariants} initial='initial'>
                            Web3 Developer
                        </motion.div>
                    </SubtitleContainer>
                    <NameContainer isPhone={isPhone} animate={nameAnimation} variants={{ ...nameVariants, initial: { y: 0 } }} initial='initial'>
                        {(isPhone ? "Sohail Saha" : "sohail").split("").map((letter, index) => (
                            (letter === ' '
                                ? (isPhone
                                    ? <motion.div key={index} variants={nameVariants}>&nbsp;</motion.div>
                                    : null
                                )
                                : <motion.div key={index} variants={nameVariants} > {letter}</motion.div>)
                        ))}
                    </NameContainer>
                    {!isPhone &&
                        <NameContainer isPhone={isPhone} animate={nameAnimation} variants={{ ...nameVariants, initial: { y: 0 } }} initial='initial'>
                            {"saha".split("").map((letter, index) => (
                                <motion.div key={index} variants={nameVariants}>{letter}</motion.div>
                            ))}
                        </NameContainer>
                    }
                </TextContainer>
            </FirstSectionContainer>
        </FullscreenContainer >
    )
}