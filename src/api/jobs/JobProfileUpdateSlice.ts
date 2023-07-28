import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type JobUpdateResponse = {
    status:  string;
    message?: string;
    errors?: any
}


export type JobUpdateState = {
  jobUpdateData: JobUpdateResponse | null;
  loadingUpdateJob: boolean;
  jobUpdateError: boolean;
};

const initialState: JobUpdateState = {
    jobUpdateData: null,
    loadingUpdateJob: false,
    jobUpdateError: false,
};

export const updateJobProfile = createAsyncThunk<
  {jobUpdateData: JobUpdateResponse | null},
  {requestBody: any}
>('updateJobProfile', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.updateJobProfile(requestBody);
    
    if (response.kind == 'success') {
      return {
        jobUpdateData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        jobUpdateData: initialState.jobUpdateData,
    };
  }
});

const JobProfileUpdateSlice = createSlice({
  name: 'JobProfileUpdate',
  initialState: initialState,
  reducers: {
    UpdateReset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(updateJobProfile.pending, state => {
        state.jobUpdateData = initialState.jobUpdateData;
        state.loadingUpdateJob = true;
        state.jobUpdateError = false;
      })
      .addCase(updateJobProfile.fulfilled, (state, action) => {
        state.jobUpdateData = action.payload.jobUpdateData;
        state.jobUpdateError = false;
        state.loadingUpdateJob = false;
      })
      .addCase(updateJobProfile.rejected, state => {
        state.jobUpdateError = true;
        state.loadingUpdateJob = false;
        state.jobUpdateData = initialState.jobUpdateData;
      });
  },
});

export const {UpdateReset} = JobProfileUpdateSlice.actions;
export default JobProfileUpdateSlice.reducer;
