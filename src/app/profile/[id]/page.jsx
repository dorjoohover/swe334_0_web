"use client";
import { Input } from "@/app/register/page";
import Route from "@/components/Route";
import { ProfileSidebar, account } from "@/components/Sidebar";
import Profile, { WishWrapper } from "@/components/profile";
import { OrderWrapper } from "@/components/profile/order";
import { api } from "@/global/values";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const token = getCookie("token");
  if (token == undefined) router.push("/login");
  const [path, setPath] = useState();
  const pathname = usePathname();
  const [title, setTitle] = useState();
  useEffect(() => {
    if (
      pathname &&
      pathname.split("/").length > 2 &&
      account.find((a) => a.href == pathname) != undefined
    ) {
      setPath(pathname.split("/")[2]);
      setTitle(account.filter((a) => a.href == pathname)[0].name);
    }
  }, [pathname]);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const toast = useToast();
  const updateProfile = async (route, body) => {
    try {
      await axios
        .put(`${api}users/${route}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((d) => {
          if (d.data) {
            toast({
              status: "success",
              duration: 3000,
              title: "Амжилттай.",
            });
          } else {
            toast({
              status: "warning",
              duration: 3000,
              title: "Нууц үгээ шалгана уу.",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const updatePersonal = () => {
    const body = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    };
    updateProfile("profile", body);
  };
  const updatePassword = () => {
    if ((user.confirmPassword != user.newPassword) | (user.newPassword == "")) {
      toast({
        title: "Нууц үгээ шалгана уу",
        duration: 3000,
        status: "warning",
      });
      return;
    }
    const body = {
      password: user.password,
      newPassword: user.newPassword,
    };
    updateProfile("password", body);
  };
  const view = () => {
    switch (path) {
      case "edit":
        return (
          <Profile
            back={true}
            child={
              <div className="mt-2 mb-8">
                <h2 className="capitalize text-xl mb-3">
                  Your Personal Details
                </h2>
                <Input
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, firstname: e }))
                  }
                  title={"FirstName"}
                />
                <Input
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, lastname: e }))
                  }
                  title={"LastName"}
                />
                <Input
                  onChange={(e) => setUser((prev) => ({ ...prev, email: e }))}
                  title={"Email"}
                />
                <Input
                  onChange={(e) => setUser((prev) => ({ ...prev, phone: e }))}
                  title={"Telephone"}
                />
              </div>
            }
            onClick={updatePersonal}
          />
        );
      case "password":
        return (
          <Profile
            back={true}
            child={
              <div className="mt-2 mb-8">
                <h2 className="capitalize text-xl mb-3">Your password</h2>
                <Input
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, password: e }))
                  }
                  type="password"
                  title={"Old Password"}
                />
                <Input
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, newPassword: e }))
                  }
                  type="password"
                  title={"Password"}
                />
                <Input
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, confirmPassword: e }))
                  }
                  type="password"
                />
              </div>
            }
            title={"Change Password"}
            onClick={updatePassword}
          />
        );
      case "wishlist":
        return (
          <Profile
            child={
              <div className="mt-2 mb-8">
                <h2 className="capitalize text-xl mb-3">Your password</h2>
                <WishWrapper />
              </div>
            }
            onClick={updatePassword}
          />
        );
      case "order":
        return <Profile
        child={
          <div className="mt-2 mb-8">
            <h2 className="capitalize text-xl mb-3">Your password</h2>
            <OrderWrapper />
          </div>
        }
        onClick={() => {}}
      />
      case "logout":
        return (
          <button
            onClick={() => {
              deleteCookie("token");
              router.push("/login");
            }}
          >
            Log out
          </button>
        );
    }
  };
  return (
    <div className="container">
      <div className="py-6" />
      <Route />
      <div className="flex max-sm:flex-col md:flex-row">
        <div className="w-full">
          <h2
            className="pb-3 my-2  text-2xl"
            style={{
              borderBottom: "1px solid #ddd",
            }}
          >
            {title}
          </h2>
          <div className="mt-4">{view()}</div>
        </div>
        <div className="w-10"></div>
        <ProfileSidebar />
      </div>
    </div>
  );
}
