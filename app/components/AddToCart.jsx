"use client";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { addToCartOffline } from "../Redux/slices/cartSlice";
import { useDispatch } from "react-redux";

export default function BtnCart({ product ,className=""}) {
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
      className={className}
    >
      add to <CiShoppingCart fontSize={"20px"}  />
    </button>
  );
}
