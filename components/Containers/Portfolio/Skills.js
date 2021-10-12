import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { useGlobalContext } from '../../../providers/ContextProvider'
import { easeInOutCustomBezier, useThemeChangeAnim } from '../../../lib/motion'
import Backdrop from '../../Misc/backdrop'
import { useEffect } from 'react'

const SkillsContainer = styled(motion.div)`
    border-radius: 12px;
    right: 4vw;
    z-index: 51;
    position: absolute;
    width: 40%;
    max-width: 500px;
    height: 80%;
    box-shadow: ${({ theme }) => (`-0.1rem 0.1rem 0.5rem ${theme.shadow}`)};
    overflow-y: scroll;
    overflow-x: hidden;
    ${({ isPhone }) => (isPhone && css`
        width: 70%;
        right: 6vw;
        height: 75%;
    `)}
`

const SkillsGrid = styled.div`
    margin: 2.5rem;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem 1.5rem;
    display: flex;
    justify-content: center;
    height: max-content;
    user-select: none;
`

const Logo = styled(motion.img)`
    height: 80px;
    width: 80px;
    position: relative;
    ${({ shadow, theme }) => (shadow && css`
        border-radius: 40px;
        box-shadow: 0px 0px 6px ${theme.shadow}
    `)}
`

const transition = {
    duration: 1.5,
    ease: easeInOutCustomBezier,
    staggerChildren: 0.2,
}

const logoVariants = {
    initial: {
        y: 100,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: { ...transition, duration: 1.2 }
    },
    exit: {
        y: 100,
        opacity: 0,
        transition: { ...transition, duration: 1.2 }
    }
}

export default function Skills({ show }) {
    const { globalState } = useGlobalContext()
const { isPhone } = globalState

    const { backgroundColorVariants: skillsVariants, backgroundColorAnimation: skillsAnim } = useThemeChangeAnim({
        backgroundColorVariants: {
            initial: {
                top: '100vh',
                opacity: 0,
                scale: 0.4
            },
            animate: {
                top: '4vh',
                opacity: 1,
                scale: 1,
                transition: transition
            },
            exit: {
                top: '100vh',
                opacity: 0,
                scale: 0.4,
                transition: transition
            }
        }
    })

    // Trigger animate/exit based on 'show' (boolean)
    useEffect(() => {
        if (show) {
            skillsAnim.start('animate')
        } else {
            skillsAnim.start('exit')
        }
    }, [show])

    // Array of skill logos
    const logos = [
        { imgPath: "/logos/html_logo.svg", shadow: false },
        { imgPath: "/logos/css_logo.svg", shadow: false },
        { imgPath: "/logos/javascript_logo.svg", shadow: false },
        { imgPath: "/logos/react_logo.svg", shadow: false },
        { imgPath: "/logos/framer_motion_logo.svg", shadow: false },
        { imgPath: "/logos/styled-components.svg", shadow: true },
        { imgPath: "/logos/nextjs_logo.svg", shadow: true },
        { imgPath: "/logos/nodejs_logo.svg", shadow: true },
        { imgPath: "/logos/express_logo.svg", shadow: true },
        { imgPath: "/logos/mongodb_logo.svg", shadow: true },
        { imgPath: "/logos/mysql_logo.svg", shadow: true },
        { imgPath: "/logos/electron_logo.svg", shadow: false },
        { imgPath: "/logos/premirepro_logo.svg", shadow: false },
        { imgPath: "/logos/photoshop_logo.svg", shadow: false },
        { imgPath: "/logos/inkscape_logo.svg", shadow: true },
        { imgPath: "/logos/audacity_logo.svg", shadow: false },
        { imgPath: "/logos/windows_logo.svg", shadow: false },
        { imgPath: "/logos/linux_logo.svg", shadow: false },
        { imgPath: "/logos/bash_logo.svg", shadow: false },
        { imgPath: "/logos/python_logo.svg", shadow: false }
    ]

    const logoMotionProps = {
        whileHover: {
            scale: 1.1
        }
    }

    return (
        <>
            <Backdrop key='backdrop' animate={skillsAnim} />
            <SkillsContainer animate={skillsAnim} initial='initial' exit='exit' className='skills-container' variants={skillsVariants} isPhone={isPhone}>
                <SkillsGrid className="skills-grid">
                    {logos.map((imgDetail, index) => {
                        let imgPathArr = imgDetail.imgPath.split("/")
                        let slug = imgPathArr[imgPathArr.length - 1]
                        return (
                            <Logo {...logoMotionProps} className="skill-logo" key={index} src={imgDetail.imgPath} alt={slug} variants={logoVariants} shadow={imgDetail.shadow} />
                        )
                    })}
                </SkillsGrid>
            </SkillsContainer>
        </>
    )
}