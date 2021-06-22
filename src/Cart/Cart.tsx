import React, { useEffect } from "react";
import CartItem from "../CartItem/CartItem";
import { CartItemType } from "../App";
import { Wrapper } from "../App.styles";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  return (
    <>
      <Wrapper>
        <h2>Your shopping cart</h2>
        {cartItems.length === 0 ? <p>no items in cart</p> : null}
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
        ))}
      </Wrapper>
    </>
  );
};

export default Cart;
