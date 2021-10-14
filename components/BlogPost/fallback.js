import MinFullscreenContainer from '../Containers/MinFullscreenContainer'
import MarginWrapper from '../Containers/MarginWrapper'
import { FirstColumn, SecondColumn, TwoColumns } from '../Containers/Blog/twoColumns'
import { useGlobalContext } from '../../providers/ContextProvider'
import { motion } from 'framer-motion'
import { easeInOutCustomBezier, useThemeChangeAnim } from '../../lib/motion'
import { useEffect } from 'react'
import styled, { css } from 'styled-components'

const BlankHeader = styled(motion.div)`
    ${({theme: {textColorEmphasis}}) => (css`
        height: 4rem;
        width: 75%;
        background-color: ${textColorEmphasis};
        margin-bottom: 1.5rem;
    `)}
`

const BlankText = styled(motion.div)`
    ${({theme: {textColorSubtitle}}) => (css`
        height: 1.5rem;
        width: 100%;
        background-color: ${textColorSubtitle};
        margin-bottom: 1rem;
    `)}
`

const BlankText2 = styled(motion.div)`
    ${({theme: {textColorSubtitle}}) => (css`
        height: 1.5rem;
        width: 75%;
        background-color: ${textColorSubtitle};
        margin-bottom: 1rem;
    `)}
`

const compVariants = {
    animate: {
        opacity: 0.2,
        transition: {
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'linear',
            duration: 1
        }
    }
}

export default function Fallback() {
    const { globalState: { isPhone } } = useGlobalContext()

    return (
        <MinFullscreenContainer>
            <MarginWrapper style={{
                alignItems: 'flex-start',
                display: 'flex',
                fontFamily: 'Poppins',
                flexDirection: 'column',
                padding: (isPhone ? '1.5rem 2rem' : '1.5rem 1.5rem'),
                marginTop: '6rem'
            }}>
                <BlankHeader animate='animate' variants={compVariants} />
                <BlankHeader animate='animate' variants={compVariants} style={{width: '60%'}}/>
                <BlankHeader animate='animate' variants={compVariants} style={{width: '45%'}}/>
                <TwoColumns>
                    <FirstColumn>
                        <BlankText animate='animate' variants={compVariants} />
                        <BlankText2 animate='animate' variants={compVariants} />
                        <BlankText2 animate='animate' variants={compVariants} />
                        <BlankText animate='animate' variants={compVariants} />
                        <BlankText animate='animate' variants={compVariants} />
                        <BlankText2 animate='animate' variants={compVariants} />
                        <BlankText animate='animate' variants={compVariants} />
                        <BlankText2 animate='animate' variants={compVariants} />
                        <BlankText animate='animate' variants={compVariants} />
                    </FirstColumn>
                    <SecondColumn/>
                </TwoColumns>
            </MarginWrapper>
        </MinFullscreenContainer>
    )
}