import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { AdListResponse } from './AdListResponse';


export type AdListState = {
  adLists: AdListResponse | null;
  loadingAdLists: boolean;
  adListError: boolean;
};

const initialState: AdListState = {
    adLists: null,
    loadingAdLists: false,
    adListError: false,
};

export const fetchAdList = createAsyncThunk<
  {adLists: AdListResponse | null},
  {requestBody: any}
>('fetchAdList', async ({requestBody}) => {
  const response = await apiInterface.fetchAdList(requestBody);
  if (response.kind == 'success') {
    return {
        adLists: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const AdListSlice = createSlice({
  name: 'AdList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAdList.pending, state => {
        state.loadingAdLists = true;
        state.adListError = false;
        state.adLists = null;
      })
      .addCase(fetchAdList.fulfilled, (state, action) => {
        state.adLists = null;
        state.adLists = action.payload.adLists;
        state.adListError = false;
        state.loadingAdLists = false;
      })
      .addCase(fetchAdList.rejected, state => {
        state.adListError = true;
        state.loadingAdLists = false;
        state.adLists = null;
      });
  },
});

export default AdListSlice.reducer;
