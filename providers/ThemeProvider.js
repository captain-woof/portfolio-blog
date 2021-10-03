import { useContext } from 'react'
import { ThemeProvider as StyledCompThemeProvider } from 'styled-components'
import { GlobalContext } from './ContextProvider'

export default function ThemeProvider({ children }) {
    const { globalState } = useContext(GlobalContext)

    return (
        <StyledCompThemeProvider theme={globalState.theme}>
            {children}
        </StyledCompThemeProvider>
    )
}