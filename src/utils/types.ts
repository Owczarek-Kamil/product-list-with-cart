export type Product = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
};

export type CartItem = { name: string; quantity: number; price: number; thumbnail: string };

export type CartItemPayload = Omit<CartItem, "quantity">;

export type CartItems = Record<string, CartItem>;

export type AddOneToCart = (payload: CartItemPayload) => void;
export type RemoveOneFromCart = (payload: CartItemPayload) => void;
export type RemoveFromCart = (name: string) => void;
