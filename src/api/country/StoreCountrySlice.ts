import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';


interface ValuesState {
  country_id: any
}


const initialState: ValuesState = {
  country_id: null
};

const StoreCountrySlice = createSlice({
  name: 'StoreCountry',
  initialState: initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase('SET_COUNTRY', (state, action) => {
        state.country_id = action.payload;
      });
  },
});

export default StoreCountrySlice.reducer;
