import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { Country } from './countryResponse';


export type CityListState = {
    cityLists: Country | null;
  loadingCityList: boolean;
  cityListError: boolean;
};

const initialState: CityListState = {
    cityLists: null,
    loadingCityList: false,
    cityListError: false,
};

export const fetchCityList = createAsyncThunk<
  {cityLists: Country | null},
  {requestBody: any}
>('fetchCityList', async ({requestBody}) => {
  const response = await apiInterface.fetchCityList(requestBody);
  if (response.kind == 'success') {
    return {
        cityLists: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const CityListSlice = createSlice({
  name: 'CityList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCityList.pending, state => {
        state.loadingCityList = true;
        state.cityListError = false;
        state.cityLists = null;
      })
      .addCase(fetchCityList.fulfilled, (state, action) => {
        state.cityLists = null;
        state.cityLists = action.payload.cityLists;
        state.cityListError = false;
        state.loadingCityList = false;
      })
      .addCase(fetchCityList.rejected, state => {
        state.cityListError = true;
        state.loadingCityList = false;
        state.cityLists = null;
      });
  },
});

export default CityListSlice.reducer;
