describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
    })

    it('5.17 - the login form displayed by default', function() {
        cy.contains('Log in to application')

    })

    describe ('5.18 - Login', function() {
        it('unsuccessful login in', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('WRONGpASSWORD')
            cy.get('#login-button').click()
            // cy.get('.error').contains('Wrong credentials') // ensure that the error message is rendered to the correct component classname 'error'
            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
            cy.contains('Log in to application')
        })

        it('successful login in', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('Matti Luukkainen logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        it('5.19 - a new blog can be added', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('A new blog post is created by cypress')
            cy.get('#author').type('Mike Tyson')
            cy.get('#url').type('www.ai.com')
            cy.contains('save').click()
            cy.contains('A new blog post is created by cypress')
        })

        describe('When user created the blog', function() {
            beforeEach(function() {
                cy.createBlog({
                    title: 'A new blog post is created by cypress',
                    author: 'Mike Tyson',
                    url: 'www.ai.com'
                })
            })

            it('5.20 - a user can like a blog', function() {
                cy.contains('view').click()
                cy.get('.likeButton').click()
                cy.get('.likes').should('contain', 'likes 1')
            })

            it('5.21 - a user who created a blog can delete it', function() {
                cy.contains('A new blog post is created by cypress').contains('view').click()
                cy.get('.deleteButton').click()
                // cy.get('.blogs').should('not.contain', 'A new blog post is created by cypress')
                cy.contains('A new blog post is created by cypress').should('not.exist')
            })

            it('5.22 - only the creator can see the delete button of a blog', function() {
                cy.contains('logout').click()

                const user = {
                    name: 'Mate Deymon',
                    username: 'mdemon',
                    password: 'password1'
                }
                cy.request('POST', 'http://localhost:3001/api/users/', user)
                cy.login({ username: 'mdemon', password: 'password1' })

                cy.contains('view').click()
                cy.get('.blog').should('not.contain', 'remove')
            })

            it('5.23 - blogs are ordered according to likes with the blog with the most likes being first', function() {
                cy.createBlog({
                    title: 'Second created blog post',
                    author: 'Mike Tyson',
                    url: 'www.ai.com'
                })

                cy.get('.blog').eq(1).find('.detailsButton').click()
                cy.get('.blog').eq(1).find('.likeButton').click()
                cy.visit('')

                cy.get('.blog').eq(0).should('contain', 'Second created blog post')
                cy.get('.blog').eq(1).should('contain', 'A new blog post is created by cypress')
            })
        })
    })
})
