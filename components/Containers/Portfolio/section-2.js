import FullscreenContainer from "../FullscreenContainer";
import styled from 'styled-components'
import { useGlobalContext } from "../../../providers/ContextProvider";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useRef } from "react"
import { useIntersectionRevealer } from 'react-intersection-revealer'
import { useEffect } from "react";
import { easeInOutCubicBezier, useThemeChangeAnim } from "../../../lib/motion";

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
    font-size: ${({isPhone}) => (isPhone ? "3rem" : "4.2rem")};
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
    font-size: ${({isPhone}) => (isPhone ? "2.5rem" : "3rem")};
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

export default function SectionTwo() {
    const { globalState } = useGlobalContext()
    const { isPhone } = globalState

    // Ref to inner container
    const refInnerContainer = useRef()

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

    return (
        <FullscreenContainer numberOfPages={2} >
            {/* This parent container is 2 viewports long, for the zoom out effect */}
            <FullscreenContainer ref={refInnerContainer}>
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