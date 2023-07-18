import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { FavList } from './FavListResponse';


export type FavListState = {
  favLists: FavList | null;
  loadingFavLists: boolean;
  favListError: boolean;
};

const initialState: FavListState = {
    favLists: null,
    loadingFavLists: false,
    favListError: false,
};

export const fetchFavList = createAsyncThunk<
  {favLists: FavList | null},
  {requestBody: any}
>('fetchFavList', async ({requestBody}) => {
  const response = await apiInterface.fetchFavList(requestBody);
  if (response.kind == 'success') {
    return {
        favLists: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const FavListSlice = createSlice({
  name: 'FavList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavList.pending, state => {
        state.loadingFavLists = true;
        state.favListError = false;
        state.favLists = null;
      })
      .addCase(fetchFavList.fulfilled, (state, action) => {
        state.favLists = null;
        state.favLists = action.payload.favLists;
        state.favListError = false;
        state.loadingFavLists = false;
      })
      .addCase(fetchFavList.rejected, state => {
        state.favListError = true;
        state.loadingFavLists = false;
        state.favLists = null;
      });
  },
});

export default FavListSlice.reducer;
