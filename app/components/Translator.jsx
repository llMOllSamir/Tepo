"use client";
import React from "react";
import { useSelector } from "react-redux";

export default function Translator({ english = "", arabic = "" }) {
  let { isArabic } = useSelector((state) => state.lang);
  return <React.Fragment>{isArabic ? arabic : english}</React.Fragment>;
}
