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
    loadingCurrencyList: false,
    currencyListError: false,
};

export const fetchCurrencyList = createAsyncThunk<
  {currencyLists: CurrencyResponse | null},
  {requestBody: any}
>('fetchCurrencyList', async ({requestBody}) => {
  const response = await apiInterface.fetchCurrencyList(requestBody);
  if (response.kind == 'success') {
    return {
      currencyLists: response.body ?? null,
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
        state.loadingCurrencyList = true;
        state.currencyListError = false;
        state.currencyLists = null;
      })
      .addCase(fetchCurrencyList.fulfilled, (state, action) => {
        state.currencyLists = null;
        state.currencyLists = action.payload.currencyLists;
        state.currencyListError = false;
        state.loadingCurrencyList = false;
      })
      .addCase(fetchCurrencyList.rejected, state => {
        state.currencyListError = true;
        state.loadingCurrencyList = false;
        state.currencyLists = null;
      });
  },
});

export default CurrencyListSlice.reducer;
