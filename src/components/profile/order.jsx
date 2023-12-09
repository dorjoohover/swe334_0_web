"use client";

import { Context } from "@/context";
import { DateParser, elipser } from "@/global/function";
import { api, upload } from "@/global/values";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export const WishCard = ({ data }) => {
  const router = useRouter();
  return (
    <div
      className="flex"
      style={{
        borderBottom: "1px solid #ddd",
      }}
    >
      <div
        className="p-2.5 flex items-center justify-center"
        style={{
          flex: 3,
        }}
      >
        {" "}
        <p className="font-bold ">${data.price}</p>
      </div>
      <div
        className="p-2.5 flex items-center "
        style={{
          flex: 3,
        }}
      >
        <p className=" ">{DateParser(data?.date)}</p>
      </div>
      <div
        className="p-2.5 flex items-center "
        style={{
          flex: 3,
        }}
      >
        <p className=" ">{data.status}</p>
      </div>
      <div
        className="p-2.5 flex items-center gap-2"
        style={{
          flex: 3,
        }}
      >
        <p>{data.products.length}</p>
      </div>
      {/* <div
        className="p-2.5 flex items-center "
        style={{
          flex: 3,
        }}
      >
        <p className="font-bold ">${data.id.price}</p>
      </div>
      <div
        className="p-2.5 flex items-center justify-center"
        style={{
          flex: 2,
        }}
      >
        <p>${Math.round(data?.id.price * data.quantity * 100) / 100}</p>
      </div> */}
    </div>
  );
};
export const OrderWrapper = () => {
  const [data, setData] = useState([]);
  const token = getCookie("token");
  const { deleteCart } = useContext(Context);
  const getData = async () => {
    try {
      await fetch(`${api}order/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((d) => d.json())
        .then((d) => {
          setData(d);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full">
      <div
        className="flex"
        style={{
          background: "#F0F0F0",
        }}
      >
        <div
          className="p-2.5 flex items-center justify-center"
          style={{
            flex: 3,
          }}
        >
          <p className="font-bold text-center">Price</p>
        </div>
        <div
          className="p-2.5 flex items-center "
          style={{
            flex: 3,
          }}
        >
          <p className="font-bold text-center">Ordered Date</p>
        </div>
        <div
          className="p-2.5 flex items-center "
          style={{
            flex: 3,
          }}
        >
          <p className="font-bold text-center">Status</p>
        </div>
        <div
          className="p-2.5 flex items-center "
          style={{
            flex: 3,
          }}
        >
          <p className="font-bold text-center">Total Product</p>
        </div>
      </div>
      {data?.map((d, i) => {
        return <WishCard data={d} key={i} />;
      })}

      {/* <div className="flex justify-end mt-4">
        <button
          className="cart-brand flex items-center px-6 py-2 gap-2"
          style={{
            border: "2px solid #ddd",
          }}
          onClick={order}
        >
          <CheckIcon />
          <p>Checkout</p>
        </button>
      </div> */}
    </div>
  );
};

export default function OrderPage() {
  return (
    <div className="container">
      <h2
        className="pb-3 my-2  text-2xl"
        style={{
          borderBottom: "1px solid #ddd",
        }}
      >
        Orders
      </h2>
      <OrderWrapper />
    </div>
  );
}
