import { Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from "@headlessui/react";
import type { CartItem } from "../../utils/types";
import Decorator from "./decorator";
import OrderTotal from "./order-total";
import { CartItemsList } from "./cart-items-list";

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
        <DialogPanel className="mt-23.75 flex w-full max-w-148 flex-col gap-8 rounded-xl bg-surface-card p-6 md:mt-0">
          <div className="flex flex-col gap-6">
            <img src="/assets/icon-order-confirmed.svg" alt="" className="size-6" />
            <div className="flex flex-col gap-2">
              <DialogTitle className="text-[2.5rem] leading-[1.2] font-bold text-ink-primary">
                Order Confirmed
              </DialogTitle>
              <Description className="text-ink-secondary">We hope you enjoy your food!</Description>
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-lg bg-surface-card-secondary p-6">
            <CartItemsList type="modal" cartItems={cartItems} />
            <Decorator />
            <OrderTotal cartTotal={cartTotal} />
          </div>
          <button
            onClick={closeHandler}
            className="mt-auto cursor-pointer rounded-full bg-button-active p-4 text-center font-semibold text-ink-white">
            Start New Order
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
