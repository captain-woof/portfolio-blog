import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      font-size: 16px;
      width: 100vw;
      overflow-x: hidden;
      transition: all 0.8s ease-in-out 0.2s;
      background-color: ${({ theme }) => (theme.backgroundColor)};
      color: ${({ theme }) => (theme.textColorEmphasis)};
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    * {
      box-sizing: border-box;
    }
`