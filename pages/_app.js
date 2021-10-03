import '../styles/globals.css'
import { ContextProvider } from '../providers/ContextProvider'
import ThemeProvider from '../providers/ThemeProvider'
import { pageview } from '../lib/ga'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ContextProvider>
  )
}

export default MyApp
