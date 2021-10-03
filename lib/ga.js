// log the pageview with their URL
export const pageview = (url) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })
}

// Upon searching
export const search = (searchTerm) => {
  window.gtag('event', "search", { search_term: searchTerm })
}

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag('event', action, params)
}