"use client";
import { IoPerson } from "react-icons/io5";
import { FaCheck, FaHeart, FaSearch, FaUnlock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context";
import { getCookie, deleteCookie } from "cookies-next";
import { Global } from "@/global/assets";
import RectCard from "./Card";
import { api } from "@/global/values";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const { cart, wish } = useContext(Context);
  const token = getCookie("token");
  const [t, setToken] = useState();
  const [catalog, setCatalog] = useState([]);
  const [sub, setSub] = useState([]);
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
    setToken(token);

    getCatalog();
  }, [token]);
  const [view, setView] = useState();
  const [nav, setNav] = useState(false);
  return (
    <nav>
      <div className="container">
        <ul className="flex justify-end w-full gap-6 py-2">
          <li>
            <a href="/profile/edit" className="link">
              <IoPerson />
              My Account
            </a>
          </li>
          <li>
            <a href="/profile/wish" className="link">
              <FaHeart />
              Wish List ({wish?.length})
            </a>
          </li>
          <li>
            <a href="#" className="link">
              <FaCheck />
              Checkout
            </a>
          </li>
          {t == undefined && (
            <li>
              <a href="/login" className="link">
                <FaUnlock />
                Log In
              </a>
            </li>
          )}
        </ul>

        <div className="flex justify-between items-center py-6">
          <img src={Global.logo} alt="logo" className="h-12" />
          <RectCard count={cart?.length} />
        </div>
      </div>
      <div className="w-full border-y">
        <div
          className={`container flex justify-between relative ${
            nav ? "items-start" : "items-center"
          }`}
        >
          <div className={` hamburder ${nav ? "enable" : "disable"} `}>
            <a href="#" className="text-white text-base p-4 active">
              HOME
            </a>
            {catalog.map((cat, i) => {
              return (
                <a
                  key={i}
                  href={`/catalog?id=${cat._id}`}
                  className="text-black text-base p-4  uppercase"
                  onMouseEnter={(e) => {
                    setView(cat._id);
                  }}
                  onMouseLeave={() => {
                    setView(undefined);
                  }}
                >
                  {cat.title}
                </a>
              );
            })}
          </div>
          <div></div>
          <button
            onClick={() => setNav(!nav)}
            className="max-sm:block md:hidden absolute z-20 left-0 ml-10"
          >
            <HamburgerIcon />
          </button>
          <div
            className={`absolute nested-nav px-4 pt-4 pb-8 z-20 w-full white  ${
              view == undefined || view == "" ? "hidden" : "grid"
            }`}
            style={{
              borderBottom: "3px solid #fe9711",
              boxShadow: "0 0 20px -5px",
            }}
            onMouseEnter={(e) => {
              setView(view);
            }}
            onMouseLeave={() => {
              setView(undefined);
            }}
          >
            {sub
              .filter((s) => s.parent._id == view)
              ?.map((s, i) => {
                return (
                  <a
                    href={`/catalog?id=${s._id}`}
                    className="uppercase"
                    key={i}
                  >
                    {s.title}
                  </a>
                );
              })}
          </div>
          <div className="flex items-center search text-sm h-8 px-4">
            <input type="text" placeholder="Search..." />
            <button>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
