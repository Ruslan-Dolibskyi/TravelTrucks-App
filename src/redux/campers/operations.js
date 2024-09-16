import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  createTypeQuery,
  createEquipmentQuery,
} from '../../helpers/formatUtils.js';

axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';
const LIMIT = 4;

export const fetchCamperById = createAsyncThunk(
  'campers/fetchSingle',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/campers/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const fetchCampers = createAsyncThunk(
  'campers/fetch',
  async (_, thunkAPI) => {
    const { campers, filters } = thunkAPI.getState();
    const { items: existingItems, currentPageAPI, currentPage } = campers;
    const { allFilters } = filters;
    let filteredCampers = [...existingItems];
    let isLastPage = false;
    let page = currentPageAPI;

    const buildQueryParams = () => {
      return [
        createTypeQuery(allFilters.typeFilter),
        ...Object.keys(allFilters.equipmentFilter).map(key =>
          createEquipmentQuery(allFilters.equipmentFilter, key),
        ),
      ].join('');
    };

    try {
      while (!isLastPage && filteredCampers.length < currentPage * LIMIT) {
        const response = await axios.get(
          `/campers?page=${page}&limit=${LIMIT}${buildQueryParams()}`,
        );
        const items = response.data.items;

        filteredCampers = [
          ...filteredCampers,
          ...items.filter(
            item =>
              allFilters.locationFilter === '' ||
              item.location.toLowerCase().includes(allFilters.locationFilter),
          ),
        ];

        page += 1;
        isLastPage = response.data.total <= LIMIT * (page - 1);

        if (filteredCampers.length >= LIMIT * currentPage) break;
      }

      return {
        items: filteredCampers,
        currentPageAPI: page,
        isLastPage: isLastPage && filteredCampers.length <= LIMIT * currentPage,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
