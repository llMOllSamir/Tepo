import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa6";
import SwiperProvider from "./SwiperCardProvider";
import BtnCart from "../AddToCart";

export default function Card({ product }) {
  return (
    <div className="card">
      <div className="box rounded-lg ">
        <div className="front flex justify-center cursor-pointer items-center">
          <SwiperProvider list={product} />
        </div>
        <div className="back">
          <Link className="w-full h-full" href={`/products/${product._id}`}>
            <figure className="w-3/4 flex justify-center   items-center mx-auto">
              <Image
                className="w-full"
                src={product.imageCover}
                width={100}
                height={100}
                alt={product.title}
              />
            </figure>
          </Link>
          <h2 className="text-start text-gray-600 dark:text-gray-400">
            {product.title.split(" ").slice(0, 3).join(" ")}
          </h2>
          <div className="flex gap-1 ">
            {"stars".split("").map((_, index) => (
              <FaStar
                fontSize={"large"}
                key={index}
                fill={
                  Math.round(product.ratingsAverage) > index
                    ? "gold"
                    : "hsl(0,0%,50%,25%)"
                }
              />
            ))}
          </div>
          <p className="font-semibold">{product.price} L.E</p>
          <BtnCart product={product} className="capitalize w-full flex justify-center text-sm items-center bg-red-500  text-white hover:bg-red-700 ms-auto me-2 py-2 px-6 rounded-2xl " />
        </div>
      </div>
    </div>
  );
}