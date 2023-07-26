/*
In Cypress, each 'it' block is treated as a separate test case, and Cypress reloads the page and resets the state before executing each test case.
This is intentional to ensure test isolation and to prevent any side effects between test cases.

In order to preserve state, you have to log in the user before each 'it' block
*/

describe('flow', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.findByPlaceholderText('Email').type('11.59@gmail.com')
    cy.findByPlaceholderText('Password').type('123123')
    cy.get('.log-in-sign-up-button').click()
  })

  it('user navigates to View Listings page and clicks on Nalgene bottle', () => {
    // go to View Listings page
    cy.findByRole('button', { name: /welcome, zacharias wong/i }).click()
    cy.findByRole('link', { name: /view listings/i }).click()
    cy.wait(3000) // necessary..

    // click on Nalgene bottle
    cy.get('#justify-tab-example-tabpane-found > div > div > div:nth-child(2)').click()
    cy.wait(3000) // necessary..

    // click returned
    cy.findByRole('button', {  name: /returned/i}).click()
    cy.wait(3000) // necessary..
    cy.reload()

    // ensure it says 'returned'
    cy.findByText('Returned').should('exist')
  })

  it('user navigates to Edit Profile page', () => {
    // go to Edit Profile page
    cy.findByRole('button', { name: /welcome, zacharias wong/i }).click()
    cy.findByRole('link', { name: /edit profile/i }).click()
    cy.findByRole('tab', { name: /change password/i }).click()
  })

  it('user reports a lost item', () => {
    // click on 'Report item'
    cy.findByRole('button', { name: /report item/i }).click()

    // click on 'lose your item'
    cy.findByText('lose your item').click()

    // fill in with dummy values
    cy.findByRole('textbox', { name: /item name/i }).type('cypress_testing_1')
    cy.get('[id^=nested-dropdown-toggle]').eq(1).click()
    cy.findByRole('button', { name: /electronics/i }).click()
    cy.findByRole('button', { name: /tablets/i }).click()
    cy.findByRole('textbox', { name: /item colour/i }).type('black')
    cy.findByRole('textbox', { name: /location lost/i }).type('NTU')
    cy.findByRole('textbox', { name: /other description/i }).type('NIL')

    cy.findByRole('region', { name: /map/i }).click('topRight')
    cy.get('[id^=formFile]').click()

    /*
    // not really sure how to upload picture
    cy.fixture('example.png').then((fileContent) => {
      // Attach the file to the "Upload File" button
      cy.get('input[type="file"]').selectFile({
        fileContent: fileContent,
        fileName: 'example.png',
        mimeType: 'image/png',
      });
    });
    */

    // submit form
    cy.findByRole('button', { name: /submit/i }).click()

    // click on exit
    cy.findByRole('button', { name: /close/i }).click()
  })

  it('verify that the item is indeed on the home page', () => {
    // click on 'Lost Items'
    cy.findByRole('tab', { name: /lost items/i }).click()

    // search for item using filter function(should be there)
    cy.findByRole('searchbox').type('cypress')
    cy.get('#justify-tab-example-tabpane-lost > div > div > div').should('exist')
  })

  it('user navigates to map feature', () => {
    cy.findByRole('button', {  name: /welcome, zacharias wong/i}).click()
    cy.findByRole('link', {  name: /view map/i}).click()
    cy.findByText(/lost items/i).click()
    cy.findByText(/found items/i).click()
  })

  it('user navigates to chat feature and sends a message to username: test', () => {
    cy.findByRole('img', {  name: /messages/i}).click()
    cy.findByRole('textbox').type('test')
    cy.contains('test').click()
    cy.get("input[placeholder=\"Write a message...\"]").type('this is home, truly, where I know I must be')
    cy.findByRole('img', {  name: /send message/i}).click()
    cy.wait(2000) // necessary..
  })

  it('user logs out, enters test account, and check if message is received', () => {
    cy.findByRole('button', {  name: /welcome, zacharias wong/i}).click()
    cy.findByRole('link', {  name: /logout/i}).click()
    cy.findByRole('button', {  name: /log out/i}).click()
    
    cy.findByRole('textbox', { name: /email/i }).type('test@gmail.com')
    cy.findByLabelText(/password/i).type('password')
    cy.findByRole('button', { name: /log in/i }).click()

    cy.findByRole('img', {  name: /messages/i}).click()
    cy.findByRole('textbox').type('Zacharias Wong')
    cy.contains('Zacharias Wong').click()
    cy.findAllByText('this is home, truly, where I know I must be').last().should('exist')
  })
})


