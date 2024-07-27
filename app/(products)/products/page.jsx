import React from "react";
import Card from "../../components/(card)/Card";

/** handle meta title and description  */
export const metadata = {
  title: "Products",
  description:
    " this is our products you can find any thing you want and any thing you need ",
};

export default async function Products() {

  let products = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
    next: { revalidate: 60 },
  })

  products = await products.json()
  return (
    <section className=" grow ">
      <div className="my-10 container gap-10  grid sm:grid-cols-2 px-16  sm:px-2 grid-cols-1 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5">
        {products?.data?.map((product) => (
          <Card key={product?._id} product={product} />
        ))}
      </div>
    </section>
  );
}
