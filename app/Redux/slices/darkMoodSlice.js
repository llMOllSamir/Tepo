import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: false,
};

export const darkMoodtSlice = createSlice({
  name: "dark",
  initialState,
  reducers: {
    /**check dark state in local storage  */
    checkDarkState: (state, action) => {
      if (localStorage.getItem("dark") === "true") {
        state.isDark = true;
      } else {
        state.isDark = false;
      }
    },
    /**set Dark state in Local storage */
    setDarkState: (state, action) => {
      localStorage.setItem("dark", action.payload);
      state.isDark = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { checkDarkState, setDarkState } = darkMoodtSlice.actions;

export default darkMoodtSlice.reducer;
