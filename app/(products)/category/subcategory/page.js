import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Sub Categories",
};
export default async function subcategory() {
  let data = await fetch(
    "https://ecommerce.routemisr.com/api/v1/subcategories",
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  let { data: subCategories } = await data.json();
  console.log(subCategories);
  return (
    <div className=" my-10 container gap-5 mx-auto grid grid-cols-2 px-16  sm:px-2  sm:grid-cols-3  lg:grid-cols-5  ">
      {subCategories.map((subCategory) => (
        <Link
          href={`/category/subcategory/${subCategory?.slug}`}
          key={subCategory._id}
          className="mx-auto flex justify-center text-red-600 items-center px-5 py-2 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-500 "
        >
          <h3 className="text-lg text-center w-full  font-bold ">
            {subCategory?.name}
          </h3>
        </Link>
      ))}
    </div>
  );
}
