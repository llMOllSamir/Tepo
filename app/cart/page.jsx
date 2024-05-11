"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'




export default function Cart() {
    const dispatch = useDispatch()
    const { cartList } = useSelector(state => state.cart)
    console.log(cartList);
    return (
        <div>Cart</div>
    )
}
