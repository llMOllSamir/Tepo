import BtnCart from "@/app/components/AddToCart";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";
/**handle meta data description and title  */
export async function generateMetadata({ params }) {
  let { productId } = params;
  // fetch data
  const { data } = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}`
  ).then((res) => res.json());

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function ProductDetails({ params }) {
  let { productId } = params;
  /** fetching one product details by id and should be 24 litter */
  let getProductDetails = async () => {
    let data = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    data = await data.json();
    return data;
  };

  let { data } = await getProductDetails();
  console.log(data);

  return (
    <section className="container mx-auto select-none   grid  grid-cols-3">
      <div className="">
        <Image
          src={data.imageCover}
          className="w-full aspect-[9 / 16] "
          alt={data.title}
          width={200}
          height={200}
        />
      </div>
      <div className="col-span-2 h-full  divide-y-4 space-y-5  p-5">
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-serif font-bold">{data.title}</h1>
          <div className="flex gap-3">  {"stars".split("").map((_, index) => (
            <FaStar
              className="md:size-6 lg:size-8 size-5"
              key={index}
              fill={
                Math.round(data.ratingsAverage) > index
                  ? "gold"
                  : "hsl(0,0%,50%,25%)"
              }
            />
          ))}</div>
        </div>
        <div className="py-5 text-gray-500 space-y-8 dark:text-gray-300">
          <p className="font-semibold text-base  md:text-lg "> List Price : <span> {data.price} <sup> EGP</sup> </span></p>
          <p className="font-semibold text-base  md:text-lg ">
            {data.description}
          </p>
        </div>
        <div className="py-5">
          <BtnCart product={data} /></div>
      </div>
    </section>
  );
}
