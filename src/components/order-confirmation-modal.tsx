import { Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from "@headlessui/react";
import type { CartItem } from "../utils/types";
import formatPrice from "../utils/formatters";

export default function OrderConfirmationModal({
  isOpen,
  close,
  cartItems,
  cartTotal,
  clearCart,
}: {
  isOpen: boolean;
  close: () => void;
  cartItems: CartItem[];
  cartTotal: number;
  clearCart: () => void;
}) {
  const closeHandler = () => {
    clearCart();
    close();
  };

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-surface-backdrop/50" />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center">
        {/* The actual dialog panel  */}
        <DialogPanel className="mt-23.75 flex w-full max-w-148 flex-col gap-8 rounded-xl bg-surface-modal p-6">
          <div className="flex flex-col gap-6">
            <img src="/assets/icon-order-confirmed.svg" alt="" className="size-6" />
            <div className="flex flex-col gap-2">
              <DialogTitle className="text-[2.5rem] leading-[1.2] font-bold text-ink-primary">
                Order Confirmed
              </DialogTitle>
              <Description className="text-ink-secondary">We hope you enjoy your food!</Description>
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-lg bg-surface-app p-6">
            <ul className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <li key={item.name} className="group">
                  {/* VISUAL CONTENT */}
                  <div
                    aria-hidden="true"
                    className="flex items-center gap-4 border-b border-line-decorator pb-4 group-last:border-b-0 group-last:pb-0">
                    <img src={item.thumbnail} alt="" className="size-12 rounded-sm" />
                    <div className="flex w-full items-center justify-between gap-2">
                      <div className="flex flex-col justify-between gap-2">
                        <span className="text-sm font-semibold text-ink-primary">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-ink-accent">
                            {item.quantity}x
                          </span>
                          <span className="text-sm text-ink-secondary">
                            @ {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                      <span className="font-semibold text-ink-primary">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  {/* SCREEN READERS CONTENT  */}
                  <span className="sr-only">{`${item.quantity} piece${item.quantity === 1 ? "" : "s"} of ${item.name} (${formatPrice(item.price)} each) for the total of ${formatPrice(item.quantity * item.price)}`}</span>
                </li>
              ))}
            </ul>
            <div className="h-px bg-line-decorator" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-primary">Order total</span>{" "}
              <span className="text-2xl font-bold text-ink-primary">{formatPrice(cartTotal)}</span>
            </div>
          </div>
          <button
            onClick={closeHandler}
            className="mt-auto cursor-pointer rounded-full bg-surface-active p-4 text-center font-semibold text-ink-white">
            Start New Order
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
