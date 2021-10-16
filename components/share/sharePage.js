import styled, { css } from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import MarginWrapper from '../Containers/MarginWrapper'
import { useGlobalContext } from '../../providers/ContextProvider'
import {
    EmailIcon,
    EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton,
    TelegramIcon,
    TelegramShareButton, TumblrIcon, TumblrShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton,
} from 'react-share'

const SharePageContainer = styled(motion.div)`
    position: fixed;
    bottom: 11rem;
    right: 3rem;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: ${({ theme }) => `0px 0px 8px ${theme.shadow}`};
    width: 300px;
    max-height: 40%;
    font-family: 'Alata';
    overflow-y: auto;
    background-color: ${({ theme }) => theme.backgroundColorElevated};
    color: ${({ theme }) => theme.textColorEmphasis};
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

const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 1rem;
    margin-top: 0.5rem;
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

// For icon
const iconSize = 42

export default function SharePage({ isOpen, setIsOpen }) {
    // Contents
    const { globalState: { share, themeName, isPhone } } = useGlobalContext()

    return (
        <AnimatePresence>
            {isOpen &&
                <SharePageContainer key='contents' variants={variants} animate='animate' exit='exit' initial='initial' day={themeName === 'LIGHT_THEME'}>
                    <MarginWrapper style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'column',
                        wordBreak: 'break-word'
                    }}>
                        <div>
                            <Heading>Share this page</Heading>

                            <ButtonContainer>
                                <TwitterShareButton url={share.url} title={share.title} via='realCaptainWoof' hashtags={['developer']} >
                                    <TwitterIcon size={iconSize} round />
                                </TwitterShareButton>

                                <FacebookShareButton url={share.url} quote={`I liked this post titled '${share.title}' by Sohail Saha.`} >
                                    <FacebookIcon size={iconSize} round />
                                </FacebookShareButton>

                                <WhatsappShareButton url={share.url} title={share.title}>
                                    <WhatsappIcon size={iconSize} round />
                                </WhatsappShareButton>

                                <LinkedinShareButton url={share.url} title={share.title} summary={share.description} source="Sohail Saha's website">
                                    <LinkedinIcon size={iconSize} round />
                                </LinkedinShareButton>

                                <RedditShareButton url={share.url} title={share.title}>
                                    <RedditIcon size={iconSize} round />
                                </RedditShareButton>
                                <TelegramShareButton url={share.url} title={share.title}>
                                    <TelegramIcon size={iconSize} round />
                                </TelegramShareButton>

                                <EmailShareButton url={share.url} subject={share.title} body={share.description}>
                                    <EmailIcon size={iconSize} round />
                                </EmailShareButton>

                                <PinterestShareButton url={share.url} media={share.image} description={share.description}>
                                    <PinterestIcon size={iconSize} round />
                                </PinterestShareButton>

                                <TumblrShareButton url={share.url} title={share.title} caption={share.description} >
                                    <TumblrIcon size={iconSize} round />
                                </TumblrShareButton>
                            </ButtonContainer>
                        </div>
                    </MarginWrapper>
                </SharePageContainer>
            }
        </AnimatePresence>
    )
}