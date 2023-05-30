const listHelper = require('../utils/list_helper')

// Tests for dummy function
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


// Tests for totalLikes function
describe('total likes', () => {
  
  test('of empty list is zero', () => {
    const blogs = [];

    expect(listHelper.totalLikes(blogs)).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ];

    expect(listHelper.totalLikes(blogs)).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f1',
        title: 'Some Text',
        author: 'Edsger W. D.',
        url: 'http://www.u.arizona.edu/',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f4',
        title: 'Something',
        author: 'Edsger W.W.',
        url: 'http://www.u.arizona.edu/',
        likes: 10,
        __v: 0
      }
    ];

    expect(listHelper.totalLikes(blogs)).toBe(15)
  })
})


// Tests for favoriteBlog
describe('favorite blog', () => {
  
  test('of empty list is null', () => {
    const blogs = [];

    expect(listHelper.favoriteBlog(blogs)).toBe(null)
  })

  test('when list has only one blog equals to that blog', () => {
    const blogs = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
      }
    ];

    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[0])
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        title: 'Some Text',
        author: 'Edsger W. D.',
        likes: 5,
      },
      {
        title: 'Something',
        author: 'Edsger W.W.',
        likes: 10,
      }
    ];

    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[1])
  })
})


// Tests for mostBlogs
describe('largest amount of blogs', () => {
  
  test('of empty list is null', () => {
    const blogs = [];

    expect(listHelper.favoriteBlog(blogs)).toBe(null)
  })

  test('when list has only one blog equals to that blog', () => {
    const blogs = [
      {
        author: 'Edsger W. Dijkstra',
        blogs: 5,
      }
    ];

    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[0])
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        author: 'Edsger W. D.',
        blogs: 5,
      },
      {
        author: 'Edsger W.W.',
        blogs: 10,
      }
    ];

    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[1])
  })
})
