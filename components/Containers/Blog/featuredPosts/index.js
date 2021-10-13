import styled from 'styled-components'
import Buttons from './buttons'
import Slideshow from './slideshow'

const FeaturedPostsContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
`

export default function FeaturedPosts() {
    return (
        <FeaturedPostsContainer>
            <Slideshow />
            <Buttons />
        </FeaturedPostsContainer>
    )
}