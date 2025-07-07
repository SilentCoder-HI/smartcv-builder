import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "./templateSlice";
import cvReducer from "./cvslice";

export const store = configureStore({
  reducer: {
    template: templateReducer,
    cv: cvReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
