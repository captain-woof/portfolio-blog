import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { easeOutQuintBezier, useThemeChangeAnim } from '../../../../lib/motion'
import moment from 'moment'
import Link from 'next/link'
import { useGlobalContext } from '../../../../providers/ContextProvider'
import { getWordCount } from '../../../../utils/wordfu'

const FeaturedPostContainer = styled(motion.div)`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    font-family: 'Poppins';
    overflow: hidden;

    ${({ theme }) => (css`
        background-image: linear-gradient(to bottom, ${theme.backgroundColorElevated} 60%, ${theme.backgroundColor});
    `)}
`

const FeaturedPostContentPadding = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    padding: 6rem 10rem;

    ${({ theme: { isPhone } }) => (isPhone && css`
        padding: 8rem 3.2rem;
    `)}
`

const FeaturedPostContentContainer = styled(motion.div)`
    position: relative;
`

const FeaturedPostHeading = styled.div`
    font-size: 1.8rem;
    font-weight: 500;
    ${({ theme: { isPhone } }) => (isPhone && css`
        font-size: 1.4rem;
    `)}
`

const PostTitle = styled.div`
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    ${({ theme: { isPhone } }) => (isPhone && css`
        font-size: 2rem;
    `)}

    &:hover {
        text-decoration: underline;
    }
`

const PostTimestampIcon = styled.img`
    height: 1rem;
    margin-right: 0.5rem;
`

const PostTimestamp = styled.div`
    font-size: 0.9rem;
    font-style: italic;
`

const Tag = styled.div`
    font-size: 0.8rem;
    margin-top: 0.5rem;
    color: ${({ color }) => color};
    background-color: ${({ theme }) => theme.colors.white};
    padding: 0.1rem 0.5rem;
    border-radius: 1rem;
    width: max-content;
    box-shadow: ${({ theme }) => `0 0 6px ${theme.shadow}`};
`

const PostDescription = styled.div`
    margin-top: 0.5rem;
    font-size: 1rem;
    width: 60%;
    font-weight: 500;

    ${({ theme: { isPhone } }) => (isPhone && css`
        width: 100%;
    `)}
`

const transition = {
    ease: easeOutQuintBezier,
    duration: 4
}

const variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition
    },
    exit: {
        opacity: 0,
        transition
    }
}

export default function FeaturedPost({ featuredPost }) {
    const { globalState: { isPhone, themeName } } = useGlobalContext()
    const { textEmphasisAnimation: animateText, textEmphasisVariants: variantsText } = useThemeChangeAnim()

    return (
        <FeaturedPostContainer animate='animate' initial='initial' exit='exit' variants={variants} day={themeName === 'LIGHT_THEME'}>
            <FeaturedPostContentPadding>
                <FeaturedPostContentContainer variants={variantsText} animate={animateText}>
                    <FeaturedPostHeading>Featured post</FeaturedPostHeading>
                    <Link href={`/blog/posts/${featuredPost.slug}`}><a>
                        <PostTitle style={{ color: featuredPost.tags[0].color }}>
                            {featuredPost.title}
                        </PostTitle>
                    </a></Link>
                    <PostTimestamp>
                        <PostTimestampIcon src={themeName === 'LIGHT_THEME' ? '/icons/calendar.svg' : '/icons/calendar-night.svg'} alt='posted on icon' />
                        {`Posted ${moment(featuredPost.postedOn).fromNow()}`}
                    </PostTimestamp>
                    <PostTimestamp>
                        <PostTimestampIcon src={themeName === 'LIGHT_THEME' ? '/icons/update.svg' : '/icons/update-night.svg'} alt='updated on icon' />
                        {`Last updated ${moment(featuredPost.updatedOn).fromNow()}`}
                    </PostTimestamp>
                    <Tag color={featuredPost.tags[0].color}>{featuredPost.tags[0].name}</Tag>
                </FeaturedPostContentContainer>
            </FeaturedPostContentPadding>
        </FeaturedPostContainer>
    )
}
