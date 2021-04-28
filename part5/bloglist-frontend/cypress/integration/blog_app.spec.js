/* eslint-disable quotes */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to Application')
    cy.get("input[name='Username']")
    cy.get("input[name='Password']")
    cy.contains('login')
  })
})
