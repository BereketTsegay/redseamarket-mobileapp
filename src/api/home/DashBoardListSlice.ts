import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { Dashboard } from './DashBoardResponse';


export type DashBoardListState = {
    dashboardLists: Dashboard | null;
  loadingDashBoardList: boolean;
  dashboardListError: boolean;
};

const initialState: DashBoardListState = {
    dashboardLists: null,
    loadingDashBoardList: false,
    dashboardListError: false,
};

export const fetchDashBoardList = createAsyncThunk<
  {dashboardLists: Dashboard | null},
  {requestBody: any}
>('fetchDashBoardList', async ({requestBody}) => {
  const response = await apiInterface.fetchDashBoardList(requestBody);
  if (response.kind == 'success') {
    return {
        dashboardLists: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const DashBoardListSlice = createSlice({
  name: 'DashBoardList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDashBoardList.pending, state => {
        state.loadingDashBoardList = true;
        state.dashboardListError = false;
        state.dashboardLists = null;
      })
      .addCase(fetchDashBoardList.fulfilled, (state, action) => {
        state.dashboardLists = null;
        state.dashboardLists = action.payload.dashboardLists;
        state.dashboardListError = false;
        state.loadingDashBoardList = false;
      })
      .addCase(fetchDashBoardList.rejected, state => {
        state.dashboardListError = true;
        state.loadingDashBoardList = false;
        state.dashboardLists = null;
      });
  },
});

export default DashBoardListSlice.reducer;
