"use client";
import Route from "@/components/Route";
import { AdminSidebar, admin } from "@/components/Sidebar";
import AdminCatalog from "@/components/admin/Catalog";
import AdminProduct from "@/components/admin/Product";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Admin() {
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
      admin.find((a) => a.href == pathname) != undefined
    ) {
      setPath(pathname.split("/")[2]);
      setTitle(admin.filter((a) => a.href == pathname)[0].name);
    }
  }, [pathname]);
  const view = () => {
    switch (path) {
      case "catalog":
        return <AdminCatalog />;
      case "product":
        return <AdminProduct/>
      case "password":
        return <h1>asdf</h1>;
      case "wishlist":
        return <h1>asdf</h1>;
      case "order":
        return <h1>asdf</h1>;
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

      <div className="flex">
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
        <AdminSidebar />
      </div>
    </div>
  );
}
