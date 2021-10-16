import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styled from 'styled-components'
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import Video from './customRichtextComps/video';
import CodeBlock from './customRichtextComps/codeBlock';
import CodeLine from './customRichtextComps/codeLine';
import Paragraph from './customRichtextComps/paragraph';
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from './customRichtextComps/headings'
import UnorderedList from './customRichtextComps/unorderedList';
import OrderedList from './customRichtextComps/orderedList';
import Blockquote from './customRichtextComps/blockquote';
import Image from './customRichtextComps/image';
import Audio from './customRichtextComps/audio';

const TopMargin = styled.div`
    margin-top: 2rem;
`

const richTextRendererOptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const { file: { contentType, url, details }, description } = node.data.target.fields
            if (contentType.indexOf('video') === 0) {
                return <Video src={`https:${url}`} contentType={contentType} caption={description}/>
            } else if (contentType.indexOf('image') === 0) {
                return <Image src={`https:${url}`} height={details.image.height} width={details.image.width} caption={description} />
            }
            else if (contentType.indexOf('audio') === 0) {
                return <Audio src={`https:${url}`} contentType={contentType} caption={description}/>
            }
        },
        [BLOCKS.EMBEDDED_ENTRY]: (node) => {
            const { type } = node.data.target.fields
            switch (type) {
                case 'codeBlock':
                    const { language, code } = node.data.target.fields
                    return <CodeBlock code={code} language={language} />
            }
        },
        [BLOCKS.PARAGRAPH]: (node, children) => {
            return (
                <Paragraph>
                    {children}
                </Paragraph>
            )
        },
        [BLOCKS.HEADING_1]: (node) => {
            const { value: text } = node.content[0]
            return <Heading1>{text}</Heading1>
        },
        [BLOCKS.HEADING_2]: (node) => {
            const { value: text } = node.content[0]
            return <Heading2>{text}</Heading2>
        },
        [BLOCKS.HEADING_3]: (node) => {
            const { value: text } = node.content[0]
            return <Heading3>{text}</Heading3>
        },
        [BLOCKS.HEADING_4]: (node) => {
            const { value: text } = node.content[0]
            return <Heading4>{text}</Heading4>
        },
        [BLOCKS.HEADING_5]: (node) => {
            const { value: text } = node.content[0]
            return <Heading5>{text}</Heading5>
        },
        [BLOCKS.HEADING_6]: (node) => {
            const { value: text } = node.content[0]
            return <Heading6>{text}</Heading6>
        },
        [BLOCKS.UL_LIST]: (node, children) => <UnorderedList>{children}</UnorderedList>,
        [BLOCKS.OL_LIST]: (node, children) => <OrderedList>{children}</OrderedList>,
        [BLOCKS.QUOTE]: (node, children) => <Blockquote>{children}</Blockquote>
    },
    renderMark: {
        [MARKS.CODE]: (text) => <CodeLine>{text}</CodeLine>
    }
}

export default function PostContent({ blogPostData: { postRichText, heroImage, heroImageBlur } }) {
    return (
        <TopMargin>
            <Image src={heroImage.src} layout='responsive' height={heroImage.height} width={heroImage.width} placeholder='blur' blurDataURL={heroImageBlur.src} alt={heroImage.alt}/>
            {documentToReactComponents(postRichText, richTextRendererOptions)}
        </TopMargin>
    )
}