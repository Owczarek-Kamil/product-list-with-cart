import Cart from "./components/cart/cart";
import useCart from "./hooks/useCart";
import data from "./data/data.json";
import OrderConfirmationModal from "./components/cart/order-confirmation-modal";
import useModal from "./hooks/useModal";
import type { Product } from "./utils/types";
import ProductList from "./components/product-list";

const products = data as Product[];

function App() {
  const {
    cartItems,
    cartIsEmpty,
    cartItemsCount,
    cartTotal,
    addOneToCart,
    removeOneFromCart,
    removeFromCart,
    clearCart,
  } = useCart();

  const { isOpen, open, close } = useModal();

  return (
    <>
      <div className="min-h-screen min-w-80 bg-surface-app p-6 md:p-10">
        <div className="mx-auto flex max-w-304 flex-col gap-8 font-main xl:flex-row xl:items-start">
          <main className="flex flex-col gap-8 xl:max-w-200">
            <h1 className="text-[2.5rem] leading-[1.2] font-bold text-ink-primary">Desserts</h1>
            <ProductList
              products={products}
              cartItems={cartItems}
              addOneToCart={addOneToCart}
              removeOneFromCart={removeOneFromCart}
            />
          </main>
          <Cart
            cartItems={cartItems}
            cartIsEmpty={cartIsEmpty}
            cartItemsCount={cartItemsCount}
            cartTotal={cartTotal}
            removeFromCart={removeFromCart}
            onConfirmOrder={open}
          />
        </div>
      </div>
      <OrderConfirmationModal
        isOpen={isOpen}
        close={close}
        cartItems={cartItems}
        cartTotal={cartTotal}
        clearCart={clearCart}
      />
    </>
  );
}

export default App;
