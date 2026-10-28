import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

Cypress.Commands.add('validateSchema', (data, schema) => {
  const validate = ajv.compile(schema);
  expect(validate(data), ajv.errorsText(validate.errors)).to.be.true;
});
