import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { Datum } from './HiringJobSlice';

export type HiringJobDetailsResponse = {
  status: string;
  data:   Datum;
}

export type HiringJobDetailsState = {
    hiringJobDetails: HiringJobDetailsResponse | null;
  loadingHiringJobDetails: boolean;
  hiringJobDetailsError: boolean;
};

const initialState: HiringJobDetailsState = {
    hiringJobDetails: null,
    loadingHiringJobDetails: false,
    hiringJobDetailsError: false,
};

export const fetchHiringJobDetails = createAsyncThunk<
  {hiringJobDetails: HiringJobDetailsResponse | null},
  {requestBody: any}
>('fetchHiringJobDetails', async ({requestBody}) => {
  const response = await apiInterface.fetchHiringJobDetails(requestBody);
  if (response.kind == 'success') {
    return {
        hiringJobDetails: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const HiringJobDetailsSlice = createSlice({
  name: 'HiringJobDetails',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchHiringJobDetails.pending, state => {
        state.loadingHiringJobDetails = true;
        state.hiringJobDetailsError = false;
        state.hiringJobDetails = null;
      })
      .addCase(fetchHiringJobDetails.fulfilled, (state, action) => {
        state.hiringJobDetails = null;
        state.hiringJobDetails = action.payload.hiringJobDetails;
        state.hiringJobDetailsError = false;
        state.loadingHiringJobDetails = false;
      })
      .addCase(fetchHiringJobDetails.rejected, state => {
        state.hiringJobDetailsError = true;
        state.loadingHiringJobDetails = false;
        state.hiringJobDetails = null;
      });
  },
});

export default HiringJobDetailsSlice.reducer;
