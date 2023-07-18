import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type FavResponse = {
    status:  string;
    message: string;
    code:    string;
}


export type FavCreateState = {
  FavData: FavResponse | null;
  loadingFav: boolean;
  FavError: boolean;
};

const initialState: FavCreateState = {
  FavData: null,
  loadingFav: false,
  FavError: false,
};

export const createFavorite = createAsyncThunk<
  {FavData: FavResponse | null},
  {requestBody: any}
>('createFavorite', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.createFavorite(requestBody);
    
    if (response.kind == 'success') {
      return {
        FavData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        FavData: initialState.FavData,
    };
  }
});

const FavCreateSlice = createSlice({
  name: 'FavCreate',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createFavorite.pending, state => {
        state.FavData = initialState.FavData;
        state.loadingFav = true;
        state.FavError = false;
      })
      .addCase(createFavorite.fulfilled, (state, action) => {
        state.FavData = action.payload.FavData;
        state.FavError = false;
        state.loadingFav = false;
      })
      .addCase(createFavorite.rejected, state => {
        state.FavError = true;
        state.loadingFav = false;
        state.FavData = initialState.FavData;
      });
  },
});

export const {reset} = FavCreateSlice.actions;
export default FavCreateSlice.reducer;
