import { ContextProvider } from '../providers/ContextProvider'
import GlobalThemeProvider from '../providers/ThemeProvider'
import { pageview } from '../lib/ga'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Fonts from '../components/Fonts'
import Navbar from '../components/Navbar'
import { GlobalStyle } from '../styles/globalStyle'
import AdjustForNavbarContainer from '../components/Containers/AdjustForNavbarContainer'

function MyApp({ Component, pageProps }) {
  // For Google Analytics - Page Navigation
  const router = useRouter()
  useEffect(() => {
    // Handles page change
    const handlePageChange = (url) => {
      pageview(url)
    }

    // Subscribing to router's 'route change complete' event
    router.events.on('routeChangeComplete', handlePageChange)

    // Unsubscribing to above event upon unmounting
    router.events.off('routeChangeComplete', handlePageChange)
  }, [router.events])

  return (
    <ContextProvider>
      <GlobalThemeProvider>
        <GlobalStyle />
        <Fonts />
        <Navbar />
        <AdjustForNavbarContainer>
          <Component {...pageProps} />
        </AdjustForNavbarContainer>
      </GlobalThemeProvider>
    </ContextProvider>
  )
}

export default MyApp
