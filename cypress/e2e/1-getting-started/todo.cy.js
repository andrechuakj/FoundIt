describe('flow', () => {
  it('some stuff happens', () => {
    // login
    cy.visit('/')
    cy.findByRole('textbox', { name: /email/i }).type('11.59@gmail.com')
    cy.findByLabelText(/password/i).type('123123')
    cy.findByRole('button', { name: /log in/i }).click()

    // go to View Listings page
    cy.findByRole('button', { name: /welcome, zacharias wong/i }).click()
    cy.findByRole('link', { name: /view listings/i }).click()

    // click on Nalgene bottle
    //cy.get('#justify-tab-example-tabpane-found > div > div > div').click()

    // // click returned
    //cy.findByRole('button', {  name: /returned/i}).click()

    // // ensure it says 'returned'
    //cy.findByText(/returned/i).should('exist')

    // go to Edit Profile page
    cy.findByRole('button', { name: /welcome, zacharias wong/i }).click()
    cy.findByRole('link', { name: /edit profile/i }).click()
    cy.findByRole('tab', { name: /change password/i }).click()

    // click on 'Report item'
    cy.findByRole('button', { name: /report item/i }).click()

    // click on 'lose your item'
    cy.findByText(/lose your item/i).click()

    // fill in with dummy values
    cy.findByRole('textbox', { name: /item name/i }).type('cypress_testing_1')
    cy.get('[id^=nested-dropdown-toggle]').click()
    cy.findByRole('button', { name: /electronics/i }).click()
    cy.findByRole('button', { name: /tablets/i }).click()
    cy.findByRole('textbox', { name: /item colour/i }).type('black')
    cy.findByRole('textbox', { name: /location lost/i }).type('NTU')
    cy.findByRole('textbox', { name: /other description/i }).type('NIL')

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

    //submit form
    cy.findByRole('button', {  name: /submit/i}).click()

    // click on exit
    cy.findByRole('button', {  name: /close/i}).click()
    
    // click on FoundIt icon to go to home page
    cy.contains('span', 'FoundIt').click();

    // click on 'Lost Items'
    cy.findByRole('tab', {  name: /lost items/i}).click()

    // search for item using filter function(should be there)
    cy.findByRole('searchbox').type('cypress')
    cy.get('#justify-tab-example-tabpane-lost > div > div > div').should('exist')


    // not sure if able to check for automated email
    // chat feature (WIP)
    // geomap feature (WIP)
  })
})