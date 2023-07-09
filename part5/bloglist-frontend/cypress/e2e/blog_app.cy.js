describe('Blog app', function() {
    beforeEach(function() {
        // cy.request('POST', 'http://localhost:3003/api/testing/reset')
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
        cy.get('#username').type('mlukkkkk')
        cy.get('#password').type('salainenf')
        cy.get('#login-button').click()

        cy.contains('Matti Luukkainepn logged in')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.get('input:first').type('mlukkkkk')
            cy.get('input:last').type('salainenf')
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