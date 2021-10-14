import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { useThemeChangeAnim } from '../../lib/motion'
import { motion } from 'framer-motion'
import MarginWrapper from '../Containers/MarginWrapper'

const SuggestionContainer = styled(motion.div)`
    border-radius: 6px;
    box-shadow: ${({ theme }) => `0px 0px 2px ${theme.shadow}`};
    font-family: 'Poppins';
`

const Heading = styled(motion.div)`
    font-size: 1.2rem;
    font-weight: 500;
`

const SuggestionsColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem 0;
    margin-top: 0.5rem;
`

const SuggestionBox = styled(motion.div)`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    box-shadow: ${({ theme }) => `0px 0px 4px ${theme.shadow}`};
    gap: 0 0.5rem;
`

const SuggestionImageWrapper = styled.div`
    flex-basis: 0;
    flex-grow: 1;

    div {
        height: 100%;
    }

    img {
        object-fit: cover;
    }
`

const SuggestionTitle = styled.div`
    font-size: 1rem;
    flex-basis: 0;
    flex-grow: 2;
    padding: 0.5rem;
`

export default function Suggestion({ suggestedPosts }) {
    const { backgroundElevatedColorAnimation, backgroundElevatedColorVariants, textEmphasisAnimation, textEmphasisVariants } = useThemeChangeAnim()

    return (
        <SuggestionContainer animate={backgroundElevatedColorAnimation} variants={backgroundElevatedColorVariants}>
            <MarginWrapper>
                <Heading animate={textEmphasisAnimation} variants={textEmphasisVariants}>
                    You may like
                </Heading>
                <SuggestionsColumn>
                    {suggestedPosts.blogPosts.map((suggestedPost, index) => (
                        <Link href={`/blog/posts/${suggestedPost.slug}`} key={index}><a>
                        <SuggestionBox animate={textEmphasisAnimation} variants={textEmphasisVariants}>
                            <SuggestionImageWrapper>
                                <Image src={suggestedPost.heroImage.src} layout='responsive' height={suggestedPost.heroImage.height} width={suggestedPost.heroImage.width} placeholder='blur' blurDataURL={suggestedPost.heroImageBlur.src}/>
                            </SuggestionImageWrapper>
                            <SuggestionTitle>{suggestedPost.title}</SuggestionTitle>
                        </SuggestionBox>
                        </a></Link>
                    ))}
                </SuggestionsColumn>
            </MarginWrapper>
        </SuggestionContainer>
    )
}