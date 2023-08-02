import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type EditResponse = {
    status:  string;
    message: string;
    code?: number;
    errors?: any
}


export type EditState = {
  EditData: EditResponse | null;
  loadingEdit: boolean;
  EditingError: boolean;
};

const initialState: EditState = {
    EditData: null,
    loadingEdit: false,
    EditingError: false,
};

export const UpdateProfile = createAsyncThunk<
  {EditData: EditResponse | null},
  {requestBody: any}
>('UpdateProfile', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.UpdateProfile(requestBody);
    
    if (response.kind == 'success') {
      return {
        EditData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        EditData: initialState.EditData,
    };
  }
});

const ProfileEditSlice = createSlice({
  name: 'ProfileEdit',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(UpdateProfile.pending, state => {
        state.EditData = initialState.EditData;
        state.loadingEdit = true;
        state.EditingError = false;
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        state.EditData = action.payload.EditData;
        state.EditingError = false;
        state.loadingEdit = false;
      })
      .addCase(UpdateProfile.rejected, state => {
        state.EditingError = true;
        state.loadingEdit = false;
        state.EditData = initialState.EditData;
      });
  },
});

export const {reset} = ProfileEditSlice.actions;
export default ProfileEditSlice.reducer;
