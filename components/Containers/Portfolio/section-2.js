import FullscreenContainer from "../FullscreenContainer";
import styled, { css } from 'styled-components'
import { useGlobalContext } from "../../../providers/ContextProvider";
import { motion, useAnimation } from "framer-motion";
import { useCallback, useRef, useState } from "react"
import { useIntersectionRevealer } from 'react-intersection-revealer'
import { useEffect } from "react";
import { easeInOutCubicBezier, easeInOutCustomBezier, useThemeChangeAnim } from "../../../lib/motion";
import Skills from "./Skills";
import { useRouter } from 'next/router'

// BELOW STUFF FOR GRABBING HAND
const GrabbingHandImage = styled(motion.img)`
    height: 2rem;
    position: absolute;
    bottom: 10vh;
    right: 10vw;
    z-index: 99;

    ${({ isPhone }) => (isPhone && css`
        bottom: 28vh;
        right: 25vw;
    `)}
`
const grabbingHandVariants = {
    initial: {
        x: 0,
        opacity: 0
    },
    animate: {
        x: -100,
        opacity: 1,
        transition: {
            ease: easeInOutCustomBezier,
            duration: 1,
            repeat: Infinity,
            repeatType: 'mirror'
        }
    }
}

const GrabbingHand = ({ show }) => {
    const { globalState } = useGlobalContext()
    const { themeName, isPhone } = globalState

    if (show) {
        return (
            <GrabbingHandImage className="grabbing-hand" isPhone={isPhone} animate='animate' initial='initial' variants={grabbingHandVariants} src={themeName === 'LIGHT_THEME'
                ? "/icons/grab.svg"
                : "/icons/grab-night.svg"
            } />
        )
    } else {
        return <></>
    }
}

// BELOW STUFF FOR CONTAINER
const GreenBoxLeft = styled(motion.div)`
    position: absolute;
    top: ${({ isPhone }) => (isPhone ? "80vh" : "62vh")};
    left: 0;
    height: ${({ isPhone }) => (isPhone ? "12.5vh" : "28vh")};
    width: ${({ isPhone }) => (isPhone ? "41.67vw" : "20vw")};
    background-color: ${({ theme }) => (theme.colors.green)};
`

const GreenBoxLeftSkills = styled(motion.div)`
    position: absolute;
    top: ${({ isPhone }) => (isPhone ? "85.5vh" : "65vh")};
    left: ${({ isPhone }) => (isPhone ? "0" : "4vw")};
    height: ${({ isPhone }) => (isPhone ? "12.5vh" : "28vh")};
    width: ${({ isPhone }) => (isPhone ? "41.67vw" : "20vw")};
    background-color: ${({ theme }) => (theme.colors.green)};
    z-index: 53;
`

const RedBoxRight = styled(motion.div)`
    position: absolute;
    top: ${({ isPhone }) => (isPhone ? "8vh" : "0vh")};
    right: ${({ isPhone }) => (isPhone ? "0vw" : "6.25vw")};
    height: ${({ isPhone }) => (isPhone ? "50vh" : "75vh")};
    width: ${({ isPhone }) => (isPhone ? "50vw" : "31.25vw")};
    background-color: ${({ theme }) => (theme.colors.red)};
`

const MeStanding = styled.img`
    position: absolute;
    bottom: 4vh;
    right: 4vw;
    height: ${({ isPhone }) => (isPhone ? "35vh" : "50vh")};
`

const Title = styled(motion.div)`
    font-family: 'Montserrat Alternates';
    font-size: ${({ isPhone }) => (isPhone ? "3rem" : "4.2rem")};
    position: absolute;
    display: flex;
    flex-direction: column;
    left: ${({ isPhone }) => (isPhone ? "14vw" : "12.5vw")};
    bottom: ${({ isPhone }) => (isPhone ? "10vh" : "11.5vh")};
`

