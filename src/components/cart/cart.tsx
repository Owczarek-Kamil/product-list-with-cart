import type { CartItem, RemoveFromCart } from "../../utils/types";
import { CartItemsList } from "./cart-items-list";
import Decorator from "./decorator";
import OrderTotal from "./order-total";

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
    <section className="flex w-full flex-col gap-6 rounded-xl bg-surface-card p-6 xl:sticky xl:top-0 xl:max-w-96">
      <h2 className="text-2xl font-bold text-ink-accent">Your Cart ({cartItemsCount})</h2>
      {cartIsEmpty ? (
        <div className="flex flex-col items-center gap-4 pb-4">
          <img src="/assets/illustration-empty-cart.svg" alt="" width={128} height={128} />
          <span className="text-sm font-semibold text-ink-secondary">
            Your added items will appear here
          </span>
        </div>
      ) : (
        <>
          <CartItemsList type="cart" cartItems={cartItems} onRemove={removeFromCart} />
          <Decorator />
          <OrderTotal cartTotal={cartTotal} />
          <div className="flex items-center justify-center gap-2 rounded-lg bg-surface-app p-4">
            <img src="/assets/icon-carbon-neutral.svg" alt="" />
            <span className="text-sm text-ink-primary">
              This is a <span className="font-semibold">carbon-neutral</span> delivery
            </span>
          </div>
          <button
            onClick={onConfirmOrder}
            className="cursor-pointer rounded-full bg-button-active p-4 text-center font-semibold text-ink-white">
            Confirm Order
          </button>
        </>
      )}
    </section>
  );
}
