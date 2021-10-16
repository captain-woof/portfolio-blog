import { useEffect, useRef, useState } from 'react'
import { useIntersectionRevealer } from 'react-intersection-revealer'
import { useInfinitePostSummaries } from '../../../lib/swr'
import PostSummaryCard from './card'
import Grid from './grid'
import styled from 'styled-components'
import { useThemeChangeAnim } from '../../../lib/motion'
import { motion } from 'framer-motion'

const Watcher = styled(motion.div)`
    font-size: 1rem;
    font-weight: 300;
    margin-top: 1rem;
`

export default function PostsSummaryContainer({ firstPostsSummary, q, tag }) {
    const { postSummaries, loadOneMorePage, noMoreData } = useInfinitePostSummaries(firstPostsSummary, tag, q)
    const { textSubtitlesVariants: watcherVariants, textSubtitlesAnimation: watcherAnimation } = useThemeChangeAnim({
        textSubtitlesVariants: {
            initial: {
                opacity: 1
            },
            pulse: {
                opacity: 0.5,
                ease: 'linear',
                duration: 0.75,
                repeat: Infinity,
                repeatType: 'mirror'
            }
        }
    })

    // For auto fetching more posts
    const watcherRef = useRef()
    const { inView } = useIntersectionRevealer(watcherRef)
    useEffect(() => {
        if (inView) {
            watcherAnimation.start('pulse')
            loadOneMorePage()
        } else {
            watcherAnimation.stop()
        }
    }, [inView])

    // For showing if there are any posts to load
    const [watcher, setWatcher] = useState("Loading...")
    useEffect(() => {
        if (noMoreData) {
            setWatcher("No more posts to show.")
            watcherAnimation.stop()
            watcherAnimation.set('initial')
        }
    }, [noMoreData])

    return (
        <>
            <Grid>
                {postSummaries?.blogPosts?.map((postSummaryData, index) => (
                    <PostSummaryCard {...postSummaryData} key={index} />
                ))}
            </Grid>
            <Watcher className='watcher' ref={watcherRef} animate={watcherAnimation} variants={watcherVariants} initial='initial'>
                {watcher}
            </Watcher>
        </>
    )
}