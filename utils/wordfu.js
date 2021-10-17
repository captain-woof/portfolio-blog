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

export const getPathBreadcrumbs = () => {
    let base = location.pathname + (location.pathname[location.length - 1] !== '/' ? '/' : null)
    let breadcrumbs = []

    const slashIndices = []
    for (let i = 0; i < base.length; i++) {
        if (base[i] === '/') {
            slashIndices.push(i)
        }
    }
    for (let i = 0; i < slashIndices.length; i++) {
        breadcrumbs.push({
            url: base.slice(0, slashIndices[i] + 1),
            text: (i === 0 ? 'home' : (base.slice(slashIndices[i - 1] + 1, slashIndices[i])))
        })
    }
    return breadcrumbs
}