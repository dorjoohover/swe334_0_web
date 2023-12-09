"use client";

import { Context } from "@/context";
import { elipser } from "@/global/function";
import { api, upload } from "@/global/values";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";

export const WishCard = ({ data, handleCart, handleWish, }) => {
  const router = useRouter();
  return (
    <div
      className="flex"
      style={{
        borderBottom: '1px solid #ddd'
      }}
    >
      <div
        className="p-2.5 flex items-center justify-center"
        style={{
          flex: 2,
        }}
      >
        <img
          src={`${upload}${data.thumbnail}`}
          alt=""
          style={{
            width: "50px",
          }}
        />
      </div>
      <div
        className="p-2.5 flex items-center "
        style={{
          flex: 3,
        }}
      >
        <p className=" ">{elipser(data?.title, 15)}</p>
      </div>
      <div
        className="p-2.5 flex items-center "
        style={{
          flex: 2,
        }}
      >
        <p className=" ">{elipser(data?.brand, 15)}</p>
      </div>
      <div
        className="p-2.5 flex items-center "
        style={{
          flex: 2,
        }}
      >
        <p className=" ">{elipser(data?.code, 15)}</p>
      </div>
      <div
        className="p-2.5 flex items-center "
        style={{
          flex: 3,
        }}
      >
        <p className="font-bold ">${data.price}</p>
      </div>
      <div
        className="p-2.5 flex items-center gap-2 justify-center"
        style={{
          flex: 4,
        }}
      >
        <button
          onClick={() => {
            handleCart(data._id, 1);
            location.reload();
          }}
          className="w-10 h-10 flex justify-center items-center cart"
          style={{
            border: "2px solid #ddd",
          }}
        >
          <IoMdCart />
        </button>
        <button
          onClick={() => {
            handleWish(data._id);
            location.reload();
          }}
          className="w-10 h-10 flex justify-center items-center cart"
          style={{
            border: "2px solid #ddd",
          }}
        >
          <MdOutlineDelete />
        </button>
      </div>
    </div>
  );
};
export const WishWrapper = () => {
  const [data, setData] = useState([]);
  const token = getCookie("token");
  const { handleCart, handleWish } = useContext(Context);
  const getData = async () => {
    try {
      await fetch(`${api}users/wish`, {
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
          <p className="font-bold text-center">Brand</p>
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
            flex: 3,
          }}
        >
          <p className="font-bold text-center">Unit Price </p>
        </div>
        <div
          className="p-2.5 flex items-center justify-center"
          style={{
            flex: 4,
          }}
        >
          <p className="font-bold text-center">Action </p>
        </div>
      </div>
      {data?.map((d, i) => {
        return (
          <WishCard
            data={d}
            key={i}
            handleCart={handleCart}
            handleWish={handleWish}
          />
        );
      })}
    </div>
  );
};

const Profile = ({
  onClick,
  title,
  back,

  child,
}) => {
  const router = useRouter();
  return (
    <div>
      <h2
        className="pb-3 my-2  text-2xl"
        style={{
          borderBottom: "1px solid #ddd",
        }}
      >
        {title}
      </h2>

      {child}
      <div className="flex items-center gap-2 ">
        {back && (
          <button
            style={{
              border: "2px solid #ddd",
            }}
            className=" flex  gap-1 items-center px-3 py-2"
            onClick={() => router.back()}
          >
            <span>Back</span>
          </button>
        )}
        <button
          style={{
            border: "2px solid #ddd",
          }}
          className=" flex  gap-1 items-center px-3 py-2"
          onClick={onClick}
        >
          <FaArrowRight />
          <span>Continue</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
