Cypress.Commands.add('fillMandatoryFielsAndSubmit', function(){

    cy.get('#firstName').type('Adriele')
    cy.get('#lastName').type('Batista')
    cy.get('#email').type('adriele@exemplo.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})



