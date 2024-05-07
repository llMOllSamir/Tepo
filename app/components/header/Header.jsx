"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../../public/assist/Logo.svg";
import Link from "next/link";
import BurgerMenu from "../burger menu/BurgerMenu";
import { useDispatch } from "react-redux";
import { getCategories } from "@/app/Redux/slices/categoriesSlice";
import HeadIcons from "../head icons/HeadIcons";
import { checkCart } from "@/app/Redux/slices/cartSlice";

export default function Header() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(checkCart());
  }, [dispatch]);

  return (
    <header
      className={`z-20 px-7 shadow shadow-red-500 bg-red-600 items-center  top-0 inset-x-0 h-20 grid grid-cols-12 fixed `}
    >
      <Link href={"/"} className="col-span-2">
        <Image
          priority={true}
          alt="logo"
          src={logo}
          className=" h-12 w-56 cursor-pointer"
          width={500}
          height={500}
        />
      </Link>

      <section className="col-start-12 hidden col-span-1 items-center justify-end text-white md:flex gap-x-3">
        <HeadIcons />
      </section>

      <BurgerMenu />
    </header>
  );
}
