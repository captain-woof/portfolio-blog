import { useAnimation, useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"
import { useGlobalContext } from "../providers/ContextProvider"
import { useIntersectionRevealer } from "react-intersection-revealer"

// MotionValue for scroll
export const useScrollStats = (ref) => {
    const { scrollYProgress: scrollYProgressState, scrollY: scrollYState } = useIntersectionRevealer(ref)
    const scrollY = useMotionValue(scrollYState)
    const scrollYProgress = useMotionValue(scrollYProgressState)

    useEffect(() => {
        scrollY.set(scrollYState)
        scrollYProgress.set(scrollYProgressState)
    }, [scrollYState, scrollYProgressState])

    return { scrollY, scrollYProgress }
}

// Easing cubic beziers
export const easeInOutCubicBezier = [0.65, 0, 0.35, 1]
export const easeInOutCustomBezier = [.85, .27, .35, .91]
export const easeOutQuintBezier = [0.22, 1, 0.36, 1]

// Custom hook to handle theme change upon theme switch
export const useThemeChangeAnim = (augmentVariants) => {
    // Animations for motion elements
    const textEmphasisAnimation = useAnimation()
    const textSubtitlesAnimation = useAnimation()
    const backgroundColorAnimation = useAnimation()
    const textAndBgColorAnimation = useAnimation()

    // Getting theme from global state
    const { globalState } = useGlobalContext()
    const { theme } = globalState

    // Common transition for all anims
    const transition = {
        ease: easeInOutCubicBezier,
        duration: 0.7
    }

    // Variants for all animatable properties
    const textEmphasisVariants = {
        ...(augmentVariants?.textEmphasisVariants),
        initial: {
            ...augmentVariants?.textEmphasisVariants?.initial,
            color: theme.textColorEmphasis
        },
        switchToLightTheme: {
            color: theme.colors.black,
            transition: transition
        },
        switchToDarkTheme: {
            color: theme.colors.white,
            transition: transition
        }
    }

    const textSubtitlesVariants = {
        ...(augmentVariants?.textSubtitlesVariants),
        initial: {
            ...augmentVariants?.textSubtitlesVariants?.initial,
            color: theme.textColorSubtitle
        },
        switchToLightTheme: {
            color: theme.colors.grey,
            transition: transition
        },
        switchToDarkTheme: {
            color: theme.colors.white,
            transition: transition
        }
    }

    const backgroundColorVariants = {
        ...(augmentVariants?.backgroundColorVariants),
        initial: {
            ...augmentVariants?.backgroundColorVariants?.initial,
            backgroundColor: theme.backgroundColor
        },
        switchToLightTheme: {
            backgroundColor: theme.colors.white,
            transition: transition
        },
        switchToDarkTheme: {
            backgroundColor: theme.colors.black,
            transition: transition
        }
    }

    const textAndBgColorVariants = {
        initial: {
            backgroundColor: theme.backgroundColor,
            color: theme.textColorEmphasis
        },
        switchToLightTheme: {
            backgroundColor: theme.colors.white,
            color: theme.colors.black,
            transition: transition
        },
        switchToDarkTheme: {
            backgroundColor: theme.colors.black,
            color: theme.colors.white,
            transition: transition
        }
    }

    // Fires appropriate variant based on theme change
    useEffect(() => {
        switch (globalState.themeName) {
            case "LIGHT_THEME":
                textEmphasisAnimation.start('switchToLightTheme')
                textSubtitlesAnimation.start('switchToLightTheme')
                backgroundColorAnimation.start('switchToLightTheme')
                textAndBgColorAnimation.start('switchToLightTheme')
                break
            case "DARK_THEME":
                textEmphasisAnimation.start('switchToDarkTheme')
                textSubtitlesAnimation.start('switchToDarkTheme')
                backgroundColorAnimation.start('switchToDarkTheme')
                textAndBgColorAnimation.start('switchToDarkTheme')
                break
        }
    }, [globalState.themeName])

    return ({
        textEmphasisAnimation,
        textSubtitlesAnimation,
        backgroundColorAnimation,
        textAndBgColorAnimation,
        textEmphasisVariants,
        textSubtitlesVariants,
        backgroundColorVariants,
        textAndBgColorVariants
    })
}