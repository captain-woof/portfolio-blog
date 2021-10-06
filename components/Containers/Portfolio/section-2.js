import FullscreenContainer from "../FullscreenContainer";
import styled from 'styled-components'
import { useGlobalContext } from "../../../providers/ContextProvider";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useCallback, useRef } from "react"
import { useIntersectionRevealer } from 'react-intersection-revealer'
import { useEffect } from "react";
import { easeInOutCubicBezier, easeInOutCustomBezier, useThemeChangeAnim } from "../../../lib/motion";

const GreenBoxLeft = styled(motion.div)`
    position: absolute;
    top: ${({ isPhone }) => (isPhone ? "80vh" : "62vh")};
    left: 0;
    height: ${({ isPhone }) => (isPhone ? "12.5vh" : "28vh")};
    width: ${({ isPhone }) => (isPhone ? "41.67vw" : "20vw")};
    background-color: ${({ theme }) => (theme.colors.green)};
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
    trigger: {
        scale: 1,
        transition: zoomOutTransition
    },
    retract: {
        scale: 10,
        transition: zoomOutTransition
    }
}

const getZoomOutDeskContainerVariants = (outerContainerNumOfPages) => ({
    initial: {
        top: '0vh',
    },
    trigger: {
        top: `${(outerContainerNumOfPages - 1) * 100}vh`,
        transition: zoomOutTransition
    },
    retract: {
        top: '0vh',
        transition: zoomOutTransition
    }
})

const getZoomOutPageVariants = (outerContainerNumOfPages) => ({
    initial: {
        top: '0vh',
        scale: 1
    },
    trigger: {
        top: `${(outerContainerNumOfPages - 1) * 100}vh`,
        scale: 0.1,
        transition: zoomOutTransition
    },
    retract: {
        top: '0vh',
        scale: 1,
        transition: zoomOutTransition
    }
})

export default function SectionTwo() {
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
    const refOuterContainer = useRef()
    const outerContainerNumOfPages = 1.1
    const outerContainerTriggerZoomoutBreakpoint = 0.05
    const { scrollYProgress } = useIntersectionRevealer(refOuterContainer)
    const zoomOutAnim = useAnimation()

    const isBreakpointTriggered = useCallback(() => {
        return (scrollYProgress >= outerContainerTriggerZoomoutBreakpoint && scrollYProgress !== 1)
    }, [scrollYProgress])

    // Tracking when outer container scroll reaches breakpoint to trigger zoom out effect
    useEffect(() => {
        if (isBreakpointTriggered()) { // Trigger effect
            zoomOutAnim.start('trigger')
        } else { // Retract effect
            zoomOutAnim.start('retract')
        }
    }, [scrollYProgress])

    return (
        <FullscreenContainer ref={refOuterContainer} numberOfPages={outerContainerNumOfPages} >
            {/* This parent container is 4 viewports long, for the zoom out effect */}
            <FullscreenContainer style={{ position: 'absolute' }} initial='initial' variants={getZoomOutDeskContainerVariants(outerContainerNumOfPages)} animate={zoomOutAnim}>
                <DeskImage src={globalState.themeName === 'LIGHT_THEME' ? "/images/desk.svg" : "/images/desk-night.svg"} alt="Desk image" initial={{ scale: (isBreakpointTriggered() ? 1 : 10) }} variants={zoomOutDeskImageVariants} animate={zoomOutAnim} />
            </FullscreenContainer>
            <FullscreenContainer style={{ position: 'absolute' }} initial='initial' variants={getZoomOutPageVariants(outerContainerNumOfPages)} animate={zoomOutAnim}>
                {/* This is the inner container that holds the page, 1 viewport long */}
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