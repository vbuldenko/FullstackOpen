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

    it('front-end page can be opened', function() {
        cy.contains('Log in to application')

    })

    it('unsuccessful login in', function() {
        cy.contains('login').click()
        cy.contains('Log in to application')
    })

    it('successful login in', function() {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()

        cy.contains('Matti Luukkainen logged in')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.get('input:first').type('mluukkai')
            cy.get('input:last').type('salainen')
            cy.get('#login-button').click()
        })

        it('a new blog can be added', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('A new blog post is created by cypress')
            cy.get('#author').type('Mike Tyson')
            cy.get('#url').type('www.ai.com')
            cy.contains('save').click()
            cy.contains('A new blog post is created by cypress')
        })
    })
})
