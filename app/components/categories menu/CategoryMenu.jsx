"use client";
import {
  emptySubForCategory,
  getSFOC,
} from "@/app/Redux/slices/categoriesSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryMenu() {
  let [open, setOpent] = useState(false);
  let [selectedCategory, setSelected] = useState("");
  let { categoriesList, subForCategory } = useSelector(
    (state) => state.category
  );
  let dispatch = useDispatch();
  let router = useRouter();
  // get sub categories
  let getSubCategories = (id) => {
    dispatch(getSFOC(id));
  };

  let handleOpen = () => {
    setOpent(!open);
  };
  // handel click
  let handleCategoryClick = () => {
    if (open) return router.push("/category");
    setOpent(true);
  };
  // handle Out
  let handleOut = () => {
    handleOpen();
    dispatch(emptySubForCategory());
  };
  return (
    <section
      onMouseEnter={handleOpen}
      onMouseLeave={handleOut}
      className="relative h-full z-30 flex justify-center items-center "
    >
      <h2 onClick={handleCategoryClick} className="text-red-600 select-none cursor-pointer font-bold  md:text-base text-sm">
        Categories
      </h2>
      {open && (
        <ul className="absolute top-full z-30  py-4 select-none rounded-e-xl rounded-t-none bg-white  -start-7 w-52   shadow-black  shadow-md ">
          {categoriesList.length > 0 &&
            categoriesList.map((category) => (
              <li
                className="py-3 px-4 cursor-pointer font-semibold    hover:bg-red-600"
                key={category._id}
                onClick={handleOut}
                onMouseEnter={() => {
                  getSubCategories(category._id);
                  setSelected(category.name);
                }}
              >
                <Link className="w-full" href={`/category/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          {subForCategory.length > 0 && (
            <li>
              <ul className="absolute start-full z-30  top-0 h-full overflow-auto  w-72 flex px-6 flex-col py-4   rounded-lg rounded-s-none shadow-md   shadow-black bg-gradient-to-l from-red-400 to-red-100 ">
                <p className="font-bold text-start py-3 text-red-600   text-lg">
                  {selectedCategory}
                </p>
                {subForCategory.map((sub) => (
                  <li
                    className="py-3 px-4 cursor-pointer font-semibold w-full   hover:bg-red-600"
                    onClick={handleOut}
                    key={sub._id}
                  >
                    <Link className="w-full" href={`/category/subcategory/${sub.slug}`}>
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      )}
    </section>
  );
}
