"use client";

import { Context } from "@/context";
import { elipser } from "@/global/function";
import { api, upload } from "@/global/values";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export const WishCard = ({ data, deleteCart }) => {
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
          flex: 2,
        }}
      >
        {data.id.thumbnail && (
          <img
            src={`${upload}${data.id.thumbnail}`}
            alt=""
            style={{
              width: "50px",
            }}
          />
        )}
      </div>
      <div
        className="p-2.5 flex items-center "
        style={{
          flex: 3,
        }}
      >
        <p className=" ">{elipser(data?.id.title, 15)}</p>
      </div>
      <div
        className="p-2.5 flex items-center "
        style={{
          flex: 2,
        }}
      >
        <p className=" ">{elipser(data?.id.code, 15)}</p>
      </div>
      <div
        className="p-2.5 flex items-center gap-2"
        style={{
          flex: 5,
        }}
      >
        <p>{data.quantity}</p>
        <button
          onClick={() => {
            deleteCart(data.id._id);
            location.reload();
          }}
        >
          <CloseIcon color={"red"} />
        </button>
      </div>
      <div
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
      </div>
    </div>
  );
};
export const WishWrapper = () => {
  const [data, setData] = useState([]);
  const token = getCookie("token");
  const { deleteCart } = useContext(Context);
  const getData = async () => {
    try {
      await fetch(`${api}users/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((d) => d.json())
        .then((d) => {
          console.log(d);
          setData(d);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const toast = useToast()
  const order = async () => {
    try {
      let price = 0;
      data.map((e) => (price = e.quantity * e.id.price));
  
      await axios.post(`${api}order`, {
        price: price
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((d) => {
        toast({
          title: 'Амжилттай',
          status: 'success',
          duration: 3000
        })
        router.push('/profile/order')
      })
    } catch (error) {}
  };
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
            flex: 2,
          }}
        >
          <p className="font-bold text-center">Image</p>
        </div>
        <div
          className="p-2.5 flex items-center "
          style={{
            flex: 3,
          }}
        >
          <p className="font-bold text-center">Product Name</p>
        </div>
        <div
          className="p-2.5 flex items-center "
          style={{
            flex: 2,
          }}
        >
          <p className="font-bold text-center">Code</p>
        </div>
        <div
          className="p-2.5 flex items-center "
          style={{
            flex: 5,
          }}
        >
          <p className="font-bold text-center">Quantity</p>
        </div>
        <div
          className="p-2.5 flex items-center "
          style={{
            flex: 3,
          }}
        >
          <p className="font-bold text-center">Unit Price </p>
        </div>
        <div
          className="p-2.5 flex items-center justify-center"
          style={{
            flex: 2,
          }}
        >
          <p className="font-bold text-center">Total </p>
        </div>
      </div>
      {data?.map((d, i) => {
        return <WishCard data={d} key={i} deleteCart={deleteCart} />;
      })}

      <div className="flex justify-end mt-4">
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
      </div>
    </div>
  );
};

export default function CartPage() {
  return (
    <div className="container">
      <h2
        className="pb-3 my-2  text-2xl"
        style={{
          borderBottom: "1px solid #ddd",
        }}
      >
        Shopping Cart
      </h2>
      <WishWrapper />
    </div>
  );
}
