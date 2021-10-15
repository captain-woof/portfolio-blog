import { useEffect, useRef } from "react"
import styled from 'styled-components'
import { useGlobalContext } from "../../providers/ContextProvider"

const CommentsWrapper = styled.div`
    width: 100%;
`

// Base config for  utterance
const config = {
    id: 'utterance-comments',
    src: "https://utteranc.es/client.js",
    repo: "captain-woof/portfolio-blog",
    'issue-term': "title",
    label: "Comment 💬",
    crossorigin: "anonymous",
    async: true
}

// Adding themes
const configLight = {
    ...config,
    theme: 'github-light',
}

const configDark = {
    ...config,
    theme: 'dark-blue',
}

// Two separate components for 2 themes
const CommentsLight = () => {
    const ref = useRef(null)

    // Changing comment widget every time config changes
    useEffect(() => {
        if (ref.current) {
            let commentsWidget = document.createElement('script')
            commentsWidget.setAttribute('id', configLight.id)
            commentsWidget.setAttribute('src', configLight.src)
            commentsWidget.setAttribute('repo', configLight.repo)
            commentsWidget.setAttribute('issue-term', configLight['issue-term'])
            commentsWidget.setAttribute('label', configLight.label)
            commentsWidget.setAttribute('theme', configLight.theme)
            commentsWidget.setAttribute('crossorigin', configLight.crossorigin)
            commentsWidget.setAttribute('async', configLight.async)
            ref.current.appendChild(commentsWidget)
        }
    }, [])

    return (
        <CommentsWrapper ref={ref} id='comments' className='comments-light' />
    )
}

const CommentsDark = () => {
    const ref = useRef(null)

    // Changing comment widget every time config changes
    useEffect(() => {
        if (ref.current) {
            let commentsWidget = document.createElement('script')
            commentsWidget.setAttribute('id', configDark.id)
            commentsWidget.setAttribute('src', configDark.src)
            commentsWidget.setAttribute('repo', configDark.repo)
            commentsWidget.setAttribute('issue-term', configDark['issue-term'])
            commentsWidget.setAttribute('label', configDark.label)
            commentsWidget.setAttribute('theme', configDark.theme)
            commentsWidget.setAttribute('crossorigin', configDark.crossorigin)
            commentsWidget.setAttribute('async', configDark.async)
            ref.current.appendChild(commentsWidget)
        }
    }, [])

    return (
        <CommentsWrapper ref={ref} id='comments' className='comments-light' />
    )
}


export default function Comments() {
    const { globalState: { themeName } } = useGlobalContext()

    return (
        themeName === "LIGHT_THEME" ? <CommentsLight/> : <CommentsDark/>
    )
}