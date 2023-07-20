import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { Motor } from './MotorResponse';


export type MakeListState = {
  makeList: Motor | null;
  loadingMakeList: boolean;
  makeListError: boolean;
};

const initialState: MakeListState = {
  makeList: null,
  loadingMakeList: false,
  makeListError: false,
};

export const fetchMakeList = createAsyncThunk<
  {makeList: Motor | null},
  {requestBody: any}
>('fetchMakeList', async ({requestBody}) => {
  const response = await apiInterface.fetchMakeList(requestBody);
  if (response.kind == 'success') {
    return {
      makeList: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const MakeListSlice = createSlice({
  name: 'MakeList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMakeList.pending, state => {
        state.loadingMakeList = true;
        state.makeListError = false;
        state.makeList = null;
      })
      .addCase(fetchMakeList.fulfilled, (state, action) => {
        state.makeList = null;
        state.makeList = action.payload.makeList;
        state.makeListError = false;
        state.loadingMakeList = false;
      })
      .addCase(fetchMakeList.rejected, state => {
        state.makeListError = true;
        state.loadingMakeList = false;
        state.makeList = null;
      });
  },
});

export default MakeListSlice.reducer;
