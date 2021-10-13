import styled from 'styled-components'
import { motion } from 'framer-motion'
import { easeOutQuintBezier } from '../../../../lib/motion'

const FeaturedPostContainer = styled(motion.div)`
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: ${({ color }) => color};
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const transition = {
    ease: easeOutQuintBezier,
    duration: 1.2
}

const variants = {
    initial: {
        x: '100%'
    },
    animate: {
        x: '0%',
        transition
    },
    exit: {
        x: '-100%',
        transition
    }
}

export default function FeaturedPost({ featuredPost }) {
    return (
        <FeaturedPostContainer color={featuredPost.tags[0].color} animate='animate' initial='initial' exit='exit' variants={variants}>
            <h1>{featuredPost.title}</h1>
        </FeaturedPostContainer>
    )
}