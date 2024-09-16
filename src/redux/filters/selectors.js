import { createSelector } from 'reselect';

const getFiltersState = state => state.filters;

export const selectLocationFilter = createSelector(
  [getFiltersState],
  filtersState => filtersState.locationFilter,
);

export const selectTypeFilter = createSelector(
  [getFiltersState],
  filtersState => filtersState.typeFilter,
);

export const selectEquipmentFilter = createSelector(
  [getFiltersState],
  filtersState => filtersState.equipmentFilter,
);

export const selectAllFilters = createSelector(
  [getFiltersState],
  filtersState => filtersState.allFilters,
);
