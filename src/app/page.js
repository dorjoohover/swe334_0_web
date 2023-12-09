"use client";
import Button from "@/components/Button";
import RectCard, { Card } from "@/components/Card";
import Route from "@/components/Route";
import Sidebar from "@/components/Sidebar";
import Section from "@/components/Slider";

import { Global } from "@/global/assets";
import Slider from "react-slick";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container">
      <div className="py-6" />
      <Slider {...settings}>
        <div className="relative">
          <img
            src={
              "http://accordorange.magikthemes.com/catalog/view/theme/accord/image/banner-img.jpg"
            }
          />
          <div className="absolute inset-0 z-10">
            <div
              className="h-full p-8"
              style={{
                width: "350px",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRight: "1px rgba(255, 255, 255, 0.7) dashed",
              }}
            >
              <div className="py-3">
                <p className="text-4xl mb-12 text-center">
                  Women Collection 2014
                </p>
                <p className="mb-6 text-center text-zinc-700">
                  {" "}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Numquam, atque? Blanditiis reiciendis qui, expedita minima
                </p>
                <div className="flex justify-center w-full">
                  <Button text="Shop Now" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src={
              "http://accordorange.magikthemes.com/catalog/view/theme/accord/image/banner-img1.jpg"
            }
          />
          <div className="absolute right-0 top-0 bottom-0 z-10 mr-8">
            <div
              className="h-full p-8 flex flex-col items-center justify-center"
              style={{
                width: "550px",
                paddingTop: "8%",
              }}
            >
              <div className="py-3">
                <p
                  className="text-2xl py-4 text-center"
                  style={{
                    letterSpacing: "6px",
                  }}
                >
                  Collection 2014
                </p>
                <p
                  className="py-6 px-3  text-center text-white text-5xl mb-1"
                  style={{
                    borderTop: "2px dotted black",
                    borderBottom: "2px dotted black",
                  }}
                >
                  You like this theme
                </p>
                <p
                  className="text-2xl py-4 mb-12 text-center uppercase"
                  style={{
                    letterSpacing: "10px",
                  }}
                >
                  tristique senectus
                </p>
                <div className="flex justify-center w-full">
                  <Button text="Buy Now" bg="#fe9711" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src={
              "http://accordorange.magikthemes.com/catalog/view/theme/accord/image/banner-img2.jpg"
            }
          />
          <div className="absolute inset-0 z-10">
            <div className="flex items-center justify-center h-full">
              <p className="text-5xl text-white text-center letter-widest">
                Responsive Layout
              </p>
            </div>
          </div>
        </div>
      </Slider>
      <Section
        title={"Bestsellers"}
        child={
          <div className="grid grid-cols-4 gap-10">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        }
      />
    </div>
  );
}
