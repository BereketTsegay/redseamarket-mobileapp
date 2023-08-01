import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type JobApplyResponse = {
    status:  string;
    code?: number;
    errors?: any
}


export type JobApplyState = {
  jobApplyData: JobApplyResponse | null;
  loadingApplyJob: boolean;
  jobApplyError: boolean;
};

const initialState: JobApplyState = {
  jobApplyData: null,
  loadingApplyJob: false,
  jobApplyError: false,
};

export const applyJob = createAsyncThunk<
  {jobApplyData: JobApplyResponse | null},
  {requestBody: any}
>('applyJobProfile', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.applyJob(requestBody);
    
    if (response.kind == 'success') {
      return {
        jobApplyData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
      jobApplyData: initialState.jobApplyData,
    };
  }
});

const JobApplySlice = createSlice({
  name: 'JobApply',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(applyJob.pending, state => {
        state.jobApplyData = initialState.jobApplyData;
        state.loadingApplyJob = true;
        state.jobApplyError = false;
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.jobApplyData = action.payload.jobApplyData;
        state.jobApplyError = false;
        state.loadingApplyJob = false;
      })
      .addCase(applyJob.rejected, state => {
        state.jobApplyError = true;
        state.loadingApplyJob = false;
        state.jobApplyData = initialState.jobApplyData;
      });
  },
});

export const {reset} = JobApplySlice.actions;
export default JobApplySlice.reducer;
