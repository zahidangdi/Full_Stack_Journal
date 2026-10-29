import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import studentReducer from "./features/studentSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    students: studentReducer,
  },
});

export default store;