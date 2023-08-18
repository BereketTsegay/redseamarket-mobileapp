import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { DashBoardDetails } from '../home/DashBoardResponse';


export type CategoryListState = {
  categoryLists: DashBoardDetails | null;
  loadingCategoryLists: boolean;
  categoryListError: boolean;
};

const initialState: CategoryListState = {
    categoryLists: null,
    loadingCategoryLists: false,
    categoryListError: false,
};

export const fetchCategoryList = createAsyncThunk<
  {categoryLists: DashBoardDetails | null},
  {requestBody: any}
>('fetchCategoryList', async ({requestBody}) => {
  const response = await apiInterface.fetchCategoryList(requestBody);
  if (response.kind == 'success') {
    return {
        categoryLists: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const CategoryListSlice = createSlice({
  name: 'CategoryList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategoryList.pending, state => {
        state.loadingCategoryLists = true;
        state.categoryListError = false;
        state.categoryLists = null;
      })
      .addCase(fetchCategoryList.fulfilled, (state, action) => {
        state.categoryLists = null;
        state.categoryLists = action.payload.categoryLists;
        state.categoryListError = false;
        state.loadingCategoryLists = false;
      })
      .addCase(fetchCategoryList.rejected, state => {
        state.categoryListError = true;
        state.loadingCategoryLists = false;
        state.categoryLists = null;
      });
  },
});

export default CategoryListSlice.reducer;
