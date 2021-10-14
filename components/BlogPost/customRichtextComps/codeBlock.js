import { useGlobalContext } from '../../../providers/ContextProvider'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'

// Languages
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import markup from 'react-syntax-highlighter/dist/cjs/languages/prism/markup'

// Theme
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/cb'
import light from 'react-syntax-highlighter/dist/cjs/styles/prism/coy'

export default function CodeBlock({ code, language }) {
    // Registering languages
    [javascript, jsx, css, python, markdown, markup].forEach((lang) => {
        SyntaxHighlighter.registerLanguage(`${lang}`, lang)
    })

    // For theme
    const { globalState: { themeName } } = useGlobalContext()

    return (
        <SyntaxHighlighter language={language} style={themeName === 'LIGHT_THEME' ? light : dark}
        showLineNumbers showInlineLineNumbers wrapLines>
            {code}
        </SyntaxHighlighter>
    )
}