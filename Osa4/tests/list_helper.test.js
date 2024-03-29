const listHelper = require('../utils/list_helper')

const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('empty list returns 0', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
    test('when only one blog is in the list', () => {
        const blog = 100
        const result = listHelper.totalLikes([{ likes: blog }])
        expect(result).toBe(blog)
    })
    test('returns total sum of all the likes in the list', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('empty list returns undefined', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual(undefined)
    })
    test('when only one blog is in the list', () => {
        const blog = 100
        const result = listHelper.totalLikes([{ likes: blog }])
        expect(result).toBe(blog)
    })
    test('returns the blog with most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[2])
    })
})

describe('most blogs', () => {
    test('empty list returns undefined', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual(undefined)
    })
    test('when only one blog is in the list', () => {
        const blog = [{title: 'React patterns', author: 'Michael Chan',url: 'https://reactpatterns.com/',likes: 7,}]
        const auth = { author: 'Michael Chan', blogs: 1 }
        const result = listHelper.mostBlogs(blog)
        expect(result).toEqual(auth)
    })
    test('returns the author who has written most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        const auth = { author: 'Robert C. Martin', blogs: 3 }
        expect(result).toEqual(auth)
    })
})
describe('most likes', () => {
    test('empty list returns undefined', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual(undefined)
    })
    test('when only one blog is in the list', () => {
        const blog = [{title: 'React patterns', author: 'Michael Chan',url: 'https://reactpatterns.com/',likes: 7,}]
        const auth = { author: 'Michael Chan', likes: 7 }
        const result = listHelper.mostLikes(blog)
        expect(result).toEqual(auth)
    })
    test('returns the author who has the most likes', () => {
        const result = listHelper.mostLikes(blogs)
        const auth = { author: 'Edsger W. Dijkstra', likes: 17 }
        expect(result).toEqual(auth)
    })
})