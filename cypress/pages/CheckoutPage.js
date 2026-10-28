import { checkout } from './locators';

class CheckoutPage {
  fillForm({ firstName, lastName, postalCode }) {
    cy.get(checkout.firstName).type(firstName);
    cy.get(checkout.lastName).type(lastName);
    cy.get(checkout.postalCode).type(postalCode);
    cy.get(checkout.continueBtn).click();
  }

  finish() {
    cy.get(checkout.finishBtn).click();
  }

  confirmationMessage() {
    return cy.get(checkout.completeHeader);
  }
}

export default new CheckoutPage();
