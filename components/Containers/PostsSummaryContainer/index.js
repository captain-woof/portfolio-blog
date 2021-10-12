import { useEffect, useRef } from 'react'
import { useIntersectionRevealer } from 'react-intersection-revealer'
import { useState } from 'react'
import { useInfinitePostSummaries } from '../../../lib/swr'
import PostSummaryCard from './card'
import { useGlobalContext } from '../../../providers/ContextProvider'
import { WaterfallGrid } from 'react-waterfall-grid'

export default function PostsSummaryContainer({ firstPostsSummary, tag }) {
    const { postSummaries, loadOneMorePage, noMoreData } = useInfinitePostSummaries(firstPostsSummary, tag)
    const { globalState: { isPhone } } = useGlobalContext()

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
            <WaterfallGrid childWidth={isPhone ? 325 : 400} styleGridContainer={{
                gap: (isPhone ? '2rem 0' : '1.5rem 1.5rem'),
                justifyContent: 'center'
            }}>
                {postSummaries?.blogPosts?.map((postSummaryData, index) => (
                    <PostSummaryCard {...postSummaryData} key={index} />
                ))}
            </WaterfallGrid>
            <div className='watcher' ref={watcherRef} />
        </>
    )
}