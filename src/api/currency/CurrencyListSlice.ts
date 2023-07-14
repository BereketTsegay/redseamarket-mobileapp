import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { CurrencyResponse } from './CurrencyResponse';


export type CurrencyListState = {
    currencyLists: CurrencyResponse | null;
  loadingCurrencyList: boolean;
  currencyListError: boolean;
};

const initialState: CurrencyListState = {
    currencyLists: null,
    loadingCountryList: false,
    countryListError: false,
};

export const fetchCurrencyList = createAsyncThunk<
  {currencyLists: CurrencyResponse | null},
  {requestBody: any}
>('fetchCurrencyList', async ({requestBody}) => {
  const response = await apiInterface.fetchCurrencyList(requestBody);
  if (response.kind == 'success') {
    return {
        countryLists: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const CurrencyListSlice = createSlice({
  name: 'CurrencyList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCurrencyList.pending, state => {
        state.loadingCountryList = true;
        state.countryListError = false;
        state.countryLists = null;
      })
      .addCase(fetchCurrencyList.fulfilled, (state, action) => {
        state.countryLists = null;
        state.countryLists = action.payload.countryLists;
        state.countryListError = false;
        state.loadingCountryList = false;
      })
      .addCase(fetchCurrencyList.rejected, state => {
        state.countryListError = true;
        state.loadingCountryList = false;
        state.countryLists = null;
      });
  },
});

export default CurrencyListSlice.reducer;
