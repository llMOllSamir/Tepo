"use client";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { addToCartOffline } from "../Redux/slices/cartSlice";
import { useDispatch } from "react-redux";

export default function BtnCart({ product }) {
  const dispatch = useDispatch();
  let addProduct = () => {
    if (localStorage.getItem("token")) {
    } else {
      dispatch(addToCartOffline(product));
    }
  };
  return (
    <button
      onClick={addProduct}
      className="capitalize flex justify-center text-sm items-center bg-red-500  text-white hover:bg-red-700 ms-auto me-2 py-2 px-6 rounded-2xl "
    >
      add to <CiShoppingCart fontSize={"20px"} />
    </button>
  );
}
