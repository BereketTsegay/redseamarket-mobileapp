import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type PlaceAdResponse = {
    status:  string;
    message: string;
    code:    number;
    ad_id :number;
}


export type PlaceAdState = {
  PlaceAdData: PlaceAdResponse | null;
  loadingPlaceAd: boolean;
  PlaceAdError: boolean;
};

const initialState: PlaceAdState = {
    PlaceAdData: null,
    loadingPlaceAd: false,
    PlaceAdError: false,
};

export const createAd = createAsyncThunk<
  {PlaceAdData: PlaceAdResponse | null},
  {requestBody: any, url: any}
>('createAd', async ({requestBody, url}) => {
  if (requestBody != null) {
    const response = await apiInterface.createAd(requestBody, url);
    if (response.kind == 'success') {
      return {
        PlaceAdData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        PlaceAdData: initialState.PlaceAdData,
    };
  }
});

const PlaceAdSlice = createSlice({
  name: 'PlaceAd',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createAd.pending, state => {
        state.PlaceAdData = initialState.PlaceAdData;
        state.loadingPlaceAd = true;
        state.PlaceAdError = false;
      })
      .addCase(createAd.fulfilled, (state, action) => {
        state.PlaceAdData = action.payload.PlaceAdData;
        state.PlaceAdError = false;
        state.loadingPlaceAd = false;
      })
      .addCase(createAd.rejected, state => {
        state.PlaceAdError = true;
        state.loadingPlaceAd = false;
        state.PlaceAdData = initialState.PlaceAdData;
      });
  },
});

export const {reset} = PlaceAdSlice.actions;
export default PlaceAdSlice.reducer;
