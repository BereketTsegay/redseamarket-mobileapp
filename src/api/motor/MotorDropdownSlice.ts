import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { Motor } from './MotorResponse';


export type MotorDropdownState = {
  motorDropdown: Motor | null;
  loadingMotorDropdown: boolean;
  motorDropdownError: boolean;
};

const initialState: MotorDropdownState = {
    motorDropdown: null,
    loadingMotorDropdown: false,
    motorDropdownError: false,
};

export const fetchMotorDropdown = createAsyncThunk<
  {motorDropdown: Motor | null},
  {url: any, requestBody: any}
>('fetchMotorDropdown', async ({url, requestBody}) => {
  const response = await apiInterface.fetchMotorDropdown(url,requestBody);
  if (response.kind == 'success') {
    return {
        motorDropdown: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const MotorDropdownSlice = createSlice({
  name: 'MotorDropdown',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMotorDropdown.pending, state => {
        state.loadingMotorDropdown = true;
        state.motorDropdownError = false;
        state.motorDropdown = null;
      })
      .addCase(fetchMotorDropdown.fulfilled, (state, action) => {
        state.motorDropdown = null;
        state.motorDropdown = action.payload.motorDropdown;
        state.motorDropdownError = false;
        state.loadingMotorDropdown = false;
      })
      .addCase(fetchMotorDropdown.rejected, state => {
        state.motorDropdownError = true;
        state.loadingMotorDropdown = false;
        state.motorDropdown = null;
      });
  },
});

export default MotorDropdownSlice.reducer;
