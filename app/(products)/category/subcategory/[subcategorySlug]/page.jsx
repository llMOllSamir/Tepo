import Card from "@/app/components/(card)/Card";
import Link from "next/link";
import React from "react";

export function generateMetadata({ params }) {
  return {
    title: ` subCategory : ${params.subcategorySlug}`
  }
}
export default async function SubcategoryDetailes({ params }) {
  let { subcategorySlug } = params;
  let data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/subcategories?slug=${subcategorySlug}`,
    { next: { revalidate: 3600 } }
  );
  let { data: subCategory } = await data.json();
  let response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?subcategory[in]=${subCategory[0]._id}`
  );
  let { data: products } = await response.json();
  return (
    <div className=" my-10 container gap-10 mx-auto grid grid-cols-2 px-16  sm:px-2  sm:grid-cols-3  lg:grid-cols-5 xl:grid-cols-6">
      {products.map((product) => (
        <Card key={product._id} product={product} />
      ))}
      {products.length === 0 && (
        <div className="  col-span-6 gap-6 flex flex-col justify-center items-center">
          <h1 className="font-extrabold text-red-600  text-base md:text-xl lg:text-2xl xl:text-3xl">
            There is No Products Form {subCategory[0].name} Yet
          </h1>
          <Link
            href={"/category/subcategory"}
            className="px-5 py-2 rounded-2xl text-sm md:text-lg bg-red-600 text-white font-semibold"
          >
            Check Categories
          </Link>
        </div>
      )}
    </div>
  );
}
