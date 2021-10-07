import { useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createGlobalStyle, useTheme } from 'styled-components'

export const Scrollbar = createGlobalStyle`
    ::-webkit-scrollbar {
        width: 12px;
      }
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.backgroundColor};
      border-radius: 12px;
      margin: 8px;
    }      
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => (`linear-gradient(${theme.colors.green},${theme.colors.blue})`)};
      border-radius: 12px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => (`linear-gradient(${theme.colors.greenDark},${theme.colors.blueDark})`)};
    }

    * {
        scrollbar-color: ${({ theme }) => (`linear-gradient(${theme.colors.green},${theme.colors.blue})`)};
        
    }
`

const ScrollbarAnimatedStyle = createGlobalStyle`
    ::-webkit-scrollbar {
        width: 12px;
      }
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.backgroundColor};
      border-radius: 12px;
      margin: 12px;
    }      
    ::-webkit-scrollbar-thumb {
      background: ${({ topColor, bottomColor }) => (`linear-gradient(${topColor},${bottomColor})`)};
      border-radius: 12px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${({ topColorHover, bottomColorHover }) => (`linear-gradient(${topColorHover}, ${bottomColorHover})`)};
    }

    * {
        
        scrollbar-color: ${({ topColor, bottomColor, theme }) => (`linear-gradient(${topColor},${bottomColor}) ${theme.backgroundColor}`)};
    }
`

// Gets scrollYProgress val
const getScrollYProgress = () => (window.scrollY / document.documentElement.scrollHeight)

// Custom hook to get viewport scroll progress
const useViewportScroll = () => {
    const scrollYProgress = useMotionValue(0)
    useEffect(() => {
        scrollYProgress.set(getScrollYProgress())
        const handleScroll = () => {
            scrollYProgress.set(getScrollYProgress())
        }
        window.addEventListener('scroll', handleScroll)
        return () => { window.removeEventListener('scroll', handleScroll) }
    }, [])
    return { scrollYProgress }
}



export const ScrollbarAnimated = () => {

    const theme = useTheme()
    const topColors = [theme.colors.green, theme.colors.blue, theme.colors.yellow]
    const bottomColors = [theme.colors.blue, theme.colors.yellow, theme.colors.red]
    const topColorsHover = [theme.colors.greenLight, theme.colors.blueLight, theme.colors.yellowLight]
    const bottomColorsHover = [theme.colors.blueLight, theme.colors.yellowLight, theme.colors.redLight]
    const breakPoints = [0, 0.16666666, 0.33333333]

    // Changing gradient of the scrollbar according to scrollYProgress
    const { scrollYProgress } = useViewportScroll()
    const topColor = useTransform(scrollYProgress, breakPoints, topColors)
    const bottomColor = useTransform(scrollYProgress, breakPoints, bottomColors)
    const topColorHover = useTransform(scrollYProgress, breakPoints, topColorsHover)
    const bottomColorHover = useTransform(scrollYProgress, breakPoints, bottomColorsHover)
    const [currentTopColor, setCurrentTopColor] = useState(topColor.get())
    const [currentBottomColor, setCurrentBottomColor] = useState(bottomColor.get())
    const [currentTopColorHover, setCurrentTopColorHover] = useState(topColor.get())
    const [currentBottomColorHover, setCurrentBottomColorHover] = useState(bottomColor.get())

    // Change colors according to scroll Y progress
    useEffect(() => {
        let unsubTopColor = topColor.onChange(() => { setCurrentTopColor(topColor.get()) })
        let unsubBottomColor = bottomColor.onChange(() => { setCurrentBottomColor(bottomColor.get()) })
        let unsubTopColorHover = topColorHover.onChange(() => { setCurrentTopColorHover(topColorHover.get()) })
        let unsubBottomColorHover = bottomColorHover.onChange(() => { setCurrentBottomColorHover(bottomColorHover.get()) })

        return () => {
            unsubTopColor()
            unsubBottomColor()
            unsubTopColorHover()
            unsubBottomColorHover()
        }
    }, [topColor, bottomColor])

    return (
        <>
            <ScrollbarAnimatedStyle topColor={currentTopColor} bottomColor={currentBottomColor} topColorHover={currentTopColorHover} bottomColorHover={currentBottomColorHover}/>
        </>
    )
}