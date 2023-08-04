import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type PaymentResponse = {
    status:  any;
    message?: string;
    payment_id? : string;
    errors?: any
}


export type PaymentState = {
  paymentData: PaymentResponse | null;
  loadingPayment: boolean;
  paymentError: boolean;
};

const initialState: PaymentState = {
    paymentData: null,
    loadingPayment: false,
    paymentError: false,
};

export const createPayment = createAsyncThunk<
  {paymentData: PaymentResponse | null},
  {requestBody: any}
>('createPayment', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.createPayment(requestBody);
    
    if (response.kind == 'success') {
      return {
        paymentData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        paymentData: initialState.paymentData,
    };
  }
});

const StripePaymentSlice = createSlice({
  name: 'StripePayment',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createPayment.pending, state => {
        state.paymentData = initialState.paymentData;
        state.loadingPayment = true;
        state.paymentError = false;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.paymentData = null;
        state.paymentData = action.payload.paymentData;
        state.paymentError = false;
        state.loadingPayment = false;
      })
      .addCase(createPayment.rejected, state => {
        state.paymentError = true;
        state.loadingPayment = false;
        state.paymentData = initialState.paymentData;
      });
  },
});

export const {reset} = StripePaymentSlice.actions;
export default StripePaymentSlice.reducer;
