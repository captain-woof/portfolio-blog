import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { themeLight, themeDark } from '../theme'
import { useViewportScroll } from 'framer-motion'

const reducer = (state, action) => {
    switch (action.type) {
        case "SWITCH_THEME": // For switching between theme
            if (state.themeName === "LIGHT_THEME") {
                window.localStorage.setItem('THEME_NAME', 'DARK_THEME')
                return ({ ...state, themeName: "DARK_THEME", theme: themeDark })
            } else {
                window.localStorage.setItem('THEME_NAME', 'LIGHT_THEME')
                return ({ ...state, themeName: "LIGHT_THEME", theme: themeLight })
            }
        case "SET_INITIAL_THEME": // Sets initial them after first render
            return ({
                ...state,
                themeName: !!window.localStorage.getItem('THEME_NAME')
                    ? window.localStorage.getItem('THEME_NAME')
                    : "LIGHT_THEME",
                theme: !!window.localStorage.getItem('THEME_NAME')
                    ? (window.localStorage.getItem('THEME_NAME') === "LIGHT_THEME" ? themeLight : themeDark)
                    : themeLight
            })
        case "IS_PHONE": // Checks if device is phone
            return ({
                ...state,
                isPhone: (document.documentElement.clientWidth <= 480)
            })
        case "SCROLL_EVENT":
            return ({
                ...state,
                scrollDirection: action.payload.scrollDirection,
            })
        case "SET_MARKERS":
            return ({
                ...state,
                markers: action.payload.markers
            })
    }
}

// Global context
const GlobalContext = createContext()

// Initial state
const initialState = {
    themeName: "LIGHT_THEME",
    theme: themeLight,
    isPhone: false,
    scrollDirection: 'up',
    markers: [],
    origin: `${process.env.NEXT_PUBLIC_PROTOCOL || 'https'}://${process.env.NEXT_PUBLIC_VERCEL_URL}`
}

export const ContextProvider = ({ children }) => {
    // Reducer to handle state changes
    const [globalState, globalDispatch] = useReducer(reducer, initialState)

    // Change state upon rendering, for theme, initially
    useEffect(() => {
        globalDispatch({ type: "SET_INITIAL_THEME" })
    }, [])

    // Change state upon rendering, for isPhone, initially
    // then, set up listener for detecting whether device is phone
    useEffect(() => {
        globalDispatch({ type: "IS_PHONE" })

        const handleResize = () => {
            globalDispatch({ type: "IS_PHONE" })
        }
        window.addEventListener('resize', handleResize)
        return () => { window.removeEventListener('resize', handleResize) }
    }, [])

    // To get the last scroll direction ('up' or 'down')
    const { scrollY } = useViewportScroll()
    useEffect(() => {
        const unsubscribe = scrollY.onChange(() => {
            if (scrollY.get() > scrollY.getPrevious()) { // Scroll down
                globalDispatch({
                    type: "SCROLL_EVENT", payload: {
                        scrollDirection: 'down'
                    }
                })
            } else if (scrollY.get() < scrollY.getPrevious()) { // Scroll up
                globalDispatch({
                    type: "SCROLL_EVENT", payload: {
                        scrollDirection: 'up'
                    }
                })
            }
        })
        return unsubscribe
    }, [])

    // Returning the provider
    return (
        <GlobalContext.Provider value={{ globalState, globalDispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

// Export custom hook to get the Global state
export const useGlobalContext = () => {
    return useContext(GlobalContext)
}