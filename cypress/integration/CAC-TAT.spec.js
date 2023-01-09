/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function() {        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {        
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Adriele')
        cy.get('#lastName').type('Batista')
        cy.get('#email').type('adriele.santana@exemplo.com')
        cy.get('#open-text-area').type(longText,{delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {        
      
        cy.get('#firstName').type('Adriele')
        cy.get('#lastName').type('Batista')
        cy.get('#email').type('adriele.exemplo.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Digite o valor não número no campo de telefone', function() {        
      
        cy.get('#phone')
        .type('ajdioehuieb')      
        .should('have.value','')        
    }) 
    
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {        
      
        cy.get('#firstName').type('Adriele')
        cy.get('#lastName').type('Batista')
        cy.get('#email').type('adriele@exemplo.com')
        cy.get('#phone-checkbox').check()        
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {        
      
        cy.get('#firstName').type('Adriele').should('have.value','Adriele') 
        .clear().should('have.value','')         
        cy.get('#lastName').type('Batista').should('have.value','Batista') 
        .clear().should('have.value','')
        cy.get('#email').type('adriele@exemplo.com').should('have.value','adriele@exemplo.com') 
        .clear().should('have.value','')
        cy.get('#phone').type('11994475824').should('have.value','11994475824')        
        .clear().should('have.value','')
        cy.get('#open-text-area').type('teste').should('have.value','teste')
        .clear().should('have.value','')        
    })
    
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatório', function() {        
      
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    
    it('Envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFielsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    
    it('Eseleciona um produto (Youtube) por seu texto', function() {
        cy.get('#product')
        .select('youtube')
        .should('have.value','youtube')
    })
    
    it('Seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })

    it('Seleciona um produto (Blog) por seu (índice)', function() {
        cy.get('#product')
        .select(1)
        .should('have.value','blog')
    })

    it('Marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
       
    })

    it('Marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')   
        .should('have.length', 3)  
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('Marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()         
        .uncheck()
        .should('not.be.checked')
    })

    it('Seleciona um arquivo da pasta fixtures', function(){
       cy.get('input[type="file"]')
       .should('not.have.value') 
       .selectFile('./cypress/fixtures/example.json')
       .should(function($input) {
           expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value') 
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
         })
    })
    
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('samplefile')
        cy.get('input[type="file"]')
        .selectFile('@samplefile')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
         })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')
    })







  })