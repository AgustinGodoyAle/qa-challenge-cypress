// El login queda fuera del alcance, así que se crea la sesión seteando
// la cookie que usa Sauce Demo en vez de pasar por la pantalla de login.
Cypress.Commands.add('loginByCookie', (username) => {
  cy.setCookie('session-username', username);
});
