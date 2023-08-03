import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { FeaturedResponse } from './FeaturedResponse';


export type FeaturedAmountState = {
   featuredAmount: FeaturedResponse | null;
  loadingFeaturedAmount: boolean;
  featuredAmountError: boolean;
};

const initialState: FeaturedAmountState = {
    featuredAmount: null,
    loadingFeaturedAmount: false,
    featuredAmountError: false,
};

export const fetchFeaturedAmount = createAsyncThunk<
  {featuredAmount: FeaturedResponse | null},
  {requestBody: any}
>('fetchFeaturedAmount', async ({requestBody}) => {
  const response = await apiInterface.fetchFeaturedAmount(requestBody);
  if (response.kind == 'success') {
    return {
        featuredAmount: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const FeaturedAmountSlice = createSlice({
  name: 'FeaturedAmount',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFeaturedAmount.pending, state => {
        state.loadingFeaturedAmount = true;
        state.featuredAmountError = false;
        state.featuredAmount = null;
      })
      .addCase(fetchFeaturedAmount.fulfilled, (state, action) => {
        state.featuredAmount = null;
        state.featuredAmount = action.payload.featuredAmount;
        state.featuredAmountError = false;
        state.loadingFeaturedAmount = false;
      })
      .addCase(fetchFeaturedAmount.rejected, state => {
        state.featuredAmountError = true;
        state.loadingFeaturedAmount = false;
        state.featuredAmount = null;
      });
  },
});

export default FeaturedAmountSlice.reducer;
