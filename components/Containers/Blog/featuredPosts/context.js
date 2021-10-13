import { createContext, useContext, useReducer } from "react";

// The reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SELECTED":
            return { ...state, selected: action.payload.selected }
        case "SET_POSTS":
            return { ...state, featuredPosts: action.payload.featuredPosts }
    }
}

// The context
const Context = createContext()

// The context provider component
export const SlideshowProvider = ({ children, featuredPosts }) => {
    const [state, dispatch] = useReducer(reducer, {
        selected: 0,
        clickable: true,
        featuredPosts,
        timeoutHandle: null
    })

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider >
    )
}

// Hook to get values
export const useSlideshow = () => (useContext(Context))