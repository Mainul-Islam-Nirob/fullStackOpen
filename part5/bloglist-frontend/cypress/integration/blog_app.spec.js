/* eslint-disable quotes */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Nirob Chowdhury',
      username: 'nirob',
      password: 'nirob',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const anotheruser = {
      name: 'Mainul Islam',
      username: 'mainul',
      password: 'mainul',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', anotheruser)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to Application')
    cy.get("input[name='Username']")
    cy.get("input[name='Password']")
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get("input[name='Username']").type('nirob')
      cy.get("input[name='Password']").type('nirob')
      cy.get('button[type="submit"]').click()
      cy.contains('Nirob Chowdhury logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get("input[name='Username']").type('wrong')
      cy.get("input[name='Password']").type('credentials')
      cy.get('button[type="submit"]').click()
      cy.contains('Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Nirob Chowdhur logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'nirob', password: 'nirob' })
    })

    it('A blog can be created', function () {
      cy.contains('Create Blog').click()
      cy.get('input[name="title"]').type('A new blog created by Cypress')
      cy.get('input[name="author"]').type('Cypress')
      cy.get('input[name="url"]').type('https://docs.cypress.io/')
      cy.get('button[type="submit"]').click()

      cy.contains('A new blog created by Cypress')
    })

    describe('and when a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Cypress creating a new blog',
          author: 'Cypress',
          url: 'https://www.cypress.io/',
        })
      })

      it('A user can like a blog', function () {
        cy.contains('show').click()
        cy.get('.likes').should('contain', 0)
        cy.get('.likeBtn').click()
        cy.get('.likes').should('contain', 1)
      })

      it('A user who created the blog can delete it', function () {
        cy.contains('show').click()
        cy.contains('Cypress creating a new blog')
        cy.contains('Remove').click()
        cy.contains('Cypress creating a new blog').should('not.exist')
      })
    })

    describe('When another user logs in', function () {
      beforeEach(function () {
        cy.login({ username: 'nirob', password: 'nirob' })
        cy.createBlog({
          title: 'Blog created by nirob',
          author: 'nirob',
          url: 'http://only-nirob-can-delete.com',
        })
      })
      it("user can't delete blog created by another user", function () {
        cy.contains('Blog created by nirob')
        cy.contains('Remove')
        cy.contains('LogOut').click()
        cy.login({ username: 'mainul', password: 'mainul' })
        cy.contains('Blog created by nirob')
        cy.contains('show').click()
        cy.contains('Nirob Chowdhury')
        cy.contains('Remove').should('not.exist')
      })
    })
  })
})
