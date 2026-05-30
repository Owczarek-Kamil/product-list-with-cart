import { useState } from "react";
import type { CartItem, AddOneToCart, RemoveOneFromCart, RemoveFromCart } from "../utils/types";

export default function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartIsEmpty = cartItems.length === 0;

  const cartItemsCount = cartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0,
  );

  const cartTotal = cartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price,
    0,
  );

  const addOneToCart: AddOneToCart = (cartItem) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.name === cartItem.name);

      if (existingItem) {
        return prevCartItems.map((item) =>
          item.name === cartItem.name ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...prevCartItems, { ...cartItem, quantity: 1 }];
    });
  };

  const removeFromCart: RemoveFromCart = (cartName) =>
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.name !== cartName));

  const removeOneFromCart: RemoveOneFromCart = (cartItem) => {
    const existingItem = cartItems.find((item) => item.name === cartItem.name);

    if (existingItem && existingItem.quantity === 1) {
      removeFromCart(cartItem.name);
      return;
    }

    setCartItems((prevCartItems) => {
      return prevCartItems.map((item) =>
        item.name === cartItem.name ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });
  };

  const clearCart = () => setCartItems([]);

  return {
    cartItems: cartItems,
    cartIsEmpty: cartIsEmpty,
    cartItemsCount: cartItemsCount,
    cartTotal: cartTotal,
    addOneToCart,
    removeOneFromCart,
    removeFromCart,
    clearCart,
  };
}
