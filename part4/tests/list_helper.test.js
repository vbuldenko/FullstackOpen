const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(average([1])).toBe(1)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of a bigger list is calculated right', () => {
    expect(average([])).toBe(0)
  })
})