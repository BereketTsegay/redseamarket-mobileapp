import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type OtpResponse = {
    status:  string;
     message: string;
    code:    string;
}

export type OtpVerifyState = {
  OtpData: OtpResponse | null;
  loadingOtp: boolean;
  OtpError: boolean;
};

const initialState: OtpVerifyState = {
    OtpData: null,
    loadingOtp: false,
    OtpError: false,
};

export const VerifyOtp = createAsyncThunk<
  {OtpData: OtpResponse | null},
  {requestBody: any}
>('VerifyOtp', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.VerifyOtp(requestBody);
    console.log(response.body)
    if (response.kind == 'success') {
      return {
        OtpData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        OtpData: initialState.OtpData,
    };
  }
});

const OtpVerificationSlice = createSlice({
  name: 'otpVerify',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(VerifyOtp.pending, state => {
        state.OtpData = initialState.OtpData;
        state.loadingOtp = true;
        state.OtpError = false;
      })
      .addCase(VerifyOtp.fulfilled, (state, action) => {
        state.OtpData = action.payload.OtpData;
        state.OtpError = false;
        state.loadingOtp = false;
      })
      .addCase(VerifyOtp.rejected, state => {
        state.OtpError = true;
        state.loadingOtp = false;
        state.OtpData = initialState.OtpData;
      });
  },
});

export const {reset} = OtpVerificationSlice.actions;
export default OtpVerificationSlice.reducer;
