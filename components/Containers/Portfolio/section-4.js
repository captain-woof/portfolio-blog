import styled, { css, useTheme } from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import MinFullscreenContainer from '../MinFullscreenContainer'
import { useGlobalContext } from '../../../providers/ContextProvider'
import { easeInOutCustomBezier, useThemeChangeAnim } from '../../../lib/motion'
import { useEffect, useRef } from 'react'
import { useIntersectionRevealer } from 'react-intersection-revealer'
import { ProjectAndContribCard } from '../../Misc/projectAndContribCard'

const BlueBox = styled(motion.div)`
    background-color: ${({ theme }) => theme.colors.blue};
    height: 16.6vh;
    width: 25vw;
    top: 8.3vh;
    left: 0;
    position: absolute;
    
    ${({ isPhone }) => (isPhone && css`
        height: 12.5vh;
        width: 33vw;
        top: 12.5vh;
    `)}
`

const Title = styled(motion.div)`
    font-family: 'Montserrat Alternates';
    position: absolute;
    top: 9vh;
    left: 10vw;
    font-size: 4.5rem;

    ${({ isPhone }) => (isPhone && css`
        top: 14vh;
        font-size: 3rem;
    `)}
`

const OpenSourceContribsGridWrapper = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    padding-bottom: 1.5rem;
`

const OpenSourceContribsGrid = styled(motion.div)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    position: relative;
    margin-top: 33vh;
    gap: 1rem 1rem;
`

const blueBoxTransition = {
    duration: 1.2,
    ease: easeInOutCustomBezier
}

const blueBoxVariants = {
    initial: {
        x: -150,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: blueBoxTransition
    },
    exit: {
        x: -150,
        opacity: 0,
        transition: blueBoxTransition
    }
}

const openSourceContribsGridVariants = {
    animate: {
        transition: {
            staggerChildren: 0.5
        }
    }
}

export default function SectionFour({ openSourceContribData }) {
    const { globalState } = useGlobalContext()
    const { isPhone } = globalState
    const { textEmphasisAnimation: animate, textEmphasisVariants: titleVariants } = useThemeChangeAnim()

    // To start animation when in view
    const ref = useRef()
    const { inView } = useIntersectionRevealer(ref)
    useEffect(() => {
        if (inView) { // start anim
            animate.start('animate')
        } else { // exit anim
            animate.start('exit')
        }
    }, [inView])

    // OpenSourceContribs grid anim
    const openSourceContribsGridAnimate = useAnimation()
    const openSourceContribsGridRef = useRef()
    const { inView: openSourceContribsGridInView } = useIntersectionRevealer(openSourceContribsGridRef)
    useEffect(() => {
        if (openSourceContribsGridInView) {
            openSourceContribsGridAnimate.start('animate')
        }
    }, [openSourceContribsGridInView])

    // Color for card
    const theme = useTheme()

    return (
        <MinFullscreenContainer ref={ref}>
            <BlueBox isPhone={isPhone} animate={animate} exit='exit' initial='initial' variants={blueBoxVariants} />
            <Title animate={animate} initial='initial' exit='exit' variants={titleVariants} isPhone={isPhone}>Open Source</Title>
            <OpenSourceContribsGridWrapper className='openSourceContribs-grid-wrapper'>
                <OpenSourceContribsGrid ref={openSourceContribsGridRef} isPhone={isPhone} className='openSourceContribs-grid' variants={openSourceContribsGridVariants} animate={openSourceContribsGridAnimate} exit='exit' initial='initial'>
                    {openSourceContribData.map((openSourceContribCardDetail, index) => (
                        <ProjectAndContribCard color={theme.colors.blue} key={index} keyVal={index} {...openSourceContribCardDetail}/>
                    ))}
                </OpenSourceContribsGrid>
            </OpenSourceContribsGridWrapper>
        </MinFullscreenContainer>
    )
}