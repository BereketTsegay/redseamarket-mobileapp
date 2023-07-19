import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { SubCategoryResponse } from './SubCategoryResponse';


export type SubCategoryListState = {
  subCategoryLists: SubCategoryResponse | null;
  loadingSubCategoryLists: boolean;
  subCategoryListError: boolean;
};

const initialState: SubCategoryListState = {
    subCategoryLists: null,
    loadingSubCategoryLists: false,
    subCategoryListError: false,
};

export const fetchSubCategoryList = createAsyncThunk<
  {subCategoryLists: SubCategoryResponse | null},
  {requestBody: any}
>('fetchSubCategoryList', async ({requestBody}) => {
  const response = await apiInterface.fetchSubCategoryList(requestBody);
  if (response.kind == 'success') {
    return {
        subCategoryLists: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const SubCategoryListSlice = createSlice({
  name: 'SubCategoryList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSubCategoryList.pending, state => {
        state.loadingSubCategoryLists = true;
        state.subCategoryListError = false;
        state.subCategoryLists = null;
      })
      .addCase(fetchSubCategoryList.fulfilled, (state, action) => {
        state.subCategoryLists = null;
        state.subCategoryLists = action.payload.subCategoryLists;
        state.subCategoryListError = false;
        state.loadingSubCategoryLists = false;
      })
      .addCase(fetchSubCategoryList.rejected, state => {
        state.subCategoryListError = true;
        state.loadingSubCategoryLists = false;
        state.subCategoryLists = null;
      });
  },
});

export default SubCategoryListSlice.reducer;
