import Image from "next/image";
import React from "react";
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
    <section className="container mx-auto   grid  grid-cols-3">
      <div className=" ">
        <Image
          src={data.imageCover}
          className="w-full"
          alt={data.title}
          width={200}
          height={200}
        />
      </div>
      <div className="col-span-2 h-full bg-red-600">

      </div>
    </section>
  );
}
