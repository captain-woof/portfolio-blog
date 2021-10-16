import { motion } from 'framer-motion'
import { useEffect } from 'react'
import styled, { css } from 'styled-components'
import FullscreenContainer from '../components/Containers/FullscreenContainer'
import { useThemeChangeAnim } from '../lib/motion'
import { useGlobalContext } from '../providers/ContextProvider'
import router, { useRouter } from 'next/router'
import SeoNotFound from '../components/SEO/SeoNotFound'

const Wrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: relative;
    font-family: 'Montserrat Alternates';
    padding: 1rem 1rem;
    text-align: center;
`

const Heading = styled.div`
    font-size: 6rem;
    font-weight: 500;
    ${({ theme: { isPhone } }) => (isPhone && css`
        font-size: 4rem;
    `)}
`

const Text = styled.div`
    font-size: 2rem;
    ${({ theme: { isPhone } }) => (isPhone && css`
        font-size: 1.2rem;
    `)}
`

const Redirect = styled.div`
    font-size: 1rem;
    font-family: 'Poppins';
    ${({ theme: { isPhone } }) => (isPhone && css`
        margin-top: 0.5rem;
        font-size: 0.85rem;
    `)}
`

export default function Error() {
    const { textEmphasisVariants: variants, textEmphasisAnimation: animate } = useThemeChangeAnim()

    // Removing page markers
    const { globalDispatch } = useGlobalContext()
    useEffect(() => {
        globalDispatch({
            type: "SET_MARKERS", payload: {
                markers: []
            }
        })
    }, [])

    // For redirecting to previous page
    const route = useRouter()
    useEffect(() => {
        const redirect = () => {
            route.back()
        }
        //let handle = setTimeout(redirect, 5000)
        //return () => { clearTimeout(handle) }
    }, [])

    return (
        <>
            <SeoNotFound />
            <FullscreenContainer>
                <Wrapper animate={animate} variants={variants}>
                    <Heading>404</Heading>
                    <Text>Looks like this page does not exist!</Text>
                    <Redirect>You'll be <b>automatically redirected</b> to where you came from...</Redirect>
                </Wrapper>
            </FullscreenContainer>
        </>
    )
}