import inventoryPage from '../../pages/InventoryPage';
import cartPage from '../../pages/CartPage';
import checkoutPage from '../../pages/CheckoutPage';
import purchase from '../../fixtures/ui/purchase.json';

describe('UI - Flujo de compra', () => {
  beforeEach(() => {
    cy.loginByCookie(Cypress.env('sauceUser'));
    inventoryPage.visit();
  });

  it('compra 3 productos y valida la confirmación', () => {
    // Guardo nombre y precio del catálogo para compararlos después en el carrito
    const selected = [];
    purchase.products.forEach((name) => {
      inventoryPage.getProduct(name).then((product) => selected.push(product));
      inventoryPage.addToCart(name);
    });

    const totalProducts = purchase.products.length;
    inventoryPage.cartBadge().should('have.text', String(totalProducts));
    inventoryPage.goToCart();

    cartPage.title().should('have.text', 'Your Cart');
    cartPage.items().should('have.length', totalProducts);
    cartPage.getItems().then((items) => {
      selected.forEach((product) => {
        const item = items.find((i) => i.name === product.name);
        expect(item, product.name).to.exist;
        expect(item.price).to.eq(product.price);
        expect(item.quantity).to.eq('1');
        expect(item.description).to.eq(product.description);
      });
    });

    cartPage.checkout();
    checkoutPage.fillForm(purchase.customer);
    checkoutPage.finish();

    checkoutPage.confirmationMessage().should('have.text', purchase.confirmationMessage);
  });
});
