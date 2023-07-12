import {combineReducers, configureStore} from '@reduxjs/toolkit';
import RegisterCreateSlice from './src/api/register/RegisterCreateSlice';
import OtpVerificationSlice from './src/api/otp/OtpVerificationSlice';
import OtpResendSlice from './src/api/otp/OtpResendSlice';
import LoginCreateSlice from './src/api/login/LoginCreateSlice';

const rootReducer = combineReducers({
  registerCreate: RegisterCreateSlice,
  otpVerify: OtpVerificationSlice,
  otpResend: OtpResendSlice,
  loginCreate: LoginCreateSlice
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
