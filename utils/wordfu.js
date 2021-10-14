export const getFirstWords = (string, n) => {
    const spaceIndices = []
    for (let i = 0; i < string.length; i++) {
        if (string[i] === ' ') {
            spaceIndices.push(i)
        }
    }
    const lastCharIndex = spaceIndices[n - 1]
    return string.slice(0, lastCharIndex)
}

export const getWordCount = (string) => (string.split(' ').length)

export const slugify = (string) => (string.replace(/[^\w\s]/g, '').toLowerCase().split(' ').join('-'))

export const findHeadings = async (richTextContent) => {
    let headingsData = richTextContent.filter((richTextData) => (richTextData.nodeType.indexOf('heading') === 0))
    return headingsData.map((headingData) => ({
        text: headingData.content[0].value,
        slug: slugify(headingData.content[0].value)
    }))
}