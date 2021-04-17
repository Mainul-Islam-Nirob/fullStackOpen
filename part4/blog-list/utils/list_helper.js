const dummy = (blogs) => {
   return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((total, currentValue)=> {
        return total + currentValue.likes
    }, 0)
    return total
}

const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return null
    }

    // get most liked blogs
    const max = blogs.reduce((prev, current) => {
       return prev.likes > current.likes ? prev : current
    })

    // return most liked blog details
    const favBlog = {
        title: max.title,
        author: max.author,
        likes: max.likes,
    }

    return favBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}