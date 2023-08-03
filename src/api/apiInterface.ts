import { AdListResponse } from './ads/AdListResponse';
import {
  ApiFormData,
  SimpleApiClient,
  apiClient,
  getWithAuthCall,
} from './apiClient';
import {Country} from './country/countryResponse';
import {CurrencyResponse} from './currency/CurrencyResponse';
import { CustomField } from './customField/CustomFieldResponse';
import {FavResponse} from './favorites/FavCreateSlice';
import {FavList} from './favorites/FavListResponse';
import { FeaturedResponse } from './featured/FeaturedResponse';
import {
  DashBoardDetails,
  Dashboard,
  Details_Ad,
} from './home/DashBoardResponse';
import { JobApplyResponse } from './jobApply/JobApplySlice';
import { HiringJobResponse } from './jobs/HiringJobSlice';
import { JobSaveResponse } from './jobs/JobProfileSaveSlice';
import { JobUpdateResponse } from './jobs/JobProfileUpdateSlice';
import { JobResponse } from './jobs/JobResponse';
import {LoginResponse} from './login/LoginCreateSlice';
import { Motor } from './motor/MotorResponse';
import {ResendOtpResponse} from './otp/OtpResendSlice';
import {OtpResponse} from './otp/OtpVerificationSlice';
import { PlaceAdResponse } from './placeAd/PlaceAdSlice';
import { EditResponse } from './profile/ProfileEditSlice';
import { ProfileResponse } from './profile/ProfileResponse';
import {RegisterResponse} from './register/RegisterCreateSlice';
import { SubCategoryResponse } from './subCategories/SubCategoryResponse';

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

//API FOR STATE LIST
export const fetchStateList = async (
  requestBody: any,
): Promise<NetworkResponse<Country | null>> => {
  const response = await apiClient(
    'app/customer/get/state',
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

//API FOR CITY LIST
export const fetchCityList = async (
  requestBody: any,
): Promise<NetworkResponse<Country | null>> => {
  const response = await apiClient(
    'app/customer/get/city',
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

//API FOR SUB AND INNER CATEGORY LIST
export const fetchSubCategoryList = async (
  requestBody: any,
): Promise<NetworkResponse<SubCategoryResponse | null>> => {
  const response = await apiClient(
    'app/customer/get/subcategory',
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

//API FOR MOTOR MAKE LIST
export const fetchMakeList = async (
  requestBody: any,
): Promise<NetworkResponse<Motor | null>> => {
  const response = await apiClient(
    'app/customer/get/make',
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

//API FOR MOTOR MODEL LIST
export const fetchModelList = async (
  requestBody: any,
): Promise<NetworkResponse<Motor | null>> => {
  const response = await apiClient(
    'app/customer/get/model',
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

//API FOR MOTOR VARIANT LIST
export const fetchVariantList = async (
  requestBody: any,
): Promise<NetworkResponse<Motor | null>> => {
  const response = await apiClient(
    'app/customer/get/variant',
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

//API FOR PLACING AD
export const createAd = async (
  requestBody: any,
): Promise<NetworkResponse<PlaceAdResponse | null>> => {
  const response = await ApiFormData(
    'app/customer/ads/store',
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

//API FOR CUSTOM FIELD LIST
export const fetchCustomField = async (
  requestBody: any,
): Promise<NetworkResponse<CustomField | null>> => {
  const response = await apiClient(
    'app/customer/ads/custom_field_and_dependency',
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

//API FOR LISTING JOB PROFILE
export const fetchJobProfileList = async (
  requestBody: any,
): Promise<NetworkResponse<JobResponse | null>> => {
  const response = await apiClient(
    'app/get/jobprofile',
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


//API FOR CREATING JOB PROFILE
export const createJobProfile = async (
  requestBody: any,
): Promise<NetworkResponse<JobSaveResponse | null>> => {
  const response = await ApiFormData(
    'app/save/jobprofile',
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

//API FOR UPDATING JOB PROFILE
export const updateJobProfile = async (
  requestBody: any,
): Promise<NetworkResponse<JobUpdateResponse | null>> => {
  const response = await ApiFormData(
    'app/update/jobprofile',
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

//API FOR CREATING JOB PROFILE
export const applyJob = async (
  requestBody: any,
): Promise<NetworkResponse<JobApplyResponse | null>> => {
  const response = await ApiFormData(
    'app/apply/job',
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

//API FOR LISTING HIRING JOB LIST
export const fetchHiringJobList = async (
  requestBody: any,
): Promise<NetworkResponse<HiringJobResponse | null>> => {
  const response = await apiClient(
    'app/get/jobprofile/list',
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

//API FOR UPDATING PROFILE
export const UpdateProfile = async (
  requestBody: any,
): Promise<NetworkResponse<EditResponse | null>> => {
  const response = await ApiFormData(
    'app/customer/update/profile',
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

//API FOR FETCHING FEATURED AMOUNT
export const fetchFeaturedAmount = async (
  requestBody: any,
): Promise<NetworkResponse<FeaturedResponse | null>> => {
  const response = await apiClient(
    'app/subcategory/featured/amount',
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


