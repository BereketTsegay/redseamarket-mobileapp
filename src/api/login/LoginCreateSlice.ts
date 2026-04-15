import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type LoginResponse = {
    status:  boolean;
    message: string;
    token:   string;
    user:    User;
}

export type User = {
    name:                    string;
    email:                   string;
    type:                    number;
    is_active:               number;
    email_verified_at:       Date;
    updated_at:              Date;
    created_at:              Date;
    total_spent:             number;
    wallet_balance:          WalletBalance;
    wallet_prefix:           string;
    full_name:               string;
    gender:                  string;
    languages:               string[];
    nationality:             string;
    phone_code:              string;
    phone_number:            string;
    visa_status:             string;
    availability:            string;
    profile_picture:         string;
    summary:                 string;
    avatar:                  string;
    google_id:               string;
    id:                      string;
    created_at_utc:          Date;
    created_at_local:        Date;
    updated_at_utc:          Date;
    updated_at_local:        Date;
    email_verified_at_utc:   Date;
    email_verified_at_local: Date;
    timezone:                string;
}

export type WalletBalance = {
    amount: number;
}

export type LoginCreateState = {
  LoginData: LoginResponse | null;
  loadingLogin: boolean;
  LoginError: boolean;
};

const initialState: LoginCreateState = {
  LoginData: null,
  loadingLogin: false,
  LoginError: false,
};

export const createLogin = createAsyncThunk<
  {LoginData: LoginResponse | null},
  {requestBody: any, url: any}
>('createLogin', async ({requestBody, url}) => {
  if (requestBody != null) {
    const response = await apiInterface.createLogin(requestBody, url);
    if (response.kind == 'success') {
      return {
        LoginData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
      LoginData: initialState.LoginData,
    };
  }
});

const LoginCreateSlice = createSlice({
  name: 'loginCreate',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createLogin.pending, state => {
        state.LoginData = initialState.LoginData;
        state.loadingLogin = true;
        state.LoginError = false;
      })
      .addCase(createLogin.fulfilled, (state, action) => {
        state.LoginData = action.payload.LoginData;
        state.LoginError = false;
        state.loadingLogin = false;
      })
      .addCase(createLogin.rejected, state => {
        state.LoginError = true;
        state.loadingLogin = false;
        state.LoginData = initialState.LoginData;
      });
  },
});

export const {reset} = LoginCreateSlice.actions;
export default LoginCreateSlice.reducer;
