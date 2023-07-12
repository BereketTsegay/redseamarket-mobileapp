import {
    ApiFormData,
    SimpleApiClient,
    apiClient,
    getWithAuthCall,
  } from './apiClient';
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
    const response = await SimpleApiClient('app/vefify/opt', 'POST', requestBody);
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
  