
/// <reference types="cypress" />
import Chance from 'chance'
const chance = new Chance();

describe('aaa',()=>{

   
    const name = chance.name();
    const description = chance.sentence({words:5});
    const count = chance.integer().toString();


    beforeEach(()=>{
        cy.visit('http://localhost:4200')
    })

    it('contains Elements', ()=>{
        cy.contains('Inventory Management System')
        cy.contains('Product Name')
        cy.contains('Product Description')
        cy.contains('Amount')
        cy.contains('Add Item')
        
    })

    it("addItem", ()=> {
        cy.get('input[name="item-name"]').type(name);
        cy.get('input[name=item-description').type(description);
        cy.get('input[name=item-amount').type(count);
        cy.contains('Add Item').click();
        cy.contains(`Name : ${name}`)
        cy.contains(`Description: ${description}`)
        cy.contains(`Amount: ${count}`)

    })

    it("DepositToItem")
    {
        cy.contains(`Name : ${name}`).children
    }



    it


})