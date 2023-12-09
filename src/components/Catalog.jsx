"use client";
import { api, upload } from "@/global/values";
import { Card } from "./Card";

const CatalogWidget = ({
  data,
  count,
  img,
  title,
  text,
  limit,
  page,
  onPage,
  onChange
}) => {
  return (
    <div className="w-full">
      <h2
        className="pb-3 my-2  text-2xl"
        style={{
          borderBottom: "1px solid #ddd",
        }}
      >
        {title}
      </h2>
      <div className="h-1" />
      {img && img != "" && <img src={`${upload}${img}`} width={"100%"} alt="" />}
      {text && <p className="mt-1 mb-2">{text}</p>}
      <div className="flex justify-end items-center gap-3">
        <p>Sort by:</p>
        <select onChange={(e) => onChange(e)}>
          <option value="default">Default</option>
          <option value="name-desc">Name (A-Z)</option>
          <option value="name-asc">Name (Z-A)</option>
          <option value="price-desc">Price (High-Low)</option>
          <option value="price-asc">Price (Low-High)</option>
        </select>

      </div>
      <div
        className="grid max-sm:grid-cols-2 md: grid-cols-3 mt-4 gap-10"
        style={{ borderBottom: "1px solid #ddd" }}
      >
        {data.map((d, i) => {
    
          return (
            <Card
              key={i}
              id={d._id}
              img={d.thumbnail}
              price={d.price}
              title={d.title}
            />
          );
        })}
      </div>
      <div className="flex justify-center gap-2 py-2">
        {Array.from(Array(Math.round(count / limit)).keys()).map((e, i) => {
          return (
            <button
              className={`${e == page ? "font-bold" : "font-medium"}`}
              key={i}
              onClick={() => {
                onPage(i);
              }}
            >
              {e + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default CatalogWidget;
