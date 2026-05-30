import formatPrice from "../utils/formatters";
import type { Product, AddOneToCart, RemoveOneFromCart } from "../utils/types";

export default function ProductItem({
  product,
  quantity,
  isSelected,
  addOneToCart,
  removeOneFromCart,
}: {
  product: Product;
  quantity: number;
  isSelected: boolean;
  addOneToCart: AddOneToCart;
  removeOneFromCart: RemoveOneFromCart;
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
    <article className="flex flex-col" aria-selected={isSelected ? "true" : "false"}>
      <div className="order-1">
        <picture>
          <source media="(min-width: 768px)" srcSet={product.image.tablet} />
          <source media="(min-width: 1280px)" srcSet={product.image.desktop} />
          <img
            src={product.image.mobile}
            alt=""
            className={`rounded-lg border-2 transition-colors ${isSelected ? "border-line-accent" : "border-transparent"}`}
          />
        </picture>
      </div>

      <div className="relative order-3 flex flex-col gap-1">
        <span className="text-sm text-ink-secondary">{product.category}</span>
        <h2 className="font-semibold text-ink-primary">{product.name}</h2>
        <span className="font-semibold text-ink-accent">{formattedPrice}</span>
      </div>

      {isSelected ? (
        <div className="order-2 -mt-5.5 flex h-11 w-40 items-center justify-between self-center rounded-full bg-surface-active p-3">
          <button
            onClick={removeOneFromCartHandler}
            aria-label={`Remove one piece of ${product.name} from the cart`}
            className="grid size-5 cursor-pointer place-items-center rounded-full border border-line-white text-ink-white transition-colors hover:bg-surface-button hover:text-ink-accent focus-visible:bg-surface-button focus-visible:text-ink-accent">
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
            className="grid size-5 cursor-pointer place-items-center rounded-full border border-line-white text-ink-white transition-colors hover:bg-surface-button hover:text-ink-accent focus-visible:bg-surface-button focus-visible:text-ink-accent">
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
          className="group order-2 -mt-5.5 flex h-11 w-40 cursor-pointer items-center gap-2 self-center rounded-full border border-line-primary bg-surface-button px-6.5 py-3 transition-colors hover:border-line-accent focus-visible:border-line-accent">
          <img src="/assets/icon-add-to-cart.svg" alt="" className="size-5" />
          <span className="text-sm font-semibold text-ink-primary transition-colors group-hover:text-ink-accent group-focus-visible:text-ink-accent">
            Add to Cart
          </span>
        </button>
      )}
    </article>
  );
}
