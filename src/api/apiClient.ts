import axios, {AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../constants/AppStrings';
import { ToastAndroid } from 'react-native';

const BASE_URL = "https://admin-jamal.prompttechdemohosting.com/api/"

export const apiClient = async (
  endPoint: string,
  method: string,
  requestBody: any,
) => {
  const response = await axios(
    BASE_URL + endPoint,
    {
      method: method,
      data: requestBody,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(AppStrings.ACCESS_TOKEN)),
      },
    },
  );
  return response;
} 

export const SimpleApiClient = async (
  endPoint: string,
  method: string,
  requestBody: any,
) => {
  try{
  const response = await axios(
    BASE_URL + endPoint,
    {
      method: method,
      data: requestBody,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
} catch (error) {
  ToastAndroid.show(
    JSON.stringify('Error in API call:' + error),
    ToastAndroid.SHORT,
  );
  throw error; // Rethrow the error or handle it as needed.
}
}

export const ApiFormData = async (
  endPoint: string,
  method: string,
  requestBody: any,
) => {
try {
  const response = await axios(BASE_URL + endPoint, {
    method: method,
    data: requestBody,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + (await AsyncStorage.getItem(AppStrings.ACCESS_TOKEN)),
    },
  });
  return response;
} catch (error) {
  ToastAndroid.show(
    JSON.stringify('Error in API call:' + error),
    ToastAndroid.SHORT,
  );
  throw error; // Rethrow the error or handle it as needed.
}
}

export const getWithAuthCall = async (
  endPoint: string
) => {
  const response = await axios.get(
    BASE_URL + endPoint,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(AppStrings.ACCESS_TOKEN)),
      },
    },
  );
  return response;
}
