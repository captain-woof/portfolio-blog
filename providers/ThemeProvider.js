import { ThemeProvider } from 'styled-components'
import { useGlobalContext } from './ContextProvider'

export default function GlobalThemeProvider({ children }) {
    const { globalState } = useGlobalContext()

    return (
        <ThemeProvider theme={globalState.theme}>
            {children}
        </ThemeProvider>
    )
}