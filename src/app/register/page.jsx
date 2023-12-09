"use client";
import Route from "@/components/Route";
import { api } from "@/global/values";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    country: "",
    region: "",
    password: "",
    passwordConfirm: "",
  });
  const toast = useToast();

  const register = async () => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (data.email.match(regex)) {
      if (data.password == data.passwordConfirm && data.password.length >= 6) {
        try {
          await axios
            .post(`${api}users`, {
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              password: data.password,
              address1: data.address1,
              address2: data.address2,
              region: data.region,
              city: data.city,
              postcode: data.postcode,
              phone: data.phone,
              country: data.country,
            })
            .then((d) => {
              if (d.data) {
                toast({
                  duration: 3000,
                  status: "success",
                  title: "Амжилттай бүртгүүллээ.",
                });
                router.push("/login");
              } else {
                toast({
                  duration: 3000,
                  status: "warning",
                  title: "Бүртгэлтэй хаяг байна.",
                });
              }
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(data.password);
        toast({
          duration: 3000,
          status: "warning",
          title: "Нууц үгээ шалгана уу!(Нууц үг 6-с дээш оронтой байна.)",
        });
      }
    } else {
      toast({
        duration: 3000,
        status: "warning",
        title: "И-Майл хаяг буруу байна!",
      });
    }
  };
  const router = useRouter();
  return (
    <div className="container">
      <Route />
      <h1
        className="text-4xl flex pb-3"
        style={{
          borderBottom: "1px solid #ddd",
        }}
      >
        Register Account
      </h1>
      <p className="my-2">
        If you already have an account with us, please login at the login page.
      </p>
      <h2
        className="text-2xl pb-3 flex mb-2"
        style={{
          borderBottom: "1px solid #ddd",
        }}
      >
        Your Personal Details
      </h2>
      <Input
        title="First Name:"
        onChange={(e) => setData((prev) => ({ ...prev, firstname: e }))}
      />
      <Input
        title="Last Name:"
        onChange={(e) => setData((prev) => ({ ...prev, lastname: e }))}
      />
      <Input
        title="E-Mail:"
        onChange={(e) => setData((prev) => ({ ...prev, email: e }))}
      />
      <Input
        title="Phone:"
        onChange={(e) => setData((prev) => ({ ...prev, phone: e }))}
      />
      <h2
        className="text-2xl pb-3 flex mb-2 mt-10"
        style={{
          borderBottom: "1px solid #ddd",
        }}
      >
        Your Address
      </h2>
      <Input
        title="Address 1:"
        onChange={(e) => setData((prev) => ({ ...prev, address1: e }))}
      />
      <Input
        title="Address 2:"
        onChange={(e) => setData((prev) => ({ ...prev, address2: e }))}
      />
      <Input
        title="City:"
        onChange={(e) => setData((prev) => ({ ...prev, city: e }))}
      />
      <Input
        title="Post Code:"
        onChange={(e) => setData((prev) => ({ ...prev, postcode: e }))}
      />
      <Input
        title="Country:"
        onChange={(e) => setData((prev) => ({ ...prev, country: e }))}
      />
      <Input
        title="Region / State:"
        onChange={(e) => setData((prev) => ({ ...prev, region: e }))}
      />
      <h2
        className="text-2xl pb-3 flex mb-2 mt-10"
        style={{
          borderBottom: "1px solid #ddd",
        }}
      >
        Your Password
      </h2>
      <Input
        title="Password:"
        type="password"
        onChange={(e) => setData((prev) => ({ ...prev, password: e }))}
      />
      <Input
        title="Password Confirm:"
        type="password"
        onChange={(e) => setData((prev) => ({ ...prev, passwordConfirm: e }))}
      />
      <div className="flex items-center gap-2 my-4">
        <button
          className="px-3 py-2"
          style={{
            border: "2px solid #ddd",
          }}
          onClick={() => {
            register();
          }}
        >
          Continue
        </button>{" "}
      </div>
    </div>
  );
}

export const Input = ({ onChange, title, type = "text" }) => {
  return (
    <div className="flex items-center  ">
      <p
        className="text-lg mb-1 "
        style={{
          width: "150px",
        }}
      >
        {title}
      </p>
      <input
        className="my-1 px-2 py-1"
        style={{
          width: "300px",
        }}
        type={type}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
