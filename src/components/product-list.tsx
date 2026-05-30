import type { Product, CartItem, AddOneToCart, RemoveOneFromCart } from "../utils/types";
import ProductItem from "./product-item";

export default function ProductList({
  products,
  cartItems,
  addOneToCart,
  removeOneFromCart,
}: {
  products: Product[];
  cartItems: CartItem[];
  addOneToCart: AddOneToCart;
  removeOneFromCart: RemoveOneFromCart;
}) {
  return (
    <ul className="flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 md:grid-cols-3">
      {products.map((product) => {
        const cartItem = cartItems.find((cartItem) => cartItem.name === product.name);
        const quantity = cartItem?.quantity ?? 0;
        const isSelected = quantity > 0;

        return (
          <li key={product.name}>
            <ProductItem
              product={product}
              quantity={quantity}
              isSelected={isSelected}
              addOneToCart={addOneToCart}
              removeOneFromCart={removeOneFromCart}
            />
          </li>
        );
      })}
    </ul>
  );
}
