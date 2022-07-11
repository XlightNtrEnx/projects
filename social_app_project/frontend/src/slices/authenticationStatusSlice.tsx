import { createSlice, configureStore } from '@reduxjs/toolkit'

export const authenticationStatusSlice = createSlice({
  name: "authenticationStatus",
  initialState: {
    value: "Authenticating"
  },
  reducers: {
    setAuthenticated: state => {
      state.value = "Authenticated";
    },
    setUnauthenticated: state => {
      state.value = "Unauthenticated";
    },
  }
});

export const { setAuthenticated, setUnauthenticated } = authenticationStatusSlice.actions;
export default authenticationStatusSlice.reducer;