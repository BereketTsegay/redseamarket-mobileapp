import {
    ApiFormData,
    SimpleApiClient,
    apiClient,
    getWithAuthCall,
  } from './apiClient';
import { Country } from './country/countryResponse';
import { DashBoardDetails, Dashboard } from './home/DashBoardResponse';
import { LoginResponse } from './login/LoginCreateSlice';
import { ResendOtpResponse } from './otp/OtpResendSlice';
import { OtpResponse } from './otp/OtpVerificationSlice';
import { RegisterResponse } from './register/RegisterCreateSlice';
  
  type ResponseKind = 'success' | 'failure';
  
  type NetworkResponse<T> = {
    kind: ResponseKind;
    body?: T;
  };
  
  //API FOR REGISTER
  export const createRegister = async (
    requestBody: any,
  ): Promise<NetworkResponse<RegisterResponse>> => {
    const response = await SimpleApiClient('app/user/register', 'POST', requestBody);
  
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
      const response = await SimpleApiClient('app/verify/resent/otp', 'POST', requestBody);
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
          const response = await apiClient('app/customer/dashboard', 'POST', requestBody);
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
                const response = await apiClient('app/customer/get/country', 'POST', requestBody);
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
  