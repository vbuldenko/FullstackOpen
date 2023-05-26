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