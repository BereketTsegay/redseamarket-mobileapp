import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { User } from '../profile/ProfileResponse';

export type HiringJobResponse = {
  status: string;
  data:   Datum[];
}

export type Datum = {
  id:              number;
  user_id:         number;
  title:           string;
  work_experience: string;
  education:       string;
  certificate:     string;
  language:        string;
  skils:           string;
  cv_file:         string;
  overview:        string;
  country_id:      number;
  state_id:        number;
  city_id:         number;
  created_at:      Date;
  updated_at:      Date;
  user:            User
}

export type HiringJobState = {
    hiringJobList: HiringJobResponse | null;
  loadingHiringJobList: boolean;
  hiringJobListError: boolean;
};

const initialState: HiringJobState = {
    hiringJobList: null,
    loadingHiringJobList: false,
    hiringJobListError: false,
};

export const fetchHiringJobList = createAsyncThunk<
  {hiringJobList: HiringJobResponse | null},
  {requestBody: any}
>('fetchHiringJobList', async ({requestBody}) => {
  const response = await apiInterface.fetchHiringJobList(requestBody);
  if (response.kind == 'success') {
    return {
        hiringJobList: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const HiringJobSlice = createSlice({
  name: 'HiringJob',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchHiringJobList.pending, state => {
        state.loadingHiringJobList = true;
        state.hiringJobListError = false;
        state.hiringJobList = null;
      })
      .addCase(fetchHiringJobList.fulfilled, (state, action) => {
        state.hiringJobList = null;
        state.hiringJobList = action.payload.hiringJobList;
        state.hiringJobListError = false;
        state.loadingHiringJobList = false;
      })
      .addCase(fetchHiringJobList.rejected, state => {
        state.hiringJobListError = true;
        state.loadingHiringJobList = false;
        state.hiringJobList = null;
      });
  },
});

export default HiringJobSlice.reducer;
