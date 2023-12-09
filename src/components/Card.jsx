"use client";
import { Context } from "@/context";
import { api, upload } from "@/global/values";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { IoIosStats, IoMdCart } from "react-icons/io";
import { MdOutlineStarBorder, MdOutlineStar } from "react-icons/md";
export const Card = ({ img, title, price, id }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleCart, handleWish } = useContext(Context);

  const [data, setData] = useState();
  const [quantity, setQuantity] = useState(1);
  const getProduct = async () => {
    try {
      await fetch(`${api}product/get/${id}`)
        .then((d) => d.json())
        .then((d) => {
          setData(d);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card-wrapper overflow-hidden ">
      <div className="relative card overflow-hidden ">
        <button
          onClick={() => {
            onOpen();
            getProduct();
          }}
          className="absolute uppercase top-0 z-20 quick font-bold text-white text-md px-2 py-3"
        >
          Quick view
        </button>
        <div className="relative">
          {img && <img src={`${upload}${img}`} alt="" />}
        </div>
        <a href={`/product?id=${id}`} className="sw absolute inset-0 z-10"></a>
      </div>
      <a href={`/product?id=${id}`} className="block mt-4 text-center">
        {title}
      </a>
      <div className="flex gap-1 mx-auto justify-center my-2">
        {[0, 1, 2, 3, 4].map((star, i) => {
          if (i < 3) return <MdOutlineStar color="#fe9711" key={i} />;
          return <MdOutlineStarBorder color="#ddd" key={i} />;
        })}
      </div>
      <p className="text-red-500 text-center mb-4 font-bolder">${price}</p>
      <div className="flex justify-center mb-4 gap-4">
        <button
          onClick={() => {
            handleWish(id);
          }}
          className="wishlist px-3 py-2 cart"
        >
          <FaHeart />
        </button>
        <button
          onClick={() => {
            handleCart(id, 1);
          }}
          className="px-3 py-2 cart"
        >
          Add to card
        </button>
        <button
          onClick={() => {
            // handleCart();
          }}
          className="stats px-3 py-2 cart"
        >
          <IoIosStats />
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setThumbsSwiper(null);
        }}
        isCentered
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            onClick={() => {
              onClose();
              setThumbsSwiper(null);
            }}
          />
          <ModalBody>
            {data && (
              <div className="flex px-4 pb-4 pb-6 gap-10">
                <div className="flex-1">
                  {data.imgs && (
                    <>
                      {" "}
                      <Swiper
                        style={{
                          "--swiper-navigation-color": "#fff",
                          "--swiper-pagination-color": "#fff",
                          maxWidth: "250px",
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
                                <img
                                  src={`${upload}${img}`}
                                  alt=""
                                  className="w-auto"
                                />
                              </SwiperSlide>
                            );
                          })}
                      </Swiper>
                      <Swiper
                        style={{
                          maxWidth: "250px",
                        }}
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={3}
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
                                <img
                                  className="w-auto"
                                  src={`${upload}${img}`}
                                  alt=""
                                />
                              </SwiperSlide>
                            );
                          })}
                      </Swiper>
                    </>
                  )}
                </div>
                <div className="flex-1">
                  {data.title && (
                    <h2
                      className="pb-3 my-2  text-2xl"
                      style={{
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {data.title}
                    </h2>
                  )}

                  {data.brand && <p>Brand: {data.brand}</p>}
                  {data.code && <p>Product code: {data.code}</p>}
                  {data.price && (
                    <h1
                      className="text-4xl font-bold px-2 py-4"
                      style={{
                        color: "#fe9711",
                      }}
                    >
                      Price: ${data.price}
                    </h1>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <p>Qty:</p>
                    <input
                      min={1}
                      max={100}
                      className="px-2 block py-1"
                      style={{ border: "1px solid #ddd" }}
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleCart(id, quantity);
                      }}
                      className="px-3 py-2 cart-brand"
                    >
                      Add to card
                    </button>
                    <button
                      onClick={() => {
                        handleWish(id);
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
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

const RectCard = ({  count }) => {
  return (
    <>
      <div className="relative ">
        <a href="/cart" className="flex items-center px-6 py-2 border gap-4">
          <IoMdCart />
          <div className="w-px h-4"></div>
          <p className="text-xs">
            Shopping Card {count} item(s)
          </p>
        </a>
      </div>
    </>
  );
};
export default RectCard;
