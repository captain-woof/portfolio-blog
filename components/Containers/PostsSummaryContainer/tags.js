import styled, { css } from 'styled-components'
import Link from 'next/link'
import { useGlobalContext } from '../../../providers/ContextProvider'
import { easeInOutCustomBezier } from '../../../lib/motion'
import { motion } from 'framer-motion'

const TagsContainer = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.4rem 0.4rem;
    font-family: 'Poppins';
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white};
    font-size: 0.8rem;
    margin-top: 0.5rem;

    ${({ isPhone }) => (isPhone && css`
        font-size: 0.85rem;
    `)}
`

const TagIcon = styled.img`
    height: 1rem;
    align-self: center;
`

const Tag = styled(motion.div)`
    padding: 0.1rem 1rem;
    border-radius: 2rem;
    background-color: ${({ color }) => color};
    text-align: center;

    ${({ isPhone }) => (isPhone && css`
        padding: 0.2rem 1rem;
    `)}
`

const tagVariants = {
    whileHover: {
        opacity: 0.8,
        transition: {
            ease: easeInOutCustomBezier,
            duration: 0.7
        }
    }
}

export default function Tags({ tags, id }) {
    const { globalState: { isPhone, themeName } } = useGlobalContext()

    return (
        <TagsContainer className='blog-homepage-tags-container' isPhone={isPhone} id={id}>
            {!isPhone &&
                <TagIcon src={themeName === 'LIGHT_THEME' ? "/icons/tag.svg" : "/icons/tag-night.svg"} alt='tag icon' />
            }
            {tags.map((tagData, index) => (
                <Link href={`/blog/categories/${tagData.slug}`} key={index}><a>
                    <Tag color={tagData.color} isPhone={isPhone} className='blog-homepage-tag'
                        variants={tagVariants} whileHover='whileHover' layout layoutId={index}>
                        {tagData.name}
                    </Tag>
                </a></Link>
            ))}
        </TagsContainer>
    )
}