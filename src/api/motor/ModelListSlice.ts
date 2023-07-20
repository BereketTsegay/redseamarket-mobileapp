import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { Motor } from './MotorResponse';


export type ModelListState = {
  modelList: Motor | null;
  loadingModelList: boolean;
  modelListError: boolean;
};

const initialState: ModelListState = {
  modelList: null,
  loadingModelList: false,
  modelListError: false,
};

export const fetchModelList = createAsyncThunk<
  {modelList: Motor | null},
  {requestBody: any}
>('fetchModelList', async ({requestBody}) => {
  const response = await apiInterface.fetchModelList(requestBody);
  if (response.kind == 'success') {
    return {
      modelList: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const ModelListSlice = createSlice({
  name: 'ModelList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchModelList.pending, state => {
        state.loadingModelList = true;
        state.modelListError = false;
        state.modelList = null;
      })
      .addCase(fetchModelList.fulfilled, (state, action) => {
        state.modelList = null;
        state.modelList = action.payload.modelList;
        state.modelListError = false;
        state.loadingModelList = false;
      })
      .addCase(fetchModelList.rejected, state => {
        state.modelListError = true;
        state.loadingModelList = false;
        state.modelList = null;
      });
  },
});

export default ModelListSlice.reducer;
