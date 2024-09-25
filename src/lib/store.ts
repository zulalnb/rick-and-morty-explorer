import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./features/favorite/favoriteSlice";

export const store = configureStore({
  reducer: {
    favorites: favoriteSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
