import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import { useThemeChangeAnim } from '../../lib/motion'
import { useGlobalContext } from '../../providers/ContextProvider'

const BlogSearchBarContainer = styled(motion.div)`
    border-radius: 6px;
`

const Heading = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
`

const Form = styled.form`
    width: 100%;
`

const Searchbar = styled.input`
    width: 100%;
    height: 2rem;
    font-family: 'Montserrat Alternates';
    font-size: 0.85rem;

    ${({theme: {isPhone}}) => (isPhone && css`
        height: 2.5rem;
        font-size: 1rem;
    `)}
`

export default function BlogSearchBar() {
    const { backgroundElevatedColorAnimation: bgAnim, backgroundElevatedColorVariants: bgVariants, textEmphasisAnimation: textAnim, textEmphasisVariants: textVariants } = useThemeChangeAnim()
    const { globalState: { isPhone } } = useGlobalContext()

    return (
        <BlogSearchBarContainer animate={bgAnim} variants={bgVariants} id='searchbar'>
            <motion.div animate={textAnim} variants={textVariants}>
                {!isPhone &&
                    <Heading>Search</Heading>
                }
                <Form method='get' action='/blog/search'>
                    <Searchbar type='text' name="q" placeholder='Search in posts...' />
                </Form>
            </motion.div>
        </BlogSearchBarContainer>
    )
}