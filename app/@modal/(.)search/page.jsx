"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import searchCart from "../../../public/assist/search.svg";
import { getProducts } from "@/app/Redux/slices/productSlics";

export default function Search() {
    let [term, setTerm] = useState("");
    const [close, setClose] = useState(false)
    const pathname = usePathname()
    let [filter, setFilter] = useState(null);
    let searchInput = useRef();
    let dispatch = useDispatch();
    let { productList } = useSelector((state) => state.product);
    const router = useRouter();

    let handleTerm = () => {
        if (searchInput.current.value.length > 0) {
            setTerm(searchInput.current.value);
        } else {
            setTerm(null);
            setFilter(null);
        }
    };

    let filterProducts = () => {
        if (filter) {
            return productList.filter((product) =>
                product.title.toLowerCase().includes(filter.toLowerCase())
            );
        }
        return [];
    };

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, []);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        let x = setTimeout(() => {
            setFilter(term);
        }, 500);
        return () => {
            clearTimeout(x);
        };
    }, [term]);
    useEffect(() => {

        if (pathname === "/search") {
            setClose(false)
        }
    }, [pathname])

    if (close) return null
    return (
        <section className=" z-30 fixed inset-0 bg-gray-300 bg-opacity-50   flex  justify-center items-center  ">

            <div className="w-11/12 mt-20 h-5/6 p-5 flex-col overflow-auto  dark:bg-gray-900   bg-white flex justify-start items-start rounded-3xl ">
                <form className="w-full mb-8 bg-white  dark:bg-gray-900  dark:border-red-950 dark:text-red-500 text-red-600 font-bold sticky top-5  p-2  flex flex-col  border-2 rounded-full border-red-600 ">
                    <label>
                        <IoClose
                            className="text-end  absolute -top-8 end-2  mb-2 cursor-pointer dark:hover:bg-red-950 hover:bg-red-600 hover:text-white rounded-lg  "
                            size={"1.5rem"}
                            onClick={() => {
                                router.back();
                                setClose(true)
                            }}
                        />
                        <input
                            ref={searchInput}
                            type="text"
                            className="w-full px-5 bg-transparent  outline-none   "
                            onChange={handleTerm}
                        />
                    </label>
                </form>

                {filterProducts().length === 0 && (
                    <section className="w-full  h-full flex justify-center items-center">
                        <Image
                            src={searchCart}
                            alt="search"
                            className={" w-full md:w-2/3  lg:w-2/4 xl:w-2/6 "}
                            width={200}
                            height={200}
                        />
                    </section>
                )}
                {filterProducts().length > 0 && (
                    <table className="w-full dark:text-white  ">
                        <thead>
                            <tr>
                                <th className="w-1/12"></th>
                                <th className="w-1/4  "></th>
                                <th className="w-1/4"></th>
                                <th className="w-1/4 md:table-cell hidden"></th>
                            </tr>
                        </thead>
                        <tbody className="text-center text-lg font-semibold divide divide-y-2 dark:divide-red-950 divide-red-600  ">
                            {filterProducts().map((product) => (
                                <tr
                                    onClick={() => {
                                        router.push(`/products/${product._id}`);
                                    }}
                                    key={product._id}
                                    className="cursor-pointer select-none dark:hover:bg-gray-700 hover:bg-slate-100 "
                                >
                                    <td>
                                        <Image
                                            className="w-96 md:w-1/2 mx-auto"
                                            src={product.imageCover}
                                            width={500}
                                            height={500}
                                            alt={product.title}
                                        />
                                    </td>
                                    <td className="lg:text-lg text-sm ">{product.title}</td>
                                    <td className="lg:text-lg text-sm">{product.price} EGP</td>
                                    <td className="md:table-cell hidden">
                                        <Image
                                            className="w-1/4 mx-auto"
                                            src={product.brand.image}
                                            width={500}
                                            height={500}
                                            alt={product.brand.name}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </section>
    );
}
