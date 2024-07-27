"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { PiSunBold } from "react-icons/pi";
import { GiMoonClaws } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { checkDarkState, setDarkState } from "@/app/Redux/slices/darkMoodSlice";

export default function Dark() {
  let darkMood = useRef();
  let dispatch = useDispatch();
  let { isDark } = useSelector((state) => state.darkMood);

  /**Handle Dark Mood state */
  let handleDark = useCallback(() => {
    if (darkMood.current.checked) {
      document.body.classList.add("dark");
      dispatch(setDarkState(true));
    } else {
      document.body.classList.remove("dark");
      dispatch(setDarkState(false));
    }
  }, [dispatch]);

  /** Check Dark State In Local Storage */
  useEffect(() => {
    dispatch(checkDarkState());
  }, [dispatch]);

  /**  handl Dark state Change*/
  useEffect(() => {
    if (isDark) {
      darkMood.current.checked = true;
      handleDark();
    }
  }, [isDark, handleDark]);
  return (
    <>
      <label
        htmlFor="mood"
        className="dark:hidden flex cursor-pointer gap-1  justify-center items-center "
      >
        <PiSunBold
          size={"1.8rem"}
          cursor={"pointer"}
          className="fill-orange-500 md:fill-yellow-300 "
        />
        <p className="md:hidden">Light</p>
      </label>
      <label
        htmlFor="mood"
        className="dark:flex hidden gap-1 cursor-pointer  justify-center items-center "
      >
        <GiMoonClaws size={"1.8rem"} cursor={"pointer"} fill="white" />
        <p className="md:hidden">Dark</p>
      </label>
      <input
        ref={darkMood}
        onChange={handleDark}
        id="mood"
        className="hidden"
        type="checkbox"
        name="mood"
      />
    </>
  );
}