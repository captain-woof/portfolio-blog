import FullscreenContainer from "../FullscreenContainer";
import styled from 'styled-components'
import { useGlobalContext } from "../../../providers/ContextProvider";
import { motion } from "framer-motion";

const GreenBoxLeft = styled(motion.div)`
    position: absolute;
    top: ${({ isPhone }) => (isPhone ? "80vh" : "55vh")};
    left: 0;
    height: ${({ isPhone }) => (isPhone ? "12.5vh" : "33vh")};
    width: ${({ isPhone }) => (isPhone ? "41.67vw" : "25vw")};
    background-color: ${({ theme }) => (theme.colors.green)};
`

const RedBoxRight = styled(motion.div)`
    position: absolute;
    top: ${({ isPhone }) => (isPhone ? "8vh" : "0vh")};
    right: ${({ isPhone }) => (isPhone ? "0vw" : "6.25vw")};
    height: ${({ isPhone }) => (isPhone ? "50vh" : "75vh")};
    width: ${({ isPhone }) => (isPhone ? "50vw" : "31.25vw")};
    background-color: ${({ theme }) => (theme.colors.red)};
`

const MeStanding = styled.img`
    position: absolute;
    bottom: 4vh;
    right: 4vw;
    height: ${({ isPhone }) => (isPhone ? "35vh" : "50vh")};
`

const Title = styled.div`
    font-family: 'Montserrat Alternates';
    font-size: 3rem;
    position: absolute;
    display: flex;
    flex-direction: column;
    left: ${({ isPhone }) => (isPhone ? "14vw" : "12.5vw")};
    bottom: ${({ isPhone }) => (isPhone ? "10vh" : "12.5vh")};
`

const AboutTextContainer = styled(motion.div)`
    font-family: 'Alata';
    position: absolute;
    width: ${({ isPhone }) => (isPhone ? "50vw" : "30vw")};
    top: 10vh;
    right: 20vw;
`

const AboutHeyText = styled.div`
    font-size: 2.5rem;
`

const AboutDescriptionTextContainer = styled.div`
    font-size: ${({ isPhone }) => (isPhone ? "1rem" : "0.8rem")};
`

const AboutDescriptionText = styled.div`
    margin-bottom: 1rem;
`

const getAge = () => (
    (new Date().getFullYear() - (new Date(process.env.NEXT_PUBLIC_DOB).getFullYear()))
)

export default function SectionTwo() {
    const { globalState } = useGlobalContext()
    const { isPhone } = globalState

    return (
        <FullscreenContainer>
            <GreenBoxLeft isPhone={isPhone} />
            <RedBoxRight isPhone={isPhone}>
                <MeStanding isPhone={isPhone} src="/images/me-standing.svg" />
            </RedBoxRight>
            <Title isPhone={isPhone}>
                {isPhone
                    ? "About me"
                    : <>
                        <div>About</div>
                        <div>me</div>
                    </>
                }
            </Title>
            <AboutTextContainer isPhone={isPhone}>
                <AboutHeyText isPhone={isPhone}>hey,</AboutHeyText>
                <AboutDescriptionTextContainer isPhone={isPhone}>
                    <AboutDescriptionText>
                        I am Sohail Saha, {getAge()}, and I’m a frontend developer.
                    </AboutDescriptionText>
                    <AboutDescriptionText>
                        I use React.js framework for my work, along with several other libraries to add to the aesthetics.
                    </AboutDescriptionText>
                    <AboutDescriptionText>
                        I like perfection and simplicity in whatever I do.
                    </AboutDescriptionText>
                </AboutDescriptionTextContainer>
            </AboutTextContainer>
        </FullscreenContainer>
    )
}