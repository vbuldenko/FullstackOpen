describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
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
            cy.get('.error').should('contain', 'Wrong credentials')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
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
            cy.get('input:first').type('mluukkai')
            cy.get('input:last').type('salainen')
            cy.get('#login-button').click()
        })

        it('5.19 - a new blog can be added', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('A new blog post is created by cypress')
            cy.get('#author').type('Mike Tyson')
            cy.get('#url').type('www.ai.com')
            cy.contains('save').click()
            cy.contains('A new blog post is created by cypress')
        })

        it('5.20 - a user can like a blog', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('A new blog post is created by cypress')
            cy.get('#author').type('Mike Tyson')
            cy.get('#url').type('www.ai.com')
            cy.contains('save').click()

            cy.contains('view').click()
            cy.get('.likeButton').click()
            cy.get('.likes').should('contain', 'likes 1')
        })
    })
})
