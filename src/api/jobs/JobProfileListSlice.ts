import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { JobResponse } from './JobResponse';


export type JobProfileListState = {
    jobProfileList: JobResponse | null;
  loadingJobProfileList: boolean;
  jobProfileListError: boolean;
};

const initialState: JobProfileListState = {
    jobProfileList: null,
    loadingJobProfileList: false,
    jobProfileListError: false,
};

export const fetchJobProfileList = createAsyncThunk<
  {jobProfileList: JobResponse | null},
  {requestBody: any}
>('fetchJobProfileList', async ({requestBody}) => {
  const response = await apiInterface.fetchJobProfileList(requestBody);
  if (response.kind == 'success') {
    return {
        dashboardDetails: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const JobProfileListSlice = createSlice({
  name: 'JobProfileList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchJobProfileList.pending, state => {
        state.loadingJobProfileList = true;
        state.dashboardDetailsError = false;
        state.jobProfileList = null;
      })
      .addCase(fetchJobProfileList.fulfilled, (state, action) => {
        state.jobProfileList = null;
        state.jobProfileList = action.payload.jobProfileList;
        state.dashboardDetailsError = false;
        state.loadingJobProfileList = false;
      })
      .addCase(fetchJobProfileList.rejected, state => {
        state.dashboardDetailsError = true;
        state.loadingJobProfileList = false;
        state.jobProfileList = null;
      });
  },
});

export default JobProfileListSlice.reducer;
