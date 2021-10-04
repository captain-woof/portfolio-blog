import { createContext, useContext, useEffect, useReducer } from "react"
import { themeLight, themeDark } from '../theme'

const reducer = (state, action) => {
    switch (action.type) {
        case "SWITCH_THEME": // For switching between theme
            if (state.themeName === "LIGHT_THEME") {
                return ({ ...state, themeName: "DARK_THEME", theme: themeDark })
            } else {
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
    }
}

// Global context
const GlobalContext = createContext()

// Initial state
const initialState = {
    themeName: "LIGHT_THEME",
    theme: themeLight,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    isPhone: false
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