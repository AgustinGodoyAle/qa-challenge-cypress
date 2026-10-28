// La doc define los productos del carrito como objetos Product (no { productId, quantity }
// como en el GitHub). GET /products trae además "rating", que no va en el carrito.
export const toCartProduct = ({ id, title, price, description, category, image }) => ({
  id,
  title,
  price,
  description,
  category,
  image,
});
