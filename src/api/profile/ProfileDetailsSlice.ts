import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { ProfileResponse } from './ProfileResponse';


export type ProfileDetailsState = {
    profileDetails: ProfileResponse | null;
  loadingProfileDetails: boolean;
  profileDetailsError: boolean;
};

const initialState: ProfileDetailsState = {
    profileDetails: null,
    loadingProfileDetails: false,
    profileDetailsError: false,
};

export const fetchProfileDetails = createAsyncThunk<
  {profileDetails: ProfileResponse | null},
  {requestBody: any}
>('fetchProfileDetails', async ({requestBody}) => {
  const response = await apiInterface.fetchProfileDetails(requestBody);
  if (response.kind == 'success') {
    return {
        profileDetails: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const ProfileDetailsSlice = createSlice({
  name: 'ProfileDetails',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProfileDetails.pending, state => {
        state.loadingProfileDetails = true;
        state.profileDetailsError = false;
        state.profileDetails = null;
      })
      .addCase(fetchProfileDetails.fulfilled, (state, action) => {
        state.profileDetails = null;
        state.profileDetails = action.payload.profileDetails;
        state.profileDetailsError = false;
        state.loadingProfileDetails = false;
      })
      .addCase(fetchProfileDetails.rejected, state => {
        state.profileDetailsError = true;
        state.loadingProfileDetails = false;
        state.profileDetails = null;
      });
  },
});

export default ProfileDetailsSlice.reducer;
