import { cart } from './locators';
import { parsePrice } from '../support/helpers/price.helpers';

class CartPage {
  title() {
    return cy.get(cart.title);
  }

  items() {
    return cy.get(cart.item);
  }

  getItems() {
    return this.items().then(($items) =>
      [...$items].map((el) => {
        const $item = Cypress.$(el);
        return {
          name: $item.find(cart.itemName).text(),
          price: parsePrice($item.find(cart.itemPrice).text()),
          quantity: $item.find(cart.itemQuantity).text(),
          description: $item.find(cart.itemDesc).text(),
        };
      }),
    );
  }

  checkout() {
    cy.get(cart.checkoutBtn).click();
  }
}

export default new CartPage();
