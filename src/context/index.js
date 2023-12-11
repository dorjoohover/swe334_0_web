"use client";
import { api } from "@/global/values";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

function CartState({ children }) {
  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);
  const toast = useToast();
  const token = getCookie("token");
  const getUser = async () => {
    try {
      await fetch(`${api}users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((d) => d.json())
        .then((d) => {
          setWish(d.wish);
          setCart(d.cart);
        });
    } catch (error) {}
  };
  useEffect(() => {
    if (token != undefined && token != "") {
      getUser();
    }
  }, [token]);
  const change = async (route = "wish", value) => {
    try {
      await axios
        .put(`${api}users/${route}`, value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((d) => console.log(d));
    } catch (error) {}
  };
  const handleWish = (value) => {
    let items = [];
    if (wish == undefined || !wish?.includes(value)) {
      items = wish ? [...wish, value] : [value];
      setWish(wish ? (prev) => [...prev, value] : [value]);
      toast({
        title: "Хүслээс нэмлээ",
        status: "success",
        duration: 3000,
      });
    } else {
      let item = wish?.filter((c) => c != value);
      items = item;
      setWish(item);
      toast({
        title: "Хүслээс хаслаа",
        status: "warning",
        duration: 3000,
      });
    }
    change("wish", items);
  };
  const handleCart = (value, quantity) => {
    let items = [];

    if (cart == undefined || !cart.find((c) => c.id == value)) {
      let item = { id: value, quantity: quantity };
      items = cart ? [...cart, item] : [item];
      setCart(cart ? (prev) => [...prev, item] : [item]);
    } else {
      let i = cart.findIndex((c) => c.id == value);

      let c = {
        id: cart[i].id,
        quantity: cart[i].quantity + quantity,
      };
      let item = [...cart.slice(0, i), c, ...cart.slice(i + 1)];
      setCart(item);
      items = item;
    }

    toast({
      title: "Амжилттай",
      status: "success",
      duration: 3000,
    });
    change("cart", items);
  };
  const deleteCart = (value) => {
    if (cart.find((c) => c.id == value) != undefined) {
      let items = cart.filter((c) => c.id != value);
      setCart(items);
      change("cart", items);
    }
  };
  return (
    <Context.Provider
      value={{ cart, handleCart, wish, handleWish, deleteCart }}
    >
      {children}
    </Context.Provider>
  );
}

export default CartState;
