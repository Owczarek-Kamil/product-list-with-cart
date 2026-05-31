import { useState } from "react";
import type { AddOneToCart, RemoveOneFromCart, RemoveFromCart, CartItems } from "../utils/types";

export default function useCart() {
  const [cartItems, setCartItems] = useState<CartItems>({});

  const cartItemsArray = Object.values(cartItems);

  const cartIsEmpty = cartItemsArray.length === 0;

  const cartItemsCount = cartItemsArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0,
  );

  const cartTotal = cartItemsArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price,
    0,
  );

  const addOneToCart: AddOneToCart = (cartItemPayload) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems[cartItemPayload.name];

      if (existingItem) {
        return {
          ...prevCartItems,
          [cartItemPayload.name]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          },
        };
      }

      return {
        ...prevCartItems,
        [cartItemPayload.name]: {
          ...cartItemPayload,
          quantity: 1,
        },
      };
    });
  };

  const removeFromCart: RemoveFromCart = (name) => {
    setCartItems((prevCartItems) => {
      const newCart = { ...prevCartItems };
      delete newCart[name];
      return newCart;
    });
  };

  const removeOneFromCart: RemoveOneFromCart = (cartItemPayload) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems[cartItemPayload.name];

      if (!existingItem) return prevCartItems;

      if (existingItem.quantity === 1) {
        const newCart = { ...prevCartItems };
        delete newCart[cartItemPayload.name];
        return newCart;
      }

      return {
        ...prevCartItems,
        [cartItemPayload.name]: {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        },
      };
    });
  };

  const clearCart = () => setCartItems({});

  return {
    cartItemsMap: cartItems,
    cartItems: cartItemsArray,
    cartIsEmpty: cartIsEmpty,
    cartItemsCount: cartItemsCount,
    cartTotal: cartTotal,
    addOneToCart,
    removeOneFromCart,
    removeFromCart,
    clearCart,
  };
}
