import { useEffect, useRef } from 'react'
import { useIntersectionRevealer } from 'react-intersection-revealer'
import { useState } from 'react'
import { useInfinitePostSummaries } from '../../../lib/swr'
import PostSummaryCard from './card'
import Grid from './grid'

export default function PostsSummaryContainer({ firstPostsSummary, tag }) {
    const { postSummaries, loadOneMorePage, noMoreData } = useInfinitePostSummaries(firstPostsSummary, tag)

    // For auto fetching more posts
    const watcherRef = useRef()
    const { inView } = useIntersectionRevealer(watcherRef)
    const [loadMorePageInterval, setLoadMorePageInterval] = useState(null)
    useEffect(() => {
        if (inView) {
            loadOneMorePage()
            setLoadMorePageInterval(setInterval(loadOneMorePage, 1000))
        } else {
            clearInterval(loadMorePageInterval)
        }
    }, [inView])
    useEffect(() => {
        if (noMoreData) {
            clearInterval(loadMorePageInterval)
        }
    }, [noMoreData])

    return (
        <>
            <Grid>
                {postSummaries?.blogPosts?.map((postSummaryData, index) => (
                    <PostSummaryCard {...postSummaryData} key={index} />
                ))}
            </Grid>
            <div className='watcher' ref={watcherRef} />
        </>
    )
}