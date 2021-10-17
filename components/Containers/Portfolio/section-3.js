import styled, { css, useTheme } from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import MinFullscreenContainer from '../MinFullscreenContainer'
import { useGlobalContext } from '../../../providers/ContextProvider'
import { easeInOutCustomBezier, useThemeChangeAnim } from '../../../lib/motion'
import { useEffect, useRef } from 'react'
import { useIntersectionRevealer } from 'react-intersection-revealer'
import { ProjectAndContribCard } from '../../Misc/projectAndContribCard'

const YellowBox = styled(motion.div)`
    background-color: ${({ theme }) => theme.colors.yellow};
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

const ProjectsGridWrapper = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    padding-bottom: 1.5rem;
`

const ProjectsGrid = styled(motion.div)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    position: relative;
    margin-top: 33vh;
    gap: 1rem 1rem;

    ${({ theme: { isPhone } }) => (isPhone && css`
        gap: 2rem 0;
    `)}
`

const yellowBoxTransition = {
    duration: 1.2,
    ease: easeInOutCustomBezier
}

const yellowBoxVariants = {
    initial: {
        x: -150,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: yellowBoxTransition
    },
    exit: {
        x: -150,
        opacity: 0,
        transition: yellowBoxTransition
    }
}

const projectsGridVariants = {
    animate: {
        transition: {
            staggerChildren: 0.5
        }
    }
}

export default function SectionThree({ projectData }) {
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

    // Projects grid anim
    const projectsGridAnimate = useAnimation()
    const projectsGridRef = useRef()
    const { inView: projectsGridInView } = useIntersectionRevealer(projectsGridRef)
    useEffect(() => {
        if (projectsGridInView) {
            projectsGridAnimate.start('animate')
        }
    }, [projectsGridInView])

    // Color for cards
    const theme = useTheme()

    return (
        <MinFullscreenContainer ref={ref} id='projects'>
            <YellowBox isPhone={isPhone} animate={animate} exit='exit' initial='initial' variants={yellowBoxVariants} />
            <Title animate={animate} initial='initial' exit='exit' variants={titleVariants} isPhone={isPhone}>Projects</Title>
            <ProjectsGridWrapper className='projects-grid-wrapper'>
                <ProjectsGrid ref={projectsGridRef} isPhone={isPhone} className='projects-grid' variants={projectsGridVariants} animate={projectsGridAnimate} exit='exit' initial='initial'>
                    {projectData.map((projectCardDetail, index) => (
                        <ProjectAndContribCard color={theme.colors.yellow} key={index} keyVal={index} {...projectCardDetail} />
                    ))}
                </ProjectsGrid>
            </ProjectsGridWrapper>
        </MinFullscreenContainer>
    )
}