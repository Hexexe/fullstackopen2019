let _ = require('lodash')

const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, item) => sum + item.likes, 0)

const favoriteBlog = blogs => blogs.length < 1 ? undefined : blogs.reduce((a, b) => a.likes > b.likes ? a : b)

const mostBlogs = blogs => _.chain(blogs).groupBy('author').map((b, c) => ({ 'author': c, 'blogs': b.length })).sortBy('blogs').reverse().head().value()

const mostLikes = blogs => _.chain(blogs).groupBy('author').map((b, c) => ({ 'author': c, 'likes': _.sumBy(b, 'likes') })).sortBy('likes').reverse().head().value()

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }