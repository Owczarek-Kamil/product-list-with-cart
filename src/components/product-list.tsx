import formatPrice from "../utils/formatters";
import type { Product, AddOneToCart, RemoveOneFromCart, CartItems } from "../utils/types";

export function ProductItem({
  product,
  quantity,
  isSelected,
  addOneToCart,
  removeOneFromCart,
  isPriority,
}: {
  product: Product;
  quantity: number;
  isSelected: boolean;
  addOneToCart: AddOneToCart;
  removeOneFromCart: RemoveOneFromCart;
  isPriority?: boolean;
}) {
  const cartItem = {
    name: product.name,
    price: product.price,
    thumbnail: product.image.thumbnail,
  };

  const formattedPrice = formatPrice(product.price);
  const addOneToCartHandler = () => addOneToCart(cartItem);
  const removeOneFromCartHandler = () => removeOneFromCart(cartItem);

  return (
    <article className="flex flex-col">
      <div className="order-1">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={product.image.tablet}
            width={213}
            height={212}
          />
          <source
            media="(min-width: 1280px)"
            srcSet={product.image.desktop}
            width={250}
            height={240}
          />
          <img
            src={product.image.mobile}
            alt=""
            width={327}
            height={212}
            fetchPriority={isPriority ? "high" : "auto"}
            loading={isPriority ? "eager" : "lazy"}
            className={`h-auto w-full rounded-lg border-2 transition-colors ${isSelected ? "border-line-accent" : "border-transparent"}`}
          />
        </picture>
      </div>

      <div className="relative order-3 flex flex-col gap-1">
        <span className="text-sm text-ink-secondary">{product.category}</span>
        <h2 className="font-semibold text-ink-primary">{product.name}</h2>
        <span className="font-semibold text-ink-accent">{formattedPrice}</span>
      </div>

      {isSelected ? (
        <div className="order-2 -mt-5.5 flex h-11 w-40 items-center justify-between self-center rounded-full bg-button-active p-3">
          <button
            onClick={removeOneFromCartHandler}
            aria-label={`Remove one piece of ${product.name} from the cart`}
            className="grid size-5 cursor-pointer place-items-center rounded-full border border-current text-ink-white transition-colors hover:bg-button hover:text-ink-accent focus-visible:bg-button focus-visible:text-ink-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="2"
              fill="none"
              viewBox="0 0 10 2"
              aria-hidden={true}>
              <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
            </svg>
          </button>
          <span className="pointer-events-none text-sm font-semibold text-ink-white select-none">
            {quantity}
          </span>
          <button
            onClick={addOneToCartHandler}
            aria-label={`Add one piece of ${product.name} to the cart`}
            className="grid size-5 cursor-pointer place-items-center rounded-full border border-current text-ink-white transition-colors hover:bg-button hover:text-ink-accent focus-visible:bg-button focus-visible:text-ink-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="none"
              viewBox="0 0 10 10"
              aria-hidden={true}>
              <path
                fill="currentColor"
                d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
              />
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={addOneToCartHandler}
          className="group order-2 -mt-5.5 flex h-11 w-40 cursor-pointer items-center gap-2 self-center rounded-full border border-line-secondary bg-button px-6.5 py-3 transition-colors hover:border-current hover:text-ink-accent focus-visible:border-current focus-visible:text-ink-accent">
          <img src="./assets/icon-add-to-cart.svg" alt="" className="size-5" />
          <span className="text-sm font-semibold text-ink-primary transition-colors group-hover:text-current group-focus-visible:text-current">
            Add to Cart
          </span>
        </button>
      )}
    </article>
  );
}

export default function ProductList({
  products,
  cartItemsMap,
  addOneToCart,
  removeOneFromCart,
}: {
  products: Product[];
  cartItemsMap: CartItems;
  addOneToCart: AddOneToCart;
  removeOneFromCart: RemoveOneFromCart;
}) {
  return (
    <ul className="flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 md:grid-cols-3">
      {products.map((product, index) => {
        const cartItem = cartItemsMap[product.name];

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
              isPriority={index === 0}
            />
          </li>
        );
      })}
    </ul>
  );
}
