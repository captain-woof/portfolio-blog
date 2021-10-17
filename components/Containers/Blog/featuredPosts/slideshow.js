import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSlideshow } from './context'
import FeaturedPost from './featuredPost'
import { getNext } from './utils'

const SlideshowContainer = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`

export default function Slideshow() {
    const { state: { selected, featuredPosts }, dispatch } = useSlideshow()

    // Posts to render
    const featuredPostsToRender = featuredPosts.map((featuredPost, index) => (
        <FeaturedPost key={index} featuredPost={featuredPost} />
    ))

    // Start timer to animate (and clear previous one) when 'selected' changes
    const [timeoutHandle, setTimeoutHandle] = useState(null)
    useEffect(() => {
        let newTimeoutHandle = setTimeout(() => {
            dispatch({ type: "SET_SELECTED", payload: { selected: getNext(featuredPosts.length, selected) } })
        }, 6000)
        setTimeoutHandle((prevTimeoutHandle) => { clearTimeout(prevTimeoutHandle); return newTimeoutHandle })

        return () => { setTimeoutHandle((prevTimeoutHandle) => { clearTimeout(prevTimeoutHandle); return null }) }
    }, [selected])

    return (
        <SlideshowContainer>
            <AnimatePresence>
                {featuredPostsToRender[selected]}
            </AnimatePresence>
        </SlideshowContainer>
    )
}