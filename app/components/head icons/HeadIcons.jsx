"use client";
import React, { useMemo } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import Link from "next/link";
import Dark from "../dark mood/Dark";
import { useSelector } from "react-redux";

export default function HeadIcons() {
  let { cartList } = useSelector((state) => state.cart);
  let links = useMemo(() => {
    return [
      {
        element: IoSearchOutline,
        title: { ar: "بحث", en: "SEARCH" },
        ref: "/search",
        counter: null,
      },
      {
        element: FaRegHeart,
        title: { ar: "المفضله", en: "WISH LIST" },
        ref: "/wishlist",
        counter: null,
      },
      {
        element: CiShoppingCart,
        title: { ar: "السله", en: "Cart" },
        ref: "/cart",
        counter: cartList.length || null,
      },
      {
        element: GoPerson,
        title: { ar: "الشخصيه", en: "Profile" },
        ref: "/profile",
        counter: null,
      },
    ];
  }, [cartList]);
  return (
    <>
      {links.map((link, index) => (
        <Link key={index} className={`relative`} href={link.ref}>
          {link.counter !== null && (
            <span
              className={`absolute -top-2 -end-1 -translate-1/2 w-5  h-5 text-red-600  font-bold text-sm   rounded-full flex justify-center items-center bg-white `}
            >
              {link.counter}
            </span>
          )}

          <link.element
            title={link.title.en}
            className="select-none"
            cursor={"pointer"}
            size={"1.7rem"}
          />
        </Link>
      ))}

      <Dark />
    </>
  );
}
