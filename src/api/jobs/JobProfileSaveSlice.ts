import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type JobSaveResponse = {
    status:  string;
    message?: string;
    errors?: any
}


export type JobCreateState = {
  jobSaveData: JobSaveResponse | null;
  loadingSavedJob: boolean;
  jobSaveError: boolean;
};

const initialState: JobCreateState = {
  jobSaveData: null,
  loadingSavedJob: false,
  jobSaveError: false,
};

export const createJobProfile = createAsyncThunk<
  {jobSaveData: JobSaveResponse | null},
  {requestBody: any}
>('createJobProfile', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.createJobProfile(requestBody);
    
    if (response.kind == 'success') {
      return {
        jobSaveData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
      jobSaveData: initialState.jobSaveData,
    };
  }
});

const JobProfileSaveSlice = createSlice({
  name: 'JobProfileSave',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createJobProfile.pending, state => {
        state.jobSaveData = initialState.jobSaveData;
        state.loadingSavedJob = true;
        state.jobSaveError = false;
      })
      .addCase(createJobProfile.fulfilled, (state, action) => {
        state.jobSaveData = action.payload.jobSaveData;
        state.jobSaveError = false;
        state.loadingSavedJob = false;
      })
      .addCase(createJobProfile.rejected, state => {
        state.jobSaveError = true;
        state.loadingSavedJob = false;
        state.jobSaveData = initialState.jobSaveData;
      });
  },
});

export const {reset} = JobProfileSaveSlice.actions;
export default JobProfileSaveSlice.reducer;
