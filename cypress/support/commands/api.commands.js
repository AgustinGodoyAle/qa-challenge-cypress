export const getCredentials = () => ({
  username: Cypress.env('apiUsername'),
  password: Cypress.env('apiPassword'),
});

Cypress.Commands.add('apiLogin', (credentials) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/login`,
    body: credentials,
    failOnStatusCode: false,
    log: false, // para que el password no quede en el log
  });
});

Cypress.Commands.add('loginAndSaveToken', () => {
  cy.apiLogin(getCredentials()).then((res) => {
    expect(res.status).to.eq(201);
    Cypress.env('token', res.body.token);
  });
});

// Todos los requests autenticados pasan por acá y reutilizan el token del login
Cypress.Commands.add('apiRequest', (method, path, body) => {
  return cy.request({
    method,
    url: `${Cypress.env('apiUrl')}${path}`,
    body,
    headers: { Authorization: `Bearer ${Cypress.env('token')}` },
    failOnStatusCode: false,
  });
});
