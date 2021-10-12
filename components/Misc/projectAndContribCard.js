import styled, { css } from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { useState } from 'react'
import { useEffect } from 'react'
import Image from 'next/image'
import { easeInOutCustomBezier } from '../../lib/motion'
import { useCallback } from 'react'
import { useGlobalContext } from '../../providers/ContextProvider'

const ProjectCardContainer = styled(motion.div)`
    width: 40vw;
    height: 40vh;
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Alata';
    box-shadow: ${({ theme }) => `0px 0px 6px ${theme.shadow}`};
    cursor: pointer;
    position: relative;
    overflow: hidden;
    ${({ isPhone }) => (isPhone && css`
        width: 66vw;
        height: 50vh;
    `)}
`

const CardFace = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
    z-index: 2;
    background-position: center center;
    background-size: cover;
`

const CardFaceOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    height: 100%;
    width: 100%;
    background-image: ${({ theme }) => (`linear-gradient(to bottom, transparent 35%, ${theme.colors.black})`)};
`

const CardFaceContent = styled.div`
    position: absolute;
    bottom: 15%;
    left: 8%;
    z-index: 4;
    display: flex;
    flex-direction: column;
    gap: 0.25rem 0;
`

const CardFaceTitle = styled.div`
    font-size: 1.5rem;
`

const CardFaceTagsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.2rem 0.5rem;
    flex-wrap: wrap;

    ${({ isPhone }) => (isPhone && css`
        gap: 0.4rem 0.5rem;
    `)}
`

const CardFaceTag = styled.div`
    background-color: ${({ color }) => color};
    font-size: 0.8rem;
    padding: 0.1rem 0.4rem;
    border-radius: 0.9rem;

    ${({ isPhone }) => (isPhone && css`
        font-size: 0.9rem;
        padding: 0.2rem 0.8rem;
    `)}
`

const DescriptionBox = styled(motion.div)`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: ${({ color }) => color};
    left: 0;
    z-index: 5;
    display: flex;
    flex-direction: column;
    gap: 0.2rem 0;
    overflow-y: auto;
    top: 0;
`

const DescriptionTitle = styled.div`
    font-size: 1.5rem;
    margin: 1rem 1rem 0 1rem;
`

const DescriptionText = styled.div`
    font-size: 1rem;
    margin: 0 1rem 0.5rem 1rem;
`

const DescriptionButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 1rem;
    padding-bottom: 1rem;
`

const DescriptionButtonImg = styled(motion.img)`
    height: 2.5rem;
    width: 2.5rem;
`

const springTransition = {
    type: 'spring',
    bounce: 0.5,
    duration: 1
}

const descriptionBoxVariants = {
    initial: {
        top: '100%'
    },
    animate: {
        top: '0%',
        transition: springTransition
    },
    exit: {
        top: '100%',
        transition: springTransition
    },
    peekIn: {
        top: '80%',
        transition: springTransition
    },
    peekOut: {
        top: '100%',
        transition: springTransition
    }
}

// Stops the card from closing when clicked on links
const handleClick = (e) => {
    e.stopPropagation()
}

const projectCardContainerTransition = {
    duration: 1,
    ease: easeInOutCustomBezier
}

const projectCardContainerVariants = {
    initial: {
        y: 100,
        opacity: 0,
        scale: 1
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: projectCardContainerTransition
    },
    exit: {
        y: 100,
        opacity: 0,
        transition: projectCardContainerTransition
    }
}

const descriptionButtonVariants = {
    whileHover: {
        scale: 1.2,
        transition: {
            duration: 0.5,
            ease: easeInOutCustomBezier,
            repeat: Infinity,
            repeatType: 'mirror'
        }
    }
}

export const ProjectAndContribCard = ({ color, keyVal, backgroundImage, backgroundImageBlur, tags, description, title, liveLink, sourceLink }) => {
    const descriptionBoxAnimate = useAnimation()
    const [isOpen, setisOpen] = useState(false)
    const { globalState } = useGlobalContext()
const { isPhone } = globalState

    // Handles description box open/close
    useEffect(() => {
        if (isOpen) { // If description box opens
            descriptionBoxAnimate.start('animate')
        } else { // If description box closes
            descriptionBoxAnimate.start('exit')
        }
    }, [isOpen])

    // Handles peek when description box is closed
    const handlePeek = useCallback((peekType) => {
        if (!isOpen) {
            switch (peekType) {
                case 'in':
                    descriptionBoxAnimate.start('peekIn')
                    break
                case 'out':
                    descriptionBoxAnimate.start('peekOut')
                    break
            }
        }
    })

    return (
        <ProjectCardContainer isPhone={isPhone} className="project-card-container" key={keyVal} onClick={() => { setisOpen(prev => !prev) }} variants={projectCardContainerVariants} onHoverStart={() => { handlePeek('in') }} onHoverEnd={() => { handlePeek('out') }}>
            <CardFace className="project-card-face">
                <Image src={backgroundImage.path} layout='fill' objectFit='cover' quality={100} alt={backgroundImage.alt} placeholder='blur' blurDataURL={backgroundImageBlur}/>
                <CardFaceOverlay />
                <CardFaceContent>
                    <CardFaceTitle>{title}</CardFaceTitle>
                    <CardFaceTagsContainer isPhone={isPhone}>
                        {tags.map((tagName, index) => (
                            <CardFaceTag key={index} color={color}>{tagName}</CardFaceTag>
                        ))}
                    </CardFaceTagsContainer>
                </CardFaceContent>
            </CardFace>

            <DescriptionBox variants={descriptionBoxVariants} animate={descriptionBoxAnimate} exit='exit' initial='initial' className="project-card-description-box" color={color}>
                <DescriptionTitle>Description</DescriptionTitle>
                <DescriptionText>{description}</DescriptionText>
                <DescriptionButtonContainer>
                    <a href={sourceLink} target='_blank'><DescriptionButtonImg variants={descriptionButtonVariants} whileHover='whileHover' onClick={handleClick} src='/icons/github.svg' alt='-icon' /></a>
                    <a href={liveLink} target='_blank'><DescriptionButtonImg variants={descriptionButtonVariants} whileHover='whileHover' onClick={handleClick} src='/icons/web.svg' alt='-icon' /></a>
                </DescriptionButtonContainer>
            </DescriptionBox>
        </ProjectCardContainer>
    )
}