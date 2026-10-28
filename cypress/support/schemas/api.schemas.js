// Basados en components/schemas de https://fakestoreapi.com/docs
export const loginSchema = {
  type: 'object',
  required: ['token'],
  properties: { token: { type: 'string' } },
};

export const productSchema = {
  type: 'object',
  required: ['id', 'title', 'price', 'description', 'category', 'image'],
  properties: {
    id: { type: 'integer' },
    title: { type: 'string' },
    price: { type: 'number' },
    description: { type: 'string' },
    category: { type: 'string' },
    image: { type: 'string' },
  },
};

export const productListSchema = {
  type: 'array',
  items: productSchema,
};

export const cartSchema = {
  type: 'object',
  required: ['id', 'userId', 'products'],
  properties: {
    id: { type: 'integer' },
    userId: { type: 'integer' },
    products: { type: 'array', items: productSchema },
  },
};
