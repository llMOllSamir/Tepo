"use client";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { addToCart } from "../Redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function BtnCart({ product, className = "" }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.user)
  const { status } = useSelector(state => state.cart)
  const router = useRouter();
  let addProduct = () => {
    if (token) {
      dispatch(addToCart(product?._id))
    } else {
      router.push("/login")
    }
  };

  return (
    <button
      onClick={addProduct}
      className={className}
    >
      {(status.loading && status.product === product?._id) ? <FaSpinner size={20} className="animate-spin" />
        : <>add to <CiShoppingCart fontSize={"20px"} /></>}
    </button>
  );
}
