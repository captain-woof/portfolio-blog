import { useEffect, useState } from "react"


export const useViewportDimensions = () => {
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const handleResize = () => {
            setHeight(document.documentElement.clientHeight)
            setWidth(document.documentElement.clientWidth)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return { height, width }
}