import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Character } from "@/types/character";

const initialState: Character[] = [];

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Character>) => {
      const isFavorite = state.find((item) => item.id == action.payload.id);
      if (isFavorite) {
        const newState = state.filter((item) => item.id !== action.payload.id);
        return newState;
      } else {
        const newState = [...state, action.payload];
        return newState;
      }
    },
  },
});

export default favoriteSlice.reducer;
export const { toggleFavorite } = favoriteSlice.actions;
