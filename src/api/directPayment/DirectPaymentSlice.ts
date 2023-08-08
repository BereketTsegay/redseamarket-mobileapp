import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type DirectPaymentResponse = {
    status:  string;
    errors?: any;
    message?: any
}


export type DirectPaymentState = {
  directPaymentData: DirectPaymentResponse | null;
  loadingDirectPayment: boolean;
  directPaymentError: boolean;
};

const initialState: DirectPaymentState = {
    directPaymentData: null,
    loadingDirectPayment: false,
    directPaymentError: false,
};

export const UploadPaymentDocument = createAsyncThunk<
  {directPaymentData: DirectPaymentResponse | null},
  {requestBody: any}
>('UploadPaymentDocument', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.UploadPaymentDocument(requestBody);
    
    if (response.kind == 'success') {
      return {
        directPaymentData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        directPaymentData: initialState.directPaymentData,
    };
  }
});

const DirectPaymentSlice = createSlice({
  name: 'DirectPayment',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(UploadPaymentDocument.pending, state => {
        state.directPaymentData = initialState.directPaymentData;
        state.loadingDirectPayment = true;
        state.directPaymentError = false;
      })
      .addCase(UploadPaymentDocument.fulfilled, (state, action) => {
        state.directPaymentData = action.payload.directPaymentData;
        state.directPaymentError = false;
        state.loadingDirectPayment = false;
      })
      .addCase(UploadPaymentDocument.rejected, state => {
        state.directPaymentError = true;
        state.loadingDirectPayment = false;
        state.directPaymentData = initialState.directPaymentData;
      });
  },
});

export const {reset} = DirectPaymentSlice.actions;
export default DirectPaymentSlice.reducer;
