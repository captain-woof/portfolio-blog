import { useState } from 'react'
import Button from './button'
import ContentsPage from './contentsPage'

export default function Contents() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <ContentsPage isOpen={isOpen} setIsOpen={setIsOpen}/>
            <Button setIsOpen={setIsOpen} />
        </>
    )
}