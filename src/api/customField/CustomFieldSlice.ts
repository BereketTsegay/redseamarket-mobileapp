import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { CustomField } from './CustomFieldResponse';


export type CustomFieldState = {
  customLists: CustomField | null;
  loadingCustomLists: boolean;
  customListError: boolean;
};

const initialState: CustomFieldState = {
    customLists: null,
    loadingCustomLists: false,
    customListError: false,
};

export const fetchCustomField = createAsyncThunk<
  {customLists: CustomField | null},
  {requestBody: any}
>('fetchCustomField', async ({requestBody}) => {
  const response = await apiInterface.fetchCustomField(requestBody);
  if (response.kind == 'success') {
    return {
        customLists: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const CustomFieldSlice = createSlice({
  name: 'CustomFieldList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCustomField.pending, state => {
        state.loadingCustomLists = true;
        state.customListError = false;
        state.customLists = null;
      })
      .addCase(fetchCustomField.fulfilled, (state, action) => {
        state.customLists = null;
        state.customLists = action.payload.customLists;
        state.customListError = false;
        state.loadingCustomLists = false;
      })
      .addCase(fetchCustomField.rejected, state => {
        state.customListError = true;
        state.loadingCustomLists = false;
        state.customLists = null;
      });
  },
});

export default CustomFieldSlice.reducer;
