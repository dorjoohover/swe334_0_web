"use client";

import { api } from "@/global/values";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export const uploader = async (data, token) => {
  try {
    let file = new FormData();
    file.set("file", data);
    const res = await fetch(`${api}uploads`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: file,
      cache: "no-store",
    }).then((d) => d.json());
    return res.file;
  } catch (error) {
    console.log(error);
  }
};

const AdminCatalog = () => {
  const [data, setData] = useState({
    img: undefined,
    title: "",
    code: "",
    text: "",
  });
  const [parent, setParent] = useState();
  const [selected, setSelected] = useState();
  const toast = useToast();
  const getParent = async () => {
    try {
      await fetch(`${api}catalog/parent`)
        .then((d) => d.json())
        .then((d) => {
          console.log(d);
          setParent(d);
       
        });
    } catch (error) {}
  };
  useEffect(() => {
    getParent();
  }, []);
  const token = getCookie("token");
  const submit = async () => {
    try {
      let img = "";
      console.log(selected);
      if (data.img != undefined) img = await uploader(data.img, token);
      await axios
        .post(
          `${api}catalog`,
          selected != undefined && selected != ''
            ? {
                title: data.title,
                text: data.text,
                code: data.code,
                img: img,
                parent: selected,
              }
            : {
                title: data.title,
                text: data.text,
                code: data.code,
                img: img,
              },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((d) => {
          console.log(d.data);
          toast({
            title: "Амжилттай",
            duration: 2000,
            status: "success",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p className="mt-2">Title</p>
      <input
        type="text"
        onChange={(e) =>
          setData((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <p className="mt-2">Code</p>
      <input
        type="text"
        onChange={(e) => setData((prev) => ({ ...prev, code: e.target.value }))}
      />
      <p className="mt-2">Text</p>
      <textarea
        name="text"
        onChange={(e) => setData((prev) => ({ ...prev, text: e.target.value }))}
      ></textarea>
      <p className="mt-2">Image</p>
      <div className="flex flex-col gap-4 mb-4">
        <input
          type="file"
          accept="image/*"
          style={{ maxWidth: "500px" }}
          onChange={(e) =>
            setData((prev) => ({ ...prev, img: e.target.files?.[0] }))
          }
        />
        {parent && parent.length > 0 && (
          <select
            id=""
            onChange={(e) => setSelected(e.target.value)}
            style={{ maxWidth: "500px" }}
          >
            <option value="">Select</option>
            {parent.map((p, i) => {
              return (
                <option value={p._id} key={i}>
                  {p.title}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <button onClick={submit}>Submit</button>
    </div>
  );
};
export default AdminCatalog;
