"use client";
import CatalogWidget from "@/components/Catalog";
import Sidebar from "@/components/Sidebar";
import { api } from "@/global/values";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CatalogPage() {
  const params = useSearchParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [catalog, setCatalog] = useState();
  const [count, setCount] = useState(0);
  const getCatalog = async (id) => {
    try {
      await fetch(`${api}catalog/get/${id}`)
        .then((d) => d.json())
        .then((d) => {
          setCatalog(d);
          console.log(d);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async (id) => {
    try {
      await axios
        .post(`${api}product/catalog`, {
          id: id,
          page: page,
          limit: 10,
        })

        .then((d) => {
          console.log(d);
          setData(d.data.data);
          setCount(d.data.count);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getFilter = async (value) => {
    try {
      let filter = "title",
        v = 1;

      switch (value) {
        case "name-asc":
          filter = "title";
          v = -1;
          break;
        case "name-desc":
          filter = "title";
          v = 1;
          break;
        case "price-asc":
          filter = "price";
          v = 1;
          break;
        case "price-desc":
          filter = "price";
          v = -1;
          break;
      }
      await axios
        .post(`${api}product/filter`, {
          id: params.get("id"),
          page: page,
          limit: 10,
          filter: filter,
          value: v,
        })

        .then((d) => {
          setData(d.data.data);
          setCount(d.data.count);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("object");
    getData(params.get("id"));
    getCatalog(params.get("id"));
  }, [params, page]);

  return (
    <div className="container">
      <div className="py-6" />

      <div className="flex max-sm:flex-col-reverse md:flex-row">
        <Sidebar />
        <div className="w-10" />

        {data && catalog && (
          <CatalogWidget
            title={catalog.title}
            img={catalog.img}
            text={catalog.text}
            count={count}
            data={data}
            limit={10}
            onPage={(e) => setPage(e)}
            page={page}
            onChange={(e) => {
              if (e.target.value == "default") {
                getData(params.get("id"));
              } else {
                getFilter(e.target.value);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
