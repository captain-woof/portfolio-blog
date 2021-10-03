import { createContext, useReducer } from "react"
import { themeLight, themeDark } from '../theme'


const reducer = (state, action) => {
    switch (action.type) {
        case SWITCH_THEME: // For switching between theme
            if (state.themeName === "LIGHT_THEME") {
                return ({ ...state, themeName: "DARK_THEME", theme: themeDark })
            } else {
                return ({ ...state, themeName: "LIGHT_THEME", theme: themeLight })
            }
    }
}

// Global context, exported
export const GlobalContext = createContext()

export const ContextProvider = ({ children }) => {
    // Initial state
    let initialState = {}
    initialState.themeName = !!window.localStorage.getItem('themeName')
        ? window.localStorage.getItem('themeName')
        : "LIGHT_THEME"
    initialState.theme = initialState.themeName === "THEME_LIGHT" ? themeLight : themeDark

    // Reducer to handle state changes
    const [globalState, globalDispatch] = useReducer(reducer, initialState)

    // Returning the provider
    return (
        <GlobalContext.Provider value={{ globalState, globalDispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}