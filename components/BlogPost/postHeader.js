import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { useThemeChangeAnim } from '../../lib/motion'
import moment from 'moment'
import { useGlobalContext } from '../../providers/ContextProvider'
import Link from 'next/link'

const PostHeaderWrapper = styled.div`
    width: 80%;
    margin-top: 3.5rem;

    ${({ theme: { isPhone } }) => (isPhone && css`
        width: 100%;
    `)}
`

const PostTitle = styled(motion.div)`
    font-size: 3.5rem;
    font-weight: 600;
    ${({ theme: { isPhone } }) => (isPhone && css`
        font-size: 2.8rem;
    `)}
`

const Timestamp = styled(motion.div)`
    font-size: 1rem;
    ${({ theme: { isPhone } }) => (isPhone && css`
        font-weight: 500;         
    `)}
`

const TimestampIcon = styled.img`
    height: 1.2rem;
    margin-right: 0.5rem;
`

const TagsContainer = styled.div`
    display: flex;
    gap: 0.5rem 0.5rem;
    margin-top: 0.5rem;
    flex-wrap: wrap;
`

const Tag = styled(motion.div)`
    background-color: ${({ color }) => color};
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.white};
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    
    ${({ theme: { isPhone } }) => (isPhone && css`
        padding: 0.1rem 0.85rem;
        font-weight: 500;
        font-size: 0.85rem;
    `)}
`

export default function PostHeader({ blogPostData: { title, tags, postedOn, updatedOn } }) {
    const { globalState: { themeName } } = useGlobalContext()
    const { textEmphasisAnimation, textEmphasisVariants, textSubtitlesVariants, textSubtitlesAnimation } = useThemeChangeAnim()

    return (
        <PostHeaderWrapper>
            <PostTitle animate={textEmphasisAnimation} variants={textEmphasisVariants}>{title}</PostTitle>
            <Timestamp animate={textSubtitlesAnimation} variants={textSubtitlesVariants}>
                <TimestampIcon src={themeName === 'LIGHT_THEME' ? "/icons/calendar.svg" : "/icons/calendar-night.svg"} />
                {`Posted on ${moment(postedOn).format('Do MMM, YYYY')}`}
            </Timestamp>
            <Timestamp animate={textSubtitlesAnimation} variants={textSubtitlesVariants}>
                <TimestampIcon src={themeName === 'LIGHT_THEME' ? "/icons/update.svg" : "/icons/update-night.svg"} />
                {`Last updated ${moment(updatedOn).fromNow()}`}
            </Timestamp>
            <TagsContainer>
                {tags.map((tag, index) => (
                    <Link key={index} href={`/categories/${tag.slug}`}><a>
                        <Tag color={tag.color} whileHover={{ opacity: 0.7 }}>{tag.name}</Tag>
                    </a></Link>
                ))}
            </TagsContainer>
        </PostHeaderWrapper>
    )
}