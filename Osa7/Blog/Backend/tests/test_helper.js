const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'meme',
        author: 'Jukka Palmu',
        url: 'www.google.fi',
        likes: 0
    },
    {
        title: 'emem',
        author: 'Pukka Jalmu',
        url: 'www.elgoog.if',
        likes: 1000
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'lol', author: 'Pukka Jalmu', url: 'www.elgoog.if', likes: 1000 })
    await blog.save()
    await blog.remove()
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb }