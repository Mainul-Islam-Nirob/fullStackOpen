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
})
