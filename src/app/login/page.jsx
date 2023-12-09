"use client";

import Route from "@/components/Route";
import { api } from "@/global/values";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUnlock } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

export default function LoginPage() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();
  const router = useRouter();
  const login = async () => {
    if (data.email != "" && data.password != "") {
 
      await axios
        .post(`${api}users/login`, {
          email: data.email,
          password: data.password,
        })
        .then((d) => {
          
          if (d.data.message == undefined) {
            setCookie("token", d.data);
            router.refresh()
            router.push('/')
          } else {
            toast({
              duration: 3000,
              status: "warning",
              title: "И-Майл хаяг эсвэл нууц үг буруу байна.",
            });
          }
        });
    } else {
      toast({
        duration: 3000,
        status: "warning",
        title: "И-Майл хаяг эсвэл нууц үгээ дутуу оруулсан байна.",
      });
    }
  };
  return (
    <div className="container">
      <Route />
      <div className="flex ">
        <div
          className="flex-1 pr-10"
          style={{
            borderRight: "1px solid #ddd",
          }}
        >
          <div
            className="flex pb-3"
            style={{
              borderBottom: "1px solid #ddd",
            }}
          >
            <h2 className="text-xl">Returning Customer</h2>
          </div>
          <p className="mt-4 mb-2">I am a returning customer</p>
          <p>
            By creating an account you will be able to shop faster, be up to
            date on an order&#39;s status, and keep track of the orders you have
            previously made.
          </p>
          <button className="mt-3">
            <a
              href="/register"
              style={{
                border: "2px solid #ddd",
              }}
              className=" flex  gap-1 items-center px-3 py-2"
            >
              <IoPersonSharp />
              <span>Continue</span>
            </a>
          </button>
        </div>
        <div className="flex-1 pl-10">
          <div
            className="flex pb-3"
            style={{
              borderBottom: "1px solid #ddd",
            }}
          >
            <h2 className="text-xl">New Customer</h2>
          </div>
          <p className="mt-4 mb-2">I am a returning customer</p>
    
            <p className="text-gl mb-1">E-Mail Address:</p>
            <input
              className="w-full px-2 py-1"
              type="text"
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <p className="text-gl mt-2 mb-1">Password:</p>
            <input
              type="password"
              className="w-full px-2 py-1"
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
            />

            <div className="flex items-center">
              <button
                onClick={login}
                className="flex  gap-1 items-center px-3 py-2 mt-3"
                style={{
                  border: "2px solid #ddd",
                }}
              >
                <FaUnlock />
                <span>Login</span>
              </button>
              <a href="/forgotten" className="ml-4">
                Forgotten Password
              </a>
            </div>
        
        </div>
      </div>
    </div>
  );
}