const TitleSkills = styled(motion.div)`
    font-family: 'Montserrat Alternates';
    font-size: ${({ isPhone }) => (isPhone ? "3rem" : "4.2rem")};
    position: absolute;
    display: flex;
    flex-direction: column;
    left: ${({ isPhone }) => (isPhone ? "14vw" : "9vw")};
    bottom: ${({ isPhone }) => (isPhone ? "5vh" : "15vh")};
    color: ${({ theme }) => theme.colors.white};
    z-index: 55;
`

const AboutTextContainer = styled(motion.div)`
    font-family: 'Alata';
    position: absolute;
    width: ${({ isPhone }) => (isPhone ? "50vw" : "30vw")};
    top: 10vh;
    right: 20vw;
`

const AboutHeyText = styled.div`
    font-size: ${({ isPhone }) => (isPhone ? "2.5rem" : "3rem")};
`

const AboutDescriptionTextContainer = styled.div`
    font-size: ${({ isPhone }) => (isPhone ? "1rem" : "1.5rem")};
`

const AboutDescriptionText = styled.div`
    margin-bottom: 1rem;
`

const getAge = () => (
    (new Date().getFullYear() - (new Date(process.env.NEXT_PUBLIC_DOB).getFullYear()))
)

const transition = {
    duration: 1.5,
    ease: easeInOutCubicBezier
}

const leftToRightVariants = {
    initial: {
        x: -150,
        opacity: 0
    },
    reveal: {
        x: 0,
        opacity: 1,
        transition: transition
    },
    hide: {
        x: -150,
        opacity: 0,
        transition: transition
    },
    trigger: {
        x: 0,
        opacity: 1,
        transition: { ...transition, delay: 1.8 }
    },
    retract: {
        x: -150,
        opacity: 0,
        transition: transition
    }
}

const rightToLeftVariants = {
    initial: {
        x: 150,
        opacity: 0
    },
    reveal: {
        x: 0,
        opacity: 1,
        transition: transition
    },
    hide: {
        x: 150,
        opacity: 0,
        transition: transition
    }
}

const DeskImage = styled(motion.img)`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    object-fit: cover;
`

// Zoom out effect variants
const zoomOutTransition = {
    ease: easeInOutCustomBezier,
    duration: 2.5
}

const zoomOutDeskImageVariants = {
    initial: {
        scale: 10
    },
    trigger: {
        scale: 1,
        transition: zoomOutTransition
    },
    retract: {
        scale: 10,
        transition: zoomOutTransition
    }
}

const zoomOutPageVariants = {
    initial: {
        scale: 1
    },
    trigger: {
        scale: 0.1,
        transition: zoomOutTransition
    },
    retract: {
        scale: 1,
        transition: zoomOutTransition
    }
}

