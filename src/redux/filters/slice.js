import { createSlice } from "@reduxjs/toolkit";

const updateAllFilters = (state) => {
  state.allFilters = {
    locationFilter: state.locationFilter,
    typeFilter: state.typeFilter,
    equipmentFilter: state.equipmentFilter,
  };
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    locationFilter: "",
    typeFilter: "",
    equipmentFilter: [],
    allFilters: {
      locationFilter: "",
      typeFilter: "",
      equipmentFilter: [],
    },
  },
  reducers: {
   
    changeLocationFilter(state, action) {
      state.locationFilter = action.payload.trim().toLowerCase();
      updateAllFilters(state);
    },
  
    changeTypeFilter(state, action) {
      state.typeFilter = action.payload;
      updateAllFilters(state);
    },
   
    changeEquipmentFilter(state, action) {
      state.equipmentFilter = action.payload;
      updateAllFilters(state);
    },
   
    applyFilters(state) {
      updateAllFilters(state);
    },
  },
});

export const {
  changeLocationFilter,
  changeTypeFilter,
  changeEquipmentFilter,
  applyFilters,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
