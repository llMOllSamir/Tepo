"use client";
import Link from "next/link";
import React from "react";
import styles from "./style.module.css";
import { usePathname } from "next/navigation";
import CategoryMenu from "../categories menu/CategoryMenu";
import Lang from "../lang/Lang";
import Translator from "../Translator";
export default function NavBar() {
  let links = [
    { en: "HOME", ar: "الرئيسيه", ref: "/" },
    { en: "PRODUCTS", ar: "المنتجات", ref: "/products" },
    { en: "OFFERS", ar: "العروض", ref: "/offers" },
  ];

  let activeLink = styles.active;
  let pathName = usePathname();
  return (
    <nav
      className={`bg-white fixed z-10 inset-x-0 top-20  shadow shadow-sm h-14 shadow-black hidden justify-between  items-center px-12  
        dark:bg-gray-800  dark:text-white  md:flex
      `}
    >
      <CategoryMenu />
      <ul className="flex gap-6 font-extrabold md:text-md text-sm select-none    text-red-600 ">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              scroll={true}
              className={`${styles.link} ${pathName.split("/")[1] === (link.ref).split("/")[1] ? activeLink : ""
                } rtl:text-base`}
              href={link.ref}
            >
              <Translator arabic={link.ar} english={link.en} />
            </Link>
          </li>
        ))}
      </ul>
      <Lang />
    </nav>
  );
}
