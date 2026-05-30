import formatPrice from "../utils/formatters";
import type { CartItem, RemoveFromCart } from "../utils/types";

function CartItemRow({ item, onRemove }: { item: CartItem; onRemove: RemoveFromCart }) {
  const removeItemHandler = () => onRemove(item.name);

  return (
    <li className="flex items-center justify-between border-b border-line-decorator pb-4 not-first:pt-4 last:pb-6">
      <div aria-hidden="true" className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-ink-primary">{item.name}</span>
        <div className="flex gap-2">
          <span className="text-sm font-semibold text-ink-accent">{item.quantity}x</span>
          <span className="text-sm text-ink-secondary">@ {formatPrice(item.price)}</span>
          <span className="text-sm font-semibold text-ink-secondary">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>

      <span className="sr-only">{`${item.quantity} piece${item.quantity === 1 ? "" : "s"} of ${item.name} (${formatPrice(item.price)} each) for the total of ${formatPrice(item.quantity * item.price)}`}</span>

      <button
        onClick={removeItemHandler}
        aria-label={`Remove ${item.name} from the cart`}
        className="grid size-5 cursor-pointer place-items-center rounded-full border border-current text-ink-tertiary transition-colors hover:text-ink-primary focus-visible:text-ink-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 10 10"
          aria-hidden="true">
          <path
            fill="currentColor"
            d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
          />
        </svg>
      </button>
    </li>
  );
}

function CartItemsList({
  cartItems,
  onRemove,
}: {
  cartItems: CartItem[];
  onRemove: RemoveFromCart;
}) {
  return (
    <ul>
      {cartItems.map((cartItem) => (
        <CartItemRow key={cartItem.name} item={cartItem} onRemove={onRemove} />
      ))}
    </ul>
  );
}

export default function Cart({
  cartItems,
  cartIsEmpty,
  cartItemsCount,
  cartTotal,
  removeFromCart,
  onConfirmOrder,
}: {
  cartItems: CartItem[];
  cartIsEmpty: boolean;
  cartItemsCount: number;
  cartTotal: number;
  removeFromCart: RemoveFromCart;
  onConfirmOrder: () => void;
}) {
  return (
    <section className="flex w-full flex-col gap-6 rounded-xl bg-surface-cart px-6 pt-6 pb-10 xl:max-w-96">
      <h2 className="text-2xl font-bold text-ink-accent">Your Cart ({cartItemsCount})</h2>
      {cartIsEmpty ? (
        <div className="flex flex-col items-center gap-4">
          <img src="/assets/illustration-empty-cart.svg" alt="" />
          <span className="text-sm font-semibold text-ink-secondary">
            Your added items will appear here
          </span>
        </div>
      ) : (
        <>
          <CartItemsList cartItems={cartItems} onRemove={removeFromCart} />
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink-primary">Order total</span>{" "}
            <span className="text-2xl font-bold text-ink-primary">{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-lg bg-surface-app p-4">
            <img src="/assets/icon-carbon-neutral.svg" alt="" />
            <span className="text-sm text-ink-primary">
              This is a <span className="font-semibold">carbon-neutral</span> delivery
            </span>
          </div>
          <button
            onClick={onConfirmOrder}
            className="cursor-pointer rounded-full bg-surface-active p-4 text-center font-semibold text-ink-white">
            Confirm Order
          </button>
        </>
      )}
    </section>
  );
}
