import { useState } from 'react/cjs/react.development'
import styled from 'styled-components'
import Button from './button'
import ContentsPage from './contentsPage'

const ContentsContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    z-index: 98;
`

export default function Contents() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <ContentsContainer>
            <ContentsPage isOpen={isOpen} />
            <Button setIsOpen={setIsOpen} />
        </ContentsContainer>
    )
}