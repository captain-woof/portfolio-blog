import { ThemeProvider } from 'styled-components'
import { useGlobalContext } from './ContextProvider'

export default function GlobalThemeProvider({ children }) {
    const { globalState: { isPhone, theme } } = useGlobalContext()

    return (
        <ThemeProvider theme={{...theme, isPhone}}>
            {children}
        </ThemeProvider>
    )
}