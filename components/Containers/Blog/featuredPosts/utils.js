export const getNext = (total, current) => {
    return (current + 1) % total
}

export const getPrev = (total, current) => {
    return (current - 1 === -1 ? (total - 1) : ((current - 1) % total))     
}