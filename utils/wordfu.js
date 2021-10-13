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