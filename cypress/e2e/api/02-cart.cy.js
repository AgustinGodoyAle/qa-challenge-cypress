import { getCredentials } from '../../support/commands/api.commands';
import { toCartProduct } from '../../support/helpers/cart.helpers';
import { cartSchema, productListSchema } from '../../support/schemas/api.schemas';

// Los tests van en orden y comparten el carrito, porque la consigna pide
// actualizar y eliminar el carrito creado previamente.
// Nota: la API no guarda los cambios, el POST siempre devuelve id 11.
describe('API - Carrito', () => {
  let userId;
  let products;
  let cart;

  before(() => {
    cy.loginAndSaveToken();

    // El userId se busca a partir del usuario logueado
    cy.apiRequest('GET', '/users').then((res) => {
      userId = res.body.find((user) => user.username === getCredentials().username).id;
    });

    cy.apiRequest('GET', '/products').then((res) => {
      expect(res.status).to.eq(200);
      cy.validateSchema(res.body, productListSchema);
      products = Cypress._.shuffle(res.body);
    });
  });

  it('crea un carrito con 3 productos', () => {
    const body = { userId, products: products.slice(0, 3).map(toCartProduct) };

    cy.apiRequest('POST', '/carts', body).then((res) => {
      expect(res.status).to.eq(201);
      cy.validateSchema(res.body, cartSchema);
      expect(res.body.userId).to.eq(body.userId);
      expect(res.body.products).to.deep.eq(body.products);
      cart = res.body;
    });
  });

  it('actualiza el carrito agregando un producto', () => {
    const newProduct = toCartProduct(products[3]);
    const body = { userId: cart.userId, products: [...cart.products, newProduct] };

    cy.apiRequest('PUT', `/carts/${cart.id}`, body).then((res) => {
      expect(res.status).to.eq(200);
      cy.validateSchema(res.body, cartSchema);
      expect(res.body.id).to.eq(cart.id);
      expect(res.body.products).to.have.length(cart.products.length + 1);
      expect(res.body.products).to.deep.include(newProduct);
    });
  });

  it('elimina el carrito', () => {
    cy.apiRequest('DELETE', `/carts/${cart.id}`).then((res) => {
      expect(res.status).to.eq(200);
      // El carrito 11 no existe en el servidor (la API no persiste), por eso vuelve null
      expect(res.body).to.be.null;
    });
  });
});
