"use client";

import { api } from "@/global/values";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
export const account = [

  {
    href: "/profile/edit",
    name: "Edit Account",
  },
  {
    href: "/profile/password",
    name: "Password",
  },
  {
    href: "/profile/wishlist",
    name: "Wish List",
  },
  {
    href: "/profile/order",
    name: "Order History",
  },
  {
    href: "/profile/logout",
    name: "Log out",
  },
];
export const admin = [
  {
    href: "/admin/catalog",
    name: "Catalog",
  },
  {
    href: "/admin/product",
    name: "Product",
  },
  {
    href: "/admin/password",
    name: "Password",
  },
  {
    href: "/admin/wishlist",
    name: "Wish List",
  },
  {
    href: "/admin/order",
    name: "Order History",
  },
  {
    href: "/admin/logout",
    name: "Log out",
  },
];
export const ProfileSidebar = () => {
  return (
    <div style={{ width: "240px" }}>
      <h4
        className="font-medium text-2xl pb-3 my-2"
        style={{
          borderBottom: "1px #ddd solid",
        }}
      >
        Account
      </h4>
      {account?.map((cate, i) => {
        return (
          <div key={i} className="border-b py-4">
            <div className="flex w-full justify-between">
              <a href={cate.href}>{cate.name}</a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export const AdminSidebar = () => {
  return (
    <div style={{ width: "240px" }}>
      <h4
        className="font-medium text-2xl pb-3 my-2"
        style={{
          borderBottom: "1px #ddd solid",
        }}
      >
        Admin
      </h4>
      {admin?.map((cate, i) => {
        return (
          <div key={i} className="border-b py-4">
            <div className="flex w-full justify-between">
              <a href={cate.href}>{cate.name}</a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function Sidebar() {
  const [catalog, setCatalog] = useState([]);
  const [sub, setSub] = useState([]);
  const [view, setView] = useState(undefined);
  const getCatalog = async () => {
    try {
      await fetch(`${api}catalog`)
        .then((d) => d.json())
        .then((d) => {
          setCatalog(d.parent);
          setSub(d.sub);
        });
    } catch (error) {}
  };
  useEffect(() => {
    getCatalog();
  }, []);
  return (
    <div className="w-60">
      <h4
        className="font-medium text-2xl pb-3 my-2"
        style={{
          borderBottom: "1px #ddd solid",
        }}
      >
        Categories
      </h4>

      {catalog?.map((cate, i) => {
        return (
          <div key={i} className="border-b py-4">
            <div className="flex w-full justify-between">
              <a
                href=""
                className={`${
                  view == i ? "font-bold" : "font-medium"
                } uppercase `}
              >
                {cate.title}
              </a>
              {view == cate._id ? (
                <button onClick={() => setView(undefined)}>
                  {" "}
                  <FaMinus className="text-sm" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setView(cate._id);
                  }}
                >
                  <FaPlus className="text-sm" />
                </button>
              )}
            </div>

            {view != undefined &&
              sub.find((c) => c.parent._id == view) != undefined && (
                <ul className="mt-2">
                  {sub
                    .filter((c) => c.parent._id == cate._id)
                    .map((s, index) => {
                      return (
                        <li className=" ml-4" key={index}>
                          <a
                            href={`/catalog?id=${s._id}`}
                            className="flex items-center gap-1"
                          >
                            <IoMdArrowDropright />
                            <span className="text-sm py-1 font-thin uppercase">
                              {s.title}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                </ul>
              )}
          </div>
        );
      })}
      <img
        className="mt-2"
        src="http://accordorange.magikthemes.com/image/cache/data/block-banner-240x317.png"
        alt=""
      />
    </div>
  );
}
