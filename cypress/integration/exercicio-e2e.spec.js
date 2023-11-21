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

        cy.get('[class="product-block grid"]')
        .contains('Gorgeous Granite Fish').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(2) > a').click()
        cy.get('[class="product-block grid"]')
        .contains('Licensed Soft Mouse').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(2) > a').click()
        cy.get('[class="product-block grid"]')
        .contains('Practical Soft Computer').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(2) > a').click()
        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(1) > a').click()
        cy.get('[class="product-block grid"]')
        .contains('Livingston All-Purpose Tight').click()
        cy.get('.button-variable-item-32').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.input-text').clear().type('2')
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
       
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

    it('Deve adicionar produtos ao carrinho - Usando comando customizado',() =>{
        cy.addProdutos('Bruno Compete Hoodie', 'M', 'Black', 3)
    });
})
