import { useEffect, useState } from 'react'
import useSWRInfinite from 'swr/infinite'

export const useInfinitePostSummaries = (initialData, tag) => {

    // Fetcher
    const fetcher = async (url) => {
        let res = await fetch(url)
        return await res.json()
    }

    // SWR
    const { data, error, setSize, size } = useSWRInfinite(
        (index, previousPageData) => {
            // Detect if pages end
            if (previousPageData && previousPageData.total === 0) {
                return null
            }
            // Return data if not
            if (tag) {
                return `/api/fetchPostsSummary?page=${index}&tag=${tag}`
            } else {
                return `/api/fetchPostsSummary?page=${index}`
            }
        },
        fetcher,
        {
            fallbackData: [initialData]
        }
    )

    // State to hold post summaries (array)
    const [postSummaries, setPostSummaries] = useState(initialData)

    // Function to merge pages
    const getFlattenedPageData = () => {
        let total = 0
        let blogPosts = []

        data?.forEach((pageData) => {
            total += pageData.total
            pageData.blogPosts.forEach((blogPost) => {
                blogPosts.push(blogPost)
            })
        })
        return { total, blogPosts }
    }

    // Return stats
    useEffect(() => {
        if (!!data && data.length !== 0) {
            setPostSummaries(getFlattenedPageData())
        }
    }, [data])

    // State to show when there's no more data to fetch
    const [noMoreData, setNoMoreData] = useState(false)
    useEffect(() => {
        if (data[data.length - 1].total === 0) {
            setNoMoreData(true)
        }
    }, [data])

    return { postSummaries, loadOneMorePage: () => { setSize(size + 1) }, noMoreData, error }
}