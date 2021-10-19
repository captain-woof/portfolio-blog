import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { easeInOutCustomBezier } from '../../../../lib/motion'
import { useSlideshow } from './context'

const ButtonContainer = styled.div`
    position: absolute;
    bottom: 10%;
    display: flex;
    flex-direction: row;
    gap: 0 1.5rem;
    z-index: 3;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const Button = styled(motion.div)`
    height: 1rem;
    width: 1rem;
    background-color: ${({ theme }) => theme.textColorEmphasis};
    cursor: pointer;
`

const transition = {
    ease: easeInOutCustomBezier,
    duration: 0.4
}

const variants = {
    initial: {
        borderRadius: '50%'
    },
    whileHover: {
        borderRadius: '0%',
        transition
    }
}

export default function Buttons() {
    const { state: { selected, featuredPosts }, dispatch } = useSlideshow()

    let buttonArrayNum = []
    for (let i = 0; i < featuredPosts.length; i++) { buttonArrayNum.push(i) }

    const animate = useAnimation()

    // Sets whether buttons are clickable
    const [clickable, setClickable] = useState(true)
    useEffect(() => {
        setClickable(false)
        setTimeout(() => {
            setClickable(true)
        }, 1200)
    }, [selected])

    return (
        <ButtonContainer>
            {buttonArrayNum.map((val) => (
                <Button initial='initial' animate={animate} variants={variants} whileHover='whileHover'
                    style={{
                        scale: (val === selected ? 1.2 : 1),
                        opacity: (val === selected ? 1 : 0.7)
                    }} key={val} onClick={() => {
                        if (clickable) {
                            dispatch({ type: 'SET_SELECTED', payload: { selected: val } })
                        }
                    }} />
            ))}
        </ButtonContainer>
    )
}