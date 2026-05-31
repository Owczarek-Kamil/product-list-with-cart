import formatPrice from "../../utils/formatters";
import type { CartItem, RemoveFromCart } from "../../utils/types";

function DestructiveIcon() {
  return (
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
  );
}

export function CartRow({ cartItem, onRemove }: { cartItem: CartItem; onRemove: RemoveFromCart }) {
  const { name, price, quantity } = cartItem;
  const removeItemHandler = () => onRemove(name);
  const totalPrice = price * quantity;

  return (
    <div className="flex items-center gap-4 border-b border-line-primary pb-4 group-last:border-b-0 group-last:pb-0">
      <div className="flex w-full items-center justify-between gap-2">
        <div aria-hidden="true" className="flex flex-col justify-between gap-2">
          <span className="text-sm font-semibold text-ink-primary">{name}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-ink-accent">{quantity}x</span>
            <span className="text-sm text-ink-secondary">@ {formatPrice(price)}</span>

            <span className="font-semibold text-ink-primary">{formatPrice(totalPrice)}</span>
          </div>
        </div>

        <span className="sr-only">{`${quantity} piece${quantity === 1 ? "" : "s"} of ${name} (${formatPrice(price)} each) for the total of ${formatPrice(totalPrice)}`}</span>

        <button
          onClick={removeItemHandler}
          aria-label={`Remove ${name} from the cart`}
          className="grid size-5 cursor-pointer place-items-center rounded-full border border-current text-button-destructive transition-colors hover:text-button-destructive-active focus-visible:text-button-destructive-active">
          <DestructiveIcon />
        </button>
      </div>
    </div>
  );
}

export function ModalRow({ cartItem }: { cartItem: CartItem }) {
  const { name, price, quantity, thumbnail } = cartItem;
  const totalPrice = price * quantity;

  return (
    <div className="flex items-center gap-4 border-b border-line-primary pb-4 group-last:border-b-0 group-last:pb-0">
      <img src={thumbnail} alt="" className="size-12 rounded-sm" />
      <div aria-hidden="true" className="flex w-full items-center justify-between gap-2">
        <div className="flex flex-col justify-between gap-2">
          <span className="text-sm font-semibold text-ink-primary">{name}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-ink-accent">{quantity}x</span>
            <span className="text-sm text-ink-secondary">@ {formatPrice(price)}</span>
          </div>
        </div>
        <span className="font-semibold text-ink-primary">{formatPrice(totalPrice)}</span>
      </div>

      <span className="sr-only">{`${quantity} piece${quantity === 1 ? "" : "s"} of ${name} (${formatPrice(price)} each) for the total of ${formatPrice(totalPrice)}`}</span>
    </div>
  );
}

type CartItemsListProps =
  | { type: "cart"; cartItems: CartItem[]; onRemove: RemoveFromCart }
  | { type: "modal"; cartItems: CartItem[]; onRemove?: never };

export function CartItemsList({ type, cartItems, onRemove }: CartItemsListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {cartItems.map((item) => (
        <li key={item.name} className="group">
          {type === "cart" && <CartRow cartItem={item} onRemove={onRemove} />}
          {type === "modal" && <ModalRow cartItem={item} />}
        </li>
      ))}
    </ul>
  );
}
