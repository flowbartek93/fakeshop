import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

//components

import Cart from "./Cart/Cart";

import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShopingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import Item from "./Item/Item";

///styles

import { Wrapper, StyleButton } from "./App.styles";

//Types

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const fetchStore = async (): Promise<CartItemType[]> => {
  return await (await fetch("https://fakestoreapi.com/products")).json();
};

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>("products", fetchStore);
  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => {
      return acc + item.amount;
    }, 0);

  const handleAddToCart = (clicked: CartItemType) => {
    console.log(clicked);

    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clicked.id);

      if (isItemInCart) {
        return prev.map(item => (item.id === clicked.id ? { ...item, amount: item.amount + 1 } : item));
      }

      return [...prev, { ...clicked, amount: 1 }];
    });

    console.log(cartItems);
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => {
      return prev.reduce((acc, item) => {
        console.log(prev);
        if (item.id === id) {
          console.log(acc);
          console.log(item);
          if (item.amount === 1) return acc;

          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[]);
    });
  };

  if (isLoading) return <LinearProgress />;

  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>

      <StyleButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShopingCartIcon />
        </Badge>
      </StyleButton>

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
