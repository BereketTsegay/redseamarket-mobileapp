import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { Country } from './countryResponse';


export type StateListState = {
    stateLists: Country | null;
  loadingStateList: boolean;
  stateListError: boolean;
};

const initialState: StateListState = {
    stateLists: null,
    loadingStateList: false,
    stateListError: false,
};

export const fetchStateList = createAsyncThunk<
  {stateLists: Country | null},
  {requestBody: any}
>('fetchStateList', async ({requestBody}) => {
  const response = await apiInterface.fetchStateList(requestBody);
  if (response.kind == 'success') {
    return {
        stateLists: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const StateListSlice = createSlice({
  name: 'StateList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStateList.pending, state => {
        state.loadingStateList = true;
        state.stateListError = false;
        state.stateLists = null;
      })
      .addCase(fetchStateList.fulfilled, (state, action) => {
        state.stateLists = null;
        state.stateLists = action.payload.stateLists;
        state.stateListError = false;
        state.loadingStateList = false;
      })
      .addCase(fetchStateList.rejected, state => {
        state.stateListError = true;
        state.loadingStateList = false;
        state.stateLists = null;
      });
  },
});

export default StateListSlice.reducer;
