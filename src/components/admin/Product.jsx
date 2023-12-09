"use client";

import { api } from "@/global/values";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { uploader } from "./Catalog";

const AdminProduct = () => {
  const [data, setData] = useState({
    thumbnail: undefined,

    brand: "",
    price: 0,
    title: "",
    code: "",
    text: "",
  });
  const [images, setImages] = useState([]);
  const [catalog, setCatalog] = useState();
  const [selected, setSelected] = useState();
  const toast = useToast();
  const getCatalog = async () => {
    try {
      await fetch(`${api}catalog/product`)
        .then((d) => d.json())
        .then((d) => {
          setCatalog(d);
        });
    } catch (error) {}
  };
  useEffect(() => {
    getCatalog();
  }, []);
  const token = getCookie("token");
  const submit = async () => {
    try {
      let thumbnail = "";
      let imgs = [];
      if (data.thumbnail != undefined)
        thumbnail = await uploader(data.thumbnail, token);
      for (let i = 0; i < images.length; i++) {
        const img = await uploader(images[i], token);
        imgs.push(img);
      }

      if (thumbnail == "" || imgs.length < 2) {
        toast({
          title: "Зураг оруулна уу",
          duration: 2000,
          status: "warning",
        });
        return;
      }
      await axios
        .post(
          `${api}product`,
          {
            price: data.price,
            brand: data.brand,
            title: data.title,
            text: data.text,
            code: data.code,
            imgs: imgs,
            thumbnail: thumbnail,
            catalog: selected,
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
      <p className="mt-2">Brand</p>
      <input
        type="text"
        onChange={(e) =>
          setData((prev) => ({ ...prev, brand: e.target.value }))
        }
      />
      <p className="mt-2">Price</p>
      <input
        type="number"
        onChange={(e) =>
          setData((prev) => ({ ...prev, price: e.target.value }))
        }
      />
      <p className="mt-2">Text</p>
      <textarea
        name="text"
        onChange={(e) => setData((prev) => ({ ...prev, text: e.target.value }))}
      ></textarea>
      <p className="mt-2">Thumbnail</p>
      <input
        type="file"
        accept="image/*"
        style={{ maxWidth: "500px" }}
        onChange={(e) =>
          setData((prev) => ({ ...prev, thumbnail: e.target.files?.[0] }))
        }
      />
      <p className="mt-2">Images </p>
      <div className="flex flex-col gap-4 mb-4">
        <input
          type="file"
          multiple
          accept="image/*"
          style={{ maxWidth: "500px" }}
          onChange={(e) => {
            console.log(e.target.files);
            setImages(e.target.files);
            console.log(data);
          }}
        />
        {catalog && catalog.length > 0 && (
          <select
            id=""
            onChange={(e) => setSelected(e.target.value)}
            style={{ maxWidth: "500px" }}
          >
            <option value="">Select</option>
            {catalog.map((p, i) => {
              return (
                <option value={p._id} key={i}>
                  {p.title} ({p.parent.title})
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
export default AdminProduct;
