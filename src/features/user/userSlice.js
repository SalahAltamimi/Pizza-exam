function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../service/apiGeocoding";

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async (_ = null, { rejectWithValue }) => {
    try {
      // 1) We get the user's geolocation position
      const positionObj = await getPosition();
      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };

      // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
      const addressObj = await getAddress(position);
      const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

      // 3) Then we return an object with the data that we are interested in
      return { position, address };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  username: "",
  address: "",
  position: "",
  status: "idle",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateusername(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.address = action.payload.address;
        state.position = action.payload.position;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      }),
});

export const { updateusername } = userSlice.actions;

export default userSlice.reducer;
