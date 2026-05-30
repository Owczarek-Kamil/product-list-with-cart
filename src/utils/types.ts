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

export type CartItem = {
  name: string;
  quantity: number;
  price: number;
  thumbnail: string;
};

export type AddOneToCart = (cartItem: Omit<CartItem, "quantity">) => void;
export type RemoveOneFromCart = (cartItem: Omit<CartItem, "quantity">) => void;
export type RemoveFromCart = (cartName: string) => void;
