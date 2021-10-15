import { motion } from 'framer-motion'
import { useEffect } from 'react'
import styled from 'styled-components'
import FullscreenContainer from '../components/Containers/FullscreenContainer'
import { useThemeChangeAnim } from '../lib/motion'
import { useGlobalContext } from '../providers/ContextProvider'
import { useRouter } from 'next/router'

const Wrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: relative;
    font-family: 'Montserrat Alternates';
`

const Heading = styled.div`
    font-size: 6rem;
    font-weight: 500;
`

const Text = styled.div`
    font-size: 2rem;
`

const Redirect = styled.div`
    font-size: 1rem;
    font-family: 'Poppins';
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
        let handle = setTimeout(redirect, 5000)
        return () => { clearTimeout(handle) }
    }, [])

    return (
        <FullscreenContainer>
            <Wrapper animate={animate} variants={variants}>
                <Heading>404</Heading>
                <Text>Looks like this page does not exist!</Text>
                <Redirect>You'll be automatically redirected from where you came...</Redirect>
            </Wrapper>
        </FullscreenContainer>
    )
}