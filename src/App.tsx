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
    cartItemsMap,
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
        <main className="mx-auto flex max-w-304 flex-col gap-8 font-main xl:flex-row xl:items-start">
          <div className="flex flex-col gap-8 xl:max-w-200">
            <h1 className="text-[2.5rem] leading-[1.2] font-bold text-ink-primary">Desserts</h1>
            <ProductList
              products={products}
              cartItemsMap={cartItemsMap}
              addOneToCart={addOneToCart}
              removeOneFromCart={removeOneFromCart}
            />
          </div>
          <Cart
            cartItems={cartItems}
            cartIsEmpty={cartIsEmpty}
            cartItemsCount={cartItemsCount}
            cartTotal={cartTotal}
            removeFromCart={removeFromCart}
            onConfirmOrder={open}
          />
        </main>
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
