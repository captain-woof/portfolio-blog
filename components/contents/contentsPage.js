import styled, { css } from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import MarginWrapper from '../Containers/MarginWrapper'
import { useGlobalContext } from '../../providers/ContextProvider'
import Link from 'next/link'

const ContentsPageContainer = styled(motion.div)`
    position: fixed;
    bottom: 7rem;
    right: 3rem;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: ${({ theme }) => `0px 0px 6px ${theme.shadow}`};
    width: 300px;
    max-height: 40%;
    font-family: 'Alata';
    overflow-y: auto;
    background-color: ${({theme}) => theme.backgroundColorElevated};
    color: ${({theme}) => theme.textColorEmphasis};
    z-index: 10;

    scrollbar-width: thin;
    ::-webkit-scrollbar {
        width: 8px;
    }

    ${({ theme: { isPhone } }) => (isPhone && css`
        max-height: 80%;
        width: 80%;
    `)}
`

const Heading = styled.div`
    font-size: 1.6rem;
`

const MarkerList = styled.ul`
    font-size: 1rem;
`

const Marker = styled.li`
    transition: color 0.25s ease-in-out;
    &:hover {
        color: ${({ theme }) => theme.colors.yellow}
    }
`

const transition = {
    duration: 1,
    ease: 'anticipate'
}

const variants = {
    initial: {
        opacity: 0,
        y: 100
    },
    animate: {
        opacity: 1,
        y: 0,
        transition
    },
    exit: {
        opacity: 0,
        y: 100,
        transition
    }
}

export default function ContentsPage({ isOpen }) {
    // Contents
    const { globalState: { markers, themeName } } = useGlobalContext()

    return (
        <AnimatePresence>
            {isOpen &&
                <ContentsPageContainer key='contents' variants={variants} animate='animate' exit='exit' initial='initial' day={themeName === 'LIGHT_THEME'}>
                    <MarginWrapper style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'column',
                        wordBreak: 'break-word'
                    }}>
                        <div>
                            <Heading>In this page</Heading>

                            <MarkerList>
                                {markers.map((markerData, index) => (
                                    <Link href={markerData.link} key={index}><a>
                                        <Marker>{markerData.name}</Marker>
                                    </a></Link>
                                ))}
                            </MarkerList>
                        </div>
                    </MarginWrapper>
                </ContentsPageContainer>
            }
        </AnimatePresence>
    )
}