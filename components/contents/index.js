import { useState } from 'react/cjs/react.development'
import Button from './button'
import ContentsPage from './contentsPage'

export default function Contents() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <ContentsPage isOpen={isOpen} />
            <Button setIsOpen={setIsOpen} />
        </>
    )
}