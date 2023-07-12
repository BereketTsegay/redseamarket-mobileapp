import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type ResendOtpResponse = {
    status:  string;
     message: string;
    code:    string;
}

export type OtpResendState = {
  OtpResendData: ResendOtpResponse | null;
  loadingOtpResend: boolean;
  OtpResendError: boolean;
};

const initialState: OtpResendState = {
    OtpResendData: null,
    loadingOtpResend: false,
    OtpResendError: false,
};

export const ResendOtp = createAsyncThunk<
  {OtpResendData: ResendOtpResponse | null},
  {requestBody: any}
>('ResendOtp', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.ResendOtp(requestBody);
    if (response.kind == 'success') {
      return {
        OtpResendData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        OtpResendData: initialState.OtpResendData,
    };
  }
});

const OtpResendSlice = createSlice({
  name: 'otpResend',
  initialState: initialState,
  reducers: {
    ResendReset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(ResendOtp.pending, state => {
        state.OtpResendData = initialState.OtpResendData;
        state.loadingOtpResend = true;
        state.OtpResendError = false;
      })
      .addCase(ResendOtp.fulfilled, (state, action) => {
        state.OtpResendData = action.payload.OtpResendData;
        state.OtpResendError = false;
        state.loadingOtpResend = false;
      })
      .addCase(ResendOtp.rejected, state => {
        state.OtpResendError = true;
        state.loadingOtpResend = false;
        state.OtpResendData = initialState.OtpResendData;
      });
  },
});

export const {ResendReset} = OtpResendSlice.actions;
export default OtpResendSlice.reducer;
