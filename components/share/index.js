import { useState } from 'react'
import Button from './button'
import SharePage from './sharePage'

export default function Share() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <SharePage isOpen={isOpen} setIsOpen={setIsOpen}/>
            <Button setIsOpen={setIsOpen} />
        </>
    )
}