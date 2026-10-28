// Selectores de Sauce Demo. Se usan los atributos data-test porque no cambian con el diseño.

export const inventory = {
  title: '[data-test="title"]',
  item: '[data-test="inventory-item"]',
  itemName: '[data-test="inventory-item-name"]',
  itemPrice: '[data-test="inventory-item-price"]',
  itemDesc: '[data-test="inventory-item-desc"]',
  cartBadge: '[data-test="shopping-cart-badge"]',
  cartLink: '[data-test="shopping-cart-link"]',
};

export const cart = {
  title: '[data-test="title"]',
  item: '[data-test="inventory-item"]',
  itemName: '[data-test="inventory-item-name"]',
  itemPrice: '[data-test="inventory-item-price"]',
  itemQuantity: '[data-test="item-quantity"]',
  itemDesc: '[data-test="inventory-item-desc"]',
  checkoutBtn: '[data-test="checkout"]',
};

export const checkout = {
  firstName: '[data-test="firstName"]',
  lastName: '[data-test="lastName"]',
  postalCode: '[data-test="postalCode"]',
  continueBtn: '[data-test="continue"]',
  finishBtn: '[data-test="finish"]',
  completeHeader: '[data-test="complete-header"]',
};
