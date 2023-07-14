import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { DashBoardDetails } from './DashBoardResponse';


export type DashBoardDetailsState = {
    dashboardDetails: DashBoardDetails | null;
  loadingDashBoardDetail: boolean;
  dashboardDetailsError: boolean;
};

const initialState: DashBoardDetailsState = {
    dashboardDetails: null,
    loadingDashBoardDetail: false,
    dashboardDetailsError: false,
};

export const fetchDashBoardDetails = createAsyncThunk<
  {dashboardDetails: DashBoardDetails | null},
  {requestBody: any}
>('fetchDashBoardDetails', async ({requestBody}) => {
  const response = await apiInterface.fetchDashBoardDetails(requestBody);
  if (response.kind == 'success') {
    return {
        dashboardDetails: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const DashBoardDetailsSlice = createSlice({
  name: 'DashBoardDetails',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDashBoardDetails.pending, state => {
        state.loadingDashBoardDetail = true;
        state.dashboardDetailsError = false;
        state.dashboardDetails = null;
      })
      .addCase(fetchDashBoardDetails.fulfilled, (state, action) => {
        state.dashboardDetails = null;
        state.dashboardDetails = action.payload.dashboardDetails;
        state.dashboardDetailsError = false;
        state.loadingDashBoardDetail = false;
      })
      .addCase(fetchDashBoardDetails.rejected, state => {
        state.dashboardDetailsError = true;
        state.loadingDashBoardDetail = false;
        state.dashboardDetails = null;
      });
  },
});

export default DashBoardDetailsSlice.reducer;
