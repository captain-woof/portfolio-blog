import styled, { css } from 'styled-components'
import Link from 'next/link'
import { useGlobalContext } from '../../providers/ContextProvider'
import { easeInOutCustomBezier, useThemeChangeAnim } from '../../lib/motion'
import { motion } from 'framer-motion'

const TagsContainer = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem 0.5rem;
    font-family: 'Poppins';
    color: ${({ theme }) => theme.colors.white};
`

const Tag = styled(motion.div)`
    padding: 0.12rem 1.2rem;
    border-radius: 2rem;
    background-color: ${({ color }) => color};
    text-align: center;
    font-size: 0.85rem;

    ${({ isPhone }) => (isPhone && css`
        padding: 0.1rem 1.2rem;
        font-size: 0.9rem;
    `)}
`

const Heading = styled(motion.div)`
    font-size: 1.6rem;
    margin-bottom: -0.5rem;
    font-weight: 600;

    ${({ theme: { isPhone } }) => (isPhone && css`
        font-size: 1.4rem;
    `)}
`

const tagVariants = {
    whileHover: {
        opacity: 0.8,
        scale: 1.05,
        transition: {
            ease: easeInOutCustomBezier,
            duration: 0.7
        }
    }
}

export default function Tags({ tags, id }) {
    const { globalState: { isPhone } } = useGlobalContext()
    const { textSubtitlesAnimation, textSubtitlesVariants } = useThemeChangeAnim()

    return (
        <>
            <Heading animate={textSubtitlesAnimation} initial='initial' variants={textSubtitlesVariants} id={id}>
                Categories
            </Heading>
            <TagsContainer className='blog-homepage-tags-container'>
                {tags.map((tagData, index) => (
                    <Link href={`/blog/categories/${tagData.slug}`} key={index}><a>
                        <Tag color={tagData.color} isPhone={isPhone} className='blog-homepage-tag'
                            variants={tagVariants} whileHover='whileHover' layout layoutId={index}>
                            {tagData.name}
                        </Tag>
                    </a></Link>
                ))}

            </TagsContainer>
        </>
    )
}