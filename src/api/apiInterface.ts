import { AdListResponse } from './ads/AdListResponse';
import {
  ApiFormData,
  SimpleApiClient,
  apiClient,
  getWithAuthCall,
} from './apiClient';
import {Country} from './country/countryResponse';
import {CurrencyResponse} from './currency/CurrencyResponse';
import {FavResponse} from './favorites/FavCreateSlice';
import {FavList} from './favorites/FavListResponse';
import {
  DashBoardDetails,
  Dashboard,
  Details_Ad,
} from './home/DashBoardResponse';
import {LoginResponse} from './login/LoginCreateSlice';
import {ResendOtpResponse} from './otp/OtpResendSlice';
import {OtpResponse} from './otp/OtpVerificationSlice';
import { ProfileResponse } from './profile/ProfileResponse';
import {RegisterResponse} from './register/RegisterCreateSlice';

type ResponseKind = 'success' | 'failure';

type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};

//API FOR REGISTER
export const createRegister = async (
  requestBody: any,
): Promise<NetworkResponse<RegisterResponse>> => {
  const response = await SimpleApiClient(
    'app/user/register',
    'POST',
    requestBody,
  );

  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR LOGIN
export const createLogin = async (
  requestBody: any,
): Promise<NetworkResponse<LoginResponse>> => {
  const response = await SimpleApiClient('app/user/login', 'POST', requestBody);

  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR Otp Verify
export const VerifyOtp = async (
  requestBody: any,
): Promise<NetworkResponse<OtpResponse>> => {
  const response = await SimpleApiClient('app/verify/otp', 'POST', requestBody);
  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR Otp resend
export const ResendOtp = async (
  requestBody: any,
): Promise<NetworkResponse<ResendOtpResponse>> => {
  const response = await SimpleApiClient(
    'app/verify/resent/otp',
    'POST',
    requestBody,
  );
  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR DASHBOARD LIST
export const fetchDashBoardList = async (
  requestBody: any,
): Promise<NetworkResponse<Dashboard | null>> => {
  const response = await apiClient(
    'app/customer/dashboard',
    'POST',
    requestBody,
  );
  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR DASHBOARD DETAILS
export const fetchDashBoardDetails = async (
  requestBody: any,
): Promise<NetworkResponse<DashBoardDetails | null>> => {
  const response = await apiClient('app/customer/ad/view', 'POST', requestBody);
  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR COUNTRY LIST
export const fetchCountryList = async (
  requestBody: any,
): Promise<NetworkResponse<Country | null>> => {
  const response = await apiClient(
    'app/customer/get/country',
    'POST',
    requestBody,
  );
  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR COUNTRY LIST
export const fetchCurrencyList = async (
  requestBody: any,
): Promise<NetworkResponse<CurrencyResponse | null>> => {
  const response = await apiClient('app/get/currency', 'POST', requestBody);
  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR CATEGORY LIST
export const fetchCategoryList = async (
  requestBody: any,
): Promise<NetworkResponse<Details_Ad | null>> => {
  const response = await apiClient(
    'app/customer/get/category/ads',
    'POST',
    requestBody,
  );
  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR ADD OR REMOVE FAVORITE
export const createFavorite = async (
  requestBody: any,
): Promise<NetworkResponse<FavResponse | null>> => {
  const response = await apiClient(
    'app/customer/favourite/adOrRemove',
    'POST',
    requestBody,
  );
  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR FAVORITE LIST
export const fetchFavList = async (
  requestBody: any,
): Promise<NetworkResponse<FavList | null>> => {
  const response = await apiClient(
    'app/customer/view/favourite',
    'POST',
    requestBody,
  );
  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR AD LIST
export const fetchAdList = async (
  requestBody: any,
): Promise<NetworkResponse<AdListResponse | null>> => {
  const response = await apiClient(
    'app/customer/view/myAds',
    'POST',
    requestBody,
  );
  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR PROFILE DETAILS
export const fetchProfileDetails = async (
  requestBody: any,
): Promise<NetworkResponse<ProfileResponse | null>> => {
  const response = await apiClient(
    'app/customer/view/profile',
    'POST',
    requestBody,
  );
  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};


