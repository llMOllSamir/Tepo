"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { GoHome } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

import { usePathname } from "next/navigation";
import Translator from "../Translator";
import { useSelector } from "react-redux";
export default function ButtomNav() {
  let { cartList } = useSelector((state) => state.cart);
  let links = useMemo(() => {
    return [
      {
        element: GoHome,
        title: { ar: "الرئيسيه", en: "HOME" },
        ref: "/",
        counter: null,
      },
      {
        element: BiCategory,
        title: { ar: "الفئات", en: "CATEGORIES" },
        ref: "/category",
        counter: null,
      },
      {
        element: IoSearchOutline,
        title: { ar: "بحث", en: "SEARCH" },

        ref: "/search",
        counter: null,
      },
      {
        element: CiShoppingCart,
        title: { ar: "السله", en: "Cart" },
        ref: "/cart",
        counter: cartList.length || null,
      },
      {
        element: FaRegHeart,
        title: { ar: "المفضله", en: "WISH LIST" },
        ref: "/wishlist",
        counter: 0,
      },
      {
        element: GoPerson,
        title: { ar: "الشخصيه", en: "Profile" },
        ref: "/profile",
        counter: null,
      },
    ];
  }, [cartList]);

  let pathName = usePathname();

  let HandlePath = (ref = "/") => {
    return pathName === ref;
  };
  return (
    <nav className="fixed md:hidden flex justify-center font-extrabold items-center gap-5   z-20 bottom-0 inset-x-0 text-black dark:text-white h-20 bg-white dark:bg-gray-800  shadow-2xl shadow-black dark:shadow-white ">
      {links.map((element, index) => (
        <Link
          key={index}
          className={`w-20 flex  flex-col justify-center relative items-center ${
            HandlePath(element.ref) ? "text-red-600" : ""
          }`}
          href={element.ref}
        >
          <element.element
            title={element.title.en}
            size={HandlePath(element.ref) ? "2rem" : "2.5rem"}
          />
          {HandlePath(element.ref) && (
            <small className="text-sm">
              <Translator
                arabic={element.title.ar}
                english={element.title.en}
              />
            </small>
          )}
          {element.counter > 0 && (
            <small className="absolute text-base  -top-3 bg-white dark:text-white dark:bg-gray-800 text-black w-7 h-7 flex items-center justify-center rounded-full end-3  ">
              {element.counter}
            </small>
          )}
        </Link>
      ))}
    </nav>
  );
}
