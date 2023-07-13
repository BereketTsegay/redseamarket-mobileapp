import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { Country } from './countryResponse';


export type CountryListState = {
    countryLists: Country | null;
  loadingCountryList: boolean;
  countryListError: boolean;
};

const initialState: CountryListState = {
    countryLists: null,
    loadingCountryList: false,
    countryListError: false,
};

export const fetchCountryList = createAsyncThunk<
  {countryLists: Country | null},
  {requestBody: any}
>('fetchCountryList', async ({requestBody}) => {
  const response = await apiInterface.fetchCountryList(requestBody);
  if (response.kind == 'success') {
    return {
        countryLists: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const CountryListSlice = createSlice({
  name: 'CountryList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCountryList.pending, state => {
        state.loadingCountryList = true;
        state.countryListError = false;
        state.countryLists = null;
      })
      .addCase(fetchCountryList.fulfilled, (state, action) => {
        state.countryLists = null;
        state.countryLists = action.payload.countryLists;
        state.countryListError = false;
        state.loadingCountryList = false;
      })
      .addCase(fetchCountryList.rejected, state => {
        state.countryListError = true;
        state.loadingCountryList = false;
        state.countryLists = null;
      });
  },
});

export default CountryListSlice.reducer;
