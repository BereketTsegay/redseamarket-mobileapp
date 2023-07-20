import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { Motor } from './MotorResponse';


export type VariantListState = {
  variantList: Motor | null;
  loadingVariantList: boolean;
  variantListError: boolean;
};

const initialState: VariantListState = {
    variantList: null,
    loadingVariantList: false,
    variantListError: false,
};

export const fetchVariantList = createAsyncThunk<
  {variantList: Motor | null},
  {requestBody: any}
>('fetchVariantList', async ({requestBody}) => {
  const response = await apiInterface.fetchVariantList(requestBody);
  if (response.kind == 'success') {
    return {
        variantList: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const VariantListSlice = createSlice({
  name: 'VariantList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchVariantList.pending, state => {
        state.loadingVariantList = true;
        state.variantListError = false;
        state.variantList = null;
      })
      .addCase(fetchVariantList.fulfilled, (state, action) => {
        state.variantList = null;
        state.variantList = action.payload.variantList;
        state.variantListError = false;
        state.loadingVariantList = false;
      })
      .addCase(fetchVariantList.rejected, state => {
        state.variantListError = true;
        state.loadingVariantList = false;
        state.variantList = null;
      });
  },
});

export default VariantListSlice.reducer;
