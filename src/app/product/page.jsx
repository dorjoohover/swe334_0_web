"use client";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Route from "@/components/Route";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { api, upload } from "@/global/values";
import { Context } from "@/context";
import { FaHeart } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

export default function Product() {
  const params = useSearchParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [data, setData] = useState();
  const [quantity, setQuantity] = useState(1);
  const { handleCart, handleWish } = useContext(Context);
  const getData = async () => {
    try {
      await fetch(`${api}product/get/${params.get("id")}`)
        .then((d) => d.json())
        .then((d) => {
          console.log(d);
          setData(d);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [params]);
  return (
    <div className="container">
      <div className="py-6"></div>
      <Route />

      <div className="flex max-sm:flex-col md:flex-row  gap-20 gap-md-10">
        {data && data.imgs.length > 0 && (
          <div>
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
                maxWidth: "580px",
              }}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
             {data.imgs &&
                data.imgs.length > 0 &&
                data.imgs.map((img, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <img className="w-auto" src={`${upload}${img}`} alt="" />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <Swiper
              style={{
                maxWidth: "580px",
              }}
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={5}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {data.imgs &&
                data.imgs.length > 0 &&
                data.imgs.map((img, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <img className="w-auto" src={`${upload}${img}`} alt="" />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        )}

        <div>
          {" "}
          <h2
            className="pb-3 my-2  text-2xl"
            style={{
              borderBottom: "1px solid #ddd",
            }}
          >
            {data?.title}
          </h2>
          <p>Brand: {data?.brand}</p>
          <p>Product Code: {data?.code}</p>
          <div className="flex items-center">
            <p>Price: </p>
            <h1
              className="text-4xl font-bold px-2 py-4"
              style={{
                color: "#fe9711",
              }}
            >
              ${data?.price}
            </h1>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-2 my-2 mr-2">
              <p>Qty:</p>
              <input
                min={1}
                max={100}
                className="px-2 block py-1 w-12"
                style={{ border: "1px solid #ddd" }}
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex gap-2 my-2">
              <button
                onClick={() => {
                  handleCart(data._id, quantity);
                }}
                className="px-3 py-2 cart-brand"
              >
                Add to card
              </button>
              <button
                onClick={() => {
                  handleWish(data._id);
                }}
                className=" px-3 py-2 cart"
              >
                <FaHeart />
              </button>
              <button
                onClick={() => {
                  // handleCart();
                }}
                className=" px-3 py-2 cart"
              >
                <IoIosStats />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
