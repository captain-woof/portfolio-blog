import styled, { css } from 'styled-components'
import { useThemeChangeAnim } from '../../../lib/motion'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useGlobalContext } from '../../../providers/ContextProvider'
import moment from 'moment'
import Tags from './tags'
import { getFirstWords } from '../../../utils/wordfu'

const CardContainer = styled(motion.div)`
    width: 100%;
    border-radius: 4px;
    box-shadow: ${({ theme }) => (`0px 0px 6px ${theme.shadow}`)};
    position: relative;
    overflow: auto;
    font-family: 'Poppins';

    ${({ isPhone }) => (isPhone && css`
        border-radius: 6px;
        padding-bottom: 0.2rem;
    `)}
`

const CardContentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`

const CardHeroImageWrapper = styled.div`
    max-height: 55%;
`

const CardTextualContent = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 1rem;
`

const CardTitle = styled(motion.div)`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;

    ${({isPhone}) => (isPhone && css`
        font-size: 1.5rem;
        margin-bottom: 1rem;
    `)}
`

const Date = styled(motion.div)`
    font-size: 0.85rem;
    font-style: italic;

    ${({ isPhone }) => (isPhone && css`
        font-size: 1rem;
    `)}
`

const DateIcon = styled.img`
    height: 0.85rem;
    margin-right: 0.5rem;

    ${({ isPhone }) => (isPhone && css`
        height: 1rem;
    `)}
`

const CardDescription = styled(motion.div)`
    margin-top: 0.5rem;
    font-size: 1.1rem;
    font-family: 'Alata';

    ${({isPhone}) => (isPhone && css`
        font-family: 'Poppins';
        font-size: 1.2rem;
        margin-top: 0.2rem;
        font-weight: 400;
    `)}
`

export default function PostSummaryCard({ title, slug, tags, description, postedOn, updatedOn, heroImage, heroImageBlur }) {
    const { textEmphasisAnimation, textEmphasisVariants, textSubtitlesAnimation, textSubtitlesVariants, backgroundElevatedColorAnimation, backgroundElevatedColorVariants } = useThemeChangeAnim()
    const { globalState: { isPhone, themeName } } = useGlobalContext()

    return (
        <CardContainer animate={backgroundElevatedColorAnimation} variants={backgroundElevatedColorVariants} isPhone={isPhone}>
            <CardContentsWrapper>
                <CardHeroImageWrapper>
                    <Image placeholder='blur' blurDataURL={heroImageBlur.src} alt={heroImage.alt} src={heroImage.src} layout='responsive' objectFit='cover' quality={80} width={heroImage.width} height={heroImage.height} />
                </CardHeroImageWrapper>
                <CardTextualContent>
                    <CardTitle variants={textEmphasisVariants} animate={textEmphasisAnimation} isPhone={isPhone}>
                        {title}
                    </CardTitle>
                    <Date isPhone={isPhone} variants={textSubtitlesVariants} animate={textSubtitlesAnimation}>
                        <DateIcon isPhone={isPhone} alt='' src={themeName === "LIGHT_THEME" ? '/icons/calendar.svg' : '/icons/calendar-night.svg'} />
                        {`${moment(postedOn).format('Do MMM, YYYY')}`}
                    </Date>
                    <Date isPhone={isPhone} variants={textSubtitlesVariants} animate={textSubtitlesAnimation}>
                        <DateIcon isPhone={isPhone} alt='' src={themeName === "LIGHT_THEME" ? '/icons/update.svg' : '/icons/update-night.svg'} />
                        {`Last updated ${moment(updatedOn).fromNow()}`}
                    </Date>
                    {isPhone &&
                        <CardDescription animate={textEmphasisAnimation} variants={textEmphasisVariants} isPhone={isPhone}>{`${getFirstWords(description, 15)}...`}</CardDescription>
                    }
                    <Tags tags={tags} />
                    {!isPhone &&
                        <CardDescription animate={textEmphasisAnimation} variants={textEmphasisVariants} isPhone={isPhone}>{description}</CardDescription>
                    }
                </CardTextualContent>
            </CardContentsWrapper>
        </CardContainer>
    )
}