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
import FavCreateSlice from './src/api/favorites/FavCreateSlice';
import FavListSlice from './src/api/favorites/FavListSlice';
import AdListSlice from './src/api/ads/AdListSlice';
import ProfileDetailsSlice from './src/api/profile/ProfileDetailsSlice';
import SubCategoryListSlice from './src/api/subCategories/SubCategoryListSlice';
import StateListSlice from './src/api/country/StateListSlice';
import CityListSlice from './src/api/country/CityListSlice';
import StoreCountrySlice from './src/api/country/StoreCountrySlice';
import MakeListSlice from './src/api/motor/MakeListSlice';
import ModelListSlice from './src/api/motor/ModelListSlice';
import VariantListSlice from './src/api/motor/VariantListSlice';

const rootReducer = combineReducers({
  registerCreate: RegisterCreateSlice,
  otpVerify: OtpVerificationSlice,
  otpResend: OtpResendSlice,
  loginCreate: LoginCreateSlice,
  DashBoardList: DashBoardListSlice,
  CountryList: CountryListSlice,
  DashBoardDetails: DashBoardDetailsSlice,
  CurrencyList: CurrencyListSlice,
  StateList: StateListSlice,
  CityList: CityListSlice,
  CategoryList: CategoryListSlice,
  FavCreate: FavCreateSlice,
  FavList: FavListSlice,
  AdList: AdListSlice,
  ProfileDetails:ProfileDetailsSlice,
  SubCategoryList: SubCategoryListSlice,
  StoreCountry: StoreCountrySlice,
  MakeList: MakeListSlice,
  ModelList: ModelListSlice,
  VariantList: VariantListSlice
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
