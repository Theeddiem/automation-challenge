/// <reference types="cypress" />
import Chance from "chance";
const chance = new Chance();

describe("ApiTest", () => {
  let name = chance.name();
  let description = chance.sentence({ words: 5 });
  let count = chance.integer({ min: 10, max: 800 });

  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("contains Elements", () => {
    cy.contains("Inventory Management System");
    cy.contains("Product Name");
    cy.contains("Product Description");
    cy.contains("Amount");
    cy.contains("Add Item");
  });

  it("addItem", () => {
    cy.get('input[name="item-name"]').type(name);
    cy.get("input[name=item-description").type(description);
    cy.get("input[name=item-amount").type(count);
    cy.contains("Add Item").click();
    cy.contains(`Name : ${name}`);
    cy.contains(`Description: ${description}`);
    cy.contains(`Amount: ${count}`);
  });

  it("depositAmount", () => {
    const amountToDeposit = chance.integer({ min: 1, max: 800 });
    const expectedAmount = count + amountToDeposit;
    cy.get('input[name="amount"]').type(amountToDeposit);
    cy.contains("Deposit").click();
    cy.contains(`Amount: ${expectedAmount}`);
    count = expectedAmount;
  });

  it("withdrawAmount", () => {
    const amountToWithdraw = chance.integer({ min: 1, max: count });
    const expectedAmount = count - amountToWithdraw;
    cy.get('input[name="amount"]').type(amountToWithdraw);
    cy.contains("Withdraw").click();
    cy.contains(`Amount: ${expectedAmount}`);
    count = expectedAmount;
  });

  it("updateItem", () => {
    name = chance.name();
    description = chance.sentence({ words: 8 });
    count = chance.integer({ min: 1, max: 800 });
    cy.contains("Update").click();
    cy.get('input[name="new-product"]').type(name);
    cy.get('input[name="new-description"]').type(description);
    cy.get('input[name="new-amount"]').type(count);

    cy.contains("Update").click();

    cy.contains(`Name : ${name}`);
    cy.contains(`Description: ${description}`);
    cy.contains(`Amount: ${count}`);
  });

  it("DeleteItem", () => {
    cy.contains("Delete").click();
    cy.contains("Delete").should("not.exist");
  });
});
