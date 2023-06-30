import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Sam Goodman',
        url: 'www.somesite.com',
        likes: 0,
        user: { name: 'Mike', username: 'miketyson' }
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('Component testing is done with react-testing-library')
    expect(element).toBeDefined()
})
