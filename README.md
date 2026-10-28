# QA Challenge - Cypress

- **Ejercicio 1:** API testing sobre Fake Store API (`cypress/e2e/api`)
- **Ejercicio 2:** E2E UI sobre Sauce Demo (`cypress/e2e/ui`)
- **Ejercicio 3:** Reporte de errores (`docs/reporte-de-errores.md`)

## Instalación

Requiere Node.js 20 o superior.

```bash
npm install
```

## Variables de entorno

Las credenciales de la API no están en el código. Copiar el archivo de ejemplo y completarlo:

```bash
cp cypress.env.example.json cypress.env.json
```

`cypress.env.json` está en el `.gitignore`. También se pueden pasar como variables de sistema `CYPRESS_apiUsername` y `CYPRESS_apiPassword`.

Las URLs y el usuario de Sauce Demo están en `cypress.config.js`.

## Ejecución

```bash
npm test             # todos los tests
npm run test:api     # solo API
npm run test:ui      # solo UI
npm run cy:open      # modo interactivo
```

## Decisiones

**API**

- Me basé en la documentación de la página. Ahí el carrito recibe los productos como objetos Product completos, no como `{ productId, quantity }` como en el GitHub.
- El token se guarda al hacer login y se manda en el header `Authorization` en todos los requests con el command `apiRequest`.
- Los productos se obtienen de `GET /products` y se mezclan al azar. El `userId` se busca en `GET /users` a partir del usuario logueado.
- La estructura y los tipos de las respuestas se validan con JSON Schema (Ajv).
- Los tests de carrito comparten el carrito creado porque la consigna pide actualizar y eliminar ese mismo carrito.
- La API no guarda los cambios: el POST siempre devuelve id 11 y el DELETE responde 200 aunque el carrito no exista. Por eso en el delete solo valido el status.
- La doc dice que el login devuelve 200, pero devuelve 201. Los tests validan el comportamiento real.

**UI**

- El login está fuera del alcance, así que seteo la cookie de sesión de Sauce Demo en lugar de usar la pantalla de login.
- Usé Page Object Model y selectores `data-test`, que son los más estables de la página. Los selectores están todos en `cypress/pages/locators.js` y los page objects los importan, así si cambia uno se toca un solo archivo.
- Los precios no están hardcodeados: los leo del catálogo y los comparo con los del carrito.
- `/inventory.html` responde 404 porque la app es una SPA en GitHub Pages que redirige, por eso el visit usa `failOnStatusCode: false`.

**CI**

- El workflow de GitHub Actions corre solo los tests de UI. Fake Store API responde 403 a todos los requests que salen de los runners de GitHub (incluso al login con password incorrecto, que debería dar 401), así que es un bloqueo por IP y no un problema de credenciales. Los tests de API se corren local con `npm run test:api`.
