const dummy = (blogs) => {
   return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((total, currentValue)=> {
        return total + currentValue.likes
    }, 0)
    return total
}

module.exports = {
    dummy,
    totalLikes
}