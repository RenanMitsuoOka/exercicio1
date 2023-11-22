/// <reference types="cypress" />
var faker = require('faker');

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/produtos')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        let emailfaket = faker.internet.email()
        let nomefaker = faker.name.firstName()
        let sobrenomefaker = faker.name.lastName()

        cy.addProdutos('Bruno Compete Hoodie', 'M', 'Black', 3)
        cy.visit('/produtos')
        cy.addProdutos('Abominable Hoodie', 'M', 'Red', 3)
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        cy.get('#billing_first_name').type(nomefaker)
        cy.get('#billing_last_name').type(sobrenomefaker)
        cy.get('#select2-billing_country-container').click().type('Brasil', +'{enter}').click()
        cy.get('#billing_address_1').type('Aricanduva')
        cy.get('#billing_city').type('São Paulo')
        cy.get('#select2-billing_state-container').click().type('São Paulo', +'{enter}').click()
        cy.get('#billing_postcode').type('03456040')
        cy.get('#billing_phone').type('952191115')
        cy.get('#billing_email').type(emailfaket)
        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });  
})
