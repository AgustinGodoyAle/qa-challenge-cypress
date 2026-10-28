import { getCredentials } from '../../support/commands/api.commands';
import { loginSchema } from '../../support/schemas/api.schemas';
import loginData from '../../fixtures/api/login.json';

describe('API - Login', () => {
  it('login con credenciales válidas devuelve un token', () => {
    cy.apiLogin(getCredentials()).then((res) => {
      // La doc dice 200 pero la API responde 201
      expect(res.status).to.eq(201);
      cy.validateSchema(res.body, loginSchema);
      expect(res.body.token).to.not.be.empty;
    });
  });

  it('login con password incorrecto devuelve 401', () => {
    const { username } = getCredentials();

    cy.apiLogin({ username, password: loginData.wrongPassword }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.eq('username or password is incorrect');
    });
  });
});
