import {combineReducers, configureStore} from '@reduxjs/toolkit';
import RegisterCreateSlice from './src/api/register/RegisterCreateSlice';
import OtpVerificationSlice from './src/api/otp/OtpVerificationSlice';
import OtpResendSlice from './src/api/otp/OtpResendSlice';
import LoginCreateSlice from './src/api/login/LoginCreateSlice';
import DashBoardListSlice from './src/api/home/DashBoardListSlice';
import CountryListSlice from './src/api/country/CountryListSlice';
import DashBoardDetailsSlice from './src/api/home/DashBoardDetailsSlice';
import CurrencyListSlice from './src/api/currency/CurrencyListSlice';
import CategoryListSlice from './src/api/category/CategoryListSlice';

const rootReducer = combineReducers({
  registerCreate: RegisterCreateSlice,
  otpVerify: OtpVerificationSlice,
  otpResend: OtpResendSlice,
  loginCreate: LoginCreateSlice,
  DashBoardList: DashBoardListSlice,
  CountryList: CountryListSlice,
  DashBoardDetails: DashBoardDetailsSlice,
  CurrencyList: CurrencyListSlice,
  CategoryList: CategoryListSlice
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
