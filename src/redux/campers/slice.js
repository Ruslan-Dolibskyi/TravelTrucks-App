import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById } from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    openFeatures: true,
    currentCamper: null,
    items: [],
    currentPage: 1,
    currentPageAPI: 1,
    isLastPage: false,
    favorites: [],
    loading: false,
    error: null,
    booking: {},
  },
  reducers: {
    changeOpenFeatures(state, action) {
      state.openFeatures = action.payload;
    },
    changeCurrentPage(state, action) {
      state.currentPage = action.payload;
      if (action.payload === 1) {
        state.currentPageAPI = 1;
        state.items = [];
        state.isLastPage = false;
      }
    },
    changeBooking(state, action) {
      const { id, date, email } = action.payload;

      state.booking = {
        ...state.booking,
        [id]: { ...state.booking[id], [date]: email },
      };
    },
    clearCurrentCamper(state) {
      state.currentCamper = null;
    },
    switchFavorites(state, action) {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter(
          (favorite_i) => favorite_i !== action.payload
        );
      } else {
        state.favorites = [...state.favorites, action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, handlePending)
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = [...action.payload.items];
        state.currentPageAPI = action.payload.currentPageAPI;
        state.isLastPage = action.payload.isLastPage;
      })
      .addCase(fetchCampers.rejected, handleRejected)
      .addCase(fetchCamperById.pending, handlePending)
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.currentCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, handleRejected);
  },
});

export const {
  changeCurrentPage,
  clearCurrentCamper,
  changeBooking,
  switchFavorites,
  changeOpenFeatures,
} = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
