import { inventory } from './locators';
import { parsePrice } from '../support/helpers/price.helpers';

class InventoryPage {
  visit() {
    // Sauce Demo responde 404 en esta ruta y redirige a la app (SPA en GitHub Pages)
    cy.visit('/inventory.html', { failOnStatusCode: false });
    cy.get(inventory.title).should('have.text', 'Products');
  }

  product(name) {
    return cy.contains(inventory.item, name);
  }

  getProduct(name) {
    return this.product(name).then(($item) => ({
      name: $item.find(inventory.itemName).text(),
      price: parsePrice($item.find(inventory.itemPrice).text()),
      description: $item.find(inventory.itemDesc).text(),
    }));
  }

  addToCart(name) {
    this.product(name).find('button').click();
  }

  cartBadge() {
    return cy.get(inventory.cartBadge);
  }

  goToCart() {
    cy.get(inventory.cartLink).click();
  }
}

export default new InventoryPage();