export default function SectionTwo({ skillsData }) {
    const { globalState } = useGlobalContext()
    const { isPhone } = globalState

    // Anims for components
    const redBoxAnimation = useAnimation()
    const greenBoxAnimation = useAnimation()

    // References to elements trigger animations
    const greenBoxRef = useRef()
    const redBoxRef = useRef()

    // Motion properties of above refs
    const { inView: inViewGreenBox } = useIntersectionRevealer(greenBoxRef)
    const { inView: inViewRedBox } = useIntersectionRevealer(redBoxRef)

    // Trigger anims
    useEffect(() => {
        if (inViewGreenBox) {
            greenBoxAnimation.start('reveal')
        } else {
            greenBoxAnimation.start('hide')
        }
    }, [inViewGreenBox])

    useEffect(() => {
        if (inViewRedBox) {
            redBoxAnimation.start('reveal')
        } else {
            redBoxAnimation.start('hide')
        }
    }, [inViewRedBox])

    // To switch text colors when theme switches
    const { textEmphasisAnimation, textEmphasisVariants } = useThemeChangeAnim()

    // For zoom out effect
    const zoomOutAnim = useAnimation()
    // State to maintain whether to show skills and backdrop
    const [showSkills, setShowSkills] = useState(false)

    // Causes auto trigger anim for #skills and #about
    const router = useRouter()
    const [showGrabbingHand, setShowGrabbingHand] = useState(router?.asPath !== '/#skills' ? true : false)
    useEffect(() => {
        (async () => {
            if (router.asPath === "/#skills") {
                await zoomOutAnim.start('trigger')
                setShowSkills(true)
                setShowGrabbingHand(false)
            } else if (router.asPath === "/#about") {
                zoomOutAnim.start('retract')
                setShowSkills(false)
                setShowGrabbingHand(true)
            }
        })()
    }, [router.asPath])

    // EXP
    const handlePanEnd = useCallback(async (event, info) => {
        if (info.velocity.x < -25) { // Left side pan (trigger)
            setShowGrabbingHand(false)
            await zoomOutAnim.start('trigger')
            setShowSkills(true)
        } else if (info.velocity.x > 25) { // Right side pan (retract)
            zoomOutAnim.start('retract')
            setShowSkills(false)
            setShowGrabbingHand(true)
        }
    }, [zoomOutAnim])

    return (
        <FullscreenContainer id='about' onPanEnd={handlePanEnd} style={{ cursor: 'grab', userSelect: 'none' }} whileTap={{ cursor: 'grabbing' }}>
            <GrabbingHand show={showGrabbingHand} />

            {/* BELOW CONTAINER - DESK IMAGE AND SKILLS*/}
            <FullscreenContainer id='skills' style={{ position: 'absolute' }}>
                <DeskImage src={globalState.themeName === 'LIGHT_THEME' ? "/images/desk.svg" : "/images/desk-night.svg"} alt="Desk image" initial='initial' variants={zoomOutDeskImageVariants} animate={zoomOutAnim} />
                <Skills show={showSkills} skillsData={skillsData} />
                <GreenBoxLeftSkills initial='initial' isPhone={isPhone} variants={leftToRightVariants} animate={zoomOutAnim} />
                <TitleSkills isPhone={isPhone} variants={leftToRightVariants} initial='initial' animate={zoomOutAnim}>
                    My skills
                </TitleSkills>
            </FullscreenContainer>

            {/* BELOW CONTAINER - ABOUT PAGE */}
            <FullscreenContainer style={{ position: 'absolute' }} initial='initial' variants={zoomOutPageVariants} animate={zoomOutAnim}>
                <GreenBoxLeft variants={leftToRightVariants} animate={greenBoxAnimation} ref={greenBoxRef} isPhone={isPhone} />
                <RedBoxRight variants={rightToLeftVariants} animate={redBoxAnimation} ref={redBoxRef} isPhone={isPhone}>
                    <MeStanding isPhone={isPhone} src="/images/me-standing.svg" />
                </RedBoxRight>
                <Title isPhone={isPhone} animate={textEmphasisAnimation} variants={textEmphasisVariants}>
                    {isPhone
                        ? "About me"
                        : <>
                            <div>About</div>
                            <div>me</div>
                        </>
                    }
                </Title>
                <AboutTextContainer isPhone={isPhone} animate={textEmphasisAnimation} variants={textEmphasisVariants}>
                    <AboutHeyText isPhone={isPhone}>hey,</AboutHeyText>
                    <AboutDescriptionTextContainer isPhone={isPhone}>
                        <AboutDescriptionText>
                            I am Sohail Saha, {getAge()}, and I’m a frontend developer.
                        </AboutDescriptionText>
                        <AboutDescriptionText>
                            I use React.js framework for my work, along with several other libraries to add to the aesthetics.
                        </AboutDescriptionText>
                        <AboutDescriptionText>
                            I like perfection and simplicity in whatever I do.
                        </AboutDescriptionText>
                    </AboutDescriptionTextContainer>
                </AboutTextContainer>
            </FullscreenContainer>
        </FullscreenContainer>
    )
}